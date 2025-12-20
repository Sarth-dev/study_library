/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { submitAdmission } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type StepReviewProps = {
  data: any;
  onBack: () => void;
};

export default function StepReview({ data, onBack }: StepReviewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  /* ---------------- PLAN CONFIG ---------------- */

  const plans = {
    FULL_TIME: {
      label: "Full Time",
      fee: 800,
      dueDate: 1,
      desc: "Unlimited study hours with a fixed seat",
      seatRequired: true,
    },
    HALF_TIME: {
      label: "Half Time",
      fee: 500,
      dueDate: 1,
      desc: "Limited daily hours · Temporary Seat Allocation",
      seatRequired: false,
    },
  };

  type PlanType = "FULL_TIME" | "HALF_TIME";

  const planType: PlanType =
    data.planType === "HALF_TIME" ? "HALF_TIME" : "FULL_TIME";

  const selectedPlan = plans[planType];

  /* ---------------- PHOTO PREVIEW ---------------- */

  const photoPreview = data.photo
    ? URL.createObjectURL(data.photo)
    : null;

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  /* ---------------- SUBMIT ---------------- */

  const submit = async () => {
    if (!consent) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("education", data.education);

      if (selectedPlan.seatRequired) {
        formData.append("seatNo", data.seatNo);
      }

      formData.append("planType", data.planType);
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

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">Review Your Admission</h2>
        <p className="text-xs text-gray-500">
          Please verify all details before submitting
        </p>
      </div>

      {/* Student Info */}
      <div className="rounded-xl border p-4 bg-white">
        <div className="flex items-center gap-4">
          {/* Photo */}
          <div className="h-20 w-20 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Student photo"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">No Photo</span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-1">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>Education:</strong> {data.education}</p>
            {selectedPlan.seatRequired && (
              <p><strong>Seat No:</strong> {data.seatNo}</p>
            )}
          </div>
        </div>
      </div>

      {/* Plan Summary */}
      <div className="rounded-xl border p-4 bg-[#F9FAFB] space-y-2">
        <h3 className="font-medium">Selected Plan</h3>

        <p className="text-base font-semibold text-[#4DB6AC]">
          {selectedPlan.label}
        </p>

        <p>💰 <strong>Monthly Fee:</strong> ₹{selectedPlan.fee}</p>
        <p>📅 <strong>Due Date:</strong> {selectedPlan.dueDate}st of every month</p>
        <p className="text-xs text-gray-600">
          {selectedPlan.desc}
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
        <button
          onClick={onBack}
          className="flex-1 border rounded-xl py-2"
        >
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

      {/* Trust Footer */}
      <p className="text-xs text-center text-gray-500 pt-2">
        🔒 Your information is safe and used only for admission purposes.
      </p>
    </div>
  );
}
