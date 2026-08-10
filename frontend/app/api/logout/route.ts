"use server";

import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'db_session_token';

export async function GET() {
    // クッキーを削除するためのロジック
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

    // ★★★ 重要: クッキーの有効期限を過去に設定することで、ブラウザから強制的に削除させる ★★★
    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
}