"use client";
import React, { useState } from "react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { ProductRankingChart } from "@/components/dashboard/ProductRankingChart";
import { SupplierRankingChart } from "@/components/dashboard/SupplierRankingChart";
import { CompanyPerformanceTable } from "@/components/dashboard/CompanyPerformanceTable";
import { FilterBar } from "@/components/dashboard/FilterBar";
import {
  mockSummaryData,
  mockStatusOverview,
  mockTrendData,
  mockProductRanking,
  mockSupplierRanking,
  mockCompanyPerformance,
} from "@/lib/mockData";

const TAB_ITEMS = [
  { key: "buy", label: "Mua hàng" },
  { key: "sell", label: "Bán hàng" },
];

export default function DashboardPage() {
  const [tab, setTab] = useState("buy");
  const [showComparison, setShowComparison] = useState(true);

  return (
    <div style={{
      flex: 1,
      minHeight: "100vh",
      background: "#F0F4F8",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top Header */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #ECEFF1",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {TAB_ITEMS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "0 18px",
              height: 56,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: tab === t.key ? 700 : 500,
              color: tab === t.key ? "#1565C0" : "#78909C",
              borderBottom: tab === t.key ? "3px solid #1565C0" : "3px solid transparent",
              transition: "all 0.2s",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 11, color: "#90A4AE" }}>
            Cập nhật lần cuối: 06/03/2026 08:00
          </div>
          <button style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1.5px solid #ECEFF1",
            background: "#fff",
            fontSize: 12,
            fontWeight: 600,
            color: "#546E7A",
            cursor: "pointer",
          }}>
            🔄 Làm mới
          </button>
          <button style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1.5px solid #ECEFF1",
            background: "#fff",
            fontSize: 12,
            fontWeight: 600,
            color: "#546E7A",
            cursor: "pointer",
          }}>
            📥 Xuất Excel
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
        {/* Title */}
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1A2F4E", letterSpacing: -0.5 }}>
            Dashboard {tab === "buy" ? "Mua hàng" : "Bán hàng"}
          </div>
          <div style={{ fontSize: 13, color: "#78909C", marginTop: 2 }}>
            Tháng 10/2025 · Tổng công ty · So sánh kỳ trước
          </div>
        </div>

        {/* Filter */}
        <FilterBar onApply={(f) => setShowComparison(f.compare === "last_period")} />

        {/* Summary Row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <SummaryCard
            title={`Tổng đơn ${tab === "buy" ? "mua" : "bán"}`}
            count={mockSummaryData.totalBuyOrder.count}
            value={mockSummaryData.totalBuyOrder.value}
            aov={mockSummaryData.totalBuyOrder.aov}
            comparison={showComparison ? mockSummaryData.totalBuyOrder.comparisonRatio : undefined}
            accentColor="#1565C0"
          />
          <SummaryCard
            title="Đơn hoàn thành"
            count={mockSummaryData.completedOrder.count}
            value={mockSummaryData.completedOrder.value}
            aov={mockSummaryData.completedOrder.aov}
            comparison={showComparison ? mockSummaryData.completedOrder.comparisonRatio : undefined}
            accentColor="#4CAF50"
          />
          <div style={{ flex: "1 1 260px", minWidth: 260 }}>
            <StatusOverview data={mockStatusOverview} />
          </div>
        </div>

        {/* Trend Chart */}
        <TrendChart data={mockTrendData} />

        {/* Rankings Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <ProductRankingChart
            top10={mockProductRanking.top10}
            bottom10={mockProductRanking.bottom10}
          />
          <SupplierRankingChart
            top10={mockSupplierRanking.top10}
            bottom10={mockSupplierRanking.bottom10}
          />
        </div>

        {/* Company Performance */}
        <CompanyPerformanceTable data={mockCompanyPerformance} showComparison={showComparison} />
      </div>
    </div>
  );
}
