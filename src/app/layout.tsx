import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme";
import { Toaster } from "@/components/ui/toaster"






export const metadata: Metadata = {
  title: "Type2",
  description: "test frontend with color",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body >
      <ThemeProvider>
        {children}
        <Toaster />

    </ThemeProvider>
      </body>
    </html>
  );
}
