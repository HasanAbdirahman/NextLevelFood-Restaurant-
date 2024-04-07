"use client";
import Link from "next/link";
import classes from "./navLink.module.css";

import { usePathname } from "next/navigation";
export default function NavLink({ href, children }) {
  let path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
