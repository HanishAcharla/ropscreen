"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  file: File | Blob | null;
  previewUrl: string | null;
  onSelect: (file: File | Blob) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function UploadDropzone({ file, previewUrl, onSelect, onClear, disabled }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const f = files[0];
      if (!f.type.startsWith("image/")) return;
      onSelect(f);
    },
    [onSelect]
  );

  if (file && previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-black">
        <div className="relative aspect-square w-full">
          <Image
            src={previewUrl}
            alt="Selected fundus image"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            unoptimized
          />
        </div>
        {!disabled && (
          <button
            onClick={onClear}
            className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur transition-colors hover:bg-black/80"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-white/[0.02] text-center transition-colors",
        dragActive && "border-coral bg-coral/5"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/bmp,image/tiff"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="rounded-full border border-border bg-white/[0.03] p-4">
        {dragActive ? <ImagePlus size={22} className="text-coral" /> : <UploadCloud size={22} className="text-muted" />}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Drop a fundus image here, or click to browse</p>
        <p className="mt-1 text-xs text-muted-2">JPEG, PNG or WebP · up to 15MB</p>
      </div>
    </div>
  );
}
