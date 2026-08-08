import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
      <main className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
          管理者ログイン
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
          データベース管理パネルにアクセスするには、認証が必要です。
        </p>

        {/* フォームのプレースホルダー */}
        <div className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">ユーザー名</label>
                <input 
                    id="username" 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">パスワード</label>
                <input 
                    id="password" 
                    type="password" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                />
            </div>
            <button
                onClick={() => {
                    // ★★★ ここで認証APIを呼び出し、成功したらトークンをセットしてリダイレクトする処理を行う ★★★
                    localStorage.setItem('authToken', 'dummy_token'); // ダミーのトークン設定
                    window.location.href = '/admin'; 
                }}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
            >
                ログイン
            </button>
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
