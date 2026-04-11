type LocationRecord = {
  id: string;
  name: string;
  code: number;
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/b2b/locations").replace(/\/+$/, "");
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;

function getAuthHeaders() {
  if (!API_KEY || !API_SECRET) {
    throw new Error("Missing VITE_API_KEY or VITE_API_SECRET in frontend environment");
  }

  return {
    "x-api-key": API_KEY,
    "x-api-secret": API_SECRET,
  };
}

async function fetchData(path: string): Promise<LocationRecord[]> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: getAuthHeaders(),
    });

    const body = (await response.json()) as ApiResponse<LocationRecord[]>;

    if (!response.ok) {
      throw new Error(body.message || `HTTP ${response.status}`);
    }

    return Array.isArray(body.data) ? body.data : [];
  } catch (error) {
    console.error(`API error for ${path}:`, error);
    return [];
  }
}

export async function fetchStates() {
  return fetchData("/states");
}

export async function fetchDistricts(stateId: string) {
  return fetchData(`/states/${stateId}/districts`);
}

export async function fetchSubDistricts(districtId: string) {
  return fetchData(`/districts/${districtId}/subdistricts`);
}

export async function fetchVillages(subDistrictId: string) {
  return fetchData(`/subdistricts/${subDistrictId}/villages`);
}