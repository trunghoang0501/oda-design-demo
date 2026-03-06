"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface TrendPoint {
  date: string;
  amount: number;
  orders: number;
}

interface TrendChartProps {
  data: TrendPoint[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  const option = {
    grid: { top: 20, right: 60, bottom: 30, left: 70, containLabel: false },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      formatter: (params: any[]) => {
        const date = params[0].axisValue;
        let html = `<div style="font-weight:700;margin-bottom:6px">${date}</div>`;
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
      right: 0,
      textStyle: { fontSize: 12, color: "#546E7A" },
    },
    xAxis: {
      type: "category",
      data: data.map((d) => d.date),
      axisLabel: { fontSize: 11, color: "#90A4AE" },
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
        name: "Đơn hàng",
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
        itemStyle: { color: "#1565C0", borderRadius: [3, 3, 0, 0] },
        barMaxWidth: 24,
        label: {
          show: false,
        },
      },
      {
        name: "Số đơn",
        type: "line",
        data: data.map((d) => d.orders),
        yAxisIndex: 1,
        smooth: true,
        lineStyle: { color: "#E53935", width: 2 },
        itemStyle: { color: "#E53935" },
        symbol: "circle",
        symbolSize: 6,
        label: { show: false },
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
      <div style={{ fontSize: 14, fontWeight: 700, color: "#37474F", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Xu hướng đơn mua
      </div>
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
};
