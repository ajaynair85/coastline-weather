"use client";

import { useEffect } from "react";

const visitorKey = "coastline_visitor_id";

function getVisitorId() {
  const saved = window.localStorage.getItem(visitorKey);
  if (saved) return saved;

  const id = window.crypto.randomUUID();
  window.localStorage.setItem(visitorKey, id);
  return id;
}

export function VisitTracker() {
  useEffect(() => {
    const visitorId = getVisitorId();

    fetch("/api/visitors", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ visitorId }),
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(({ count }) => {
        window.dispatchEvent(new CustomEvent("coastline:visitor-count", { detail: count }));
      })
      .catch(() => undefined);
  }, []);

  return null;
}
