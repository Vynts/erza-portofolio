import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTranslator from "@/components/GoogleTranslator";
import "./globals.css";

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne', 
});
const geistSans = Geist({
  variable: "--font-semibold-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alvinza Erza Farandhika | Backend Developer",
  description:
    "Halo! Saya Alvinza Erza Farandhika, seorang Backend Developer yang antusias dalam membangun aplikasi web yang kokoh, efisien, dan andal menggunakan Python (Flask/FastAPI).",
  keywords: [
    // Personal Branding & Identity
    "Alvinza Erza Farandhika",
    "vynts",
    "Alvinza Erza Farandhika Portfolio",
    "Vynts GitHub Developer",

    // Prestasi & Kompetisi (LKS & Challenge)
    "Alvinza Erza Farandhika LKS Nasional",
    "Finalis LKS Nasional Web Technologies",
    "Juara LKS Lampung Web Application",
    "Lomba Kompetensi Siswa Web Development",

    // Core Roles
    "Backend Developer",
    "Fullstack Developer",
    "DevOps Engineer",
    "Python Backend Developer",
    "Fullstack Python Developer",
    "Cloud Infrastructure Engineer",

    // Tech Stack & Frameworks
    "Python",
    "Flask",
    "FastAPI",
    "FastAPI REST API Engineer",
    "Flask Web Developer Indonesia",
    "Microservices Engineer Python",
    "Docker & Cloud Deployment",

    // Cloud & Integrasi
    "AWS AI Academy Cloud Engineer",
    "Midtrans Payment Gateway Integration Developer",
    "CI/CD Pipeline Engineer",

    // Geo-SEO (Lokasi)
    "Lampung",
    "Web Developer Lampung",
    "Backend Developer Lampung",
    "Devops Engineer Lampung",
    "Software Engineer Bandar Lampung",
    "Web Developer Bandar Lampung",
  ],
  authors: [{ name: "Alvinza Erza Farandhika" }],

  alternates: {
    canonical: "https://erza.site",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Alvinza Erza Farandhika | Backend Developer",
    description:
      "Portfolio & personal blog of Alvinza Erza Farandhika. Focused on Backend Development with Python (Flask/FastAPI).",
    url: "https://erza.site",
    siteName: "Alvinza Erza Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvinza Erza Farandhika | Backend Developer",
    description:
      "Portfolio & personal blog of Alvinza Erza Farandhika. Focused on Backend Development with Python (Flask/FastAPI).",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d1117] text-[#c9d1d9]">
        {/* 2. PASANG TRANSLATOR DI ATAS NAVBAR */}
        <GoogleTranslator />

        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
