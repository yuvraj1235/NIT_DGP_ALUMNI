// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loginAdmin } from '@/controllers/Admin.controllers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const { token, admin } = await loginAdmin(email, password);

    const res = NextResponse.json({
      success: true,
      user: { username: admin.username, email: admin.email },
    });

    // Set secure httpOnly cookie
    res.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 401 });
  }
}