"use client";

import { useState } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";

import TimePicker from "./TimePicker";

type Props = {
  commitment: string;
  days: string[];
  sameTime: boolean;
  onSave: (data: any) => void;
};

export default function Step6({
  commitment,
  days,
  sameTime,
  onSave,
}: Props) {

  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const [endHour, setEndHour] = useState("05");
  const [endMinute, setEndMinute] = useState("00");
  const [endPeriod, setEndPeriod] = useState("PM");

  const [dayTimes, setDayTimes] = useState<Record<
    string,
    {
      startHour: string;
      startMinute: string;
      startPeriod: string;
      endHour: string;
      endMinute: string;
      endPeriod: string;
    }
  >>({});

  function updateDayTime(
      day: string,
      field: string,
      value: string
    ) {

      setDayTimes((prev) => ({

        ...prev,

        [day]: {

          startHour: prev[day]?.startHour ?? "09",
          startMinute: prev[day]?.startMinute ?? "00",
          startPeriod: prev[day]?.startPeriod ?? "AM",

          endHour: prev[day]?.endHour ?? "05",
          endMinute: prev[day]?.endMinute ?? "00",
          endPeriod: prev[day]?.endPeriod ?? "PM",

          ...prev[day],

          [field]: value,

        },

      }));

    }

  function convertTo24Hour(
      hour: string,
      minute: string,
      period: string
    ) {

      let h = parseInt(hour);

      if (period === "PM" && h !== 12) {
        h += 12;
      }

      if (period === "AM" && h === 12) {
        h = 0;
      }

      return `${String(h).padStart(2, "0")}:${minute}`;

    }

  return (

    <div>

<div className="text-center">

  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
    <CalendarDays
      size={30}
      className="text-violet-600"
    />
  </div>

  <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
    {commitment}
  </span>

  <h2 className="mt-6 text-4xl font-bold text-slate-900">
    What time does this happen?
  </h2>

  <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-500">
    Tell Yumee when this commitment starts and ends.
  </p>

</div>

 <div className="mt-10 rounded-3xl border border-violet-100 bg-violet-50 p-6">

  <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-600">
    Days
  </p>

  <div className="flex flex-wrap gap-3">

    {days.map((day) => (

      <span
        key={day}
        className="rounded-full bg-[#6D5DF6] px-4 py-2 text-sm font-medium text-white shadow-sm"
      >
        {day}
      </span>

    ))}

  </div>

</div>

{sameTime && (

  <>
    <div className="mt-10">

      <h3 className="mb-5 text-lg font-semibold text-slate-800">
        Start Time
      </h3>

            <TimePicker
              hour={hour}
              minute={minute}
              period={period}
              setHour={setHour}
              setMinute={setMinute}
              setPeriod={setPeriod}
            />

          </div>

          <div className="mt-10">
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
              End Time
            </h3>

            <TimePicker
              hour={endHour}
              minute={endMinute}
              period={endPeriod}
              setHour={setEndHour}
              setMinute={setEndMinute}
              setPeriod={setEndPeriod}
            />

          </div>

        </>

      )}

      {!sameTime && (

        <div className="space-y-10 mt-10">

          {days.map((day) => (

            <div
              key={day}
              className="bg-[#0F172A] rounded-2xl p-6 border border-slate-700"
            >

            <h3 className="mb-6 text-xl font-bold text-slate-900">
              {day}
            </h3>

              <div>

                <p className="mb-3 font-medium text-slate-600">
                  Start Time
                </p>

                <TimePicker
                  hour={dayTimes[day]?.startHour ?? "09"}
                  minute={dayTimes[day]?.startMinute ?? "00"}
                  period={dayTimes[day]?.startPeriod ?? "AM"}
                  setHour={(v) => updateDayTime(day, "startHour", v)}
                  setMinute={(v) => updateDayTime(day, "startMinute", v)}
                  setPeriod={(v) => updateDayTime(day, "startPeriod", v)}
                />

              </div>

              <div className="mt-8">

                <p className="mb-3 font-medium text-slate-600">
                  End Time
                </p>

                <TimePicker
                  hour={dayTimes[day]?.endHour ?? "05"}
                  minute={dayTimes[day]?.endMinute ?? "00"}
                  period={dayTimes[day]?.endPeriod ?? "PM"}
                  setHour={(v) => updateDayTime(day, "endHour", v)}
                  setMinute={(v) => updateDayTime(day, "endMinute", v)}
                  setPeriod={(v) => updateDayTime(day, "endPeriod", v)}
                />

              </div>

            </div>

          ))}

        </div>

      )}

<button
  onClick={() =>
    onSave({
      commitment,
      sameTime,
      days: sameTime
        ? days.map((day) => ({
            day:
              day === "Mon"
                ? "Monday"
                : day === "Tue"
                ? "Tuesday"
                : day === "Wed"
                ? "Wednesday"
                : day === "Thu"
                ? "Thursday"
                : day === "Fri"
                ? "Friday"
                : day === "Sat"
                ? "Saturday"
                : "Sunday",

            start: convertTo24Hour(hour, minute, period),
            end: convertTo24Hour(endHour, endMinute, endPeriod),
          }))
        : days.map((day) => ({
            day:
              day === "Mon"
                ? "Monday"
                : day === "Tue"
                ? "Tuesday"
                : day === "Wed"
                ? "Wednesday"
                : day === "Thu"
                ? "Thursday"
                : day === "Fri"
                ? "Friday"
                : day === "Sat"
                ? "Saturday"
                : "Sunday",

            start: convertTo24Hour(
              dayTimes[day]?.startHour ?? "09",
              dayTimes[day]?.startMinute ?? "00",
              dayTimes[day]?.startPeriod ?? "AM"
            ),

            end: convertTo24Hour(
              dayTimes[day]?.endHour ?? "05",
              dayTimes[day]?.endMinute ?? "00",
              dayTimes[day]?.endPeriod ?? "PM"
            ),
          })),
    })
  }
  className="mt-12 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6D5DF6] py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(109,93,246,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5B4CE3]"
>
  Continue
  <ArrowRight size={18} strokeWidth={2.5} />
</button>
</div>
  );
}