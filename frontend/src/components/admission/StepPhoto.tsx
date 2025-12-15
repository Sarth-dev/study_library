/* eslint-disable @typescript-eslint/no-explicit-any */
export default function StepPhoto({ data, onChange, onNext, onBack }: any) {
  return (
    <div className="space-y-4">
    <p>Add Your Profile Image -  </p>
      <input
        type="file"
        className="border border-gray-400 rounded p-2"
        accept="image/*"
        onChange={(e) =>
          onChange({ ...data, photo: e.target.files?.[0] })
        }
      />

      {data.photo && (
        <p className="text-sm" style={{ color: "#4DB6AC" }}>
          Photo selected successfully ✔
        </p>
      )}

      <div className="flex gap-3">
        <button className="flex-1 rounded-xl border py-2" onClick={onBack}>
          Back
        </button>
        <button
          className="flex-1 rounded-xl py-2 text-white"
          style={{ backgroundColor: "#4DB6AC" }}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
