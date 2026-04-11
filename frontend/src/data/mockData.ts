// Mock location data for All India Villages
export const states = [
  { id: 1, name: "Andhra Pradesh", code: "AP", districts: 13, subDistricts: 72, villages: 17427 },
  { id: 2, name: "Bihar", code: "BR", districts: 38, subDistricts: 101, villages: 44874 },
  { id: 3, name: "Gujarat", code: "GJ", districts: 33, subDistricts: 248, villages: 18225 },
  { id: 4, name: "Karnataka", code: "KA", districts: 31, subDistricts: 226, villages: 29406 },
  { id: 5, name: "Kerala", code: "KL", districts: 14, subDistricts: 77, villages: 1018 },
  { id: 6, name: "Madhya Pradesh", code: "MP", districts: 52, subDistricts: 313, villages: 54903 },
  { id: 7, name: "Maharashtra", code: "MH", districts: 36, subDistricts: 355, villages: 43665 },
  { id: 8, name: "Rajasthan", code: "RJ", districts: 33, subDistricts: 244, villages: 44672 },
  { id: 9, name: "Tamil Nadu", code: "TN", districts: 38, subDistricts: 226, villages: 16317 },
  { id: 10, name: "Uttar Pradesh", code: "UP", districts: 75, subDistricts: 351, villages: 106774 },
];

export const districts: Record<number, { id: number; name: string; subDistricts: number; villages: number }[]> = {
  1: [
    { id: 101, name: "Anantapur", subDistricts: 6, villages: 1231 },
    { id: 102, name: "Chittoor", subDistricts: 5, villages: 1098 },
    { id: 103, name: "Guntur", subDistricts: 7, villages: 1456 },
    { id: 104, name: "Krishna", subDistricts: 4, villages: 987 },
  ],
  7: [
    { id: 701, name: "Mumbai", subDistricts: 3, villages: 245 },
    { id: 702, name: "Pune", subDistricts: 14, villages: 1867 },
    { id: 703, name: "Nagpur", subDistricts: 13, villages: 1923 },
    { id: 704, name: "Nashik", subDistricts: 15, villages: 1876 },
  ],
  10: [
    { id: 1001, name: "Lucknow", subDistricts: 4, villages: 823 },
    { id: 1002, name: "Varanasi", subDistricts: 3, villages: 1245 },
    { id: 1003, name: "Agra", subDistricts: 6, villages: 1567 },
    { id: 1004, name: "Kanpur", subDistricts: 5, villages: 1098 },
  ],
};

export const subDistricts: Record<number, { id: number; name: string; villages: number }[]> = {
  101: [
    { id: 10101, name: "Anantapur", villages: 234 },
    { id: 10102, name: "Dharmavaram", villages: 187 },
    { id: 10103, name: "Hindupur", villages: 203 },
  ],
  701: [
    { id: 70101, name: "Mumbai City", villages: 45 },
    { id: 70102, name: "Mumbai Suburban", villages: 120 },
    { id: 70103, name: "Thane", villages: 80 },
  ],
  1001: [
    { id: 100101, name: "Lucknow", villages: 234 },
    { id: 100102, name: "Mohanlalganj", villages: 312 },
    { id: 100103, name: "Bakshi Ka Talab", villages: 277 },
  ],
};

export const villages: Record<number, { id: number; name: string; population: number }[]> = {
  10101: [
    { id: 1, name: "Bukkapatnam", population: 18450 },
    { id: 2, name: "Garladinne", population: 12340 },
    { id: 3, name: "Gooty", population: 24567 },
    { id: 4, name: "Kadiri", population: 15678 },
    { id: 5, name: "Rayadurg", population: 9876 },
  ],
  70101: [
    { id: 6, name: "Colaba", population: 45000 },
    { id: 7, name: "Fort", population: 32000 },
    { id: 8, name: "Marine Lines", population: 28000 },
  ],
  100101: [
    { id: 9, name: "Aliganj", population: 65000 },
    { id: 10, name: "Chinhat", population: 23400 },
    { id: 11, name: "Gomti Nagar", population: 89000 },
    { id: 12, name: "Indira Nagar", population: 45600 },
  ],
};

