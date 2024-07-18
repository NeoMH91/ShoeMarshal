"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// An array of objects related to navigation

const links = [
  {
    key: 0,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    key: 1,
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    key: 2,
    name: "Products",
    href: "/dashboard/products",
  },
  {
    key: 0,

    name: "Banner Picture",
    href: "/dashboard/banner",
  },
];

export function DashboardNavigation() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "text-foreground bg-green-200 p-1"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
