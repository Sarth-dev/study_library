"use client";

import Link from "next/link";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Students", path: "/admin/students" },
  { name: "Seats", path: "/admin/seats" },
  { name: "Payments", path: "/admin/payments" },
  { name: "Reports", path: "/admin/reports" },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-60 bg-white border-r z-50
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div
          className="p-4 text-lg font-semibold border-b"
          style={{ color: "#4DB6AC" }}
        >
          Study Plus
        </div>

        <nav className="px-3 py-4 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={onClose}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
