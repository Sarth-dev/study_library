/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepSeat from "./StepSeat";
import StepPhoto from "./StepPhoto";
import StepReview from "./StepReview";

export default function AdmissionStepper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  return (
    <div className="rounded-2xl shadow-sm p-5 bg-white">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6 text-sm">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="flex-1 text-center"
            style={{
              color: step >= s ? "#4DB6AC" : "#9CA3AF",
              fontWeight: step >= s ? 500 : 400,
            }}
          >
            Step {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <StepBasicInfo data={formData} onChange={setFormData} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <StepSeat
          data={formData}
          onChange={setFormData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepPhoto
          data={formData}
          onChange={setFormData}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <StepReview data={formData} onBack={() => setStep(3)} />
      )}
    </div>
  );
}
