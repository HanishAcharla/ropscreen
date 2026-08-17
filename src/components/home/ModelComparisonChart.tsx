"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { modelMetrics } from "@/lib/site-data";

const metricKeys = ["accuracy", "precision", "recall", "f1"] as const;
const metricLabels: Record<(typeof metricKeys)[number], string> = {
  accuracy: "Accuracy",
  precision: "Precision",
  recall: "Recall",
  f1: "F1",
};

const seriesColors: Record<string, string> = {
  "MobileNet-V2": "#5c6480",
  "ResNet-50": "#35d0c4",
  "SWIN-B": "#8b7cff",
  Ensemble: "#ff7a52",
};

const chartData = metricKeys.map((key) => {
  const row: Record<string, string | number> = { metric: metricLabels[key] };
  for (const m of modelMetrics) row[m.short] = Math.round(m[key] * 100);
  return row;
});

interface TooltipPayloadItem {
  dataKey?: string | number;
  value?: number;
  color?: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-[#0c0f1a] px-3.5 py-2.5 text-xs shadow-xl">
      <div className="mb-1.5 font-medium text-foreground">{label}</div>
      {payload
        .slice()
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
        .map((p) => (
          <div key={String(p.dataKey)} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              {p.dataKey}
            </span>
            <span className="mono-tag text-foreground">{p.value}%</span>
          </div>
        ))}
    </div>
  );
}

export function ModelComparisonChart() {
  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="metric" stroke="var(--muted-2)" fontSize={12} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
          <YAxis stroke="var(--muted-2)" fontSize={12} tickLine={false} axisLine={false} unit="%" width={44} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "var(--muted)" }}
            iconType="circle"
            iconSize={8}
          />
          {Object.keys(seriesColors).map((series) => (
            <Bar key={series} dataKey={series} radius={[5, 5, 0, 0]} maxBarSize={30}>
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={seriesColors[series]}
                  fillOpacity={series === "Ensemble" ? 1 : 0.75}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
