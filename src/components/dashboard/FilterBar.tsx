"use client";
import React, { useState } from "react";

interface FilterBarProps {
  onApply?: (filters: FilterState) => void;
}

interface FilterState {
  scope: "headquarters" | "company";
  period: string;
  compare: "none" | "last_period";
  status: string[];
}

const STATUS_OPTIONS = ["Completed", "Confirmed", "Delivered", "Unconfirmed", "Cancelled"];

export const FilterBar = ({ onApply }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    scope: "headquarters",
    period: "this_month",
    compare: "none",
    status: ["Completed", "Confirmed", "Delivered", "Unconfirmed"],
  });

  const btnBase: React.CSSProperties = {
    padding: "7px 14px",
    borderRadius: 8,
    border: "1.5px solid #ECEFF1",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  };

  const activeBtn: React.CSSProperties = {
    ...btnBase,
    background: "#E3F2FD",
    borderColor: "#1565C0",
    color: "#1565C0",
  };

  const inactiveBtn: React.CSSProperties = {
    ...btnBase,
    background: "#fff",
    color: "#546E7A",
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "14px 20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      border: "1px solid #ECEFF1",
      display: "flex",
      gap: 16,
      alignItems: "center",
      flexWrap: "wrap",
    }}>
      {/* Scope */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#78909C", fontWeight: 600, marginRight: 4 }}>PHẠM VI</span>
        {(["headquarters", "company"] as const).map((s) => (
          <button key={s} onClick={() => setFilters({ ...filters, scope: s })}
            style={filters.scope === s ? activeBtn : inactiveBtn}>
            {s === "headquarters" ? "Tổng công ty" : "Chi nhánh"}
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 28, background: "#ECEFF1" }} />

      {/* Period */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#78909C", fontWeight: 600, marginRight: 4 }}>KỲ</span>
        {[
          { key: "this_week", label: "Tuần này" },
          { key: "this_month", label: "Tháng này" },
          { key: "this_quarter", label: "Quý này" },
          { key: "this_year", label: "Năm nay" },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setFilters({ ...filters, period: key })}
            style={filters.period === key ? activeBtn : inactiveBtn}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 28, background: "#ECEFF1" }} />

      {/* Compare */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#78909C", fontWeight: 600, marginRight: 4 }}>SO SÁNH</span>
        {(["none", "last_period"] as const).map((c) => (
          <button key={c} onClick={() => setFilters({ ...filters, compare: c })}
            style={filters.compare === c ? activeBtn : inactiveBtn}>
            {c === "none" ? "Không" : "Kỳ trước"}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Apply */}
      <button
        onClick={() => onApply?.(filters)}
        style={{
          padding: "8px 20px",
          borderRadius: 8,
          border: "none",
          background: "#1565C0",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(21,101,192,0.3)",
        }}
      >
        Áp dụng
      </button>
    </div>
  );
};
