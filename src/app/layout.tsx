import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PodBite",
  description: "An AI-Based podcast summarizer using langchain",
  icons: {
    icon: "/icon_192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${ubuntu.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster richColors position="top-right" duration={5000} />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
