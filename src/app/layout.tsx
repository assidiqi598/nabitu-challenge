import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Container, Stack } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nabitu Invoice Hub",
  description: "Invoice Management of Nabitu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        <Header />
        <Stack direction="row">
          <Sidebar />
          <Container
            maxWidth={false}
            disableGutters
            className="bg-[#F1F5F9]"
            sx={{ minHeight: "100svh", overflowY: "auto" }}
          >
            {children}
          </Container>
        </Stack>
      </body>
    </html>
  );
}
