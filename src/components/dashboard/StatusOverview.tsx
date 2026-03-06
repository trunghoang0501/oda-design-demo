"use client";
import React from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface StatusItem {
  status: string;
  count: number;
  value: number;
  color: string;
}

interface StatusOverviewProps {
  data: StatusItem[];
}

export const StatusOverview = ({ data }: StatusOverviewProps) => {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #ECEFF1",
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#37474F", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Trạng thái đơn hàng
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
        {data.map((item) => (
          <div
            key={item.status}
            style={{
              width: `${(item.count / total) * 100}%`,
              background: item.color,
              transition: "width 0.5s ease",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((item) => (
          <div key={item.status} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#546E7A" }}>{item.status}</span>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#263238", minWidth: 40, textAlign: "right" }}>
                {formatNumber(item.count)}
              </span>
              <span style={{ fontSize: 11, color: "#90A4AE", minWidth: 80, textAlign: "right" }}>
                {formatCurrency(item.value, true)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
