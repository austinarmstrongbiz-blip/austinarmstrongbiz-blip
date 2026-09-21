"use client";

import { usePathname } from "next/navigation";

/**
 * Hides its children on /matchday pages. The site footer's None of the Above
 * signup would otherwise sit under Matchday's own signup box, pitching a
 * different list to a football audience. The children still render on the
 * server; this only decides whether to show them.
 */
export default function HideOnMatchday({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/matchday") ? null : children;
}
