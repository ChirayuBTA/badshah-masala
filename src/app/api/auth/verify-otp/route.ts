import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { phone, code } = await request.json();

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  if (!user.otpCode || user.otpCode !== code) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 400 });
  }
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    return NextResponse.json({ error: 'expired' }, { status: 400 });
  }

  await prisma.user.update({
    where: { phone },
    data: {
      verified: true,
      verifiedAt: new Date(),
      otpCode: null,
      otpExpiresAt: null,
    },
  });

  return NextResponse.json({ success: true, userId: user.id });
}
