import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
  const { phone } = await request.json();
  if (!phone) {
    return new Response(JSON.stringify({ error: 'phone_required' }), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { phone },
    include: {
      survey: {
        include: {
          answers: {
            include: {
              question: {
                include: {
                  section: true,
                  parent: true,
                },
              },
              selectedOptions: {
                include: { option: true },
                orderBy: { option: { order: 'asc' } },
              },
            },
            orderBy: { question: { order: 'asc' } },
          },
        },
      },
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  const wb = XLSX.utils.book_new();

  // ── Sheet 1: User Info ──────────────────────────────────────────────────────
  const infoRows = [
    ['Field', 'Value'],
    ['Name', user.name],
    ['Phone', user.phone],
    ['Verified', user.verified ? 'Yes' : 'No'],
    ['Verified At', user.verifiedAt ? formatDate(user.verifiedAt) : '—'],
    ['Survey Completed', user.hasCompletedSurvey ? 'Yes' : 'No'],
    ['Survey Submitted At', user.survey?.submittedAt ? formatDate(user.survey.submittedAt) : '—'],
    ['Account Created At', formatDate(user.createdAt)],
  ];

  const wsInfo = XLSX.utils.aoa_to_sheet(infoRows);
  wsInfo['!cols'] = [{ wch: 22 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(wb, wsInfo, 'User Info');

  // ── Sheet 2: Survey Answers ─────────────────────────────────────────────────
  const answerHeaders = ['Section', 'Question', 'Type', 'Answer'];
  const answerRows: (string | null)[][] = [answerHeaders];

  if (user.survey) {
    for (const answer of user.survey.answers) {
      const q = answer.question;
      const sectionTitle = q.section.title;
      const questionLabel = q.parent ? `${q.parent.label} › ${q.label}` : q.label;
      const type = q.type;

      let answerValue: string;

      if (type === 'TEXT') {
        answerValue = answer.textValue ?? '—';
      } else if (type === 'SINGLE' || type === 'CONDITIONAL') {
        const optionLabel = answer.selectedOptions[0]?.option.label ?? '—';
        if (type === 'CONDITIONAL' && answer.textValue) {
          answerValue = `${optionLabel} — ${answer.textValue}`;
        } else {
          answerValue = optionLabel;
        }
      } else if (type === 'MULTI') {
        answerValue =
          answer.selectedOptions.map((so) => so.option.label).join(', ') || '—';
      } else {
        answerValue = answer.textValue ?? '—';
      }

      answerRows.push([sectionTitle, questionLabel, humanType(type), answerValue]);
    }
  } else {
    answerRows.push(['—', 'No survey response recorded', '—', '—']);
  }

  const wsAnswers = XLSX.utils.aoa_to_sheet(answerRows);
  wsAnswers['!cols'] = [{ wch: 28 }, { wch: 46 }, { wch: 14 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsAnswers, 'Survey Answers');

  // ── Emit workbook ───────────────────────────────────────────────────────────
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  const safeName = user.phone.replace(/\D/g, '');

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="user_${safeName}.xlsx"`,
    },
  });
}

function formatDate(d: Date): string {
  return d.toISOString().replace('T', ' ').slice(0, 19);
}

function humanType(type: string): string {
  const map: Record<string, string> = {
    SINGLE: 'Single',
    MULTI: 'Multi',
    TEXT: 'Text',
    CONDITIONAL: 'Conditional',
    COMPOUND: 'Compound',
  };
  return map[type] ?? type;
}
