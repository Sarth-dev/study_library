/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

type StepPhotoProps = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepPhoto({
  data,
  onChange,
  onNext,
  onBack,
}: StepPhotoProps) {
  const [error, setError] = useState("");

  if (!data) return null;

  const handleNext = () => {
    if (!data.photo) {
      setError("Profile photo is required for admission");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="text-center">
        <h3 className="text-base font-medium">Upload Profile Photo</h3>
        <p className="text-xs text-gray-500">
          This helps us identify you at the library
        </p>
      </div>

      {/* File Input */}
      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          onChange={(e) =>
            onChange({ ...data, photo: e.target.files?.[0] })
          }
        />

        {data.photo && (
          <p className="text-sm text-green-600">
            ✔ Photo selected successfully
          </p>
        )}

        {error && (
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          className="flex-1 rounded-xl border py-2"
          onClick={onBack}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!data.photo}
          className={`flex-1 rounded-xl py-2 text-white transition
            ${!data.photo ? "bg-gray-300 cursor-not-allowed" : ""}`}
          style={
            data.photo
              ? { backgroundColor: "#4DB6AC" }
              : {}
          }
        >
          Continue
        </button>
      </div>

      {/* Trust note */}
      <p className="text-xs text-center text-gray-500">
        🔒 Your photo is used only for identification purposes
      </p>
    </div>
  );
}
