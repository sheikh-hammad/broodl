"use client";
import { baseRating, gradients } from "@/utils";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

interface CalendarProps {
  demo: boolean;
  completeData?: Record<number, Record<number, Record<number, number>>>; // Nested object for year -> month -> day data
  handleSetMood?: (mood: number) => void; // Optional handler
}

export default function Calendar({ demo, completeData, handleSetMood }: CalendarProps) {
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectMonth] = useState<string>(monthsArr[currMonth]);
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val: number) {
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectMonth(monthsArr[0]);
    } else {
      setSelectMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(selectedYear, numericMonth, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={"text-center col-span-3 capitalized whitespace-nowrap textGradient " + fugaz.className}
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => handleIncrementMonth(1)}
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              const dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              const dayDisplay = dayIndex > 0 && dayIndex <= daysInMonth;
              const isToday = dayIndex === now.getDate() && numericMonth === now.getMonth();

              if (!dayDisplay) {
                return <div key={dayOfWeekIndex} className="bg-white" />;
              }

              const color = demo
                ? gradients.indigo[baseRating[dayIndex] || 0]
                : dayIndex in data
                ? gradients.indigo[data[dayIndex]]
                : "white";

              return (
                <div
                  key={dayOfWeekIndex}
                  style={{ background: color }}
                  className={
                    "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                    (isToday ? " border-indigo-400" : " border-indigo-100") +
                    (color === "white" ? " text-indigo-400" : " text-white")
                  }
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
