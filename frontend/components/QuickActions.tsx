import QuickActionButton from "./QuickActionButton";

export default function QuickActions() {
  return (
    <div className="flex gap-3">
      <QuickActionButton title="+ Task" />
      <QuickActionButton title="⚡ Schedule" />
      <QuickActionButton title="💬 Yumee" />
    </div>
  );
}