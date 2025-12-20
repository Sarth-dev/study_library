/* eslint-disable @next/next/no-img-element */
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

  /* ---------------- STEP LOGIC ---------------- */

  const nextFromPlan = () => {
    if (formData.planType === "FULL_TIME") {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const backFromPhoto = () => {
    if (formData.planType === "FULL_TIME") {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const visibleSteps = [
    "Info",
    "Plan",
    ...(formData.planType === "FULL_TIME" ? ["Seat"] : []),
    "Photo",
    "Review",
  ];

  const progress =
    ((step - 1) / (visibleSteps.length - 1)) * 100;

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-xl mx-auto rounded-2xl bg-white shadow-sm p-6 space-y-6">

      {/* 🔰 Logo + Welcome */}
      <div className="text-center space-y-2">
        {/* Replace src with your logo */}
        <img
          src="/images/study_plus.png"
          alt="Study Plus"
          className="mx-auto h-12"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          Study Plus Admission
        </h2>
        <p className="text-xs text-gray-500">
          A quiet space. A focused mind. Your journey starts here.
        </p>
      </div>

      {/* 📊 Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-[#4DB6AC] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 🔢 Step Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        {visibleSteps.map((label, index) => {
          const active = step === index + 1;
          const completed = step > index + 1;

          return (
            <span
              key={label}
              className={`transition-all ${
                active
                  ? "text-[#4DB6AC] font-medium"
                  : completed
                  ? "text-gray-700"
                  : ""
              }`}
            >
              {label}
            </span>
          );
        })}
      </div>

      {/* 🌊 Animated Step Container */}
      <div className="transition-all duration-300 ease-in-out">
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

        {/* Step 3 — Seat (FULL TIME ONLY) */}
        {step === 3 && formData.planType === "FULL_TIME" && (
          <StepSeat
            data={formData}
            onChange={setFormData}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {/* Step 4 — Photo */}
        {step === 4 && (
          <StepPhoto
            data={formData}
            onChange={setFormData}
            onNext={() => setStep(5)}
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

      {/* 🤍 Trust Footer */}
      <p className="text-[11px] text-center text-gray-400">
        🔒 Your details are secure and used only for admission purposes.
      </p>
    </div>
  );
}
