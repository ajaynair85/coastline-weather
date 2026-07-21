import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const image = `${protocol}://${host}/og.png`;

  return {
    title: "Coastline — California Beach Weather",
    description: "Beach-by-beach weather, surf, wind, water temperatures, and camera links across the California coast.",
    openGraph: { title: "Coastline", description: "Beach weather, coast to coast.", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Coastline", description: "Beach weather, coast to coast.", images: [image] },
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
      <body>{children}</body>
    </html>
  );
}
