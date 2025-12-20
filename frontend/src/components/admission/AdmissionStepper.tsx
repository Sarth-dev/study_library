/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepPlan from "./StepPlan";
import StepSeat from "./StepSeat";
import StepPhoto from "./StepPhoto";
import StepReview from "./StepReview";

export default function AdmissionStepper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  /* ---------------- STEP NAVIGATION ---------------- */

  const nextFromPlan = () => {
    if (formData.planType === "FULL_TIME") {
      setStep(3); // go to seat
    } else {
      setStep(4); // skip seat → photo
    }
  };

  const nextFromSeat = () => setStep(4);
  const nextFromPhoto = () => setStep(5);

  const backFromPhoto = () => {
    if (formData.planType === "FULL_TIME") {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="rounded-2xl shadow-sm p-5 bg-white">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6 text-sm">
        {["Info", "Plan", "Seat", "Photo", "Review"].map((label, i) => {
          const index = i + 1;
          const hidden =
            label === "Seat" && formData.planType === "HALF_TIME";

          if (hidden) return null;

          return (
            <div
              key={label}
              className="flex-1 text-center"
              style={{
                color: step >= index ? "#4DB6AC" : "#9CA3AF",
                fontWeight: step >= index ? 500 : 400,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Step 1 — Basic Info */}
      {step === 1 && (
        <StepBasicInfo
          data={formData}
          onChange={setFormData}
          onNext={() => setStep(2)}
        />
      )}

      {/* Step 2 — Plan */}
      {step === 2 && (
        <StepPlan
          data={formData}
          onChange={setFormData}
          onNext={nextFromPlan}
          onBack={() => setStep(1)}
        />
      )}

      {/* Step 3 — Seat (ONLY FULL TIME) */}
      {step === 3 && formData.planType === "FULL_TIME" && (
        <StepSeat
          data={formData}
          onChange={setFormData}
          onNext={nextFromSeat}
          onBack={() => setStep(2)}
        />
      )}

      {/* Step 4 — Photo */}
      {step === 4 && (
        <StepPhoto
          data={formData}
          onChange={setFormData}
          onNext={nextFromPhoto}
          onBack={backFromPhoto}
        />
      )}

      {/* Step 5 — Review */}
      {step === 5 && (
        <StepReview
          data={formData}
          onBack={() => setStep(4)}
        />
      )}
    </div>
  );
}
