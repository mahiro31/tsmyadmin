"use server";

import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise'; 

// Cookieの有効期限（例: 1時間）を設定します。適切な値に変更してください。
const SESSION_COOKIE_NAME = 'db_session_token';
const COOKIE_EXPIRE_SECONDS = 3600; // 1 hour

export async function POST(req: Request) {
  const body = await req.json();

  const { host, user, password, database } = body;

  try {
    // 認証テストの実行
    const testResult = await testDatabaseConnection({ host, user, password, database });

    if (!testResult) {
      throw new Error("Database connection test failed");
    }

    // ★★★ 成功時: セッションCookieを設定してクライアントに返す ★★★
    const secureCookieValue = JSON.stringify({
        host, 
        user, 
        database, 
        // passwordは機密情報なので、セッションには保存しない方が安全です。
        issuedAt: Date.now()
    });

    const response = NextResponse.json(
      { message: "Connected successfully" }, 
      { status: 200 }
    );
    
    // クッキーを設定（SameSite=Laxを推奨、SecureはHTTPSでのみ有効）
    response.cookies.set(SESSION_COOKIE_NAME, secureCookieValue, {
        httpOnly: true, // JavaScriptからのアクセスを制限しXSS対策
        secure: process.env.NODE_ENV === 'production', // 本番環境なら必ずtrueに
        sameSite: 'Lax', 
        maxAge: COOKIE_EXPIRE_SECONDS
    });

    return response;
  } catch (error) {
    console.error("Failed to connect", error);
    const errorMessage = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json(
      { message: errorMessage }, 
      { status: 500 }
    );
  }
}

async function testDatabaseConnection({ host, user, password, database }) {
  // ★★★注意点: この関数内で接続を確立し、直後に切断しています。★★★
  let connection;
  try {
    connection = await mysql.createConnection({
      host: host || 'your_default_host',
      user: user || 'your_default_user',
      password: password,
      database: database || 'your_default_database',
    });

    // シンプルなクエリを実行して接続の有効性を確認します
    const [results] = await connection.query('SELECT 1');
    if (results[0]['1'] !== 1) {
      throw new Error("Unexpected result from database");
    }
    return true; // 接続成功
  } finally {
    // ★★★必ず解放する★★★
    if(connection) await connection.end();
  }
}