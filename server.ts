import express from 'express';
import { createServer as createViteServer } from 'vite';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// In-memory cache for generated TTS audio to ensure instant playback on replay
const ttsCache = new Map<string, Buffer>();

function splitIntoChunks(text: string, maxLen = 135): string[] {
  const cleaned = text.trim();
  if (!cleaned) return [];
  if (cleaned.length <= maxLen) return [cleaned];

  const parts = cleaned.split(/([।\.\!\?\n]+)/);
  const sentences: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const s = (parts[i] + (parts[i + 1] || '')).trim();
    if (s) sentences.push(s);
  }

  const chunks: string[] = [];
  let current = '';
  for (const s of sentences) {
    if (s.length > maxLen) {
      const words = s.split(/\s+/);
      for (const w of words) {
        if ((current + ' ' + w).length <= maxLen) {
          current = current ? current + ' ' + w : w;
        } else {
          if (current.trim()) chunks.push(current.trim());
          current = w;
        }
      }
    } else {
      if ((current + ' ' + s).length <= maxLen) {
        current = current ? current + ' ' + s : s;
      } else {
        if (current.trim()) chunks.push(current.trim());
        current = s;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [cleaned.slice(0, maxLen)];
}

function fetchGoogleTtsChunk(chunk: string, lang: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(chunk);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encoded}`;
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/',
          Accept: '*/*',
        },
        timeout: 9000,
      },
      (res) => {
        if (res.statusCode !== 200) {
          // Fallback with client=gtx
          const gtxUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=${lang}&q=${encoded}`;
          https
            .get(
              gtxUrl,
              {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                  Referer: 'https://translate.google.com/',
                },
                timeout: 9000,
              },
              (res2) => {
                if (res2.statusCode !== 200) {
                  return reject(new Error(`Google Translate TTS status ${res2.statusCode}`));
                }
                const buf: Buffer[] = [];
                res2.on('data', (c) => buf.push(c));
                res2.on('end', () => resolve(Buffer.concat(buf)));
              }
            )
            .on('error', reject);
          return;
        }

        const buf: Buffer[] = [];
        res.on('data', (c) => buf.push(c));
        res.on('end', () => resolve(Buffer.concat(buf)));
      }
    );

    req.on('error', reject);
  });
}

// 1. Google Translate Text-To-Speech Endpoint
app.get('/api/tts', async (req: Request, res: Response) => {
  try {
    const rawText = (req.query.text as string || '').trim();
    const lang = (req.query.lang as string || 'konkani').toLowerCase();

    if (!rawText) {
      res.status(400).json({ error: 'Text query parameter is required' });
      return;
    }

    // Use the same Hindi voice engine for English, Hindi (and Marathi/Konkani)
    let googleLang = 'hi';
    if (lang === 'konkani') {
      googleLang = 'mr'; // Konkani Devanagari voice
    } else {
      googleLang = 'hi'; // Same voice used for Hindi and English
    }

    const cacheKey = `${googleLang}:${rawText}`;
    if (ttsCache.has(cacheKey)) {
      const cached = ttsCache.get(cacheKey)!;
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Content-Length', cached.length);
      res.send(cached);
      return;
    }

    const chunks = splitIntoChunks(rawText, 135);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      try {
        const audioBuf = await fetchGoogleTtsChunk(chunk, googleLang);
        if (audioBuf && audioBuf.length > 0) {
          audioBuffers.push(audioBuf);
        }
      } catch (err) {
        console.warn('Failed to fetch TTS chunk:', chunk, err);
      }
    }

    if (audioBuffers.length === 0) {
      res.status(502).json({ error: 'Could not attain audio from Google Translate' });
      return;
    }

    const mergedAudio = Buffer.concat(audioBuffers);
    ttsCache.set(cacheKey, mergedAudio);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Content-Length', mergedAudio.length);
    res.send(mergedAudio);
  } catch (error) {
    console.error('Error handling /api/tts:', error);
    res.status(500).json({ error: 'Internal server error processing TTS' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Development mode with Vite middlewares mounted
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SchemeAI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
