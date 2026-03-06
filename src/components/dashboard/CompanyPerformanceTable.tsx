"use client";
import React, { useState } from "react";
import { formatCurrency, formatNumber, formatPercent, getTrendColor, getTrendIcon } from "@/lib/utils";

interface CompanyRow {
  id: number;
  company: string;
  totalValue: number;
  totalOrders: number;
  aov: number;
  momValue?: number;
  momOrders?: number;
  momAov?: number;
}

interface CompanyPerformanceTableProps {
  data: CompanyRow[];
  showComparison?: boolean;
}

const TrendBadge = ({ value }: { value?: number }) => {
  if (value === undefined || value === null) return null;
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 600,
      color: getTrendColor(value),
      background: value > 0 ? "#E8F5E9" : value < 0 ? "#FFEBEE" : "#F5F5F5",
      padding: "2px 6px",
      borderRadius: 4,
      marginLeft: 4,
      whiteSpace: "nowrap",
    }}>
      {getTrendIcon(value)} {formatPercent(Math.abs(value))}
    </span>
  );
};

export const CompanyPerformanceTable = ({ data, showComparison = true }: CompanyPerformanceTableProps) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"company" | "totalValue" | "totalOrders" | "aov">("company");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = data
    .filter((r) => r.company.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const thStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: "#78909C",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    background: "#F8FAFB",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "#37474F",
    borderBottom: "1px solid #F5F5F5",
    verticalAlign: "middle",
  };

  const SortArrow = ({ col }: { col: typeof sortKey }) =>
    sortKey === col ? <span style={{ marginLeft: 4 }}>{sortDir === "asc" ? "↑" : "↓"}</span> : null;

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #ECEFF1",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#37474F", textTransform: "uppercase", letterSpacing: 0.5 }}>
          So sánh hiệu suất công ty
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm công ty..."
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid #ECEFF1",
            fontSize: 12,
            color: "#37474F",
            outline: "none",
            width: 200,
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: "left" }} onClick={() => handleSort("company")}>
                Công ty <SortArrow col="company" />
              </th>
              <th style={{ ...thStyle, textAlign: "right" }} onClick={() => handleSort("totalValue")}>
                Tổng giá trị <SortArrow col="totalValue" />
              </th>
              <th style={{ ...thStyle, textAlign: "right" }} onClick={() => handleSort("totalOrders")}>
                Số đơn <SortArrow col="totalOrders" />
              </th>
              <th style={{ ...thStyle, textAlign: "right" }} onClick={() => handleSort("aov")}>
                AOV <SortArrow col="aov" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} style={{ transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{row.company}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  {formatCurrency(row.totalValue, true)}
                  {showComparison && <TrendBadge value={row.momValue} />}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  {formatNumber(row.totalOrders)}
                  {showComparison && <TrendBadge value={row.momOrders} />}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  {formatCurrency(row.aov, true)}
                  {showComparison && <TrendBadge value={row.momAov} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 32, color: "#90A4AE", fontSize: 13 }}>
            Không tìm thấy công ty
          </div>
        )}
      </div>
    </div>
  );
};
