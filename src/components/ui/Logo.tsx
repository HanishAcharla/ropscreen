export function GithubGlyph({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.66-4.04-1.66-.55-1.44-1.34-1.82-1.34-1.82-1.09-.77.08-.75.08-.75 1.21.09 1.85 1.28 1.85 1.28 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.38-5.47-6.13 0-1.35.47-2.46 1.24-3.32-.12-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.27a11.2 11.2 0 0 1 6.02 0c2.28-1.6 3.29-1.27 3.29-1.27.66 1.71.24 2.97.12 3.28.77.86 1.24 1.97 1.24 3.32 0 4.76-2.81 5.81-5.48 6.12.43.38.81 1.13.81 2.29 0 1.65-.02 2.98-.02 3.39 0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0Z" />
    </svg>
  );
}

export function RetinaMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="retinaGrad" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#ffb648" />
          <stop offset="55%" stopColor="#ff7a52" />
          <stop offset="100%" stopColor="#c8451f" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#retinaGrad)" opacity="0.16" />
      <circle cx="20" cy="20" r="19" stroke="url(#retinaGrad)" strokeWidth="1.4" opacity="0.7" />
      <circle cx="20" cy="20" r="6.5" fill="url(#retinaGrad)" />
      <g stroke="url(#retinaGrad)" strokeWidth="1.3" strokeLinecap="round" opacity="0.85">
        <path d="M20 13.5 C 17 9, 13 7, 8 6.5" />
        <path d="M13 7.8 C 11.5 9.5, 11 11, 11.2 12.5" />
        <path d="M25 14.5 C 28.5 10.5, 30.5 9, 34 8.5" />
        <path d="M30.5 9.6 C 31.8 11, 32 12.3, 31.6 13.6" />
        <path d="M19 26.2 C 18 30.5, 15.5 33, 11 34.5" />
        <path d="M15 31.5 C 13.5 32, 12.3 32.8, 11.8 34" />
        <path d="M24 25.8 C 26 30, 29 32.3, 33.5 33.5" />
      </g>
    </svg>
  );
}
