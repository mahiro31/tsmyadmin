import AuthWrapper from '@/components/AuthWrapper';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

// /admin/* のすべてのページに適用されるレイアウトファイルです。
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* AuthWrapperでアクセス制御を行う */}
      <AuthWrapper>
        {/* ここに共通のサイドバーやヘッダーなどのUI要素を追加できます */}
        <header className="p-4 border-b bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
            <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        </header>
        <div className="pt-4 pb-12">
          {children}
        </div>
      </AuthWrapper>
    </div>
  );
}
