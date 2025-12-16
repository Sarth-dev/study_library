/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import PaymentCard from "@/src/components/admin/PaymentCard";

const STUDENTS_API =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function AdminPaymentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔁 reusable fetch function
  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(STUDENTS_API);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load + auto refresh
  useEffect(() => {
    fetchStudents();

    const interval = setInterval(() => {
      fetchStudents();
    }, 30_000); // ⏱ 30 seconds

    return () => clearInterval(interval); // 🧹 cleanup
  }, [fetchStudents]);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Payments</h2>

        {/* Manual refresh (optional but nice UX) */}
        <button
          onClick={fetchStudents}
          className="text-sm px-3 py-1 rounded-md border"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students
          .filter((s) => s.status === "ACTIVE")
          .map((student) => (
            <PaymentCard
              key={student._id}
              student={student}
              onUpdate={fetchStudents}
            />
          ))}
      </div>
    </div>
  );
}
