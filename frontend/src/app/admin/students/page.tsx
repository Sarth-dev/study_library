/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import StudentCard from "@/src/components/admin/StudentCard";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (loading) {
    return <p className="text-center">Loading students...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Students</h2>

      {students.length === 0 && (
        <p className="text-gray-500">No students found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students
          .filter(Boolean) // ✅ THIS LINE GOES HERE
          .map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onUpdate={fetchStudents}
            />
          ))}
      </div>
    </div>
  );
}
