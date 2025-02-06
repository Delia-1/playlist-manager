// import path from 'path';
// import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Enable CORS
app.use(cors());

app.use(express.json());

// Serve the static files from the frontend dist folder
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ✅ Define Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // ⛔ Limit each IP to 5 requests per minute
  message: { error: 'Too many requests, please try again later.' }, // Response when limit is exceeded
  headers: true, // Show rate limit info in response headers
});

// ✅ Apply rate limiting **ONLY** to the `/get-recipe` route
app.post('/', limiter, async (req, res) => {
  const { keywords } = req.body;


  if (!keywords || !Array.isArray(keywords)) {
    return res.status(400).json({ error: 'Invalid keyword format' });
  }
  const SYSTEM_PROMPT = `
You are a music assistant creating playlists based on a user's activity, mood, and/or music taste.
- Match the energy of the activity.
- Reflect the user's mood.
- Stay within the music genre preference but add variety.
- Include a mix of popular hits and hidden gems.
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

    const playlistString = msg.content[0].text;
    let playlistArray;

    try {
      playlistArray = JSON.parse(playlistString);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to parse playlist' });
    }

    res.json({ playlist: playlistArray });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});


// ✅ Start the server Locally
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
