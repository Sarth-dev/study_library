/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

/* ✅ Define props type */
type StepBasicInfoProps = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
};

export default function StepBasicInfo({
  data,
  onChange,
  onNext,
}: StepBasicInfoProps) {
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};

    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!data.education?.trim()) newErrors.education = "Education is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Full Name"
        value={data.name || ""}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
        className="w-full border rounded-lg p-2"
      />
      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

      <input
        placeholder="Phone Number"
        value={data.phone || ""}
        onChange={(e) => onChange({ ...data, phone: e.target.value })}
        className="w-full border rounded-lg p-2"
      />
      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

      <input
        placeholder="Education"
        value={data.education || ""}
        onChange={(e) => onChange({ ...data, education: e.target.value })}
        className="w-full border rounded-lg p-2"
      />
      {errors.education && (
        <p className="text-xs text-red-500">{errors.education}</p>
      )}

      <button
        onClick={handleNext}
        className="w-full rounded-xl py-2 text-white"
        style={{ backgroundColor: "#4DB6AC" }}
      >
        Continue
      </button>
    </div>
  );
}
