"use client";

import Script from "next/script";

/**
 * Microsoft Clarity — session recordings, heatmaps, rage/dead-click signals.
 *
 * Renders nothing unless `NEXT_PUBLIC_CLARITY_ID` is set, so the third-party
 * script ships dark until a project ID is added to the Vercel env vars.
 * Complements (does not replace) Vercel Analytics + Speed Insights.
 */
export default function Clarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!projectId) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");`}
    </Script>
  );
}
