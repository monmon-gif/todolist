import { supabase } from "@/lib/supabase";
import GoalDetailClient from "@/components/GoalDetailClient";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // URLのidをもとに、goalsテーブルから1件だけ取得する
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .single();

  // 取得に失敗した場合
  if (error) {
    return (
      <main className="min-h-screen bg-zinc-100 px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <p className="text-red-600">エラー: {error.message}</p>
        </div>
      </main>
    );
  }

  // 取得したデータをClient Componentへ渡す
  return <GoalDetailClient goal={data} />;
}