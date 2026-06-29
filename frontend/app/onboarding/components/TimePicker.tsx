"use client";

import Picker from "react-mobile-picker";
import { useMemo } from "react";

type Props = {
  hour: string;
  minute: string;
  period: string;
  setHour: (v: string) => void;
  setMinute: (v: string) => void;
  setPeriod: (v: string) => void;
};

export default function TimePicker({
  hour,
  minute,
  period,
  setHour,
  setMinute,
  setPeriod,
}: Props) {
  const hours = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        String(i + 1).padStart(2, "0")
      ),
    []
  );

  const minutes = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
      ),
    []
  );

  const value = {
    hour,
    minute,
    period,
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-violet-100
        bg-white
        p-6
        shadow-[0_15px_40px_rgba(109,93,246,0.10)]
      "
    >
      <Picker
        value={value}
        onChange={(val) => {
          setHour(val.hour);
          setMinute(val.minute);
          setPeriod(val.period);
        }}
      >
        <Picker.Column name="hour">
          {hours.map((h) => (
            <Picker.Item key={h} value={h}>
              {({ selected }) => (
                <div
                  className={`py-3 text-3xl transition-all duration-200 ${
                    selected
                      ? "font-bold text-violet-600 scale-110"
                      : "text-slate-400"
                  }`}
                >
                  {h}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="minute">
          {minutes.map((m) => (
            <Picker.Item key={m} value={m}>
              {({ selected }) => (
                <div
                  className={`py-3 text-3xl transition-all duration-200 ${
                    selected
                      ? "font-bold text-violet-600 scale-110"
                      : "text-slate-400"
                  }`}
                >
                  {m}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="period">
          {["AM", "PM"].map((p) => (
            <Picker.Item key={p} value={p}>
              {({ selected }) => (
                <div
                  className={`py-3 text-3xl transition-all duration-200 ${
                    selected
                      ? "font-bold text-violet-600 scale-110"
                      : "text-slate-400"
                  }`}
                >
                  {p}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
}