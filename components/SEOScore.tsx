"use client";

interface SEOScoreProps {
  score: number;
}

export function SEOScore({ score }: SEOScoreProps) {
  const color =
    score >= 80
      ? "text-green-500"
      : score >= 60
        ? "text-yellow-500"
        : "text-red-500";

  const bgColor =
    score >= 80
      ? "bg-green-500/10"
      : score >= 60
        ? "bg-yellow-500/10"
        : "bg-red-500/10";

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${bgColor}`}
    >
      <div className="relative h-10 w-10">
        <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            className={color}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${color}`}
        >
          {score}
        </span>
      </div>
      <span className="text-sm font-medium">Score SEO</span>
    </div>
  );
}
