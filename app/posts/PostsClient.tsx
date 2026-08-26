"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PostData } from "@/lib/posts";

export default function PostsClient({
  initialPosts,
}: {
  initialPosts: PostData[];
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = initialPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(initialPosts.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] py-8 sm:py-16 px-4 selection:bg-[#38bdf8]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Postingan
            </h1>
            <p className="text-sm text-[#8b949e] max-w-md">
              Catatan, dokumentasi teknis, dan ruang pembelajaran seputar DevOps
              & Software Engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] px-4 py-2 rounded-xl w-fit">
            <span className="text-xs text-[#8b949e] font-mono">
              Total Posts:
            </span>
            <span className="text-sm font-bold font-mono text-[#38bdf8]">
              {initialPosts.length}
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {currentItems.length > 0 ? (
            currentItems.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group relative flex flex-col justify-between bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] hover:border-[#424750] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className="space-y-3">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs text-[#8b949e]">
                    <span className="font-mono">
                      {post.date
                        ? new Date(post.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-[#8b949e] line-clamp-2 leading-relaxed text-left">
                    {post.description}
                  </p>
                </div>

                {/* Footer Meta / Tags */}
                <div className="pt-5 mt-4 space-y-3">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-[#38bdf8] bg-[#21262d] border border-[#30363d] px-2.5 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-medium text-[#8b949e] group-hover:text-white transition-colors pt-2">
                    <span>Baca selengkapnya</span>
                    <div className="w-7 h-7 rounded-full bg-[#21262d] group-hover:bg-[#38bdf8] group-hover:text-[#0d1117] transition-all duration-200 flex items-center justify-center">
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 bg-[#161b22] border border-[#30363d] rounded-2xl p-12 text-center text-[#8b949e] text-sm space-y-2">
              <div className="text-2xl">📝</div>
              <p className="font-medium">
                Belum ada tulisan yang dipublikasikan.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
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
