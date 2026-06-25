"use client";

// Reactの状態管理(useState)を使用するために読み込む
import { useState } from "react";

// ページ遷移を行うためのルーターを読み込む
import { useRouter } from "next/navigation";

// Supabaseへ接続するためのクライアントを読み込む
import { supabase } from "@/lib/supabase";

// 詳細表示用コンポーネントを読み込む
import GoalView from "@/components/GoalView";

// 編集フォーム用コンポーネントを読み込む
import GoalEditForm from "@/components/GoalEditForm";

// やりたいこと詳細画面のクライアントコンポーネント
export default function GoalDetailClient({ goal }: { goal: any }) {
  // 編集モードかどうかを管理する状態
  const [isEdit, setIsEdit] = useState(false);

  // タイトルの状態
  const [title, setTitle] = useState(goal.title);

  // カテゴリの状態
  const [category, setCategory] = useState(goal.category);

  // 優先度の状態
  const [priority, setPriority] = useState(goal.priority);

  // ステータスの状態
  const [status, setStatus] = useState(goal.status);

  // メモの状態
  // goal.memoがnullの場合は空文字にする
  const [memo, setMemo] = useState(goal.memo ?? "");

  // ページ遷移を行うためのrouterを取得
  const router = useRouter();

  // 保存ボタンが押されたときの更新処理
  const handleUpdate = async () => {
    // goalsテーブルの対象データを更新する
    const { error } = await supabase
      .from("goals")
      .update({
        title,
        category,
        priority,
        status,
        memo,
      })
      // idが一致するデータだけを更新対象にする
      .eq("id", goal.id);

    // 更新時にエラーが発生した場合
    if (error) {
      alert(error.message);
      return;
    }

    // 更新成功後、編集モードを終了して詳細表示に戻す
    setIsEdit(false);
  };

  // 削除ボタンが押されたときの削除処理
  const handleDelete = async () => {
    // 削除前に確認ダイアログを表示する
    if (!confirm("本当に削除しますか？")) return;

    // goalsテーブルから対象データを削除する
    const { error } = await supabase
      .from("goals")
      .delete()
      // idが一致するデータだけを削除対象にする
      .eq("id", goal.id);

    // 削除時にエラーが発生した場合
    if (error) {
      alert(error.message);
      return;
    }

    // 削除成功後、一覧画面へ戻る
    router.push("/");
  };

  return (
    // 画面全体の背景と余白
    <main className="min-h-screen bg-zinc-100 px-6 py-10">

      {/* 詳細画面全体を囲む白いカード */}
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">

        {/* isEditがtrueなら編集フォーム、falseなら詳細表示を出す */}
        {isEdit ? (
          // 編集モード時に表示するフォーム
          <GoalEditForm
            title={title}
            category={category}
            priority={priority}
            status={status}
            memo={memo}
            setTitle={setTitle}
            setCategory={setCategory}
            setPriority={setPriority}
            setStatus={setStatus}
            setMemo={setMemo}
            onCancel={() => setIsEdit(false)}
            onSave={handleUpdate}
          />
        ) : (
          // 通常時に表示する詳細画面
          <GoalView
            title={title}
            category={category}
            priority={priority}
            status={status}
            memo={memo}
            onEdit={() => setIsEdit(true)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}