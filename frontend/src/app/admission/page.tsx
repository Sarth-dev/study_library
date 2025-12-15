import AdmissionStepper from "@/src/components/admission/AdmissionStepper";

export default function AdmissionPage() {
  return (
    <main
      className="min-h-screen px-4 py-6"
      style={{ backgroundColor: "#F9FAFB" }}
    >
      <div className="mx-auto max-w-md">
        <h1
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: "#4DB6AC" }}
        >
          Student Admission
        </h1>

        <AdmissionStepper />
      </div>
    </main>
  );
}
