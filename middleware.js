import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// export function middleware(request) {
//   const session = auth();

//     return NextResponse.redirect(new URL("/", request.url));
// }
export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
