import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Google Docs Clone",
  description: "Google Docs Clone built with Next.js and Tailwind CSS",
  icons: [{ url: "/logo.svg", href: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NuqsAdapter>
          <Toaster />
          <ConvexClientProvider>
            <NextTopLoader
              color="#3b82f6"
              initialPosition={0.08}
              crawlSpeed={200}
              height={2}
              crawl={true}
              speed={200}
              shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
              zIndex={1600}
              showAtBottom={false}
            />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
