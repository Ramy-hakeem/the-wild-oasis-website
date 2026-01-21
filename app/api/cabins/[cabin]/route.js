import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const cabin = (await params)?.cabin;
  try {
    const [cabins, bookedDates] = await Promise.all([
      getCabin(cabin),
      getBookedDatesByCabinId(cabin),
    ]);
    return Response.json({ cabins, bookedDates }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Cabin not found" }, { status: 404 });
  }
}
