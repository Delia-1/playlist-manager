export async function getPlaylistFromDjClaude(list) {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || ""; // Ensure dynamic backend URL

  const response = await fetch(`${API_BASE_URL}/`, { // Add /api to route
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keywords: list }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }

  const data = await response.json();
  console.log("Raw AI Response:", data); // Vérifie ce que l'API retourne exactement

  return data.playlist;
}
