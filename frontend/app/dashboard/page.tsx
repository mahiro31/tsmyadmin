"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SessionData {
    user?: string;
    host?: string;
    database?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [sessionToken, setSessionToken] = useState<SessionData | undefined>(undefined);

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {

        try {
            const response = await fetch('/api/get-session/');

            console.log("Session API Response:", response);

            if (response.ok) {
                // alert("ログイン成功！バックエンドがセッションCookieを設定しました。自動的にダッシュボードへリダイレクトします...");
                console.log("Session API Response OK:", response);
                const data = await response.json();
                const session: SessionData = { ...data.sessionData };
                setSessionToken(session);
            } else {
                const errorData = await response.json();
                // alert(`認証失敗: ${errorData.message || 'データベース接続に失敗しました。'}`);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            // alert('通信エラーが発生しました。ネットワーク接続を確認してください。');
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/logout/');
            router.push('/login');
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
                <main className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-4">⏳ 読み込み中...</h2>
                    <p className="text-gray-600">セッション情報を確認しています。しばらくお待ちください。</p>
                </main>
            </div>
        );
    }

    if (!sessionToken) {
        // セッション情報がない場合（未ログイン、またはCookieが期限切れの場合）
        return (
            <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
                <main className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">⚠️ アクセス制限</h2>
                    <p className="text-lg mb-6">ようこそ。このエリアはログインが必要です。</p>
                    <p className="mb-8 text-gray-600">セッションクッキーが見つかりません。ログインページから再度認証を行ってください。</p>
                    {/* ログインページへのリンク */}
                    <a href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        ログインページへ戻る
                    </a>
                </main>
            </div>
        );
    }

    // ★★★ セッションが確認できた場合の処理 ★★★
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
            <main className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
                    管理者ログイン
                </h1>
                <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
                    ✅ ログイン成功！ようこそ、{sessionToken.user || '管理者様'}！
                </h1>
                <p className="text-lg text-gray-600 dark:text-zinc-300 mb-8">
                    データベースへの接続が確立されました。現在ログイン状態です。<br />
                    （このセッション情報はブラウザのCookieに保存されています。）
                </p>

                {/* 認証情報を表示（デバッグ目的） */}
                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded mb-10 text-left border border-blue-200 dark:border-blue-700">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1">
                        接続情報（セッションデータ）
                    </h3>
                    <p><strong className="font-medium">ホスト:</strong> {sessionToken.host}</p>
                    <p><strong className="font-medium">DB名:</strong> {sessionToken.database}</p>
                </div>

                {/* ログアウトボタンの設置を推奨します */}
                <button
                    onClick={handleLogout} // ★★★ イベントハンドラを使用★★★
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition cursor-pointer"
                >
                    ログアウト (セッション破棄)
                </button>
            </main>
        </div >
    );
}
