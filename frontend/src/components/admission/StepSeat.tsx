/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSeats } from "@/src/lib/api";

const TOTAL_SEATS = 67;
const SEATS_PER_ROW = 10;

type StepSeatProps = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepSeat({
  data,
  onChange,
  onNext,
  onBack,
}: StepSeatProps) {
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSeats()
      .then((seats: any[]) => {
        const occupied = seats
          .filter((s: any) => s.isOccupied)
          .map((s: any) => s.seatNo);
        setOccupiedSeats(occupied);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-sm">Loading seats...</p>;
  }

  // 🔥 Create seats 1 → 67
  const seatNumbers = Array.from(
    { length: TOTAL_SEATS },
    (_, i) => i + 1
  );

  // 🔥 Split seats into rows of 10
  const rows = [];
  for (let i = 0; i < seatNumbers.length; i += SEATS_PER_ROW) {
    rows.push(seatNumbers.slice(i, i + SEATS_PER_ROW));
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">
        Select your preferred seat (1–67)
      </p>
      {/* Seat Legend */}
      <div className="flex justify-center gap-4 mb-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded border"
            style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}
          />
          <span>Available</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded"
            style={{ backgroundColor: "#4DB6AC" }}
          />
          <span>Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded"
            style={{ backgroundColor: "#D1D5DB" }}
          />
          <span>Occupied</span>
        </div>
      </div>


      <div className="space-y-3 mb-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seat) => {
              const isOccupied = occupiedSeats.includes(seat);
              const isSelected = data.seatNo === seat;

              return (
                <button
                  key={seat}
                  disabled={isOccupied}
                  onClick={() => onChange({ ...data, seatNo: seat })}
                  className="h-9 w-9 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: isOccupied
                      ? "#D1D5DB"
                      : isSelected
                        ? "#4DB6AC"
                        : "#F9FAFB",
                    color: isSelected ? "#fff" : "#111",
                    border: "1px solid #E5E7EB",
                    opacity: isOccupied ? 0.6 : 1,
                  }}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border rounded-xl py-2"
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!data.seatNo}
          className="flex-1 rounded-xl py-2 text-white"
          style={{ backgroundColor: "#4DB6AC" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
