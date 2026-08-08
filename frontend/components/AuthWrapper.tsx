'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ダミーの認証チェック関数 (実際にはContextやReduxなどから取得する)
const isAuthenticated = (): boolean => {
  // 例: localStorageからトークンをチェックするなど
  return !!localStorage.getItem('authToken'); 
};

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初回ロード時に認証状態をチェック
    if (!isAuthenticated()) {
      // 未認証の場合、ログインページへリダイレクトする処理を実行
      console.log("未認証のため、ログイン画面へリダイレクトします。");
      router.replace('/login'); // 適切なログインパスに変更してください
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-xl">認証情報を確認中です...</div>;
  }

  // 認証が成功した場合のみ、子要素（保護されたコンテンツ）を表示する
  return <>{children}</>;
}
