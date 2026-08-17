# ROPscreen

Research showcase and live demo for *"Ensembling Convolutional and Transformer Architectures for Retinopathy of Prematurity Screening in Neonatal Fundus Images"* (IEEE COMPSAC) — a ResNet-50 + SWIN-B ensemble that classifies neonatal fundus images as **Physiological**, **ROP**, or **Hemorrhage**, reaching 84% accuracy with Grad-CAM interpretability.

Built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

- **`/`** — research overview: architecture, results, confusion matrices, Grad-CAM gallery
- **`/research`** — full paper writeup: abstract, dataset, methodology, ablation, references
- **`/demo`** — upload a fundus image (or try a real example) and get a live prediction from the actual trained ensemble

The inference API lives in the sibling [`server/`](../server) directory (FastAPI, deploys to Hugging Face Spaces) — see [`DEPLOY.md`](./DEPLOY.md) for the full deployment guide for both pieces.

## Local development

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to point at the inference backend (defaults to `http://localhost:7860` for local dev — see `server/README.md` to run it).

## Disclaimer

Research prototype — not a certified diagnostic device. Not for clinical use.
