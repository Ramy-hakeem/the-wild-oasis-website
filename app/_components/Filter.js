"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  function updateFilter(capacity) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", capacity);
    router.replace(pathname + "?" + params.toString(), { scroll: false });
  }
  return (
    <div className="border border-primary-800">
      <button
        onClick={() => updateFilter("all")}
        className={`px-5 py-2 hover:bg-primary-700  ${
          !searchParams.get("capacity") ||
          searchParams.get("capacity") === "all"
            ? "bg-primary-700"
            : ""
        }`}
      >
        All Cabins
      </button>
      <button
        onClick={() => updateFilter("small")}
        className={`px-5 py-2 hover:bg-primary-700  ${
          searchParams.get("capacity") === "small" ? "bg-primary-700" : ""
        }`}
      >
        1 &mdash; 3 guests{" "}
      </button>
      <button
        onClick={() => updateFilter("medium")}
        className={`px-5 py-2 hover:bg-primary-700  ${
          searchParams.get("capacity") === "medium" ? "bg-primary-700" : ""
        }`}
      >
        4 &mdash; 7 guests{" "}
      </button>
      <button
        onClick={() => updateFilter("large")}
        className={`px-5 py-2 hover:bg-primary-700  ${
          searchParams.get("capacity") === "large" ? "bg-primary-700" : ""
        }`}
      >
        8 &mdash; 10 guests{" "}
      </button>
    </div>
  );
}
