"use client";

// ページ遷移を行うためのルーターを読み込む
import { useRouter } from "next/navigation";

// 親コンポーネントから受け取るPropsの型定義
type Props = {
  // タイトル
  title: string;

  // カテゴリ
  category: string;

  // 優先度
  priority: string;

  // ステータス
  status: string;

  // メモ
  memo: string;

  // 編集ボタンを押したときに実行する関数
  onEdit: () => void;

  // 削除ボタンを押したときに実行する関数
  onDelete: () => void;
};

// やりたいこと詳細を表示するコンポーネント
export default function GoalView({
  title,
  category,
  priority,
  status,
  memo,
  onEdit,
  onDelete,
}: Props) {
  // 一覧画面へ戻るためのrouterを取得
  const router = useRouter();

  return (
    <>
      {/* 詳細画面のラベル */}
      <p className="text-sm font-medium text-zinc-500">
        やりたいこと詳細
      </p>

      {/* タイトルを表示 */}
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        {title}
      </h1>

      {/* 詳細情報エリア */}
      <div className="mt-6 space-y-4">

        {/* カテゴリ表示 */}
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">カテゴリ</p>
          <p className="mt-1 font-semibold">{category}</p>
        </div>

        {/* 優先度表示 */}
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">優先度</p>
          <p className="mt-1 font-semibold">{priority}</p>
        </div>

        {/* ステータス表示 */}
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">ステータス</p>
          <p className="mt-1 font-semibold">{status}</p>
        </div>

        {/* メモ表示 */}
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">メモ</p>

          {/* メモが空の場合は「未入力」と表示 */}
          <p className="mt-1 whitespace-pre-wrap">
            {memo || "未入力"}
          </p>
        </div>
      </div>

      {/* 削除・編集ボタンエリア */}
      <div className="mt-8 flex justify-center gap-4">

        {/* 削除処理を実行 */}
        <button
          onClick={onDelete}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-red-700 hover:shadow-lg"
        >
          🗑 削除
        </button>

        {/* 編集モードに切り替える */}
        <button
          onClick={() => onEdit()}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700 hover:shadow-lg"
        >
          ✏ 編集
        </button>
      </div>

      {/* 一覧へ戻るボタン */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-zinc-500 underline transition hover:text-zinc-700"
        >
          ← 一覧へ戻る
        </button>
      </div>
    </>
  );
}