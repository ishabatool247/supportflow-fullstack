import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "SupportFlow — AI Customer Support",
  description: "A smarter workspace for AI-powered customer support."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
