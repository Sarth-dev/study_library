/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function StudentProfile({ studentId, onClose, onUpdate }: any) {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/${studentId}/profile`)
      .then((res) => res.json())
      .then(setStudent);
  }, [studentId]);

  if (!student) return null;

  const renew = async () => {
    const res = await fetch(`${API}/${student._id}/renew`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: student.monthlyFee,
        paymentMode: "CASH",
      }),
    });

    const data = await res.json();
    if (data.whatsappLink) window.open(data.whatsappLink, "_blank");
    onUpdate();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
      <div className="w-full sm:w-[420px] bg-white h-full p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Student Profile</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <p><strong>{student.name}</strong></p>
        <p>Seat: {student.seatNo}</p>
        <p>Plan: {student.planType}</p>
        <p>Fee: ₹{student.monthlyFee}</p>
        <p>
          Admission:
          {" "}
          {new Date(student.admissionDate).toLocaleDateString()}
        </p>

        <button
          onClick={renew}
          className="mt-4 w-full bg-[#4DB6AC] text-white rounded-lg py-2"
        >
          Renew Seat
        </button>

        <div className="mt-6">
          <h4 className="font-medium mb-2">History</h4>

          {student.history?.length === 0 && (
            <p className="text-sm text-gray-500">No history</p>
          )}

          {student.history?.map((h: any, i: number) => (
            <div key={i} className="border rounded-lg p-2 mb-2 text-sm">
              <p>{h.type}</p>
              {h.amount && <p>₹{h.amount}</p>}
              <p className="text-xs text-gray-500">
                {new Date(h.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
