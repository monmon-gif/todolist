"use client";

// プルダウンに表示するカテゴリ・優先度・ステータスの定数を読み込む
import { CATEGORIES, PRIORITIES, STATUSES } from "@/app/constants";

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

  // タイトルを更新する関数
  setTitle: (value: string) => void;

  // カテゴリを更新する関数
  setCategory: (value: string) => void;

  // 優先度を更新する関数
  setPriority: (value: string) => void;

  // ステータスを更新する関数
  setStatus: (value: string) => void;

  // メモを更新する関数
  setMemo: (value: string) => void;

  // キャンセルボタン押下時の処理
  onCancel: () => void;

  // 保存ボタン押下時の処理
  onSave: () => void;
};

// やりたいこと編集フォーム
export default function GoalEditForm({
  title,
  category,
  priority,
  status,
  memo,
  setTitle,
  setCategory,
  setPriority,
  setStatus,
  setMemo,
  onCancel,
  onSave,
}: Props) {
  return (
    <>
      {/* 画面タイトル */}
      <h1 className="mb-6 text-center text-3xl font-bold">
        やりたいこと編集
      </h1>

      {/* 入力フォーム */}
      <div className="space-y-5">

        {/* タイトル入力欄 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          placeholder="タイトル"
        />

        {/* カテゴリ選択プルダウン */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3"
        >
          <option value="">カテゴリを選択</option>

          {/* 定数からカテゴリ一覧を表示 */}
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* 優先度選択プルダウン */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3"
        >
          <option value="">優先度を選択</option>

          {/* 定数から優先度一覧を表示 */}
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        {/* ステータス選択プルダウン */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3"
        >
          <option value="">ステータスを選択</option>

          {/* 定数からステータス一覧を表示 */}
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* メモ入力欄 */}
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="h-40 w-full resize-none rounded-xl border border-zinc-300 px-4 py-3"
          placeholder="メモ"
        />
      </div>

      {/* ボタンエリア */}
      <div className="mt-8 flex justify-center gap-4">

        {/* 編集をキャンセルして表示画面へ戻る */}
        <button
          onClick={onCancel}
          className="rounded-xl border border-zinc-300 px-6 py-3 font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          キャンセル
        </button>

        {/* 編集内容を保存する */}
        <button
          onClick={onSave}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          保存
        </button>
      </div>
    </>
  );
}