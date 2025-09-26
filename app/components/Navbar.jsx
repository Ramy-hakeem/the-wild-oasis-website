"use client";

import Link from "next/link";
// because of this we used use client
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/cabins", label: "Cabins" },
    { href: "/about", label: "About" },
    { href: "/account", label: "Account" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center space-x-6 justify-between">
      <Logo />

      <div className=" px-6 py-3 flex items-center space-x-6 justify-between">
        {links.map((link) => (
          <Link
            prefetch
            key={link.href}
            href={link.href}
            className={`transition px-10 ${
              pathname === link.href
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
