"use client";
import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface RankItem {
  name: string;
  amount: number;
  orders: number;
}

interface SupplierRankingChartProps {
  top10: RankItem[];
  bottom10: RankItem[];
}

export const SupplierRankingChart = ({ top10, bottom10 }: SupplierRankingChartProps) => {
  const [view, setView] = useState<"top" | "bottom">("top");
  const data = view === "top" ? top10 : bottom10;

  const option = {
    grid: { top: 30, right: 50, bottom: 80, left: 20, containLabel: true },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any[]) => {
        const name = params[0].axisValue;
        let html = `<div style="font-weight:700;margin-bottom:6px;max-width:200px;word-break:break-word">${name}</div>`;
        params.forEach((p) => {
          const val = p.seriesName === "Doanh thu"
            ? formatCurrency(p.value)
            : formatNumber(p.value) + " đơn";
          html += `<div style="display:flex;align-items:center;gap:6px;margin:2px 0">
            <span style="display:inline-block;width:10px;height:10px;background:${p.color};border-radius:50%"></span>
            <span style="color:#546E7A">${p.seriesName}:</span>
            <strong>${val}</strong>
          </div>`;
        });
        return html;
      },
    },
    legend: {
      data: ["Doanh thu", "Số đơn"],
      top: 0,
      textStyle: { fontSize: 11, color: "#546E7A" },
    },
    xAxis: {
      type: "category",
      data: data.map((d) => {
        const parts = d.name.split(" ");
        return parts.length > 3 ? parts.slice(0, 3).join(" ") + "…" : d.name;
      }),
      axisLabel: {
        fontSize: 10,
        color: "#90A4AE",
        rotate: 20,
        interval: 0,
      },
      axisLine: { lineStyle: { color: "#ECEFF1" } },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: "value",
        name: "Doanh thu",
        nameTextStyle: { fontSize: 10, color: "#90A4AE" },
        axisLabel: {
          fontSize: 10,
          color: "#90A4AE",
          formatter: (v: number) => formatCurrency(v, true),
        },
        splitLine: { lineStyle: { color: "#F5F5F5", type: "dashed" } },
      },
      {
        type: "value",
        name: "Đơn",
        nameTextStyle: { fontSize: 10, color: "#90A4AE" },
        axisLabel: { fontSize: 10, color: "#90A4AE" },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Doanh thu",
        type: "bar",
        data: data.map((d) => d.amount),
        yAxisIndex: 0,
        itemStyle: { color: view === "top" ? "#1565C0" : "#E53935", borderRadius: [3, 3, 0, 0] },
        barMaxWidth: 28,
      },
      {
        name: "Số đơn",
        type: "line",
        data: data.map((d) => d.orders),
        yAxisIndex: 1,
        smooth: true,
        lineStyle: { color: "#FF9800", width: 2 },
        itemStyle: { color: "#FF9800" },
        symbol: "circle",
        symbolSize: 6,
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
          Xếp hạng nhà cung cấp
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
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
};
