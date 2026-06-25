"use client";

// ページ遷移を行うためのルーターを読み込む
import { useRouter } from "next/navigation";

// Goal型を読み込む（型情報のみ使用）
import type { Goal } from "@/components/GoalList";

// ステータスを表示するバッジコンポーネント
import StatusBadge from "@/components/StatusBadge";

// 優先度を表示するバッジコンポーネント
import PriorityBadge from "@/components/PriorityBadge";

// GoalCardコンポーネント
// goalデータを受け取り、カード形式で表示する
export default function GoalCard({ goal }: { goal: Goal }) {

  // ページ遷移を行うためのrouterを取得
  const router = useRouter();

  // 目標カードを表示
  return (

    // カード全体をボタンにしてクリックできるようにする
    <button

      // カードをクリックすると詳細画面へ遷移
      onClick={() => router.push(`/details/${goal.id}`)}

      // ボタン全体を横幅いっぱいに広げ、文字を左寄せにする
      className="block w-full text-left"
    >

      {/* カード本体 */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

        {/* タイトルとステータスを横並びで表示 */}
        <div className="flex items-start justify-between gap-4">

          {/* やりたいことのタイトル */}
          <h2 className="text-xl font-bold text-zinc-800">
            {goal.title}
          </h2>

          {/* ステータスバッジ（未着手・進行中など） */}
          <StatusBadge status={goal.status} />
        </div>

        {/* カテゴリと優先度を表示 */}
        <div className="mt-4 flex flex-wrap gap-2">

          {/* カテゴリ */}
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
            📂 {goal.category}
          </span>

          {/* 優先度バッジ（高・中・低など） */}
          <PriorityBadge priority={goal.priority} />

        </div>
      </div>
    </button>
  );
}