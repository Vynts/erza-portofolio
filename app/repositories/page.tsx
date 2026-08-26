"use client";

import React, { useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  languages?: string[];
  updated_at: string;
}

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchReposAndLanguages() {
      try {
        const res = await fetch(
          "https://api.github.com/users/vynts/repos?sort=updated&per_page=100",
        );

        if (res.status === 403) {
          throw new Error(
            "Terkena Rate Limit GitHub API. Silakan coba lagi beberapa saat lagi.",
          );
        }
        if (!res.ok) {
          throw new Error(
            `Gagal mengambil data dari GitHub API (Status: ${res.status})`,
          );
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response dari server bukan format JSON yang valid.");
        }

        const data: Repository[] = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Data yang diterima bukan array repositori.");
        }

        const originalRepos = data.filter((repo) => !repo.fork);

        // Menggunakan primary language bawaan untuk menghemat kuota API (1 request saja)
        const reposWithLanguages = originalRepos.map((repo) => ({
          ...repo,
          languages: repo.language ? [repo.language] : [],
        }));

        setRepos(reposWithLanguages);
        setFilteredRepos(reposWithLanguages);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchReposAndLanguages();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = repos.filter((repo) => {
      const matchName = repo.name.toLowerCase().includes(query);
      const matchDesc =
        repo.description && repo.description.toLowerCase().includes(query);
      const matchLang =
        repo.languages &&
        repo.languages.some((lang) => lang.toLowerCase().includes(query));

      return matchName || matchDesc || matchLang;
    });

    setFilteredRepos(filtered);
    setCurrentPage(1);
  }, [searchQuery, repos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] py-8 sm:py-16 px-4 selection:bg-[#38bdf8]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
            <div className="">
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
                  // Projects
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight notranslate">
                Repositories
              </h1>
              <p className="text-sm text-[#8b949e] max-w-md">
                Daftar proyek dan repositori terbuka yang dikembangkan publik di
                GitHub @vynts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] px-4 py-2 rounded-xl">
                <span className="text-xs text-[#8b949e] font-mono">
                  Total Repos:
                </span>
                <span className="text-sm font-bold font-mono text-[#38bdf8]">
                  {repos.length}
                </span>
              </div>
              <a
                href="https://github.com/vynts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#161b22] hover:bg-[#1c2128] text-xs font-mono text-white rounded-xl border border-[#30363d] hover:border-[#424750] transition-all group notranslate"
              >
                <span>GitHub</span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
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
              placeholder="Cari berdasarkan nama, deskripsi, atau bahasa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#38bdf8] text-white rounded-2xl pl-11 pr-4 py-3 text-sm outline-none transition-all placeholder-[#6e7681]"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#38bdf8]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#ff7b72]/10 border border-[#ff7b72]/30 text-[#ff7b72] rounded-2xl p-6 text-center text-sm font-mono leading-relaxed">
            Error: {error}
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentItems.length > 0 ? (
                currentItems.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] hover:border-[#424750] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="space-y-3">
                      {/* Header Repositori */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Bootstrap Icon: bi-journal-code */}
                          <svg
                            className="w-4 h-4 text-[#8b949e] group-hover:text-[#38bdf8] transition-colors shrink-0"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"
                            />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm10 1H3a1 1 0 0 0-1 1v1h12V2a1 1 0 0 0-1-1zm1 3H2v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4z" />
                          </svg>
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors truncate">
                            {repo.name}
                          </h3>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#21262d] group-hover:bg-[#38bdf8] group-hover:text-[#0d1117] transition-all duration-200 flex items-center justify-center shrink-0 text-xs">
                          <span className="group-hover:translate-x-0.5 transition-transform">
                            &rarr;
                          </span>
                        </div>
                      </div>

                      {/* Deskripsi */}
                      <p className="text-sm text-[#8b949e] line-clamp-2 leading-relaxed text-left min-h-[40px]">
                        {repo.description || "Tidak ada deskripsi."}
                      </p>
                    </div>

                    {/* Footer Repo Meta */}
                    <div className="pt-5 mt-4 border-t border-[#30363d]/40 flex flex-col gap-3 text-xs text-[#8b949e]">
                      {/* Daftar Seluruh Bahasa (Full Biru) */}
                      {repo.languages && repo.languages.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {repo.languages.map((lang) => (
                            <span
                              key={lang}
                              className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[#38bdf8]"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3 text-xs pt-1">
                        {/* Icon Star Putih */}
                        <div className="flex items-center gap-1 font-mono text-[#8b949e] group-hover:text-white transition-colors">
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                          </svg>
                          <span>{repo.stargazers_count}</span>
                        </div>

                        <span className="font-mono text-[11px]">
                          Upd:{" "}
                          {new Date(repo.updated_at).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 bg-[#161b22] border border-[#30363d] rounded-2xl p-12 text-center text-sm text-[#8b949e]">
                  Tidak ada repositori yang ditemukan.
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
          </>
        )}
      </div>
    </div>
  );
}
