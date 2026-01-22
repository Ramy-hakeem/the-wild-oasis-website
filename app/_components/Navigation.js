"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Cabins",
    href: "/cabins",
  },
  {
    name: "About",
    href: "/about",
  },
];
export default function Navigation({ session }) {
  const pathname = usePathname();
  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              prefetch
              href={link.href}
              className={`hover:text-accent-400 transition-colors ${isActive(link.href) ? "text-accent-400 font-semibold" : ""}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
        {session?.user?.image ? (
          <li key="Guest area">
            <Link
              prefetch
              href={"/account"}
              className={`flex items-center gap-4 hover:text-accent-400 transition-colors ${isActive("/account") ? "text-accent-400 font-semibold" : ""}`}
            >
              <img
                src={session.user.image}
                alt="User avatar"
                className="h-8  rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="ml-2">Guest area</span>
            </Link>
          </li>
        ) : (
          <li key="Guest area">
            <Link
              prefetch
              href={"/account"}
              className={`hover:text-accent-400 transition-colors ${isActive("/account") ? "text-accent-400 font-semibold" : ""}`}
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
