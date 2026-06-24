import Link from "next/link";

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-6 py-4 flex gap-8">

      <Link href="/">
        Home
      </Link>

      <Link href="/schedule">
        Schedule
      </Link>

      <Link href="/goals">
        Goals
      </Link>

      <Link href="/insights">
        Insights
      </Link>

    </div>
  );
}