"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    function updateCount(event: Event) {
      const nextCount = (event as CustomEvent<number>).detail;
      if (Number.isFinite(nextCount)) setCount(nextCount);
    }

    window.addEventListener("coastline:visitor-count", updateCount);
    fetch("/api/visitors")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setCount(data.count))
      .catch(() => undefined);

    return () => window.removeEventListener("coastline:visitor-count", updateCount);
  }, []);

  if (count === null) return null;

  return (
    <span className="visitor-counter" aria-live="polite" title="Anonymous browsers that have visited Coastline">
      <i aria-hidden="true" />
      {new Intl.NumberFormat("en-US").format(count)} coastal {count === 1 ? "visitor" : "visitors"}
    </span>
  );
}
