"use client";

// Reactの状態管理(useState)を使用するために読み込む
import { useState } from "react";

// プルダウンに表示するカテゴリ・優先度・状態の定数を読み込む
import { CATEGORIES, PRIORITIES, STATUSES } from "@/app/constants";

// Goal型を読み込む（型情報のみ使用するためtypeを付ける）
import type { Goal } from "@/components/GoalList";

// 親コンポーネントから受け取るPropsの型定義
type Props = {
  // 検索対象となる目標一覧
  goals: Goal[];

  // 検索結果を親コンポーネントへ渡す関数
  setFilteredGoals: (goals: Goal[]) => void;
};

// 検索フォームコンポーネント
export default function GoalSearch({ goals, setFilteredGoals }: Props) {
  // キーワード検索用の状態
  const [keyword, setKeyword] = useState("");

  // カテゴリ検索用の状態
  const [category, setCategory] = useState("");

  // 優先度検索用の状態
  const [priority, setPriority] = useState("");

  // 状態検索用の状態
  const [status, setStatus] = useState("");

  // 「検索」ボタンが押されたときの処理
  const handleSearch = () => {
    // goals配列から条件に一致するデータだけを抽出する
    const result = goals.filter((goal) => {

      // キーワードが空なら全件対象、入力されていればタイトルに含まれるか判定
      const matchKeyword = keyword === "" || goal.title.includes(keyword);

      // カテゴリが未選択なら全件対象、選択されていれば一致するか判定
      const matchCategory = category === "" || goal.category === category;

      // 優先度が未選択なら全件対象、選択されていれば一致するか判定
      const matchPriority = priority === "" || goal.priority === priority;

      // 状態が未選択なら全件対象、選択されていれば一致するか判定
      const matchStatus = status === "" || goal.status === status;

      // 全ての条件を満たすデータのみ返す
      return matchKeyword && matchCategory && matchPriority && matchStatus;
    });

    // 検索結果を親コンポーネントへ渡す
    setFilteredGoals(result);
  };

  // 「解除」ボタンが押されたときの処理
  const handleReset = () => {
    // 各検索条件を初期化
    setKeyword("");
    setCategory("");
    setPriority("");
    setStatus("");

    // 一覧を元のデータに戻す
    setFilteredGoals(goals);
  };

  // 検索フォームを表示
  return (
    <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-5">

        {/* タイトル検索入力欄 */}
        <input
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm"
          placeholder="タイトルで検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* カテゴリ選択プルダウン */}
        <select
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {/* 未選択 */}
          <option value="">カテゴリ</option>

          {/* 定数からカテゴリ一覧を表示 */}
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* 優先度選択プルダウン */}
        <select
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">優先度</option>

          {/* 定数から優先度一覧を表示 */}
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        {/* 状態選択プルダウン */}
        <select
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">状態</option>

          {/* 定数から状態一覧を表示 */}
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* 検索・解除ボタン */}
        <div className="flex gap-2">

          {/* 検索実行 */}
          <button
            onClick={handleSearch}
            className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
          >
            検索
          </button>

          {/* 検索条件をリセット */}
          <button
            onClick={handleReset}
            className="rounded-xl border px-4 py-3 text-sm font-semibold"
          >
            解除
          </button>

        </div>
      </div>
    </div>
  );
}