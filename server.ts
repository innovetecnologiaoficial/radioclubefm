import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import Parser from 'rss-parser';

const app = express();
const PORT = 3000;

app.use(cors());

const parser = new Parser({
  customFields: {
    item: ['media:content', 'content:encoded', 'description'],
  }
});

// Cache the news to avoid hammering the RSS feed
let newsCache: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

app.get('/api/news', async (req, res) => {
  const now = Date.now();
  if (newsCache && now - lastFetchTime < CACHE_DURATION) {
    return res.json(newsCache);
  }

  try {
    // Attempt to fetch from typical wordpress feed URLs
    const feed = await parser.parseURL('https://www.vitrinedosul.com.br/rss.xml');
    const items = feed.items.slice(0, 9).map(item => {
      // try to extract image from various possible tags and formats
      let imageUrl = null;
      
      // 1. Check media:content (nested in '$' property)
      if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
        imageUrl = item['media:content']['$'].url;
      }
      
      // 2. Check enclosure url or link
      if (!imageUrl && item.enclosure) {
        const enc = item.enclosure as any;
        if (enc.url) imageUrl = enc.url;
        else if (enc.link) imageUrl = enc.link;
      }
      
      // 3. Extract img src safely without /g flag to avoid RegExp state issues
      const extractImgSrc = (htmlText?: string) => {
        if (!htmlText) return null;
        const match = htmlText.match(/<img[^>]+src=["']([^"']+)["']/i);
        return match ? match[1] : null;
      };

      if (!imageUrl) imageUrl = extractImgSrc(item['content:encoded']);
      if (!imageUrl) imageUrl = extractImgSrc(item.content);
      if (!imageUrl) imageUrl = extractImgSrc(item.description);

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.contentSnippet || item.description || "",
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
      };
    });

    newsCache = items;
    lastFetchTime = now;
    res.json(items);
  } catch (error) {
    console.error('Error fetching RSS:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-28.6775&longitude=-49.3697&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America/Sao_Paulo"
    );
    if (!response.ok) {
      throw new Error(`Open-Meteo responded with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data from Open-Meteo' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
