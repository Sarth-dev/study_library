/* eslint-disable jsx-a11y/alt-text */
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
  const [form, setForm] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  /* ---------------- LOAD STUDENT ---------------- */

  const loadStudent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Student not found");

      const data = await res.json();
      setStudent(data);
      setForm(data); // clone for edit
      setError(null);
    } catch {
      setError("Student not found or removed");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadStudent();
  }, [id]);

  /* ---------------- SAVE EDITS ---------------- */

  const saveChanges = async () => {
    try {
      setActionLoading(true);

     await fetch(`${API_URL}/${student._id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});


      setEditMode(false);
      await loadStudent();
    } catch {
      alert("Failed to update student");
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- ADMIN ACTIONS ---------------- */

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
      if (data?.whatsappLink) {
        window.open(data.whatsappLink, "_blank");
      }

      await loadStudent();
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading…</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        <button onClick={() => router.back()} className="text-blue-600 text-sm">
          ← Go back
        </button>
      </div>
    );
  }

  if (!student || !form) return null;

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <button onClick={() => router.back()} className="text-sm text-blue-600">
        ← Back to Students
      </button>

      <div className="rounded-xl bg-white border p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border bg-gray-100">
              {student.photo?.url ? (
                <img src={student.photo.url} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                  No Photo
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500">Seat {student.seatNo}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditMode(!editMode);
              setForm(student); // reset on cancel
            }}
            className="text-sm px-3 py-1 border rounded-md"
          >
            {editMode ? "Cancel" : "Edit Details"}
          </button>
        </div>

        <hr />

        {/* EDITABLE DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Input label="Name" value={form.name} set={(v: any) => setForm({ ...form, name: v })} disabled={!editMode} />
          <Input label="Phone" value={form.phone} set={(v: any) => setForm({ ...form, phone: v })} disabled={!editMode} />
          <Input label="Education" value={form.education || ""} set={(v: any) => setForm({ ...form, education: v })} disabled={!editMode} />
          <Input label="Seat No" value={form.seatNo} set={(v: any) => setForm({ ...form, seatNo: v })} disabled={!editMode} />
          <Input label="Monthly Fee" type="number" value={form.monthlyFee} set={(v: any) => setForm({ ...form, monthlyFee: Number(v) })} disabled={!editMode} />
          <Input label="Due Date (day)" type="number" value={form.dueDate} set={(v: any) => setForm({ ...form, dueDate: Number(v) })} disabled={!editMode} />
          <Input label="Join Date" type="date" value={form.admissionDate?.slice(0, 10)} set={(v: any) => setForm({ ...form, admissionDate: v })} disabled={!editMode} />
        </div>

        {editMode && (
          <button
            onClick={saveChanges}
            disabled={actionLoading}
            className="w-full py-2 mt-3 rounded-md text-white bg-[#4DB6AC]"
          >
            Save Changes
          </button>
        )}

        {/* STATUS */}
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100">
          Status: {student.status.replace("_", " ")}
        </span>

        {/* ADMIN ACTIONS */}
        <div className="pt-4 space-y-2">
          <h3 className="text-sm font-medium">Admin Actions</h3>

          <div className="flex flex-wrap gap-2">
            {student.status === "PENDING_PAYMENT" && (
              <button onClick={() => action("approve")} className="btn-green">
                Approve
              </button>
            )}

            {student.status === "ACTIVE" && (
              <>
                <button onClick={() => action("hold")} className="btn-border">
                  Hold
                </button>
                <button onClick={() => action("remind")} className="btn-blue">
                  Send Reminder
                </button>
              </>
            )}

            {student.status !== "LEFT" && (
              <button onClick={() => action("exit")} className="btn-red">
                Exit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL INPUT COMPONENT ---------------- */

function Input({ label, value, set, disabled, type = "text" }: any) {
  return (
    <label className="text-xs">
      {label}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => set(e.target.value)}
        className="w-full mt-1 border rounded-md p-1 disabled:bg-gray-100"
      />
    </label>
  );
}