// Dashboard analytics mock data
export const apiUsageData = [
  { date: "Mar 1", requests: 1200, errors: 23 },
  { date: "Mar 5", requests: 2100, errors: 15 },
  { date: "Mar 10", requests: 3400, errors: 34 },
  { date: "Mar 15", requests: 2800, errors: 12 },
  { date: "Mar 20", requests: 4200, errors: 45 },
  { date: "Mar 25", requests: 5100, errors: 28 },
  { date: "Mar 30", requests: 4800, errors: 19 },
  { date: "Apr 1", requests: 5600, errors: 31 },
  { date: "Apr 3", requests: 6200, errors: 22 },
];

export const endpointUsage = [
  { endpoint: "/api/v1/states", calls: 15240, avgLatency: 45 },
  { endpoint: "/api/v1/districts", calls: 12890, avgLatency: 62 },
  { endpoint: "/api/v1/subdistricts", calls: 9450, avgLatency: 78 },
  { endpoint: "/api/v1/villages", calls: 24300, avgLatency: 95 },
  { endpoint: "/api/v1/search", calls: 18670, avgLatency: 120 },
];

export const apiKeys = [
  { id: "key_1", name: "Production App", key: "lk_prod_a1b2c3d4e5f6", created: "2025-01-15", lastUsed: "2025-04-03", status: "active" as const, requests: 45230 },
  { id: "key_2", name: "Staging Environment", key: "lk_stg_x7y8z9w0v1u2", created: "2025-02-20", lastUsed: "2025-04-02", status: "active" as const, requests: 12450 },
  { id: "key_3", name: "Development", key: "lk_dev_m3n4o5p6q7r8", created: "2025-03-01", lastUsed: "2025-03-28", status: "inactive" as const, requests: 3200 },
];

export const dashboardStats = {
  totalRequests: "1.2M",
  activeKeys: 2,
  avgLatency: "67ms",
  uptime: "99.97%",
  totalStates: 35,
  totalDistricts: 725,
  totalVillages: "640K+",
  dataPoints: "2.5M+",
};

export const apiEndpoints = [
  {
    method: "GET" as const,
    path: "/api/v1/states",
    description: "List all states and union territories",
    params: [
      { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
      { name: "limit", type: "number", required: false, description: "Results per page (default: 25)" },
    ],
    response: `{
  "data": [
    {
      "id": 1,
      "name": "Andhra Pradesh",
      "code": "AP",
      "districts_count": 13
    }
  ],
  "meta": {
    "total": 35,
    "page": 1,
    "limit": 25
  }
}`,
  },
  {
    method: "GET" as const,
    path: "/api/v1/states/:stateId/districts",
    description: "List all districts in a state",
    params: [
      { name: "stateId", type: "number", required: true, description: "State ID" },
      { name: "search", type: "string", required: false, description: "Search by district name" },
    ],
    response: `{
  "data": [
    {
      "id": 101,
      "name": "Anantapur",
      "state_id": 1,
      "sub_districts_count": 6,
      "villages_count": 1231
    }
  ],
  "meta": { "total": 13 }
}`,
  },
  {
    method: "GET" as const,
    path: "/api/v1/districts/:districtId/subdistricts",
    description: "List all sub-districts (tehsils/taluks)",
    params: [
      { name: "districtId", type: "number", required: true, description: "District ID" },
    ],
    response: `{
  "data": [
    {
      "id": 10101,
      "name": "Anantapur",
      "district_id": 101,
      "villages_count": 234
    }
  ]
}`,
  },
  {
    method: "GET" as const,
    path: "/api/v1/villages/search",
    description: "Search villages across all locations",
    params: [
      { name: "q", type: "string", required: true, description: "Search query" },
      { name: "state_id", type: "number", required: false, description: "Filter by state" },
      { name: "district_id", type: "number", required: false, description: "Filter by district" },
    ],
    response: `{
  "data": [
    {
      "id": 1,
      "name": "Bukkapatnam",
      "sub_district": "Anantapur",
      "district": "Anantapur",
      "state": "Andhra Pradesh",
      "population": 18450
    }
  ],
  "meta": { "total": 5, "query": "bukka" }
}`,
  },
];
