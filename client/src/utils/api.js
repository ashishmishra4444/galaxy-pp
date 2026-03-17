const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const submitMemory = async (payload) => {
  const endpoint = API_BASE_URL
    ? `${API_BASE_URL}/api/messages`
    : "/api/messages";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to capture memory right now.");
  }

  return data;
};
