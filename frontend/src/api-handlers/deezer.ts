 export async function getCoverFromDeezerApi (songs: [string, string][]) {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || ""; // Ensure dynamic backend URL

  const query = ` query getCoverFromDeezerApi($songTitles: [String!]!, $artists: [String!]!) {
    getCoverFromDeezerApi(songTitles: $songTitles, artists: $artists) {
    title
    artist
    cover
    url
    }
  }
  `;

  const variables = {
    songTitles:songs.map(([title, _artist]) => title),
    artists: songs.map(([_title, artist]) => artist),
  };

  const deezerResponse = await fetch (`${API_BASE_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!deezerResponse.ok) {
    throw  new Error("Failled to fetch playlist");

  }

  const data = await deezerResponse.json();
  console.log("Deezer response🎵:", data)
  return data.data.getCoverFromDeezerApi;
}
