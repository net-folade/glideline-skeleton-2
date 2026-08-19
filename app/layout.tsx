import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glideline Atelier — Modern Nigerian Tailoring",
  description: "Elegant, made-to-measure Nigerian menswear from Lagos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
