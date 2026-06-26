import TopDateBar from "./components/TopDateBar";
import TodayHeader from "./components/TodayHeader";
import Timeline from "./components/Timeline";
import RightSidebar from "./components/RightSidebar";

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white">

      <TopDateBar />

      <TodayHeader />

      <div className="px-8 pb-12">

        <div className="grid grid-cols-12 gap-8">

          {/* Timeline */}
          <div className="col-span-9">
            <Timeline />
          </div>

          {/* Sidebar */}
          <div className="col-span-3">
            <RightSidebar />
          </div>

        </div>

      </div>

    </main>
  );
}
