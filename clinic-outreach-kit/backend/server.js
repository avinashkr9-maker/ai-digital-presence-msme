import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT || 8787);
const APIFY_TOKEN = process.env.APIFY_TOKEN || '';
const APIFY_ACTOR_ID = process.env.APIFY_ACTOR_ID || 'compass/crawler-google-places';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, apifyConfigured: Boolean(APIFY_TOKEN) });
});

app.post('/api/find-leads', async (req, res) => {
  try {
    if (!APIFY_TOKEN) {
      return res.status(400).json({ ok: false, error: 'missing_apify_token' });
    }

    const place = String(req.body?.place || '').trim();
    const category = String(req.body?.category || 'Clinic').trim();
    const keyword = String(req.body?.keyword || '').trim();
    const limit = Math.max(1, Math.min(50, Number(req.body?.limit || 20)));

    if (!place) {
      return res.status(400).json({ ok: false, error: 'missing_place' });
    }

    const query = [keyword, category, 'in', place].filter(Boolean).join(' ');

    const runResponse = await fetch(`https://api.apify.com/v2/acts/${encodeURIComponent(APIFY_ACTOR_ID)}/runs?token=${encodeURIComponent(APIFY_TOKEN)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchStringsArray: [query],
        maxCrawledPlacesPerSearch: limit,
        language: 'en',
        region: 'IN',
        skipClosedPlaces: true,
        exportPlaceUrls: true
      })
    });

    const runData = await runResponse.json();
    if (!runResponse.ok) {
      return res.status(502).json({ ok: false, error: runData?.error?.message || 'apify_run_start_failed' });
    }

    const runId = runData?.data?.id;
    if (!runId) {
      return res.status(502).json({ ok: false, error: 'missing_run_id' });
    }

    let status = runData?.data?.status || 'RUNNING';
    let attempts = 0;
    while (!['SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT'].includes(status) && attempts < 40) {
      attempts += 1;
      await new Promise(resolve => setTimeout(resolve, 3000));
      const pollResponse = await fetch(`https://api.apify.com/v2/actor-runs/${encodeURIComponent(runId)}?token=${encodeURIComponent(APIFY_TOKEN)}`);
      const pollData = await pollResponse.json();
      status = pollData?.data?.status || status;
    }

    if (status !== 'SUCCEEDED') {
      return res.status(502).json({ ok: false, error: `apify_status_${status.toLowerCase()}` });
    }

    const itemsResponse = await fetch(`https://api.apify.com/v2/actor-runs/${encodeURIComponent(runId)}/dataset/items?token=${encodeURIComponent(APIFY_TOKEN)}&clean=true&format=json`);
    const items = await itemsResponse.json();
    if (!itemsResponse.ok) {
      return res.status(502).json({ ok: false, error: items?.error?.message || 'apify_dataset_fetch_failed' });
    }

    return res.json({ ok: true, query, items: Array.isArray(items) ? items : [] });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Dikhao backend listening on http://localhost:${PORT}`);
});
