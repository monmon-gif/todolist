"use client";

import { useState } from "react";
import GoalSearch from "@/components/GoalSearch";
import GoalCard from "@/components/GoalCard";

export type Goal = {
  id: number;
  title: string;
  category: string | null;
  priority: string | null;
  status: string | null;
  memo: string | null;
  created_at: string;
};

type Props = {
  goals: Goal[];
};

// やりたいことリストを表示するコンポーネント
export default function GoalList({ goals }: Props) {
  // 検索結果(受け取ったList)を管理するための状態
  const [filteredGoals, setFilteredGoals] = useState(goals);

  // 現在表示しているページ番号
  const [currentPage, setCurrentPage] = useState(1);

  // 1ページに表示する件数
  const perPage = 10;

  // 全ページ数を計算
  const totalPages = Math.ceil(filteredGoals.length / perPage);

  // 現在のページに表示するデータのみ取得
  const currentGoals = filteredGoals.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <section>
      {/* 検索フォーム */}
      <GoalSearch
        goals={goals}
        setFilteredGoals={(newGoals) => {
          setFilteredGoals(newGoals);

          // 検索時は1ページ目に戻す
          setCurrentPage(1);
        }}
      />

      <p className="mb-4 text-sm text-zinc-500">
        {filteredGoals.length}件のやりたいことがあります
      </p>

      <div className="space-y-4">
        {/* 検索結果を表示 */}
        {currentGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* ページ番号 */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`rounded border px-3 py-1 ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}