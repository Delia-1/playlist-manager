export async function getPlaylistFromDjClaude(list: string[]): Promise<[string, string][]> {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${API_BASE_URL}/`, {
    
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keywords: list }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }

  const data = await response.json();
  console.log("AI Response is:", data);

  return data.playlist;
}
