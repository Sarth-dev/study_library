/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import SeatGrid from "@/src/components/admin/SeatGrid";

const SEATS_API =
  process.env.NEXT_PUBLIC_API_URL_SEAT ||
  "https://study-library.onrender.com/api/seats";

export default function AdminSeatsPage() {
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔁 reusable fetch function
  const fetchSeats = useCallback(async () => {
    try {
      const res = await fetch(SEATS_API);
      const data = await res.json();
      setSeats(data);
    } catch (err) {
      console.error("Failed to fetch seats", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load + auto refresh
  useEffect(() => {
    fetchSeats();

    const interval = setInterval(() => {
      fetchSeats();
    }, 30_000); // ⏱ 30 seconds

    return () => clearInterval(interval); // 🧹 cleanup
  }, [fetchSeats]);

  if (loading) return <p>Loading seat map...</p>;

  return (
    <div className="space-y-4">
      {/* Header + Refresh */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Seat Map</h2>

        {/* Manual refresh */}
        <button
          onClick={fetchSeats}
          className="text-sm px-3 py-1 rounded-md border"
        >
          Refresh
        </button>
      </div>

      <SeatGrid seats={seats} />
    </div>
  );
}
