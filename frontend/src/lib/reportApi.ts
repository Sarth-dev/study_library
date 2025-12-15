const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getMonthlyReport(month: string) {
  const res = await fetch(`${BASE_URL}/reports/monthly?month=${month}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch monthly report");
  return res.json();
}

export async function getDueReport() {
  const res = await fetch(`${BASE_URL}/reports/dues`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch due report");
  return res.json();
}
