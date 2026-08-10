"use server";

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'db_session_token';

export async function GET() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
        console.error("Session cookie is missing or expired.");
        return new Response(JSON.stringify({ success: false, message: 'No session found' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const sessionData = JSON.parse(sessionToken);

        if (typeof sessionData === 'object' && sessionData !== null) {
            return new Response(JSON.stringify({ success: true, sessionData: sessionData }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (e) {
        console.error("Session cookie parsing error:", e);
        return new Response(JSON.stringify({ success: false, message: 'Invalid session token format' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, message: 'Unknown error during validation' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
}

/**
 * クライアント側でセッションを破棄するための関数（サーバーから実行されるため、HTTPレスポンス操作が必要な場合は別途対応が必要です）
 * @returns {void}
 */
export async function clearSessionCookie() {
    // サーバーサイドのロジックからは直接クライアントのブラウザCookieは消せません。
    // この関数は主にライブラリとして定義し、フロントエンドでの呼び出しを促す目的に留めます。
    console.warn("clearSessionCookie is intended for client-side cookie removal logic (e.g., using js-cookie library).");
}
