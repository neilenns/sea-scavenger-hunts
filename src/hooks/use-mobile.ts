import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Start with 'false' (desktop) as the default since most traffic is likely desktop
  // and the desktop layout is more complex/fully-featured
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useLayoutEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches)
    }
    
    // Set initial value immediately
    setIsMobile(mql.matches)
    
    // Listen for changes
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
