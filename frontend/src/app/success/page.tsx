/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const [mode, setMode] = useState<"QR" | "CASH" | null>(null);
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#F9FAFB] text-center">
      <h1 className="text-2xl font-semibold mb-2 text-[#4DB6AC]">
        Admission Submitted 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Please complete payment to confirm your seat.
      </p>

      {/* Payment Options */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => setMode("QR")}
          className="w-full rounded-xl border p-4"
        >
          📱 Pay via UPI / QR Code
        </button>

        <button
          onClick={() => setMode("CASH")}
          className="w-full rounded-xl border p-4"
        >
          💵 Pay Cash at Library
        </button>
      </div>

      {/* QR PAYMENT */}
      {mode === "QR" && (
        <div className="mt-6">
          <img
            src="/images/qr.jpeg"
            alt="UPI QR"
            className="mx-auto w-48"
          />
          <p className="text-sm text-gray-600 mt-2">
            After payment, admin will verify and approve your admission.
          </p>
        </div>
      )}

      {/* CASH INFO */}
      {mode === "CASH" && (
        <p className="mt-6 text-sm text-gray-600">
          Please visit the library desk and pay cash.
          Your seat will be confirmed after admin approval.
        </p>
      )}

      {/* WhatsApp Confirmation Info */}
      <div className="mt-6 text-sm text-gray-600">
        ✅ Your request is submitted.<br />
        📲 You will receive confirmation on WhatsApp after admin approval.
      </div>

      {/* CTA */}
      <button
        onClick={() => router.push("/")}
        className="mt-8 rounded-xl px-6 py-2 border text-sm"
      >
        Back to Home
      </button>
    </main>
  );
}
