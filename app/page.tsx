import { supabase } from "@/lib/supabase";
import RegisterButton from "@/components/RegisterButton";
import GoalList from "@/components/GoalList";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Supabaseからgoalsテーブルのデータを取得
  // created_atの新しい順に並び替える
  const { data: goals, error } = await supabase
    .from("goals")
    .select("*")
    .order("created_at", { ascending: false });

  // 取得エラー時の表示
  if (error) {
    return (
      <main className="min-h-screen bg-zinc-100 p-8">
        <p className="text-red-600">エラー: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">
            My List
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                やりたいことリスト
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                やりたいことを登録して、カテゴリや優先度ごとに管理できます。
              </p>
            </div>
          </div>
        </div>

        {/* 一覧・検索エリア */}
        <GoalList goals={goals ?? []} />
        {/* 登録ボタン */}
        <RegisterButton />
      </div>
    </main>
  );
}