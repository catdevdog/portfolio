import { useEffect, useState } from "react";
import { breakpoints } from "@/styles/media";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileBreakpoint = Number(breakpoints.mobile); // 980px

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= isMobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}
