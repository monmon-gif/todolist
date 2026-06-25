"use client";

// ページ遷移を行うためのルーターを読み込む
import { useRouter } from "next/navigation";

// 「やりたいことリスト登録」ボタンコンポーネント
export default function RegisterButton() {

  // ページ遷移を行うためのrouterを取得
  const router = useRouter();

  return (

    // ボタンを中央寄せで表示
    <div className="mt-8 flex justify-center">

      {/* 登録画面へ遷移するボタン */}
      <button

        // ボタンをクリックすると登録画面へ遷移
        onClick={() => router.push("/register")}

        // ボタンのデザイン
        className="rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-95"
      >

        {/* ボタンに表示する文字 */}
        ＋ やりたいことリスト登録

      </button>
    </div>
  );
}