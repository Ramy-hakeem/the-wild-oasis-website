import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export const metadata = {
  title: "Account",
};

async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "";
  const bookings = await getBookings(session.user.id);
  const numBookings = bookings.length;

  const totalSpent = bookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );
  const today = new Date();
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.startDate) > today,
  );
  const nextBooking = upcomingBookings.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate),
  )[0];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-3xl text-accent-400">
          Welcome back, {firstName}!
        </h2>
        <div className="text-right">
          <p className="text-primary-200 text-sm">Account Overview</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-800 rounded-lg p-6 flex items-center gap-4">
          <CalendarDaysIcon className="h-8 w-8 text-accent-400" />
          <div>
            <p className="text-2xl font-bold text-primary-100">{numBookings}</p>
            <p className="text-primary-200">Total Reservations</p>
          </div>
        </div>
        <div className="bg-primary-800 rounded-lg p-6 flex items-center gap-4">
          <CurrencyDollarIcon className="h-8 w-8 text-accent-400" />
          <div>
            <p className="text-2xl font-bold text-primary-100">
              ${totalSpent.toLocaleString()}
            </p>
            <p className="text-primary-200">Total Spent</p>
          </div>
        </div>
        <div className="bg-primary-800 rounded-lg p-6 flex items-center gap-4">
          <MapPinIcon className="h-8 w-8 text-accent-400" />
          <div>
            <p className="text-2xl font-bold text-primary-100">
              {upcomingBookings.length}
            </p>
            <p className="text-primary-200">Upcoming Trips</p>
          </div>
        </div>
      </div>

      {/* Next Reservation */}
      {nextBooking && (
        <div className="bg-primary-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-accent-400 mb-4">
            Your Next Adventure
          </h3>
          <div className="flex items-center gap-4">
            <img
              src={nextBooking.cabins.image}
              alt={nextBooking.cabins.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="text-lg font-medium text-primary-100">
                {nextBooking.cabins.name}
              </p>
              <p className="text-primary-200">
                {new Date(nextBooking.startDate).toLocaleDateString()} -{" "}
                {new Date(nextBooking.endDate).toLocaleDateString()}
              </p>
              <p className="text-primary-200">
                {nextBooking.numGuests} guests, {nextBooking.numNights} nights
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-primary-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-accent-400 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/cabins"
            className="bg-accent-500 hover:bg-accent-600 text-primary-800 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MapPinIcon className="h-5 w-5" />
            Book a Cabin
          </Link>
          <Link
            href="/account/reservations"
            className="bg-primary-700 hover:bg-primary-600 text-primary-100 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CalendarDaysIcon className="h-5 w-5" />
            View Reservations
          </Link>
          <Link
            href="/account/profile"
            className="bg-primary-700 hover:bg-primary-600 text-primary-100 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <UserIcon className="h-5 w-5" />
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
