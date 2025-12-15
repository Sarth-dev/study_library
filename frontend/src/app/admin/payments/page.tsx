/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PaymentCard from "@/src/components/admin/PaymentCard";

const STUDENTS_API = process.env.NEXT_PUBLIC_API_URL_STUDENT ||  "http://localhost:5000/api/students";

export default function AdminPaymentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(STUDENTS_API)
      .then((res) => res.json())
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students
          .filter((s) => s.status === "ACTIVE")
          .map((student) => (
            <PaymentCard
              key={student._id}
              student={student}
              onUpdate={() => {
                fetch(STUDENTS_API)
                  .then((res) => res.json())
                  .then(setStudents);
              }}
            />
          ))}
      </div>
    </div>
  );
}
