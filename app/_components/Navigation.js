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
  {
    name: "Guest area",
    href: "/account",
  },
];
export default function Navigation() {
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
      </ul>
    </nav>
  );
}
