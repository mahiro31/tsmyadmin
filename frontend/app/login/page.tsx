"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // フォーム要素から値を取得するロジックを修正（TypeScript準拠）
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const host = formData.get('host') as string;
    const user = formData.get('user') as string;
    const password = formData.get('password') as string;
    const database = formData.get('database') as string;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, user, password, database })
      });

      if (response.ok) {
        // ★★★ フルページリロードで次のステップへ進む ★★★
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        alert(`認証失敗: ${errorData.message || 'データベース接続に失敗しました。'}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert('通信エラーが発生しました。ネットワーク接続を確認してください。');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
      <main className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
          管理者ログイン
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
          データベース管理パネルにアクセスするには、認証が必要です。
        </p>

        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            {/* ★★★ HTMLのName属性が必須です（FormDataを使用するため）★★★ */}
            <input name="host" type="text" placeholder="Database Host" required /><br />
            <input name="user" type="text" placeholder="Username" required /><br />
            <input name="password" type="password" placeholder="Password" required /><br />
            <input name="database" type="text" placeholder="Database Name" required /><br />
            <button 
                type="submit" 
                disabled={isLoading} // ロード中にボタンを無効化
                className={`w-full py-2 rounded transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} text-lg`}
            >
                {isLoading ? '接続中...' : 'Connect & Login'}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:underline block text-center">
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}