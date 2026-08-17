# Deploying ROPscreen

The app has two parts that deploy separately:

- **`web/`** — the Next.js site (research showcase + demo UI). **Already live** on Vercel: https://web-delta-seven-48.vercel.app
- **`server/`** — the FastAPI inference API (ResNet-50 + SWIN-B ensemble). Deploys to **Google Cloud Run**, since the model weights (~450MB) and PyTorch/TensorFlow runtime are too large/heavy for Vercel serverless functions, and need more RAM than typical free web-hosting tiers offer.

---

## 1. Deploy the backend to Google Cloud Run

Cloud Run's Always Free tier covers this comfortably at low traffic (2M requests/month, generous CPU/memory-second quotas), but Google requires a billing account (card on file) to enable it even if you never leave the free tier. `--min-instances 0` below means the service scales to zero and costs nothing while idle, and `--max-instances 1` puts a hard ceiling on how much it could ever scale up, as a safety net against surprise charges.

1. Create a Google Cloud project (or use an existing one) at [console.cloud.google.com](https://console.cloud.google.com), and link a billing account under **Billing** in the console (needed once, even for free-tier usage).
2. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) if you don't have it, then authenticate:

   ```bash
   gcloud auth login
   gcloud config set project <your-project-id>
   gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
   ```

3. Deploy directly from source from inside `server/` — `gcloud` builds the `Dockerfile` via Cloud Build and deploys it, no manual `docker push` needed. Note the `^;^` prefix on `--set-env-vars`: gcloud normally splits that flag's value on commas, which collides with the comma *inside* `ALLOWED_ORIGINS` (two allowed origins, comma-separated) — `^;^` tells it to split on `;` instead, so the comma inside the value is left alone:

   ```bash
   cd /path/to/RetinalDisease/server
   gcloud run deploy ropscreen-api \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --memory 4Gi \
     --cpu 2 \
     --timeout 300 \
     --min-instances 0 \
     --max-instances 1 \
     --set-env-vars="^;^ALLOWED_ORIGINS=https://web-delta-seven-48.vercel.app,http://localhost:3000"
   ```

   First build takes a few minutes (installing PyTorch + TensorFlow into the image). `gcloud` prints the service URL when done, e.g. `https://ropscreen-api-xxxxx-uc.a.run.app`.

4. Test it:

   ```bash
   curl https://ropscreen-api-xxxxx-uc.a.run.app/api/health
   # {"status":"ok","models_loaded":true}
   ```

> **Note on class order**: `server/app/config.py`'s `CLASS_LABELS` constant was verified locally against the three "try an example" images used on `/demo` — both models agree on the right label at >96% confidence. If you ever retrain and predictions look scrambled, that's the one place to check.

> **Cold starts**: with `--min-instances 0`, the container fully stops when idle and takes ~10-20s to cold-start on the next request (container boot + loading both models). The frontend already shows a "waking up" message during this wait. If cold starts bother you and you're comfortable with a small always-on cost, set `--min-instances 1` — but that means the free tier no longer fully covers it.

---

## 2. Point the frontend at the backend

In the [Vercel dashboard](https://vercel.com/hanishacharlas-projects/web/settings/environment-variables) (or via CLI), set:

```
NEXT_PUBLIC_API_URL=https://ropscreen-api-xxxxx-uc.a.run.app
```

then redeploy:

```bash
cd web
npx vercel --prod
```

---

## 3. Push to GitHub

Already done: https://github.com/HanishAcharla/ropscreen (the `web/` app; `server/` is a separate local git repo since its model weights don't belong in the same place as the frontend's history — push it to wherever you end up hosting its source, e.g. GitHub with Git LFS, if you want a backup beyond your Cloud Run deploy).

---

## Local development

**Backend** (needs Python 3.11, matching the Docker image):

```bash
cd server
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 7860
```

**Frontend**:

```bash
cd web
npm install
npm run dev
```

`web/.env.local` is already set to `NEXT_PUBLIC_API_URL=http://localhost:7860` for local dev.
