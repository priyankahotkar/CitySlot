export const parkingLocations = [
  {
    id: 1,
    name: "Downtown Plaza Parking",
    location: "Downtown",
    latitude: 40.7589,
    longitude: -73.9851,
    distance: 0.5,
    pricePerHour: 5,
    totalSlots: 50,
    availableSlots: {
      "2-wheeler": 8,
      "4-wheeler": 12
    },
    amenities: ["CCTV", "Security Guard", "Covered"],
    rating: 4.5
  },
  {
    id: 2,
    name: "Central Mall Parking",
    location: "Central District",
    latitude: 40.7614,
    longitude: -73.9776,
    distance: 1.2,
    pricePerHour: 4,
    totalSlots: 80,
    availableSlots: {
      "2-wheeler": 15,
      "4-wheeler": 20
    },
    amenities: ["CCTV", "EV Charging", "24/7 Access"],
    rating: 4.7
  },
  {
    id: 3,
    name: "Park View Garage",
    location: "Park Avenue",
    latitude: 40.7489,
    longitude: -73.9680,
    distance: 2.1,
    pricePerHour: 6,
    totalSlots: 40,
    availableSlots: {
      "2-wheeler": 0,
      "4-wheeler": 0
    },
    amenities: ["CCTV", "Valet Service"],
    rating: 4.3
  },
  {
    id: 4,
    name: "Business District Parking",
    location: "Business District",
    latitude: 40.7549,
    longitude: -73.9840,
    distance: 0.8,
    pricePerHour: 7,
    totalSlots: 100,
    availableSlots: {
      "2-wheeler": 25,
      "4-wheeler": 30
    },
    amenities: ["CCTV", "Security Guard", "Covered", "EV Charging"],
    rating: 4.8
  },
  {
    id: 5,
    name: "Metro Station Parking",
    location: "Metro Central",
    latitude: 40.7644,
    longitude: -73.9656,
    distance: 1.5,
    pricePerHour: 3,
    totalSlots: 60,
    availableSlots: {
      "2-wheeler": 10,
      "4-wheeler": 5
    },
    amenities: ["CCTV", "24/7 Access"],
    rating: 4.2
  },
  {
    id: 6,
    name: "Airport Link Parking",
    location: "Airport Road",
    latitude: 40.7389,
    longitude: -73.9889,
    distance: 3.5,
    pricePerHour: 4,
    totalSlots: 120,
    availableSlots: {
      "2-wheeler": 30,
      "4-wheeler": 40
    },
    amenities: ["CCTV", "Security Guard", "Shuttle Service"],
    rating: 4.6
  },
  {
    id: 7,
    name: "City Center Garage",
    location: "City Center",
    latitude: 40.7529,
    longitude: -73.9772,
    distance: 0.3,
    pricePerHour: 8,
    totalSlots: 35,
    availableSlots: {
      "2-wheeler": 0,
      "4-wheeler": 3
    },
    amenities: ["CCTV", "Valet Service", "Covered"],
    rating: 4.9
  },
  {
    id: 8,
    name: "Stadium Parking Lot",
    location: "Sports Complex",
    latitude: 40.7689,
    longitude: -73.9644,
    distance: 2.8,
    pricePerHour: 5,
    totalSlots: 200,
    availableSlots: {
      "2-wheeler": 50,
      "4-wheeler": 75
    },
    amenities: ["CCTV", "Security Guard"],
    rating: 4.4
  }
];

export const locations = [
  "All Locations",
  "Downtown",
  "Central District",
  "Park Avenue",
  "Business District",
  "Metro Central",
  "Airport Road",
  "City Center",
  "Sports Complex"
];
