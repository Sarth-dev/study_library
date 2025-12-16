/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import StudentCard from "@/src/components/admin/StudentCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL_STUDENT || "https://study-library.onrender.com/api/students";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
        {students.map((student) => (
          <StudentCard
            key={student._id}
            student={student}
            onUpdate={() => {
              // refetch after action
              setLoading(true);
              fetch(API_URL)
                .then((res) => res.json())
                .then(setStudents)
                .finally(() => setLoading(false));
            }}
          />
        ))}
      </div>
    </div>
  );
}
