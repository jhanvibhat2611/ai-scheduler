// components/Card.tsx

export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-6 shadow-lg border border-zinc-800">
      {children}
    </div>
  );
}