"use client";

// Reactの状態管理(useState)を使用するために読み込む
import { useState } from "react";

// ページ遷移を行うためのルーターを読み込む
import { useRouter } from "next/navigation";

// Supabaseへ接続するためのクライアントを読み込む
import { supabase } from "@/lib/supabase";

// プルダウンに表示するカテゴリ・優先度・ステータスの定数を読み込む
import { CATEGORIES, PRIORITIES, STATUSES } from "@/app/constants";

// やりたいこと登録画面
export default function RegisterPage() {
  // ページ遷移を行うためのrouterを取得
  const router = useRouter();

  // タイトル入力用の状態
  const [title, setTitle] = useState("");

  // カテゴリ選択用の状態
  const [category, setCategory] = useState("");

  // 優先度選択用の状態
  const [priority, setPriority] = useState("");

  // ステータス選択用の状態
  const [status, setStatus] = useState("");

  // メモ入力用の状態
  const [memo, setMemo] = useState("");

  // 「登録」ボタンが押されたときの処理
  const handleSubmit = async () => {
    // goalsテーブルに入力内容を登録する
    const { error } = await supabase.from("goals").insert([
      {
        // タイトル
        title,

        // カテゴリ
        category,

        // 優先度
        priority,

        // ステータス
        status,

        // メモ
        memo,

        // 作成日時を現在時刻で登録
        created_at: new Date().toISOString(),
      },
    ]);

    // 登録時にエラーが発生した場合
    if (error) {
      // エラー内容をコンソールに出力
      console.error(error);

      // 画面に登録失敗メッセージを表示
      alert("登録失敗");

      // 以降の処理を止める
      return;
    }
    // 登録成功後、詳細画面を再読み込みして最新の情報を表示する
    router.refresh();
    // 登録成功後、一覧画面へ戻る
    router.push("/");
  };

  return (
    // 画面全体の背景と余白
    <main className="min-h-screen bg-zinc-100 px-6 py-10">

      {/* フォーム全体を囲む白いカード */}
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">

        {/* 画面タイトル */}
        <h1 className="mb-6 text-center text-3xl font-bold">
          やりたいこと登録
        </h1>

        {/* 入力フォーム */}
        <div className="space-y-5">

          {/* タイトル入力欄 */}
          <input
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
          />

          {/* カテゴリ選択プルダウン */}
          <select
            className="w-full rounded-xl border border-zinc-300 px-4 py-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            className="w-full rounded-xl border border-zinc-300 px-4 py-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
            className="w-full rounded-xl border border-zinc-300 px-4 py-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            className="h-40 w-full resize-none rounded-xl border border-zinc-300 px-4 py-3"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="メモ"
          />

        </div>

        {/* ボタンエリア */}
        <div className="mt-8 flex justify-center gap-4">

          {/* 前の画面へ戻るボタン */}
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-zinc-300 px-6 py-3 font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            戻る
          </button>

          {/* 入力内容を登録するボタン */}
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            登録
          </button>

        </div>
      </div>
    </main>
  );
}