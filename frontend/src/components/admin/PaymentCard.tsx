/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import AddPaymentModal from "./AddPaymentModal";

const DUE_API = process.env.NEXT_PUBLIC_API_URL_STUDENT || "https://study-library.onrender.com/api/students";

export default function PaymentCard({
  student,
  onUpdate,
}: {
  student: any;
  onUpdate: () => void;
}) {
  const [due, setDue] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${DUE_API}/${student._id}/due`)
      .then((res) => res.json())
      .then((data) => setDue(data.dueAmount || 0));
  }, [student._id]);

  return (
    <div className="rounded-xl bg-white border p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{student.name}</h3>
        <span
          className="text-sm font-semibold"
          style={{ color: due > 0 ? "#DC2626" : "#16A34A" }}
        >
          {due > 0 ? `Due ₹${due}` : "Paid"}
        </span>
      </div>

      <p className="text-sm text-gray-600">Seat: {student.seatNo}</p>

      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg py-2 text-white text-sm"
        style={{ backgroundColor: "#4DB6AC" }}
      >
        Add Payment
      </button>

      {open && (
        <AddPaymentModal
          student={student}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}
