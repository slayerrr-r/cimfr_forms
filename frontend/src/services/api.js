const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  // Set headers
  const headers = {
    ...options.headers,
  };
  
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.detail || errorMessage;
    } catch (e) {
      // JSON parsing failed, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  // Parties
  getParties: (search = "") => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return request(`/parties${query}`);
  },
  
  getParty: (partyId) => {
    return request(`/parties/${partyId}`);
  },
  
  createParty: (partyData) => {
    return request("/parties", {
      method: "POST",
      body: JSON.stringify(partyData),
    });
  },
  
  deleteParty: (partyId) => {
    return request(`/parties/${partyId}`, {
      method: "DELETE",
    });
  },

  // Samples
  getSamples: (partyId) => {
    return request(`/parties/${partyId}/samples`);
  },
  
  getSample: (sampleId) => {
    return request(`/samples/${sampleId}`);
  },
  
  createSample: (partyId, sampleData) => {
    return request(`/parties/${partyId}/samples`, {
      method: "POST",
      body: JSON.stringify(sampleData),
    });
  },
  
  deleteSample: (sampleId) => {
    return request(`/samples/${sampleId}`, {
      method: "DELETE",
    });
  },

  // Analysis
  getAnalysis: (sampleId) => {
    return request(`/samples/${sampleId}/analysis`);
  },
  
  saveAnalysis: (sampleId, analysisData, role) => {
    const params = role ? `?role=${encodeURIComponent(role)}` : "";
    return request(`/samples/${sampleId}/analysis${params}`, {
      method: "PUT",
      body: JSON.stringify(analysisData),
    });
  },
};
