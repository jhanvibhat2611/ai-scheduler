"use client";

import { useState } from "react";

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

      <h2 className="text-4xl font-bold text-center text-white">
        {commitment}
      </h2>

      <p className="text-center text-slate-400 mt-3">
        Choose the time for this commitment.
      </p>

      <div className="mt-8 bg-[#0F172A] rounded-2xl p-4">

        <p className="text-violet-400 text-sm mb-2">
          Days
        </p>

        <div className="flex flex-wrap gap-2">

          {days.map((day) => (

            <span
              key={day}
              className="px-4 py-2 rounded-full bg-violet-600 text-white text-sm"
            >
              {day}
            </span>

          ))}

        </div>

      </div>

      {sameTime && (

        <>

          <div className="mt-10">

            <h3 className="text-white font-semibold text-lg mb-5">
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

            <h3 className="text-white font-semibold text-lg mb-5">
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

              <h3 className="text-white font-semibold text-xl mb-6">
                {day}
              </h3>

              <div>

                <p className="text-slate-400 mb-3">
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

                <p className="text-slate-400 mb-3">
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
              day === "Mon" ? "Monday" :
              day === "Tue" ? "Tuesday" :
              day === "Wed" ? "Wednesday" :
              day === "Thu" ? "Thursday" :
              day === "Fri" ? "Friday" :
              day === "Sat" ? "Saturday" :
              "Sunday",

            start: convertTo24Hour(
              hour,
              minute,
              period
            ),

            end: convertTo24Hour(
              endHour,
              endMinute,
              endPeriod
            ),

          }))

        : days.map((day) => ({

            day:
              day === "Mon" ? "Monday" :
              day === "Tue" ? "Tuesday" :
              day === "Wed" ? "Wednesday" :
              day === "Thu" ? "Thursday" :
              day === "Fri" ? "Friday" :
              day === "Sat" ? "Saturday" :
              "Sunday",

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
  className="
    w-full
    mt-12
    bg-violet-600
    hover:bg-violet-500
    transition
    py-4
    rounded-2xl
    text-lg
    font-semibold
  "
>
  Continue
</button>
</div>
  );
}