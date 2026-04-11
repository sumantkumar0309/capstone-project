// frontend/src/lib/api.ts

const BASE_URL = 'http://localhost:4000/api/b2b/locations';

// POSTMAN se ya Login karke jo APIs banai thi unka secret aur key (abhi local testing ke liye paste kar dena yaha)
const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': 'ak_INSERT_YOUR_TEST_API_KEY_HERE', 
  'x-api-secret': 'INSERT_YOUR_TEST_API_SECRET_HERE'
};

export const fetchStates = async () => {
  const response = await fetch(`${BASE_URL}/states`, { headers: API_HEADERS });
  const data = await response.json();
  return data.data; // Backened returns { success: true, data: [...] }
};

export const fetchDistricts = async (stateId: string) => {
  const response = await fetch(`${BASE_URL}/states/${stateId}/districts`, { headers: API_HEADERS });
  const data = await response.json();
  return data.data;
};

// ... same for sub-districts and villages
export const fetchSubDistricts = async (districtId: string) => {
  const response = await fetch(`${BASE_URL}/districts/${districtId}/subdistricts`, { headers: API_HEADERS });
  const data = await response.json();
  return data.data;
};

export const fetchVillages = async (subDistrictId: string) => {
  const response = await fetch(`${BASE_URL}/subdistricts/${subDistrictId}/villages`, { headers: API_HEADERS });
  const data = await response.json();
  return data.data;
};