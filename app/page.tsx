import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  // Mengambil data langsung dari server, bukan dari API
  const allPosts = getSortedPostsData();
  const latestPosts = allPosts.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] px-4 sm:px-6 py-12 sm:py-16 selection:bg-[#58a6ff]/30 selection:text-white">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      ></link>

      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <section className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 sm:py-12">
          {/* Profile Image Column */}
          {/* Mobile: Atas, Center, Bulat | Desktop: Kanan, Aspect-Ratio 4/5 Rounded-2xl */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-full lg:max-w-[420px] lg:h-auto lg:aspect-[4/5] rounded-full lg:rounded-2xl overflow-hidden border border-[#232730] shadow-2xl bg-[#13161c] flex-shrink-0 transition-all duration-300">
              <img
                src="/images/photo.jpg"
                alt="Alvinza Erza Farandhika"
                className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
                loading="eager"
              />
            </div>
          </div>

          {/* Text Content Column */}
          {/* Mobile: Center | Desktop: Left */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Subtitle Accent */}
            {/* Subtitle Accent */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {/* Garis kiri: Sembunyi di mobile, hanya muncul di layar desktop (lg) */}
              <span className="hidden lg:block w-8 h-[2px] bg-[#383b42]"></span>

              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#616670]">
                Junior Devops | Backend developer
              </span>
            </div>

            {/* Typography Header */}
            <div className="space-y-1">
              <div className="font-[family-name:var(--font-syne)]">
                <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-white via-[#f8fafc] to-[#e0f2fe] bg-clip-text text-transparent">
                  Alvinza Erza
                </h1>
                <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-white via-[#f8fafc] to-[#e0f2fe] bg-clip-text text-transparent">
                  Farandhika
                </h1>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-4 text-[#8a8f98]">
                <a
                  href="https://github.com/Vynts"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Vynts"
                  className="w-10 h-10 rounded-full border border-[#2b303b] bg-[#161a23]/50 hover:bg-[#1e2330] hover:border-[#424750] hover:text-white transition-all flex items-center justify-center text-base"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/alvinza-erza-farandhika-7a023637a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Erza"
                  className="w-10 h-10 rounded-full border border-[#2b303b] bg-[#161a23]/50 hover:bg-[#1e2330] hover:border-[#424750] hover:text-white transition-all flex items-center justify-center text-base"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://www.instagram.com/erzatora"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Erza"
                  className="w-10 h-10 rounded-full border border-[#2b303b] bg-[#161a23]/50 hover:bg-[#1e2330] hover:border-[#424750] hover:text-white transition-all flex items-center justify-center text-base"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="mailto:erzafarandhika@gmail.com"
                  aria-label="Email Erza"
                  className="w-10 h-10 rounded-full border border-[#2b303b] bg-[#161a23]/50 hover:bg-[#1e2330] hover:border-[#424750] hover:text-white transition-all flex items-center justify-center text-base"
                >
                  <i className="bi bi-envelope-fill"></i>
                </a>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#8a8f98] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Fokus pada Cloud, DevOps, dan Backend Development (Python).
              Pengalaman mengelola kontainer Docker, otomatisasi CI/CD, serta
              infrastruktur cloud untuk memastikan aplikasi berjalan lancar,
              aman, dan siap rilis ke server produksi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://github.com/Vynts"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#161a23] hover:bg-[#1e2330] border border-[#2b303b] text-xs font-medium text-white transition-all flex items-center gap-2 group"
              >
                View GitHub Repos
                <span className="group-hover:translate-x-0.5 transition-transform">
                  ›
                </span>
              </a>
              <a
                href="/cv"
                className="px-6 py-3 rounded-full bg-transparent hover:bg-[#161a23] border border-[#232730] text-xs font-medium text-white transition-all flex items-center gap-2 group"
              >
                Read My CV
                <span className="group-hover:translate-x-0.5 transition-transform">
                  ›
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-end pb-2">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Blog & Insight
              </h2>
            </div>

            <Link
              href="/posts"
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
            >
              <span>Lihat semua</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {latestPosts.length > 0 ? (
              latestPosts.map((post: any) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group relative flex flex-col justify-between p-6 bg-[#161b22] hover:bg-[#1c2128] rounded-2xl border border-[#30363d] hover:border-[#424750] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#8b949e]">
                      <span className="font-mono">{post.date}</span>
                      {post.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#21262d] text-[#38bdf8] border border-[#30363d]">
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#8b949e] line-clamp-2 leading-relaxed text-left">
                      {post.description}
                    </p>
                  </div>

                  {/* Bottom Action / Footer Card */}
                  <div className="pt-5 mt-4 flex items-center justify-between text-xs font-medium text-[#8b949e] group-hover:text-white transition-colors">
                    <span>Baca selengkapnya</span>
                    <div className="w-7 h-7 rounded-full bg-[#21262d] group-hover:bg-[#38bdf8] group-hover:text-[#0d1117] transition-all duration-200 flex items-center justify-center">
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 p-10 text-center text-[#8b949e] text-sm bg-[#161b22] border border-[#30363d] rounded-2xl space-y-2">
                <div className="text-2xl">📝</div>
                <p className="font-medium">Belum ada tulisan terbaru.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
