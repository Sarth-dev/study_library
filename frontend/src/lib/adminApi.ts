const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://study-library.onrender.com/api" ;

export async function getDashboardStats() {
  const res = await fetch(`${BASE_URL}/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}
