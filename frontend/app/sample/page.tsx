import Image from "next/image";

export default function SamplePage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
          Sample Page
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-center">
          これは、新しく作成されたサンプルページです。
          ここに独自のコンテンツや機能を追加できます。
        </p>
      </main>
    </div>
  );
}
