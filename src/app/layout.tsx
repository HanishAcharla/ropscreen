import type { Metadata } from "next";
import { Inter, Lexend, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROPscreen — AI-assisted Retinopathy of Prematurity screening",
  description:
    "ROPscreen ensembles a ResNet-50 CNN and a SWIN-B Vision Transformer to screen neonatal fundus images for Retinopathy of Prematurity, reaching 84% accuracy with Grad-CAM interpretability. Try the model live.",
  metadataBase: new URL("https://ropscreen.vercel.app"),
  openGraph: {
    title: "ROPscreen — AI-assisted ROP screening",
    description:
      "An ensemble CNN + Vision Transformer approach to screening Retinopathy of Prematurity in neonatal fundus images.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lexend.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
