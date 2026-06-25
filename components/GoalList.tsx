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

  return (
    <section>
      {/* 検索フォーム */}
      <GoalSearch goals={goals} setFilteredGoals={setFilteredGoals} />

      <p className="mb-4 text-sm text-zinc-500">
        {filteredGoals.length}件のやりたいことがあります
      </p>

      <div className="space-y-4">
        {/* 検索結果を表示 */}
        {filteredGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </section>
  );
}