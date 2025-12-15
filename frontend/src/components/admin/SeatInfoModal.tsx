/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function SeatInfoModal({
  seat,
  onClose,
}: {
  seat: any;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/3 z-50 bg-white rounded-xl p-4 space-y-2">
        <h3 className="font-medium">Seat {seat.seatNo}</h3>

        <p className="text-sm">
          Status:{" "}
          <span style={{ color: "#4DB6AC", fontWeight: 500 }}>
            Occupied
          </span>
        </p>

        {seat.currentStudent && (
          <p className="text-sm">
            Student ID: <strong>{seat.currentStudent}</strong>
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 rounded-lg py-2 border"
        >
          Close
        </button>
      </div>
    </>
  );
}
