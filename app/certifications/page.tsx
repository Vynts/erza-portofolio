"use client";

import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  category: "cert" | "award" | string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

const ITEMS_DATA: Item[] = [
  {
    id: 1,
    category: "cert",
    title: "Belajar Dasar Cloud dan Gen AI di AWS",
    issuer: "Dicoding Indonesia",
    date: "2026",
    image: "/certs/dicoding.jpg",
    credentialUrl: "https://www.dicoding.com/certificates/1OP8RELELZQK",
  },
  {
    id: 2,
    category: "cert",
    title: "Spec-Driven Development dengan Kiro",
    issuer: "Dicoding Indonesia",
    date: "2026",
    image: "/certs/dicoding.jpg",
    credentialUrl: "https://www.dicoding.com/certificates/81P2OL97YZOY",
  },
  {
    id: 3,
    category: "cert",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "2026",
    image: "/certs/dicoding.jpg",
    credentialUrl: "http://dicoding.com/certificates/07Z67360JPQR",
  },
  {
    id: 4,
    category: "cert",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2026",
    image: "/certs/dicoding.jpg",
    credentialUrl: "https://www.dicoding.com/certificates/RVZK01NNOZD5",
  },
  {
    id: 5,
    category: "cert",
    title: "TOEIC® Listening and Reading SCORE 665",
    issuer: "International Test Center",
    date: "2025",
    image: "/certs/toeic.jpg",
    credentialUrl: "/certs/toeic.jpg",
  },
  {
    id: 101,
    category: "award",
    title: "Finalis LKS Cloud Computing Nasional",
    issuer: "LKS Nasional",
    date: "2025",
    image: "/awards/lks-nasional.jpg",
    credentialUrl: "/awards/lks-nasional.jpg",
  },
  {
    id: 102,
    category: "award",
    title: "Juara 1 LKS Cloud Computing Prov. Lampung",
    issuer: "LKS Provinsi",
    date: "2025",
    image: "/awards/lks-provinsi.jpg",
    credentialUrl: "/awards/lks-provinsi.jpg",
  },
  {
    id: 103,
    category: "award",
    title: "Medali Perunggu Olympic Ahmad Dahlan (Web Design)",
    issuer: "Olympic Ahmad Dahlan",
    date: "2024",
    image: "/awards/olympic-ahmad-dahlan.jpg",
    credentialUrl: "/awards/olympic-ahmad-dahlan.jpg",
  },
  {
    id: 104,
    category: "award",
    title: "Juara 2 LKS Cloud Computing Tingkat Kota Metro",
    issuer: "LKS Kota Metro",
    date: "2024",
    image: "/awards/lks-kota-metro.jpg",
    credentialUrl: "/awards/lks-kota-metro.jpg",
  },
];

export default function AwardsPage() {
  const [items] = useState<Item[]>(ITEMS_DATA);
  const [filteredItems, setFilteredItems] = useState<Item[]>(ITEMS_DATA);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesTitle = item.title.toLowerCase().includes(query);
      const matchesIssuer = item.issuer.toLowerCase().includes(query);
      const matchesDate = item.date.toLowerCase().includes(query);

      return matchesCategory && (matchesTitle || matchesIssuer || matchesDate);
    });

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const awardsCount = items.filter((i) => i.category === "award").length;
  const certsCount = items.filter((i) => i.category === "cert").length;

  return (
    <div className="w-full min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] py-8 sm:py-16 px-4 selection:bg-[#38bdf8]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
            <div className="space-y-2">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
                // Achievement
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight notranslate">
                Awards & Certificates
              </h1>
              <p className="text-sm text-[#8b949e] max-w-md">
                Daftar pencapaian, penghargaan kompetisi, dan sertifikasi
                kompetensi.
              </p>
            </div>

            {/* Counters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] px-3.5 py-1.5 rounded-xl text-xs font-mono">
                <span className="text-[#8b949e]">Awards:</span>
                <span className="font-bold text-[#38bdf8]">{awardsCount}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] px-3.5 py-1.5 rounded-xl text-xs font-mono">
                <span className="text-[#8b949e]">Certs:</span>
                <span className="font-bold text-[#38bdf8]">{certsCount}</span>
              </div>
            </div>
          </div>

          {/* Filter Bar & Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center bg-[#161b22] border border-[#30363d] p-1 rounded-2xl gap-1 shrink-0">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#30363d] text-white font-semibold"
                    : "text-[#8b949e] hover:text-white"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedCategory("award")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === "award"
                    ? "bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30 font-semibold"
                    : "text-[#8b949e] hover:text-white"
                }`}
              >
                Penghargaan
              </button>
              <button
                onClick={() => setSelectedCategory("cert")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === "cert"
                    ? "bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30 font-semibold"
                    : "text-[#8b949e] hover:text-white"
                }`}
              >
                Sertifikat
              </button>
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8b949e]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari berdasarkan judul, penerbit, atau tahun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#38bdf8] text-white rounded-2xl pl-11 pr-4 py-2.5 text-sm outline-none transition-all placeholder-[#6e7681]"
              />
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <a
                key={item.id}
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] hover:border-[#424750] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full"
              >
                {/* Image Section */}
                <div className="relative w-full h-44 bg-[#21262d] overflow-hidden border-b border-[#30363d]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback jika gambar gagal terisi
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {/* Category Badge Floating on Image */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`font-mono text-[10px] px-2.5 py-1 rounded-full border backdrop-blur-md ${
                        item.category === "award"
                          ? "border-[#38bdf8]/50 bg-[#0d1117]/80 text-[#38bdf8]"
                          : "border-[#38bdf8]/50 bg-[#0d1117]/80 text-[#38bdf8]"
                      }`}
                    >
                      {item.category === "award" ? "Penghargaan" : "Sertifikat"}
                    </span>
                  </div>
                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 bg-[#0d1117]/80 border border-[#30363d] px-2.5 py-1 rounded-full font-mono text-[10px] text-[#8b949e]">
                    {item.date}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[#8b949e]">
                      Penerbit:{" "}
                      <span className="text-[#c9d1d9]">{item.issuer}</span>
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-[#30363d]/40 flex items-center justify-between text-xs text-[#8b949e]">
                    <span className="font-mono text-[11px] group-hover:text-white transition-colors flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#38bdf8] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Lihat Kredensial
                    </span>
                    <span className="text-[#38bdf8] group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[#161b22] border border-[#30363d] rounded-2xl p-12 text-center text-sm text-[#8b949e]">
              Tidak ada sertifikat atau penghargaan yang ditemukan.
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-[#38bdf8] hover:border-[#424750] disabled:opacity-30 disabled:hover:text-[#8b949e] disabled:hover:border-[#30363d] transition-colors text-xs font-mono font-medium"
            >
              Prev
            </button>

            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-none">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-9 h-9 shrink-0 rounded-xl border text-xs font-mono font-semibold transition-all ${
                      currentPage === pageNumber
                        ? "bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8]"
                        : "bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#424750]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-[#38bdf8] hover:border-[#424750] disabled:opacity-30 disabled:hover:text-[#8b949e] disabled:hover:border-[#30363d] transition-colors text-xs font-mono font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
