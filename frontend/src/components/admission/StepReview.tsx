/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { submitAdmission } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StepReview({ data, onBack }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  const [plan, setPlan] = useState<"FULL_TIME" | "HALF_TIME">("FULL_TIME");

  const plans = {
    FULL_TIME: { fee: 800, dueDate: 1, label: "Full Time", desc: "Unlimited study hours" },
    HALF_TIME: { fee: 500, dueDate: 1, label: "Half Time", desc: "Limited daily hours" },
  };

  const submit = async () => {
    if (!consent) return;

    setLoading(true);
    setError("");

    try {
      const selectedPlan = plans[plan];

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("education", data.education);
      formData.append("seatNo", data.seatNo);

      formData.append("planType", plan);                 // 🔥
      formData.append("monthlyFee", String(selectedPlan.fee));
      formData.append("dueDate", String(selectedPlan.dueDate));
      formData.append("whatsappConsent", String(consent));

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      await submitAdmission(formData);
      router.push("/success");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">Review & Choose Plan</h2>
        <p className="text-xs text-gray-500">
          Select a study plan that suits your routine
        </p>
      </div>

      {/* Student Info */}
      <div className="rounded-xl border p-4 bg-white space-y-1">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Education:</strong> {data.education}</p>
        <p><strong>Seat No:</strong> {data.seatNo}</p>
      </div>

      {/* Plan Selection */}
      <div className="space-y-3">
        <h3 className="font-medium">Choose Your Study Plan</h3>

        {Object.entries(plans).map(([key, p]) => {
          const selected = plan === key;
          return (
            <button
              key={key}
              onClick={() => setPlan(key as any)}
              className={`w-full text-left rounded-xl border p-4 transition
                ${selected
                  ? "border-[#4DB6AC] bg-[#ECF8F6]"
                  : "bg-white"
                }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {p.label}
                </span>
                {selected && (
                  <span className="text-xs px-2 py-1 rounded-full bg-[#4DB6AC] text-white">
                    Selected
                  </span>
                )}
              </div>

              <p className="mt-2">💰 ₹{p.fee} / month</p>
              <p className="text-xs text-gray-600">
                📅 Due on {p.dueDate}st · {p.desc}
              </p>
            </button>
          );
        })}

        <p className="text-xs text-gray-500">
          Transparent pricing · No hidden charges
        </p>
      </div>

      {/* WhatsApp Consent */}
      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          I agree to receive admission-related communication via WhatsApp.
          <span className="block text-xs text-gray-500 mt-1">
            Only for admission & seat confirmation.
          </span>
        </span>
      </label>

      {!consent && (
        <p className="text-xs text-red-500">
          Please provide consent to proceed.
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border rounded-xl py-2">
          Back
        </button>

        <button
          onClick={submit}
          disabled={loading || !consent}
          className={`flex-1 rounded-xl py-2 text-white
            ${loading || !consent ? "bg-gray-300" : ""}`}
          style={
            !loading && consent ? { backgroundColor: "#4DB6AC" } : {}
          }
        >
          {loading ? "Submitting..." : "Confirm & Submit"}
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 pt-2">
        🔒 Your information is safe and used only for admission purposes.
      </p>
    </div>
  );
}
