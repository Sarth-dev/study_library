/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepSeat from "./StepSeat";
import StepPhoto from "./StepPhoto";
import StepReview from "./StepReview";

const steps = [
  { id: 1, title: "Your Details", icon: "👤" },
  { id: 2, title: "Choose Seat", icon: "💺" },
  { id: 3, title: "Upload Photo", icon: "📸" },
  { id: 4, title: "Review & Submit", icon: "✅" },
];

export default function AdmissionStepper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Admission Process
        </h2>
        <p className="text-xs text-gray-500">
          Just a few steps to reserve your study space
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, index) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;

          return (
            <div key={s.id} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full text-sm transition-all duration-300`}
                  style={{
                    backgroundColor: isCompleted || isActive ? "#4DB6AC" : "#E5E7EB",
                    color: isCompleted || isActive ? "#fff" : "#6B7280",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {s.icon}
                </div>

                <span
                  className="mt-2 text-[11px]"
                  style={{
                    color: isCompleted || isActive ? "#4DB6AC" : "#9CA3AF",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {s.title}
                </span>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div
                  className="flex-1 h-[2px] mx-1"
                  style={{
                    backgroundColor: step > s.id ? "#4DB6AC" : "#E5E7EB",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="transition-all duration-300">
        {step === 1 && (
          <StepBasicInfo
            data={formData}
            onChange={setFormData}
            onNext={() => setStep(2)}
          />
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
          <StepReview
            data={formData}
            onBack={() => setStep(3)}
          />
        )}
      </div>

      {/* Footer Motivation */}
      <p className="text-center text-xs text-gray-500 mt-6">
        📚 A calm place to focus, learn, and grow at <strong>Study Plus</strong>
      </p>
    </div>
  );
}
