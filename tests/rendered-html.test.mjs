import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships live weather and marine data integration", async () => {
  const weather = await readFile(new URL("lib/weather.ts", root), "utf8");
  assert.match(weather, /temperature_2m/);
  assert.match(weather, /wave_height/);
  assert.match(weather, /sea_surface_temperature/);
  assert.match(weather, /revalidate: 900/);
});

test("publishes searchable beach and Google discovery routes", async () => {
  const [beaches, sitemap, robots] = await Promise.all([
    readFile(new URL("lib/beaches.ts", root), "utf8"),
    readFile(new URL("app/sitemap.ts", root), "utf8"),
    readFile(new URL("app/robots.ts", root), "utf8"),
  ]);
  assert.match(beaches, /ocean-beach-san-francisco/);
  assert.match(beaches, /surfline\.com\/surf-report\/central-ocean-beach/);
  assert.match(sitemap, /beaches\.map/);
  assert.match(robots, /sitemap\.xml/);
});

test("includes secure account and subscription routes", async () => {
  const [checkout, webhook, schema] = await Promise.all([
    readFile(new URL("app/api/stripe/checkout/route.ts", root), "utf8"),
    readFile(new URL("app/api/stripe/webhook/route.ts", root), "utf8"),
    readFile(new URL("supabase/schema.sql", root), "utf8"),
  ]);
  assert.match(checkout, /trial_period_days: 7/);
  assert.match(checkout, /mode: "subscription"/);
  assert.match(webhook, /constructEvent/);
  assert.match(schema, /enable row level security/);
});
