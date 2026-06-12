import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!phone || typeof phone !== 'string') {
    return NextResponse.json({ error: 'phone_required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
  }

  if (user.hasCompletedSurvey) {
    return NextResponse.json({ error: 'survey_already_completed' }, { status: 409 });
  }

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { phone },
    data: { otpCode: code, otpExpiresAt: expiresAt },
  });

  // TODO: replace with real SMS gateway in production
  console.log(`[DEV] Resend OTP for ${phone}: ${code}`);

  return NextResponse.json({ success: true });
}
