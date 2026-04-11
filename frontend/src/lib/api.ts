const API_BASE_URL = "http://localhost:4000/api/b2b/locations";

// Yeh function fetch helper hai
const fetchData = async (url: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": "test_key", // Yeh backend mein seed kiye gaye apikeys hain agar secure nahi kiya hai ya backend test key allow karta hai
        "x-api-secret": "test_secret"
      }
    });
    if (!res.ok) {
        throw new Error("HTTP error " + res.status);
    }
    const json = await res.json();
    // Return data property because backend usually sends { success: true, count: X, data: [...] }
    return json.data || json;
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};

export const fetchStates = async () => {
  return await fetchData(`${API_BASE_URL}/states`);
};

export const fetchDistricts = async (stateId: string) => {
  return await fetchData(`${API_BASE_URL}/states/${stateId}/districts`);
};

export const fetchSubDistricts = async (districtId: string) => {
  return await fetchData(`${API_BASE_URL}/districts/${districtId}/subdistricts`);
};

export const fetchVillages = async (subDistrictId: string) => {
  return await fetchData(`${API_BASE_URL}/subdistricts/${subDistrictId}/villages`);
};