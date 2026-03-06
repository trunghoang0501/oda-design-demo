"use client";
import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { formatCurrency } from "@/lib/utils";

interface RankItem {
  name: string;
  amount: number;
  orders: number;
}

interface ProductRankingChartProps {
  top10: RankItem[];
  bottom10: RankItem[];
}

export const ProductRankingChart = ({ top10, bottom10 }: ProductRankingChartProps) => {
  const [view, setView] = useState<"top" | "bottom">("top");
  const data = view === "top" ? [...top10].reverse() : [...bottom10].reverse();

  const option = {
    grid: { top: 10, right: 120, bottom: 10, left: 10, containLabel: true },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any[]) => {
        const p = params[0];
        return `<div style="font-weight:700;margin-bottom:4px">${p.name}</div>
          <div>Doanh thu: <strong>${formatCurrency(p.value)}</strong></div>`;
      },
    },
    xAxis: {
      type: "value",
      axisLabel: {
        fontSize: 10,
        color: "#90A4AE",
        formatter: (v: number) => formatCurrency(v, true),
      },
      splitLine: { lineStyle: { color: "#F5F5F5", type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: data.map((d) => d.name),
      axisLabel: {
        fontSize: 11,
        color: "#546E7A",
        width: 160,
        overflow: "truncate",
      },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#ECEFF1" } },
    },
    series: [
      {
        type: "bar",
        data: data.map((d) => d.amount),
        itemStyle: {
          color: view === "top" ? "#1565C0" : "#E53935",
          borderRadius: [0, 4, 4, 0],
        },
        barMaxWidth: 20,
        label: {
          show: true,
          position: "right",
          formatter: (p: any) => formatCurrency(p.value, true),
          fontSize: 11,
          color: "#546E7A",
        },
      },
    ],
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #ECEFF1",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#37474F", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Xếp hạng sản phẩm
        </div>
        <div style={{ display: "flex", gap: 4, background: "#F5F7FA", borderRadius: 8, padding: 3 }}>
          {(["top", "bottom"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "4px 14px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: view === v ? (v === "top" ? "#1565C0" : "#E53935") : "transparent",
                color: view === v ? "#fff" : "#78909C",
                transition: "all 0.2s",
              }}
            >
              {v === "top" ? "Top 10" : "Bottom 10"}
            </button>
          ))}
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
};
