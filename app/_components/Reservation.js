import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
  const [settings, bookingDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="flex justify-between flex-row border gap-0 border-primary-800 min-h-[200px] w-[75rem]">
      <DateSelector
        settings={settings}
        bookingDates={bookingDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
