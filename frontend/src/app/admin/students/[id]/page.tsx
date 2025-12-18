/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function StudentProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  /* ---------------- LOAD STUDENT ---------------- */

  const loadStudent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Student not found");

      const data = await res.json();
      setStudent(data);
      setError(null);
    } catch (err) {
      setError("Student not found or removed");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadStudent();
  }, [id]);

  /* ---------------- ACTION HANDLER ---------------- */

  const action = async (
    type: "approve" | "hold" | "exit" | "remind"
  ) => {
    if (!student?._id) return;

    try {
      setActionLoading(true);

      const res = await fetch(
        `${API_URL}/${student._id}/${type}`,
        { method: "PUT" }
      );

      const data = await res.json();

      // 🔔 Open WhatsApp if backend sends link
      if (data?.whatsappLink) {
        window.open(data.whatsappLink, "_blank");
      }

      await loadStudent();
    } catch (err) {
      console.error("Action failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading student profile…
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 space-y-3">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600"
        >
          ← Go back
        </button>
      </div>
    );
  }

  if (!student) return null;

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600"
      >
        ← Back to Students
      </button>

      {/* Profile Card */}
      <div className="rounded-xl bg-white border p-5 space-y-4">
        {/* Header */}
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

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <p>📞 <strong>Phone:</strong> {student.phone}</p>
          <p>🎓 <strong>Education:</strong> {student.education || "—"}</p>
          <p>📦 <strong>Plan:</strong> {student.planType}</p>
          <p>💰 <strong>Fee:</strong> ₹{student.monthlyFee}</p>
          <p>📅 <strong>Due Date:</strong> {student.dueDate}th</p>
          <p>
            🗓 <strong>Joined:</strong>{" "}
            {new Date(student.admissionDate).toLocaleDateString()}
          </p>
        </div>

        {/* Status */}
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100">
          Status: {student.status.replace("_", " ")}
        </span>

        {/* ADMIN ACTIONS */}
        <div className="pt-4 space-y-2">
          <h3 className="text-sm font-medium">
            Admin Actions
          </h3>

          <div className="flex flex-wrap gap-2">
            {student.status === "PENDING_PAYMENT" && (
              <button
                onClick={() => action("approve")}
                disabled={actionLoading}
                className="px-3 py-1 rounded-md text-sm text-white bg-green-600"
              >
                Approve Admission
              </button>
            )}

            {student.status === "ACTIVE" && (
              <>
                <button
                  onClick={() => action("hold")}
                  disabled={actionLoading}
                  className="px-3 py-1 rounded-md text-sm border"
                >
                  Hold Student
                </button>

                <button
                  onClick={() => action("remind")}
                  disabled={actionLoading}
                  className="px-3 py-1 rounded-md text-sm text-white bg-blue-600"
                >
                  Send Due Reminder
                </button>
              </>
            )}

            {student.status !== "LEFT" && (
              <button
                onClick={() => action("exit")}
                disabled={actionLoading}
                className="px-3 py-1 rounded-md text-sm text-white bg-red-500"
              >
                Exit Student
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
