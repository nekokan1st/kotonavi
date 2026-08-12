"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
type Detail = Record<string, unknown> & { event?: string };
function send(event: string, detail: Detail = {}) {
  const body = JSON.stringify({ event, path: location.pathname, referrer: document.referrer || undefined, ...detail });
  if (navigator.sendBeacon) navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
  else fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true }).catch(() => undefined);
}
export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => send("page_view"), [pathname]);
  useEffect(() => {
    const outbound = (event: Event) => { const detail = (event as CustomEvent<Detail>).detail ?? {}; send(String(detail.event ?? "outbound_click"), detail); };
    const click = (event: MouseEvent) => { const a = (event.target as Element | null)?.closest("a"); if (a?.dataset.track === "related") send("related_problem_click", { href: a.getAttribute("href") }); };
    window.addEventListener("kotonavi:outbound", outbound); document.addEventListener("click", click);
    return () => { window.removeEventListener("kotonavi:outbound", outbound); document.removeEventListener("click", click); };
  }, []);
  return null;
}
