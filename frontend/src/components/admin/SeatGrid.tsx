/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import SeatInfoModal from "./SeatInfoModal";

export default function SeatGrid({ seats }: { seats: any[] }) {
  const [selectedSeat, setSelectedSeat] = useState<any>(null);

  return (
    <>
      {/* Legend */}
      <div className="flex gap-4 text-xs mb-3">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-[#4DB6AC]" /> Occupied
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-[#F3F4F6] border" /> Available
        </div>
      </div>

      {/* Seat Layout */}
      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, row) => (
          <div key={row} className="flex justify-center gap-2">
            {Array.from({ length: 10 }).map((_, col) => {
              const seatNo = row * 10 + col + 1;
              const seat = seats.find((s) => s.seatNo === seatNo);
              const occupied = seat?.isOccupied;

              return (
                <button
                  key={seatNo}
                  onClick={() => occupied && setSelectedSeat(seat)}
                  className="h-9 w-9 rounded-md text-xs border"
                  style={{
                    backgroundColor: occupied ? "#4DB6AC" : "#F9FAFB",
                    color: occupied ? "#fff" : "#111",
                    cursor: occupied ? "pointer" : "default",
                  }}
                >
                  {seatNo}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <SeatInfoModal
          seat={selectedSeat}
          onClose={() => setSelectedSeat(null)}
        />
      )}
    </>
  );
}
