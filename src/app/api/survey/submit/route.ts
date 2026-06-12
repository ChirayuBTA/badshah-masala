import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { phone, answers } = (await request.json()) as {
    phone: string;
    answers: Record<string, string | string[]>;
  };

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  if (!user.verified) return NextResponse.json({ error: 'not_verified' }, { status: 403 });
  if (user.hasCompletedSurvey) return NextResponse.json({ error: 'already_completed' }, { status: 409 });

  // Split _conditional text values from main option answers
  const conditionalTexts: Record<string, string> = {};
  const mainAnswers: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(answers)) {
    if (key.endsWith('_conditional')) {
      conditionalTexts[key.slice(0, -'_conditional'.length)] = value as string;
    } else {
      mainAnswers[key] = value;
    }
  }

  const surveyResponse = await prisma.surveyResponse.create({
    data: { userId: user.id },
  });

  for (const [questionKey, value] of Object.entries(mainAnswers)) {
    const question = await prisma.surveyQuestion.findFirst({
      where: { key: questionKey },
    });
    if (!question) continue;

    let textValue: string | null = null;
    if (question.type === 'TEXT') {
      textValue = (value as string) || null;
    } else if (question.type === 'CONDITIONAL' && conditionalTexts[questionKey]) {
      textValue = conditionalTexts[questionKey];
    }

    const surveyAnswer = await prisma.surveyAnswer.create({
      data: {
        surveyResponseId: surveyResponse.id,
        questionId: question.id,
        textValue,
      },
    });

    if (question.type === 'SINGLE' || question.type === 'CONDITIONAL') {
      const optionKey = value as string;
      if (optionKey) {
        const option = await prisma.questionOption.findUnique({
          where: { questionId_key: { questionId: question.id, key: optionKey } },
        });
        if (option) {
          await prisma.selectedOption.create({
            data: { surveyAnswerId: surveyAnswer.id, optionId: option.id },
          });
        }
      }
    } else if (question.type === 'MULTI') {
      const optionKeys = value as string[];
      for (const optionKey of optionKeys) {
        const option = await prisma.questionOption.findUnique({
          where: { questionId_key: { questionId: question.id, key: optionKey } },
        });
        if (option) {
          await prisma.selectedOption.create({
            data: { surveyAnswerId: surveyAnswer.id, optionId: option.id },
          });
        }
      }
    }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { hasCompletedSurvey: true, surveyCompletedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
