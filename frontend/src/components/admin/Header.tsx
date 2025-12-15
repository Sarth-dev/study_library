"use client";

export default function Header({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 justify-between">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-xl"
      >
        ☰
      </button>

      <h1 className="font-medium">Admin Dashboard</h1>

      <span className="text-sm text-gray-500">Admin</span>
    </header>
  );
}
