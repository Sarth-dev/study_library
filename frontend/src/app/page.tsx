/* eslint-disable react/jsx-no-undef */
import Link from "next/link";
import Image from "next/image"

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F9FAFB" }}
    >
      {/* Header with Logo */}
      <header className="px-5 py-4 flex items-center gap-3">
        {/* Logo */}
        <div className="relative h-10 w-10">
          <Image
            src="/images/study_plus.png"     // 👈 your image
            alt="Study Library Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div>
          <h1
            className="text-lg font-semibold"
            style={{ color: "#4DB6AC" }}
          >
            Study Plus
          </h1>
          <p className="text-xs text-gray-500">
            A peaceful space for focused learning
          </p>
        </div>
      </header>


      {/* Hero Section */}
      <section className="flex-1 px-5 flex flex-col justify-center items-center text-center gap-6">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          A calm place to{" "}
          <span style={{ color: "#4DB6AC" }}>focus</span>,{" "}
          <span style={{ color: "#4DB6AC" }}>learn</span>, and{" "}
          <span style={{ color: "#4DB6AC" }}>grow</span>
        </h2>

        <p className="text-gray-600 max-w-md">
          A disciplined and silent study library designed for students preparing
          for exams, competitive studies, and long focused hours.
        </p>

        {/* Quick Highlights */}
        <div className="flex gap-6 text-sm text-gray-600">
          <div>💧 RO Water</div>
          <div>🔇 Silent Zone</div>
          <div>📚 Fixed Seating</div>
        </div>

        <Link
          href="/admission"
          className="mt-4 inline-flex items-center justify-center rounded-full px-8 py-3 text-white font-medium shadow-md active:scale-95 transition"
          style={{ backgroundColor: "#4DB6AC" }}
        >
          Apply for Admission
        </Link>
      </section>

      {/* Why Choose Us */}
      <section className="px-5 py-10 bg-white">
        <h3 className="text-xl font-semibold text-center mb-8">
          Why students choose us
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              title: "Calm Environment",
              desc: "A quiet and disciplined atmosphere that helps students stay focused for long hours.",
            },
            {
              title: "Comfortable Seating",
              desc: "Ergonomic chairs, proper lighting, and fixed seating for a consistent study routine.",
            },
            {
              title: "Transparent System",
              desc: "Clear rules, fixed fees, and a structured system with no confusion.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 shadow-sm"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              <h4 className="font-medium mb-2" style={{ color: "#4DB6AC" }}>
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-10">
        <h3 className="text-xl font-semibold text-center mb-8">
          How admission works
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            "Fill admission form",
            "Choose your seat",
            "Get approval & start studying",
          ].map((text, index) => (
            <div key={text}>
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: "#4DB6AC" }}
              >
                {index + 1}
              </div>
              <p className="font-medium">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Study Plus. All rights reserved.
      </footer>
    </main>
  );
}
