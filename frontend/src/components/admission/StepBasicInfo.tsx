/* eslint-disable @typescript-eslint/no-explicit-any */
export default function StepBasicInfo({ data, onChange, onNext }: any) {
  return (
    <div className="space-y-4">
      {["Full Name", "Mobile Number", "Education / Exam"].map((label, i) => (
        <input
          key={label}
          placeholder={label}
          className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2"
          style={{ borderColor: "#E5E7EB", outlineColor: "#4DB6AC" }}
          value={data[["name", "phone", "education"][i]] || ""}
          onChange={(e) =>
            onChange({
              ...data,
              [["name", "phone", "education"][i]]: e.target.value,
            })
          }
        />
      ))}

      <button
        onClick={onNext}
        className="w-full rounded-xl py-3 text-white font-medium"
        style={{ backgroundColor: "#4DB6AC" }}
      >
        Continue
      </button>
    </div>
  );
}
