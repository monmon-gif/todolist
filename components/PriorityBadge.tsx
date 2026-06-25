// 優先度を色付きのバッジで表示するコンポーネント
// priorityには「高」「中」「低」などの文字列が入る
export default function PriorityBadge({
  priority,
}: {
  priority: string | null;
}) {

  // 優先度ごとの背景色・文字色を定義
  const priorityColor = {
    高: "bg-red-100 text-red-700",
    中: "bg-yellow-100 text-yellow-700",
    低: "bg-green-100 text-green-700",
  };

  return (

    // 優先度に応じた色付きバッジを表示
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-sm
        font-medium

        ${
          // priorityをキーとして色を取得する
          // 定義されていない値の場合はデフォルトの色を使用する
          priorityColor[priority as keyof typeof priorityColor] ??
          "bg-zinc-100 text-zinc-600"
        }
      `}
    >

      {/* 星マークと優先度を表示 */}
      ⭐ {priority}

    </span>
  );
}