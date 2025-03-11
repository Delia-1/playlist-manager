 export async function getCoverFromDeezerApi (lists: [string, string][]) {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const query = ` query getCoverFromDeezerApi($songTitles: [String!]!, $artists: [String!]!) {
    getCoverFromDeezerApi(songTitles: $songTitles, artists: $artists) {
    title
    artist
    cover
    url
    preview
    }
  }
  `;

  const variables = {
    songTitles:lists.map(([title, _artist]) => title),
    artists: lists.map(([_title, artist]) => artist),
  };
  console.log("Sending GraphQL Query:", JSON.stringify({ query, variables }, null, 2));

  const deezerResponse = await fetch (`${API_BASE_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!deezerResponse.ok) {
    throw  new Error("Failled to fetch playlist");

  }

  const responseData = await deezerResponse.json();
  // console.log("Deezer response🎵:", responseData)
  return responseData.data.getCoverFromDeezerApi;
}
