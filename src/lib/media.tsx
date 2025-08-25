"use client";

import React from "react";

interface ResponsiveProperties {
  children: React.ReactNode;
  showOn: "mobile" | "desktop";
}

/**
 * A simple responsive component that shows/hides content based on screen size
 * Uses CSS media queries to avoid hydration mismatches
 */
export function Responsive({ children, showOn }: ResponsiveProperties) {
  const mobileClass =
    showOn === "mobile" ? "block md:hidden" : "hidden md:block";

  return <div className={mobileClass}>{children}</div>;
}
