export type Beach = {
  slug: string;
  name: string;
  region: string;
  zip: string;
  latitude: number;
  longitude: number;
  temp: number;
  water: number;
  wind: string;
  surf: string;
  status: "Great" | "Good" | "Breezy";
  cam: string;
  camLabel?: string;
  accent: string;
  description: string;
};

export const beaches: Beach[] = [
  { slug: "crescent-city", name: "Crescent City", region: "North Coast", zip: "95531", latitude: 41.7458, longitude: -124.2017, temp: 61, water: 54, wind: "NW 9 mph", surf: "3–4 ft", status: "Breezy", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "north", description: "A rugged far-northern California beach near Battery Point and Redwood Coast headlands." },
  { slug: "point-reyes", name: "Point Reyes", region: "North Coast", zip: "94956", latitude: 38.0682, longitude: -122.9674, temp: 64, water: 55, wind: "W 7 mph", surf: "2–3 ft", status: "Good", cam: "https://www.nps.gov/media/webcam/view.htm?id=5A967BB2-CB78-43A7-1C861C4554D5D50D", camLabel: "NPS coastal camera", accent: "north", description: "A wild Marin shoreline known for fog, wind, wildlife, and exposed Pacific surf." },
  { slug: "rodeo-beach", name: "Rodeo Beach", region: "Bay Area", zip: "94941", latitude: 37.8307, longitude: -122.5374, temp: 66, water: 55, wind: "W 10 mph", surf: "2–3 ft", status: "Good", cam: "https://www.surf-forecast.com/breaks/Fort-Cronkite-Rodeo-Beach/webcams/latest", camLabel: "Surf cameras", accent: "north", description: "A dark-sand Marin Headlands beach framed by cliffs and the Rodeo Lagoon." },
  { slug: "baker-beach", name: "Baker Beach", region: "Bay Area", zip: "94121", latitude: 37.7936, longitude: -122.4836, temp: 65, water: 55, wind: "W 12 mph", surf: "2–4 ft", status: "Breezy", cam: "https://www.cruisingearth.com/port-webcams/united-states/san-francisco-california2/", camLabel: "Nearby live camera", accent: "north", description: "A Golden Gate National Recreation Area beach with broad bridge and Marin Headlands views." },
  { slug: "ocean-beach-san-francisco", name: "Ocean Beach", region: "Bay Area", zip: "94132", latitude: 37.7594, longitude: -122.5107, temp: 64, water: 55, wind: "W 13 mph", surf: "3–5 ft", status: "Breezy", cam: "https://www.surfline.com/surf-report/central-ocean-beach/638e32a4f052ba4ed06d0e3e", camLabel: "Multiple live surf cams", accent: "north", description: "San Francisco's long, exposed Pacific beach with powerful surf and fast-changing fog and wind." },
  { slug: "pacifica-state-beach", name: "Pacifica State Beach", region: "Bay Area", zip: "94044", latitude: 37.598, longitude: -122.501, temp: 65, water: 56, wind: "NW 10 mph", surf: "2–4 ft", status: "Good", cam: "https://www.geowebcams.com/en/webcam/pacifica-state-beach-and-mori-point", camLabel: "Live camera", accent: "central", description: "A crescent-shaped beach at Linda Mar popular with surfers and backed by coastal hills." },
  { slug: "half-moon-bay", name: "Half Moon Bay", region: "Bay Area", zip: "94019", latitude: 37.4636, longitude: -122.4286, temp: 66, water: 56, wind: "NW 9 mph", surf: "2–3 ft", status: "Good", cam: "https://samschowderhouse.com/samcams/", camLabel: "Live cameras", accent: "central", description: "A string of sandy beaches and bluffs along the San Mateo County coast." },
  { slug: "stinson-beach", name: "Stinson Beach", region: "Bay Area", zip: "94970", latitude: 37.9004, longitude: -122.6444, temp: 65, water: 55, wind: "W 9 mph", surf: "2–3 ft", status: "Good", cam: "https://www.nps.gov/media/webcam/view.htm?id=5A967BB2-CB78-43A7-1C861C4554D5D50D", camLabel: "Nearest Marin camera", accent: "north", description: "A wide Marin County beach beneath Mount Tamalpais with a sheltered beach-town setting." },
  { slug: "santa-cruz", name: "Santa Cruz", region: "Central Coast", zip: "95060", latitude: 36.9516, longitude: -122.0264, temp: 68, water: 58, wind: "NW 6 mph", surf: "2–3 ft", status: "Great", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "central", description: "A classic Central Coast surf town with coves, beach breaks, and a lively waterfront." },
  { slug: "monterey-bay", name: "Monterey Bay", region: "Central Coast", zip: "93940", latitude: 36.6002, longitude: -121.8947, temp: 66, water: 57, wind: "W 8 mph", surf: "2 ft", status: "Good", cam: "https://www.montereybayaquarium.org/cams-videos/live-cams/monterey-bay-cam", accent: "central", description: "A protected marine sanctuary coast known for cool water, wildlife, and variable morning cloud." },
  { slug: "pismo-beach", name: "Pismo Beach", region: "Central Coast", zip: "93449", latitude: 35.1428, longitude: -120.6413, temp: 71, water: 60, wind: "NW 10 mph", surf: "2–3 ft", status: "Great", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "central", description: "A broad, walkable Central Coast beach centered on a historic pier." },
  { slug: "santa-monica", name: "Santa Monica", region: "Los Angeles", zip: "90401", latitude: 34.0094, longitude: -118.4973, temp: 73, water: 65, wind: "W 8 mph", surf: "1–2 ft", status: "Great", cam: "https://www.californiabeaches.com/southern-california-beach-webcams/", accent: "south", description: "An urban Los Angeles beach with a landmark pier and a wide sandy shoreline." },
  { slug: "venice-beach", name: "Venice Beach", region: "Los Angeles", zip: "90291", latitude: 33.985, longitude: -118.4695, temp: 74, water: 65, wind: "W 9 mph", surf: "1–2 ft", status: "Great", cam: "https://www.westland.net/beachcam/", accent: "south", description: "A colorful Los Angeles beach known for its boardwalk, breakwater, and open sand." },
  { slug: "huntington-beach", name: "Huntington Beach", region: "Orange County", zip: "92648", latitude: 33.6553, longitude: -118.0032, temp: 75, water: 66, wind: "SW 7 mph", surf: "2–3 ft", status: "Good", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "south", description: "Surf City USA, with a long pier and consistent open-ocean beach breaks." },
  { slug: "la-jolla-cove", name: "La Jolla Cove", region: "San Diego", zip: "92037", latitude: 32.8509, longitude: -117.2729, temp: 76, water: 67, wind: "W 6 mph", surf: "1–2 ft", status: "Great", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "south", description: "A small, scenic San Diego cove surrounded by sandstone cliffs and marine life." },
];

export const bayAreaBeaches = beaches.filter((beach) => beach.region === "Bay Area");

export function getBeach(slug: string) {
  return beaches.find((beach) => beach.slug === slug);
}
