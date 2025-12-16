/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

/* ✅ PROPS TYPE */
type StudentCardProps = {
  student: any;
  onUpdate: () => void;
  onOpenProfile: () => void;
};

export default function StudentCard({
  student,
  onUpdate,
  onOpenProfile,
}: StudentCardProps) {
  if (!student || typeof student !== "object") return null;

  const action = async (type: "approve" | "hold" | "exit" | "renew") => {
    const res = await fetch(`${API_URL}/${student._id}/${type}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body:
        type === "renew"
          ? JSON.stringify({ amount: student.monthlyFee, paymentMode: "CASH" })
          : undefined,
    });

    const data = await res.json();
    if (data?.whatsappLink) window.open(data.whatsappLink, "_blank");
    onUpdate();
  };

  return (
    <div className="rounded-xl bg-white border p-4 space-y-2">
      {/* HEADER */}
      <div
        className="flex justify-between items-start gap-3 cursor-pointer"
        onClick={onOpenProfile}
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
            {student.photo?.url ? (
              <img
                src={student.photo.url}
                alt={student.name || "Student"}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[10px] text-gray-400">No Photo</span>
            )}
          </div>

          <div>
            <h3 className="font-medium">
              {student.name || "Unnamed Student"}
            </h3>
            <p className="text-xs text-gray-500">
              Seat {student.seatNo ?? "—"}
            </p>
          </div>
        </div>

        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
          {(student.status || "UNKNOWN").replace("_", " ")}
        </span>
      </div>

      {/* ACTIONS */}
      <div
        className="flex gap-2 pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        {student.status === "ACTIVE" && (
          <button
            onClick={() => action("renew")}
            className="flex-1 rounded-lg py-1 text-sm text-white bg-[#4DB6AC]"
          >
            Renew
          </button>
        )}

        {student.status !== "LEFT" && (
          <button
            onClick={() => action("exit")}
            className="flex-1 rounded-lg py-1 text-sm text-white bg-red-500"
          >
            Exit
          </button>
        )}
      </div>
    </div>
  );
}
