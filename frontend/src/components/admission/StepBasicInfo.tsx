/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

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

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors: any = {};

    // ✅ Name: only letters & spaces, min 3 chars
    if (!data.name?.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{3,}$/.test(data.name.trim())) {
      newErrors.name = "Enter a valid full name";
    }

    // ✅ Phone: Indian 10-digit mobile
    if (!data.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(data.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // ✅ Education: letters, spaces, dots (e.g. B.Sc), min 2 chars
    if (!data.education?.trim()) {
      newErrors.education = "Education is required";
    } else if (!/^[A-Za-z\s.]{2,}$/.test(data.education.trim())) {
      newErrors.education = "Enter a valid education detail";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <input
          placeholder="Full Name"
          value={data.name || ""}
          onChange={(e) =>
            onChange({ ...data, name: e.target.value })
          }
          className={`w-full border rounded-lg p-2 outline-none
            ${errors.name ? "border-red-500" : "border-gray-300"}
            focus:border-[#4DB6AC]`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          placeholder="Phone Number"
          value={data.phone || ""}
          maxLength={10}
          onChange={(e) =>
            onChange({ ...data, phone: e.target.value })
          }
          className={`w-full border rounded-lg p-2 outline-none
            ${errors.phone ? "border-red-500" : "border-gray-300"}
            focus:border-[#4DB6AC]`}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Education */}
      <div>
        <input
          placeholder="Education (e.g. BSc, MCA, 12th)"
          value={data.education || ""}
          onChange={(e) =>
            onChange({ ...data, education: e.target.value })
          }
          className={`w-full border rounded-lg p-2 outline-none
            ${errors.education ? "border-red-500" : "border-gray-300"}
            focus:border-[#4DB6AC]`}
        />
        {errors.education && (
          <p className="text-xs text-red-500 mt-1">
            {errors.education}
          </p>
        )}
      </div>

      {/* Continue */}
      <button
        onClick={handleNext}
        className="w-full rounded-xl py-2 text-white font-medium"
        style={{ backgroundColor: "#4DB6AC" }}
      >
        Continue →
      </button>
    </div>
  );
}
