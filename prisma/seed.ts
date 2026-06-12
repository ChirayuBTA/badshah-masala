import { PrismaClient, QuestionType } from '@prisma/client';
import { survey } from '../src/data/survey.ts';
import type {
  Section,
  Question,
  SingleQuestion,
  MultiQuestion,
  ConditionalQuestion,
  CompoundQuestion,
} from '../src/data/survey.ts';

const prisma = new PrismaClient();

function toQuestionType(type: Question['type']): QuestionType {
  const map: Record<Question['type'], QuestionType> = {
    single: 'SINGLE',
    multi: 'MULTI',
    text: 'TEXT',
    conditional: 'CONDITIONAL',
    compound: 'COMPOUND',
  };
  return map[type];
}

async function seedSection(section: Section, sectionOrder: number) {
  await prisma.surveySection.upsert({
    where: { id: section.id },
    update: { title: section.title, subtitle: section.subtitle, order: sectionOrder },
    create: { id: section.id, title: section.title, subtitle: section.subtitle, order: sectionOrder },
  });

  for (let qi = 0; qi < section.questions.length; qi++) {
    const question = section.questions[qi];
    await seedQuestion(question, section.id, qi, null);
  }
}

async function seedQuestion(
  question: Question,
  sectionId: string,
  order: number,
  parentId: string | null,
) {
  // For compound parts, sectionId is inherited from the parent's section.
  // We use sectionId + key as the unique identifier, but compound parts share
  // sectionId with their parent — their key is already unique within the section.
  const record = await prisma.surveyQuestion.upsert({
    where: { sectionId_key: { sectionId, key: question.id } },
    update: {
      label: question.label,
      type: toQuestionType(question.type),
      order,
      required: (question as { required?: boolean }).required ?? false,
      parentId,
    },
    create: {
      key: question.id,
      sectionId,
      label: question.label,
      type: toQuestionType(question.type),
      order,
      required: (question as { required?: boolean }).required ?? false,
      parentId,
    },
  });

  // Seed options for questions that have them
  if (question.type === 'single' || question.type === 'multi') {
    const q = question as SingleQuestion | MultiQuestion;
    for (let oi = 0; oi < q.options.length; oi++) {
      const opt = q.options[oi];
      await prisma.questionOption.upsert({
        where: { questionId_key: { questionId: record.id, key: opt.id } },
        update: { label: opt.label, order: oi },
        create: { questionId: record.id, key: opt.id, label: opt.label, order: oi },
      });
    }
  }

  if (question.type === 'conditional') {
    const q = question as ConditionalQuestion;
    for (let oi = 0; oi < q.options.length; oi++) {
      const opt = q.options[oi];
      const isTrigger = opt.id === q.conditionalTriggerId;
      await prisma.questionOption.upsert({
        where: { questionId_key: { questionId: record.id, key: opt.id } },
        update: {
          label: opt.label,
          order: oi,
          isConditionalTrigger: isTrigger,
          conditionalLabel: isTrigger ? q.conditionalLabel : null,
          conditionalPlaceholder: isTrigger ? (q.conditionalPlaceholder ?? null) : null,
        },
        create: {
          questionId: record.id,
          key: opt.id,
          label: opt.label,
          order: oi,
          isConditionalTrigger: isTrigger,
          conditionalLabel: isTrigger ? q.conditionalLabel : null,
          conditionalPlaceholder: isTrigger ? (q.conditionalPlaceholder ?? null) : null,
        },
      });
    }
  }

  if (question.type === 'compound') {
    const q = question as CompoundQuestion;
    for (let pi = 0; pi < q.parts.length; pi++) {
      await seedQuestion(q.parts[pi], sectionId, pi, record.id);
    }
  }
}

async function main() {
  console.log('Seeding survey structure…');

  for (let si = 0; si < survey.length; si++) {
    await seedSection(survey[si], si);
    console.log(`  ✓ Section "${survey[si].title}"`);
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
