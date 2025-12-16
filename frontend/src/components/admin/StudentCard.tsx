/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL_STUDENT || "https://study-library.onrender.com/api/students";

export default function StudentCard({
    student,
    onUpdate,
}: {
    student: any;
    onUpdate: () => void;
}) {
    const action = async (
        type: "approve" | "hold" | "exit"
    ) => {
        const res = await fetch(`${API_URL}/${student._id}/${type}`, {
            method: "PUT",
        });

        const data = await res.json();

        // 🔥 Open WhatsApp if link exists
        if (data.whatsappLink) {
            window.open(data.whatsappLink, "_blank");
        }

        onUpdate();
    };
    const planStyles: Record<string, { bg: string; text: string; label: string }> = {
        FULL_TIME: {
            bg: "#ECF8F6",
            text: "#047857",
            label: "Full Time",
        },
        HALF_TIME: {
            bg: "#EEF2FF",
            text: "#3730A3",
            label: "Half Time",
        },
    };
    const [editingPlan, setEditingPlan] = useState(false);
    const [newPlan, setNewPlan] = useState(student.planType);

    const changePlan = async () => {
        await fetch(`${API_URL}/${student._id}/plan`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planType: newPlan }),
        });

        setEditingPlan(false);
        onUpdate();
    };



    const statusStyles: Record<string, { bg: string; text: string }> = {
        PENDING_PAYMENT: { bg: "#DBEAFE", text: "#1E40AF" },
        ACTIVE: { bg: "#DCFCE7", text: "#166534" },
        HOLD: { bg: "#FEF3C7", text: "#92400E" },
        LEFT: { bg: "#FEE2E2", text: "#991B1B" },
    };

    const style = statusStyles[student.status] || statusStyles.LEFT;

    return (
        <div className="rounded-xl bg-white border p-4 space-y-2">
            {/* Header */}
            <div className="flex justify-between items-start gap-2">
                <div>
                    <h3 className="font-medium">{student.name}</h3>

                    {/* Plan badge */}
                    {student.planType && (
                        <span
                            className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
                            style={{
                                backgroundColor: planStyles[student.planType]?.bg,
                                color: planStyles[student.planType]?.text,
                            }}
                        >
                            {planStyles[student.planType]?.label}
                        </span>
                    )}
                </div>

                {/* Status badge */}
                <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                        backgroundColor:
                            student.status === "ACTIVE"
                                ? "#DCFCE7"
                                : student.status === "HOLD"
                                    ? "#FEF3C7"
                                    : student.status === "PENDING_PAYMENT"
                                        ? "#DBEAFE"
                                        : "#FEE2E2",
                        color:
                            student.status === "ACTIVE"
                                ? "#166534"
                                : student.status === "HOLD"
                                    ? "#92400E"
                                    : student.status === "PENDING_PAYMENT"
                                        ? "#1E40AF"
                                        : "#991B1B",
                    }}
                >
                    {student.status.replace("_", " ")}
                </span>
            </div>


            {/* Info */}
            <p className="text-sm text-gray-600">📞 {student.phone}</p>
            <p className="text-sm">
                Seat: <strong>{student.seatNo}</strong>
            </p>
            <p className="text-sm">
                ₹{student.monthlyFee} / month
            </p>

            <p className="text-sm">🎓 {student.education}</p>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
                {student.status === "PENDING_PAYMENT" && (
                    <button
                        onClick={() => action("approve")}
                        className="flex-1 rounded-lg py-1 text-sm text-white bg-green-600"
                    >
                        Approve
                    </button>
                )}
                {student.status !== "LEFT" && (
                    <button
                        onClick={() => setEditingPlan(true)}
                        className="flex-1 border rounded-lg py-1 text-sm"
                    >
                        Change Plan
                    </button>
                )}


                {student.status === "ACTIVE" && (
                    <button
                        onClick={() => action("hold")}
                        className="flex-1 border rounded-lg py-1 text-sm"
                    >
                        Hold
                    </button>
                )}

                {student.status !== "LEFT" && (
                    <button
                        onClick={() => action("exit")}
                        className="flex-1 rounded-lg py-1 text-sm text-white bg-red-500"
                    >
                        Exit
                    </button>
                )}
            </div>
            {editingPlan && (
                <div className="mt-3 rounded-lg border p-3 bg-[#F9FAFB] space-y-2">
                    <p className="text-xs font-medium">Select new plan</p>

                    <select
                        value={newPlan}
                        onChange={(e) => setNewPlan(e.target.value)}
                        className="w-full border rounded-md p-1 text-sm"
                    >
                        <option value="FULL_TIME">Full Time (₹800)</option>
                        <option value="HALF_TIME">Half Time (₹500)</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={changePlan}
                            className="flex-1 rounded-md py-1 text-sm text-white bg-[#4DB6AC]"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setEditingPlan(false)}
                            className="flex-1 rounded-md py-1 text-sm border"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
 

