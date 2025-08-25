"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

interface MobileContextValue {
  isMobile: boolean;
}

const MobileContext = React.createContext<MobileContextValue | undefined>(
  undefined
);

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const value = React.useMemo(
    () => ({
      isMobile: !!isMobile,
    }),
    [isMobile]
  );

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
}

export function useIsMobile() {
  const context = React.useContext(MobileContext);
  if (context === undefined) {
    throw new Error("useIsMobile must be used within a MobileProvider");
  }
  return context.isMobile;
}