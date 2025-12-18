/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function StudentProfilePage() {
  const { id } = useParams(); // studentId from URL
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => setStudent(data))
      .catch((err) => {
        console.error(err);
        setStudent(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading student profile…</p>;
  }

  if (!student) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Student not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-blue-600"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600"
      >
        ← Back to Students
      </button>

      {/* Profile Card */}
      <div className="rounded-xl bg-white border p-5 space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border bg-gray-100">
            {student.photo?.url ? (
              <img
                src={student.photo.url}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                No Photo
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-sm text-gray-500">
              Seat {student.seatNo}
            </p>
          </div>
        </div>

        <hr />

        <p>📞 <strong>Phone:</strong> {student.phone}</p>
        <p>🎓 <strong>Education:</strong> {student.education || "—"}</p>
        <p>📦 <strong>Plan:</strong> {student.planType}</p>
        <p>💰 <strong>Monthly Fee:</strong> ₹{student.monthlyFee}</p>
        <p>📅 <strong>Due Date:</strong> {student.dueDate}th</p>
        <p>
          🗓 <strong>Admission Date:</strong>{" "}
          {new Date(student.admissionDate).toLocaleDateString()}
        </p>

        <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-gray-100">
          Status: {student.status.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}
