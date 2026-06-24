// components/QuickActionButton.tsx

export default function QuickActionButton({
  title,
}: {
  title: string;
}) {
  return (
    <button
      className="
      bg-blue-600
      text-white
      px-5
      py-3
      rounded-2xl
      font-medium
      "
    >
      {title}
    </button>
  );
}