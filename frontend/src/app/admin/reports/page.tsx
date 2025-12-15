/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getMonthlyReport, getDueReport } from "@/src/lib/reportApi";

export default function ReportsPage() {
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const [dueData, setDueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, [month]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const monthly = await getMonthlyReport(month);
      const due = await getDueReport();
      setMonthlyData(monthly);
      setDueData(due);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Reports</h2>

      {/* Month Selector */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-lg p-2 w-full sm:w-60"
        />
      </div>

      {loading && <p>Loading reports...</p>}

      {/* Monthly Collection */}
      {monthlyData && (
        <div className="rounded-xl bg-white border p-4 space-y-3">
          <h3 className="font-medium">
            Monthly Collection – {monthlyData.month}
          </h3>

          <p className="text-lg font-semibold text-green-600">
            ₹{monthlyData.totalCollection}
          </p>

          {/* Responsive list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {monthlyData.payments.map((p: any) => (
              <div
                key={p._id}
                className="border rounded-lg p-3 text-sm"
              >
                <p>
                  <strong>{p.student?.name}</strong> (Seat {p.student?.seatNo})
                </p>
                <p>Amount: ₹{p.amountPaid}</p>
                <p className="text-gray-500">
                  {new Date(p.paymentDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Students */}
      <div className="rounded-xl bg-white border p-4 space-y-3">
        <h3 className="font-medium">Pending Dues</h3>

        {dueData.length === 0 && (
          <p className="text-sm text-gray-500">No pending dues 🎉</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dueData.map((s) => (
            <div
              key={s._id}
              className="border rounded-lg p-3 text-sm"
            >
              <p>
                <strong>{s.name}</strong> (Seat {s.seatNo})
              </p>
              <p className="text-red-600 font-medium">
                Due ₹{s.dueAmount}
              </p>
              <p className="text-gray-500">📞 {s.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
