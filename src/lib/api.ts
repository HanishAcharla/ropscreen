export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7860";

export interface PredictionResponse {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
  model_breakdown: {
    resnet50: Record<string, number>;
    swin_b: Record<string, number>;
  };
  gradcam_png_base64: string | null;
  preprocessed_image_base64: string;
}

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function predictImage(file: File | Blob): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", file, file instanceof File ? file.name : "upload.png");

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/predict`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ApiError(
      "Couldn't reach the inference server. It may be waking up from sleep — this can take up to 30 seconds on the free tier. Please try again shortly."
    );
  }

  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new ApiError(detail?.detail ?? `Request failed with status ${res.status}`, res.status);
  }

  return res.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/health`, { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.models_loaded);
  } catch {
    return false;
  }
}
