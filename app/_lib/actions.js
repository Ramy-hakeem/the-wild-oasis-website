"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");
  const idRegex = /^(?=.*\d)[A-Za-z0-9\- ]{4,25}$/;
  if (nationalID && !idRegex.test(nationalID)) {
    throw new Error("Invalid National ID number format");
  }
  const { data, error } = await supabase
    .from("guests")
    .update({ nationalID, nationality, countryFlag })
    .eq("id", session.user.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  const guestBookings = await getBookings(session.user.id);
  const bookingToDelete = guestBookings.find(
    (booking) => booking.id === bookingId,
  );
  if (!bookingToDelete) {
    throw new Error("Booking not found or does not belong to the user");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData, bookingId) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  const guestBookings = await getBookings(session.user.id);
  const bookingToUpdate = guestBookings.find(
    (booking) => +booking.id === +bookingId,
  );
  console.log("check what is wrong", session.user.id, bookingId, guestBookings);
  if (!bookingToUpdate) {
    throw new Error("Booking not found or does not belong to the user");
  }
  const updates = Object.fromEntries(formData.entries());
  const { error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
  // revalidatePath("/account/reservations");
}
