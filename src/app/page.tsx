"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <DashboardPage />
    </div>
  );
}
