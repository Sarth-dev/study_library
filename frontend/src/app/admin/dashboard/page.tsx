"use client";

import { useEffect, useState } from "react";
import StatCard from "@/src/components/admin/StateCard";
import { getDashboardStats } from "@/src/lib/adminApi";
import Link from "next/link";

type DashboardStats = {
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  activeStudents: number;
  totalCollection: number;
};

const REFRESH_INTERVAL = 30_000; // 30 seconds

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchStats();

    // polling
    const interval = setInterval(fetchStats, REFRESH_INTERVAL);

    // cleanup (VERY IMPORTANT)
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return <p className="text-center">Loading dashboard...</p>;
  }

  if (!stats) {
    return (
      <p className="text-center text-red-500">
        Failed to load dashboard data
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold">Overview</h2>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          {lastUpdated && (
            <span>
              Last updated:{" "}
              {lastUpdated.toLocaleTimeString()}
            </span>
          )}

          <button
            onClick={fetchStats}
            className="border rounded-lg px-3 py-1 text-xs hover:bg-gray-100"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Seats" value={stats.totalSeats} />
        <StatCard title="Occupied Seats" value={stats.occupiedSeats} />
        <StatCard title="Available Seats" value={stats.availableSeats} />
        <StatCard title="Active Students" value={stats.activeStudents} />
      </div>

      {/* Financial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="This Month Collection"
          value={`₹${stats.totalCollection}`}
        />
        <Link href={"/admin/reports"}><StatCard title="Reports" value="View Details →"
    
         /></Link>
      </div>
    </div>
  );
}
