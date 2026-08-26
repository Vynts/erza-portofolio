"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating?: number;
  finishedDate?: string;
  link?: string;
}

// Data Dummy Buku
const dummyBooks: Book[] = [
  {
    id: "1",
    title: "Start With Why",
    author: "Simon Sinek",
    coverImage: "/images/startwithwhycover.jpg",
    finishedDate: "2025",
  },
  {
    id: "2",
    title: "Can't Hurt Me",
    author: "David Goggins",
    coverImage: "/images/canthurtmecover.jpg",
    finishedDate: "2025",
  },
  {
    id: "3",
    title: "The Personal MBA",
    author: "Josh Kaufman",
    coverImage: "/images/thepersonalmbacover.jpg",
    finishedDate: "2026",
  },
];

export default function BooksClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dummyBooks.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] py-6 sm:py-16 px-4 sm:px-6 selection:bg-[#38bdf8]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header Section - Responsif Fleksibel */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
              // Personal Library
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Reading
            </h1>
            <p className="text-xs sm:text-base text-[#8b949e] max-w-xl leading-relaxed">
              Kumpulan buku yang mengubah sudut pandang dan memicu proses bertumbuh saya. Setiap halaman di sini menyimpan pelajaran, ide, atau cerita yang terus memengaruhi cara saya melangkah di dunia.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
            <a
              href="https://drive.google.com/drive/folders/1OrfgyvOT51hSIqQj51D6oNFvexitgEE6?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-4 py-2.5 bg-[#161b22] hover:bg-[#1c2128] text-xs font-mono text-white rounded-xl border border-[#30363d] hover:border-[#424750] transition-all group notranslate shadow-sm"
            >
              <span translate="no">Books Collections</span>
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Books Grid - Responsif 1 s.d. 3 Kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((book) => (
              <div
                key={book.id}
                className="group relative flex flex-col justify-between bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] hover:border-[#424750] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
              >
                {/* Book Cover Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0d1117]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-80" />
                  
                  {book.finishedDate && (
                    <span className="absolute top-3 right-3 text-[10px] font-mono text-white bg-[#0d1117]/80 backdrop-blur-md border border-[#30363d] px-2.5 py-1 rounded-md shadow-md">
                      {book.finishedDate}
                    </span>
                  )}
                </div>

                {/* Content Info */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2 sm:space-y-3">
                  <div className="space-y-1">
                    <p className="text-[11px] sm:text-xs font-mono text-[#38bdf8] truncate">
                      {book.author}
                    </p>
                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors line-clamp-2 leading-snug">
                      {book.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[#161b22] border border-[#30363d] rounded-2xl p-8 sm:p-12 text-center text-[#8b949e] text-sm space-y-2">
              <div className="text-3xl">📚</div>
              <p className="font-medium">
                Belum ada buku yang dimasukkan ke perpustakaan.
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Full Responsif Scroll Control */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6 sm:pt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-[#38bdf8] hover:border-[#424750] disabled:opacity-30 disabled:hover:text-[#8b949e] disabled:hover:border-[#30363d] transition-colors text-xs font-mono font-medium"
            >
              Prev
            </button>

            <div className="flex items-center gap-1 overflow-x-auto max-w-[180px] sm:max-w-none no-scrollbar">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl border text-xs font-mono font-semibold transition-all ${
                      currentPage === pageNumber
                        ? "bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8]"
                        : "bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#424750]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-[#38bdf8] hover:border-[#424750] disabled:opacity-30 disabled:hover:text-[#8b949e] disabled:hover:border-[#30363d] transition-colors text-xs font-mono font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}