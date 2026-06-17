import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

function generateOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendSms(_phone: string, _code: string) {
  // TODO: integrate SMS provider
}

export async function POST(request: Request) {
  const { name, phone } = await request.json();

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing?.hasCompletedSurvey) {
    return NextResponse.json({ error: 'survey_already_completed' }, { status: 409 });
  }

  const otpCode = generateOtp();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.upsert({
    where: { phone },
    update: { name, otpCode, otpExpiresAt, verified: true },
    create: { name, phone, otpCode, otpExpiresAt, verified: true },
  });

  if (process.env.NODE_ENV === 'production') {
    await sendSms(phone, otpCode);
  } else {
    console.log(`[OTP] ${phone}: ${otpCode}`);
  }

  return NextResponse.json({ success: true });
}
