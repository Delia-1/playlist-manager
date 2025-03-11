import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import rateLimit from 'express-rate-limit';
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } from 'graphql';
import  fetch  from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// A implementer avnt production!!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GRAPHQL PART

// To type def GraphQL Schema
const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: {
    title: {type: GraphQLString},
    artist:{type: GraphQLString},
    cover: {type: GraphQLString},
    url: {type: GraphQLString},
    preview: {type: GraphQLString},
  }
})

// DEEZER REsPONSE TYPE CHECK
interface DeezerResponse {
  data: {
    album: {
      cover_medium: string;
    };
    link: string;
    preview: string;
  }[];
}


// ENFORCE TYPE CHECKING
function isDeezerResponse(data: any): data is DeezerResponse {
  return (
    data &&
    Array.isArray(data.data) &&
    data.data.every((item: any) => item.album &&
    typeof item.album.cover_medium === 'string' &&
    typeof item.link === 'string' &&
    typeof item.preview === 'string')
  );
}

// GRAPHQL QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getCoverFromDeezerApi: {
      type: new GraphQLList(SongType),
      args: {
        songTitles: { type: new GraphQLList(GraphQLString) },
        artists: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(_, { songTitles, artists }) {
        if (!songTitles || !artists || songTitles.length !== artists.length) {
          throw new Error('Invalid song or artists 🤐');
        }

        const results = await Promise.all(
          songTitles.map(async (title: string, index: number) => {
            const artist = artists[index];

            try {
              const response = await fetch(
                `http://api.deezer.com/search?q=${encodeURIComponent(title)} ${encodeURIComponent(artist)}`
              );
              const data: unknown = await response.json();

              console.log("Deezer API Response for:", title, artist, data);

              if (isDeezerResponse(data)) {
                return {
                  title,
                  artist,
                  cover: data.data[0].album.cover_medium,
                  url: data.data[0].link || "",
                  preview: data.data[0].preview || "",
                };
              } else {
                return { title, artist, cover: "", url: "", preview: "" };
              }
            } catch (error) {
              console.error("Error fetching song cover:", error);
              return { title, artist, cover: "", url: "" , preview: ""};
            }
          })
        );
        console.log("Final GraphQL Response:", results);
        return results;
      },
    },
  },
});

// To def the Schema
const schema = new GraphQLSchema({
  query: RootQuery,
});

// CONNECTION TO API
const server = new ApolloServer<BaseContext>({
  schema,
});

(async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server) as any);


 app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}/graphql`);
 });
})();






// ANTHROPIC CALLS

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// DEF LILMITER
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, // ⛔ Limit each IP to 5 requests per minute
  message: { error: 'Too many requests, please try again later. 🤘' },
  headers: true,
});

//DEF STRUCTURE OF API RESPONSE
interface ContentBlock {
  text?: string;
  message?: string;
}

app.post('/', limiter, async (req: Request, res: Response): Promise<void> => {
  const { keywords } = req.body;

  if (!keywords || !Array.isArray(keywords)) {
    res.status(400).json({ error: 'Invalid keyword format' });
    return;
  }

  const SYSTEM_PROMPT = `
You are a music assistant creating playlists based on a user's activity, mood, and/or music taste.
- Match the energy of the activity.
- Reflect the user's mood.
- Stay within the music genre preference but add variety.
- Include a mix of popular hits.
- Include only songs that might be on Deezer.
- Return only the playlist as an array with an array for each song-artist pair eg: [["Technobron", "Slam"], ["Intruder", "The Chemical Brothers"]] no "" or '' around.
- No introduction or final words.
`;

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here are my keywords describing activity, mood, and/or genre: ${keywords.join(', ')} Please generate a music playlist that fits. Format response as an array eg: [["Technobron", "Slam"], ["Intruder", "The Chemical Brothers"]] no "" or '' around.`,
        },
      ],
    });

    const firstContent = msg.content[0] as ContentBlock;

    let playlistString = '';

    if ('text' in firstContent) {
      playlistString = firstContent.text!;
    } else if ('message' in firstContent) {
      playlistString = firstContent.message!;
    } else {
      res.status(500).json({ error: 'Unexpected API response format' });
      return;
    }

    let playlistArray;

    try {
      playlistArray = JSON.parse(playlistString);
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse playlist' });
      return;
    }

    res.json({ playlist: playlistArray });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});
