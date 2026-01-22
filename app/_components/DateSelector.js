"use client";
import { isWithinInterval, set } from "date-fns";
import { DayPicker, UI } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range?.from, end: range?.to }),
    )
  );
}

function DateSelector({ settings, bookingDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = cabin.regularPrice;
  const discount = cabin.discount;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  return (
    <div className="flex flex-col justify-between grow ">
      <DayPicker
        className="pt-5 self-center "
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={(rang) => {
          setRange(rang);
        }}
        selected={range}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        classNames={{
          [UI.Week]: "grid grid-cols-7 gap-0",
          [UI.Day]: "h-8 w-8  flex items-center justify-center",
          [UI.Weekdays]: "grid grid-cols-7 gap-0",
          [UI.Weekday]: "w-8  text-center",
          [UI.Tbody]: "space-y-1",
          [UI.Month]: "space-y-2",
        }}
        modifiersClassNames={{
          range_start: "bg-accent-500 text-white rounded-l-full",
          range_end: "bg-accent-500 text-white rounded-r-full",
          range_middle: "bg-accent-200 text-primary-900",
          selected: "bg-accent-500 text-white",
          today: " text-accent-500",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
