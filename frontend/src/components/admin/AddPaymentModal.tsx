/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

const PAYMENT_API = process.env.NEXT_PUBLIC_API_URL_PAYMENTS || "http://localhost:5000/api/payments";

export default function AddPaymentModal({
  student,
  onClose,
  onSuccess,
}: {
  student: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("CASH");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    await fetch(PAYMENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student._id,
        amountPaid: Number(amount),
        paymentMode: mode,
        month: new Date().toISOString().slice(0, 7),
      }),
    });

    setLoading(false);
    onSuccess();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/3 z-50 bg-white rounded-xl p-4 space-y-3">
        <h3 className="font-medium">Add Payment</h3>

        <input
          type="number"
          placeholder="Amount"
          className="w-full border rounded-lg p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-2"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="CASH">Cash</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
        </select>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 rounded-lg py-2 text-white"
            style={{ backgroundColor: "#4DB6AC" }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
