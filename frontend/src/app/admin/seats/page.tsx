/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import SeatGrid from "@/src/components/admin/SeatGrid";

const SEATS_API = process.env.NEXT_PUBLIC_API_URL_SEAT || "https://study-library.onrender.com/api/seats";

export default function AdminSeatsPage() {
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SEATS_API)
      .then((res) => res.json())
      .then(setSeats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading seat map...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Seat Map</h2>
      <SeatGrid seats={seats} />
    </div>
  );
}
