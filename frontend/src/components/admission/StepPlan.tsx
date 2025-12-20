/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function StepPlan({
  data,
  onChange,
  onNext,
  onBack,
}: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Choose Your Study Plan
      </h2>

      {["FULL_TIME", "HALF_TIME"].map((plan) => (
        <button
          key={plan}
          onClick={() => onChange({ ...data, planType: plan })}
          className={`w-full rounded-xl border p-4 text-left ${
            data.planType === plan
              ? "border-[#4DB6AC] bg-[#ECF8F6]"
              : "bg-white"
          }`}
        >
          <strong>
            {plan === "FULL_TIME" ? "Full Time" : "Half Time"}
          </strong>
          <p className="text-sm text-gray-500">
            {plan === "FULL_TIME"
              ? "Fixed seat, unlimited hours"
              : "Flexible timing, no fixed seat"}
          </p>
        </button>
      ))}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 border rounded-xl py-2"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.planType}
          className="flex-1 rounded-xl py-2 text-white bg-[#4DB6AC]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
