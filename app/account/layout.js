"use client";
import { usePathname } from "next/navigation";
import SideNavigation from "../_components/SideNavigation";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export default function layout({ children }) {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12 ">
      <div>
        <SideNavigation />
      </div>
      <Suspense fallback={<Spinner />} key={pathname}>
        <div className="py-1">{children}</div>
      </Suspense>
    </div>
  );
}
