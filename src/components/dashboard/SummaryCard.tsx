"use client";
import React from "react";
import { formatCurrency, formatNumber, formatPercent, getTrendColor, getTrendIcon } from "@/lib/utils";

interface MetricRowProps {
  label: string;
  value: string;
  ratio?: number;
}

const MetricRow = ({ label, value, ratio }: MetricRowProps) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F5F5F5" }}>
    <span style={{ fontSize: 12, color: "#78909C" }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#263238" }}>{value}</span>
      {ratio !== undefined && (
        <span style={{ fontSize: 11, fontWeight: 600, color: getTrendColor(ratio) }}>
          {getTrendIcon(ratio)} {formatPercent(Math.abs(ratio))}
        </span>
      )}
    </div>
  </div>
);

interface SummaryCardProps {
  title: string;
  count: number;
  value: number;
  aov: number;
  comparison?: { count: number; value: number; aov: number };
  accentColor?: string;
}

export const SummaryCard = ({ title, count, value, aov, comparison, accentColor = "#1565C0" }: SummaryCardProps) => {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #ECEFF1",
      borderTop: `4px solid ${accentColor}`,
      flex: 1,
      minWidth: 260,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: accentColor
        }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: "#37474F", textTransform: "uppercase", letterSpacing: 0.5 }}>
          {title}
        </span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: accentColor, marginBottom: 4 }}>
        {formatNumber(count)}
        <span style={{ fontSize: 12, color: "#90A4AE", fontWeight: 400, marginLeft: 4 }}>đơn hàng</span>
      </div>
      <MetricRow label="Tổng số đơn" value={formatNumber(count)} ratio={comparison?.count} />
      <MetricRow label="Tổng giá trị" value={formatCurrency(value, true)} ratio={comparison?.value} />
      <MetricRow label="AOV" value={formatCurrency(aov, true)} ratio={comparison?.aov} />
    </div>
  );
};
