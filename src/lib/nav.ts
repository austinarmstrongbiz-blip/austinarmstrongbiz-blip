/**
 * The site's primary navigation, in one place.
 *
 * The desktop header (src/app/layout.tsx) and the mobile drawer
 * (src/components/ui/MobileNav.tsx) previously kept separate copies of this
 * list, and they had already drifted — "The Homies" existed only on desktop.
 * Both now import from here so a new section is added once.
 */

export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/now", label: "Field Notes" },
  { href: "/essays", label: "Essays" },
  { href: "/matchday", label: "Matchday" },
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Work" },
  { href: "/playbook", label: "The Homies" },
  { href: "/resume", label: "CV" },
];
