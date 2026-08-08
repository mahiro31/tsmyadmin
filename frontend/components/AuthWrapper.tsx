'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ダミーの認証チェック関数 (実際にはContextやReduxなどから取得する)
const isAuthenticated = (): boolean => {
  // localStorageへのアクセスはクライアントサイドでのみ実行されるため、useEffect内で行うのが安全です。
  return !!localStorage.getItem('authToken'); 
};

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // ロード状態を管理し、初期レンダリング時に認証チェックを行う
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let hasAuthError = false;
    try {
        if (!isAuthenticated()) {
            console.log("未認証のため、ログイン画面へリダイレクトします。");
            // クライアント側でのみ実行されるため安全です
            router.replace('/login'); 
            hasAuthError = true;
        }
    } catch (e) {
        // localStorageが利用できない環境（テストなど）の場合のエラーハンドリング
        console.error("認証チェック中にエラーが発生しました:", e);
        hasAuthError = true;
    } finally {
        setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    // ロード中はローディングUIを表示し、ハイドレーションの不一致を防ぐ
    return <div className="flex items-center justify-center min-h-screen text-xl">認証情報を確認中です...</div>;
  }

  // 認証が成功した場合のみ、子要素（保護されたコンテンツ）を表示する
  if (/* ここに認証失敗時のフォールバックロジックを追加しても良い */ false) {
    return null; // 例: 認証失敗時に何も表示しない場合
  }

  return <>{children}</>;
}
