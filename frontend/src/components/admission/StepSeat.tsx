/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSeats } from "@/src/lib/api";

const TOTAL_SEATS = 67;

type StepSeatProps = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepSeat({ data, onChange, onNext, onBack }: StepSeatProps) {
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

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">
        Select your preferred seat
      </p>

      <div className="space-y-3 mb-6">
        {Array.from({ length: 7 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {Array.from({ length: 10 }).map((_, colIndex) => {
              const seat = rowIndex * 10 + colIndex + 1;
              const isOccupied = occupiedSeats.includes(seat);
              const isSelected = data.seatNo === seat;

              return (
                <button
                  key={seat}
                  disabled={isOccupied}
                  onClick={() => onChange({ ...data, seatNo: seat })}
                  className="h-9 w-9 rounded-md text-xs"
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
        <button onClick={onBack} className="flex-1 border rounded-xl py-2">
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
