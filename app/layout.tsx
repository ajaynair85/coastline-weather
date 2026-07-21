import type { Metadata } from "next";
import { headers } from "next/headers";
import { VisitTracker } from "@/components/visit-tracker";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const image = `${protocol}://${host}/og.png`;

  return {
    metadataBase: new URL(siteUrl),
    title: "Coastline — California Beach Weather",
    description: "Beach-by-beach weather, surf, wind, water temperatures, and camera links across the California coast.",
    alternates: { canonical: siteUrl },
    openGraph: { title: "Coastline", description: "Beach weather, coast to coast.", url: siteUrl, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Coastline", description: "Beach weather, coast to coast.", images: [image] },
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><VisitTracker />{children}</body>
    </html>
  );
}
