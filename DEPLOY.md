# Deploying ROPscreen

The app has two parts that deploy separately:

- **`web/`** — the Next.js site (research showcase + demo UI). Deploys to **Vercel**.
- **`server/`** — the FastAPI inference API (ResNet-50 + SWIN-B ensemble). Deploys to a **Hugging Face Space** (Docker SDK), since the model weights (~450MB total) and PyTorch/TensorFlow runtime are too large/heavy for Vercel serverless functions.

Deploy the backend first — the frontend needs its URL.

---

## 1. Deploy the backend to Hugging Face Spaces

1. Create a free account at [huggingface.co](https://huggingface.co/join) if you don't have one.
2. Create a new Space: [huggingface.co/new-space](https://huggingface.co/new-space)
   - **Space name**: e.g. `ropscreen-api`
   - **SDK**: **Docker**
   - **Hardware**: Free CPU basic is fine (inference takes a few seconds per image)
   - **Visibility**: Public (so the frontend can call it) or Private with a token — public is simpler to start
3. On your machine, install the [huggingface_hub CLI](https://huggingface.co/docs/huggingface_hub/guides/cli) and log in, or just use `git` directly with a Space access token:

   ```bash
   cd server
   git remote add space https://huggingface.co/spaces/<your-username>/ropscreen-api
   git push space main
   ```

   Git will prompt for a username/password — use your Hugging Face username and an [access token](https://huggingface.co/settings/tokens) (with **write** scope) as the password. The `models/*.h5` and `models/*.pt` files are tracked with Git LFS (already configured via `server/.gitattributes`), so they'll upload correctly as long as `git lfs` is installed locally (`brew install git-lfs`).

4. The Space will build the Dockerfile and start the API. First build takes a few minutes (installing PyTorch + TensorFlow). Watch progress in the Space's "Logs" tab.
5. Once running, your API lives at `https://<your-username>-ropscreen-api.hf.space`. Test it:

   ```bash
   curl https://<your-username>-ropscreen-api.hf.space/api/health
   # {"status":"ok","models_loaded":true}
   ```

6. **Set CORS**: in your Space settings, add a repository secret/variable `ALLOWED_ORIGINS` set to your Vercel domain(s), comma-separated, e.g.:

   ```
   https://ropscreen.vercel.app,http://localhost:3000
   ```

   Restart the Space after adding it.

> **Note on class order**: `server/app/config.py` has a `CLASS_LABELS` constant with a best-guess ordering based on the training notebook. Once the Space is live, verify predictions look right using the three "try an example" images on `/demo` (they're real fundus photos with known labels — Physiological, ROP, Hemorrhage). If a prediction looks scrambled (e.g. an obviously healthy image classified as Hemorrhage with high confidence), fix the order in that one constant and redeploy.

> **Cold starts**: free Spaces sleep after a period of inactivity and take ~20-30s to wake on the next request. The frontend already shows a "waking up" message during this wait.

---

## 2. Deploy the frontend to Vercel

1. Push `web/` to GitHub (see below), or deploy directly with the Vercel CLI.
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
   - **Root Directory**: `web`
   - Framework preset: Next.js (auto-detected)
3. Add an environment variable before deploying:
   - `NEXT_PUBLIC_API_URL` = your Hugging Face Space URL from step 1 (e.g. `https://your-username-ropscreen-api.hf.space`)
4. Deploy. Vercel gives you a URL like `ropscreen.vercel.app`.
5. Go back to your Hugging Face Space settings and make sure `ALLOWED_ORIGINS` includes this exact Vercel URL, then restart the Space.

### Via CLI instead

```bash
cd web
npx vercel          # first deploy, follow prompts, set root env var when asked
npx vercel --prod    # promote to production
```

---

## 3. Push to GitHub

From the repo root:

```bash
git init
git add web server DEPLOY.md
git commit -m "ROPscreen: research showcase + live ensemble demo"
gh repo create ropscreen --public --source=. --push
```

(Model weight files live under `server/models/` and are pushed separately to the Hugging Face Space, not GitHub — GitHub isn't a great fit for 450MB of binary weights. `server/.gitignore`/`.gitattributes` are scoped for the Space's own repo.)

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
