/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import StudentCard from "@/src/components/admin/StudentCard";
import StudentProfile from "@/src/components/admin/StudentProfile"; // ✅ NEW

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  useEffect(() => {
  console.log("Selected student:", selectedStudentId);
}, [selectedStudentId]);

  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Students</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.filter(Boolean).map((student) => (
          <StudentCard
            key={student._id}
            student={student}
            onUpdate={fetchStudents}
            onOpenProfile={() => setSelectedStudentId(student._id)} // ✅
          />
        ))}
      </div>

      {/* PROFILE DRAWER */}
      {selectedStudentId && (
        <StudentProfile
          studentId={selectedStudentId}
          onClose={() => setSelectedStudentId(null)}
          onUpdate={fetchStudents}
        />
      )}
    </div>
  );
}
