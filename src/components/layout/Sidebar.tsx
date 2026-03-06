"use client";
import React, { useState } from "react";

const NAV_ITEMS = [
  { icon: "📊", label: "Dashboard", active: true },
  { icon: "🛒", label: "Mua hàng", active: false },
  { icon: "🏪", label: "Bán hàng", active: false },
  { icon: "📦", label: "Sản phẩm", active: false },
  { icon: "🏢", label: "Công ty", active: false },
  { icon: "👥", label: "Đối tác", active: false },
  { icon: "📋", label: "Báo cáo", active: false },
  { icon: "⚙️", label: "Cài đặt", active: false },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      width: collapsed ? 64 : 220,
      minHeight: "100vh",
      background: "#0D2B4E",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s ease",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #1976D2, #42A5F5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 900, color: "#fff", flexShrink: 0,
        }}>O</div>
        {!collapsed && (
          <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
            ODA
          </span>
        )}
        <div style={{ flex: 1 }} />
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: "none", border: "none", color: "#90A4AE", cursor: "pointer",
          fontSize: 16, padding: 4, borderRadius: 4,
        }}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {NAV_ITEMS.map(({ icon, label, active }) => (
          <div key={label} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 12px",
            borderRadius: 8,
            marginBottom: 2,
            cursor: "pointer",
            background: active ? "rgba(25,118,210,0.2)" : "transparent",
            borderLeft: active ? "3px solid #42A5F5" : "3px solid transparent",
            transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            {!collapsed && (
              <span style={{
                fontSize: 13,
                fontWeight: active ? 700 : 400,
                color: active ? "#90CAF9" : "#78909C",
              }}>
                {label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: "14px 12px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #E53935, #EF9A9A)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>HQ</div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#CFD8DC" }}>HQ Admin</div>
            <div style={{ fontSize: 10, color: "#546E7A" }}>Tổng công ty</div>
          </div>
        )}
      </div>
    </div>
  );
};
