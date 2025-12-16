const BASE_URL = process.env.NEXT_PUBLIC_API_URL ||"https://study-library.onrender.com/api";

export async function getSeats() {
  const res = await fetch(`${BASE_URL}/seats`);
  if (!res.ok) throw new Error("Failed to fetch seats");
  return res.json();
}

export async function submitAdmission(formData: FormData) {
  const res = await fetch(`${BASE_URL}/students/admission`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Admission failed");
  }

  return res.json();
}
