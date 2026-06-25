// ステータスを色付きのバッジで表示するコンポーネント
// statusには「未着手」「進行中」「達成」などの文字列が入る
export default function StatusBadge({ status }: { status: string | null }) {

  // ステータスごとの背景色・文字色を定義
  const statusColor = {
    未着手: "bg-red-100 text-gray-700",
    進行中: "bg-blue-100 text-blue-700",
    達成: "bg-green-100 text-green-700",
  };

  return (

    // ステータスに応じた色を適用したバッジを表示
    <span
      className={`
        shrink-0
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold

        ${
          // statusをキーとして色を取得する
          // 定義されていない値の場合はデフォルトの色を使用する
          statusColor[status as keyof typeof statusColor] ??
          "bg-zinc-100 text-zinc-600"
        }
      `}
    >

      {/* ステータス名を表示 */}
      {status}

    </span>
  );
}