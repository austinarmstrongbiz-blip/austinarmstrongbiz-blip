/**
 * The social icon row, shared by the site footer and the collage landing page.
 *
 * The collage has no header and no footer, so these are the only outbound
 * profile links on it — which is why they live here rather than staying inline
 * in the footer where they started.
 */

interface Social {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const socials: Social[] = [
  {
    href: "https://www.instagram.com/austinarmstrong20/",
    label: "Instagram",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://x.com/austin_2020",
    label: "X (Twitter)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/austin-armstrong20/",
    label: "LinkedIn",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    // NOTE: handle assumed to match Instagram/LinkedIn — Austin to confirm.
    href: "https://www.tiktok.com/@austinarmstrong20",
    label: "TikTok",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12v-3.2a5.86 5.86 0 0 0-.76-.05 5.72 5.72 0 1 0 5.72 5.72V9.01a7.35 7.35 0 0 0 4.28 1.37V7.29a4.28 4.28 0 0 1-3.26-1.47z" />
      </svg>
    ),
  },
];

export default function SocialLinks({ gap = "1.25rem" }: { gap?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="social-icon"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
