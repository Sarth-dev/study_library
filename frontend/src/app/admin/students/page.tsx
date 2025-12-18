/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import StudentCard from "@/src/components/admin/StudentCard";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_STUDENT ||
  "https://study-library.onrender.com/api/students";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // 🔍 search state


  const router = useRouter();

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // 🔎 filter students by name
  const filteredStudents = students.filter(
    (student) =>
      student &&
      student.name &&
      student.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center">Loading students...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold">Students</h2>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search by student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4DB6AC]"
        />
      </div>

      {/* Empty state */}
      {filteredStudents.length === 0 && (
        <p className="text-gray-500 text-sm">
          No students found.
        </p>
      )}

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents
          .filter(Boolean)
          .map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onUpdate={fetchStudents}
              onOpenProfile={(id) => router.push(`/admin/students/${id}`)} />
          ))}
      </div>
    </div>
  );
}
