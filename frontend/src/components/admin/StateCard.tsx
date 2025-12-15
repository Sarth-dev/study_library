export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white border p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className="text-xl font-semibold mt-1"
        style={{ color: "#4DB6AC" }}
      >
        {value}
      </p>
    </div>
  );
}
