"use client";

import { useEffect, useState } from "react";

// The first page load has its own intro; only later navigations get the curtain.
let firstLoad = true;

/** Re-mounts on every route change: a dark curtain lifts off the new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  // Decided during render so the curtain is there from the very first frame.
  const [play, setPlay] = useState(() => !firstLoad);

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <>
      {play && <div aria-hidden className="curtain play" onAnimationEnd={() => setPlay(false)} />}
      {children}
    </>
  );
}
