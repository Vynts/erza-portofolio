"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "basics", name: "Basics" },
  { id: "projects", name: "Projects" },
  { id: "education", name: "Education" },
  { id: "awards", name: "Awards" },
  { id: "skills", name: "Skills" },
  { id: "languages", name: "Languages" },
];

const SKILL_CATEGORIES = [
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS (EC2, RDS, S3, EFS, Lambda, API Gateway, SNS, IAM, IoT Core)",
      "Docker & Containerization",
      "CI/CD (GitHub Actions)",
      "Cloudflare",
    ],
  },
  {
    title: "Monitoring & Observability",
    skills: ["Prometheus (PromQL, Exporters, Pushgateway)", "Grafana"],
  },
  {
    title: "Networking & OS",
    skills: [
      "Linux Server (Debian, Ubuntu, Fedora, Amazon Linux)",
      "MikroTik (PPPoE/Routing)",
      "Subnetting",
      "SSH",
      "Bash Scripting",
    ],
  },
  {
    title: "Programming & Backend",
    skills: [
      "Python (FastAPI, Flask)",
      "REST API Development",
      "JavaScript (Dasar)",
      "PHP (Dasar)",
      "HTML5 / CSS3 (Bootstrap)",
    ],
  },
  {
    title: "Databases",
    skills: ["MySQL (Querying & Schema Design)", "DynamoDB (AWS NoSQL)"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git & GitHub", "Postman", "Figma", "VS Code", "Linux CLI"],
  },
  {
    title: "AI & Productivity",
    skills: [
      "AI-Assisted Development",
      "Prompt Engineering",
      "Debugging & Code Refactoring",
    ],
  },
];

const AWARDS = [
  {
    year: "2025",
    title: "Finalis LKS Nasional",
    subtitle: "Bidang Lomba: Cloud Computing",
  },
  {
    year: "2025",
    title: "Juara 1 LKS Tingkat Provinsi Lampung",
    subtitle: "Bidang Lomba: Cloud Computing",
  },
  {
    year: "2024",
    title: "Medali Perunggu Olympic Ahmad Dahlan Nasional",
    subtitle: "Bidang Lomba: Web Design",
  },
  {
    year: "2024",
    title: "Juara 2 LKS Cloud Computing Tingkat Kota Metro",
    subtitle: "Bidang Lomba: Cloud Computing",
  },
];

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState<string>("basics");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] py-6 sm:py-12 px-4 selection:bg-[#58a6ff]/30 selection:text-white scroll-smooth">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="print:hidden">
          <div className="md:sticky md:top-24 space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#58a6ff] uppercase hidden md:block px-3 mb-2">
              Navigasi
            </span>

            <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 md:gap-0.5 border-b md:border-b-0 border-[#30363d] scrollbar-none whitespace-nowrap notranslate">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm transition-all duration-200 py-1.5 px-3 rounded-md md:rounded-none border md:border-0 font-medium ${
                      isActive
                        ? "text-white font-bold bg-[#21262d] md:bg-transparent border-[#58a6ff]/40 md:border-l-2 md:border-l-[#58a6ff] md:pl-3"
                        : "text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc]"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="space-y-6">
          
          {/* Header Card (Compact Size) */}
          <header className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 sm:p-5 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#f0f6fc] tracking-tight">
                CV & Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-[#58a6ff] font-medium mt-0.5 break-words notranslate">
                Alvinza Erza Farandhika — Junior DevOps | Backend Developer
              </p>
            </div>
            
            <a
              href="/documents/CV_Alvinza_Erza_Farandhika.pdf"
              download="CV_Alvinza_Erza_Farandhika.pdf"
              className="flex items-center justify-center p-2.5 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] rounded-lg transition-colors border border-[#30363d] print:hidden shrink-0"
              aria-label="Download CV PDF"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
            </a>
          </header>

          {/* Section: Basics */}
          <section
            id="basics"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-xs sm:text-sm font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-3 notranslate">
              Basics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">Name:</span>
                <span className="text-[#f0f6fc] font-semibold break-words">
                  Alvinza Erza Farandhika
                </span>
              </div>
              
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">Label:</span>
                <span className="text-[#58a6ff] font-semibold break-words notranslate">
                  Junior DevOps Engineer | Cloud & Backend
                </span>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">Email:</span>
                <a
                  href="mailto:vendzaky@gmail.com"
                  className="text-[#f0f6fc] hover:text-[#58a6ff] transition-colors break-all"
                >
                  erzafarandhika@gmail.com
                </a>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">Location:</span>
                <span className="text-[#f0f6fc] break-words notranslate">
                  Lampung, Indonesia
                </span>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2 sm:col-span-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">GitHub:</span>
                <a
                  href="https://github.com/Vynts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline break-all"
                >
                  github.com/Vynts
                </a>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#30363d]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] block notranslate">
                Summary
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-[#c9d1d9] text-justify">
                Lulusan SMK (TKJ) yang berfokus di bidang Cloud & DevOps, dengan
                latar belakang kuat di Backend Development (Python:
                FastAPI/Flask). Berpengalaman mengelola infrastruktur cloud
                (AWS), sistem kontainer Docker, serta otomatisasi deployment
                CI/CD (GitHub Actions). Sebagai peraih prestasi nasional LKS
                Cloud Computing, saya memiliki logika pemecahan masalah yang
                solid dan siap mengoptimalkan otomatisasi serta keandalan sistem
                perusahaan.
              </p>
            </div>
          </section>

          {/* Section: Projects & Experience */}
          <section
            id="projects"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-xs sm:text-sm font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-3 notranslate">
              Projects & Experience
            </h2>

            <div className="relative border-l-2 border-[#30363d] ml-2 sm:ml-4 pl-4 sm:pl-6 space-y-8">
              <div className="relative group">
                <div className="absolute -left-[23px] sm:-left-[31px] top-1 w-3 h-3 rounded-full bg-[#58a6ff] border-4 border-[#161b22]" />
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs text-[#8b949e] font-mono notranslate">
                    2026 — Sekarang
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 px-2 py-0.5 rounded-md notranslate">
                    Ongoing
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#f0f6fc]">
                  Nocsphere (Automasi Billing & Infrastruktur MikroTik)
                </h3>
                <div className="text-xs text-[#58a6ff] font-medium mt-0.5 mb-2">
                  FastAPI, MikroTik API (RouterOS), WhatsApp Gateway, Telegram Bot, Payment Gateway
                </div>
                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed text-justify">
                  Membangun sistem integrasi real-time menggunakan FastAPI untuk menyinkronkan data pembayaran pengguna dengan kontrol akses jaringan PPPoE pada MikroTik secara otomatis, dengan integrasi WhatsApp gateway, bot Telegram, dan payment gateway.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[23px] sm:-left-[31px] top-1 w-3 h-3 rounded-full bg-[#30363d] border-4 border-[#161b22]" />
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs text-[#8b949e] font-mono notranslate">
                    Sept 2025 — Des 2025
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-[#21262d] text-[#8b949e] border border-[#30363d] px-2 py-0.5 rounded-md">
                    Belajar
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#f0f6fc]">
                  Learning Member — FR Academy (CV. FR-System)
                </h3>
                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed mb-3">
                  Mengikuti program pengembangan backend intensif berbasis proyek dengan standar industri.
                </p>

                <div className="bg-[#1b222c]/80 border border-[#30363d] rounded-lg p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#f0f6fc]">
                      Proyek Utama: Edupay (Sistem Keuangan Sekolah)
                    </h4>
                    <span className="text-[10px] font-semibold text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded-md border border-[#58a6ff]/20 w-fit shrink-0">
                      Lead Developer
                    </span>
                  </div>
                  <div className="text-xs text-[#8b949e] font-medium">
                    Flask, MySQL, Bootstrap
                  </div>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed text-justify">
                    Sebagai Lead Developer, membangun sistem manajemen pembayaran sekolah berbasis Flask dan MySQL yang mencakup perancangan skema database relasional, pengolahan logika transaksi keuangan, dan manajemen data siswa secara terstruktur.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Education */}
          <section
            id="education"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-xs sm:text-sm font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-3 notranslate">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#f0f6fc] notranslate">
                  SMK Muhammadiyah 3 Metro, Lampung
                </h3>
                <p className="text-xs sm:text-sm text-[#8b949e] mt-0.5">
                  Teknik Komputer dan Jaringan (TKJ)
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[#8b949e] font-mono notranslate">2023 — 2026</span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#21262d] text-[#58a6ff] px-2 py-0.5 rounded-md border border-[#30363d]">
                  Graduated
                </span>
              </div>
            </div>
          </section>

          {/* Section: Awards (List Format) */}
          <section
            id="awards"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-xs sm:text-sm font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-3 notranslate">
              Awards
            </h2>
            <div className="space-y-4">
              {AWARDS.map((award, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-[120px_1fr] gap-1 md:gap-4 ${
                    index !== 0 ? "border-t border-[#30363d] pt-4" : ""
                  }`}
                >
                  <span className="text-xs text-[#8b949e] font-mono notranslate">
                    {award.year}
                  </span>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[#f0f6fc]">
                      {award.title}
                    </h3>
                    <p className="text-xs text-[#8b949e]">
                      {award.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Skills */}
          <section
            id="skills"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-xs sm:text-sm font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-3 notranslate">
              Skills
            </h2>
            <div className="space-y-5">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-xs font-semibold text-[#58a6ff] block">
                    {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-[#21262d] text-[#c9d1d9] border border-[#30363d] px-2.5 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Languages */}
          <section
            id="languages"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-xs sm:text-sm font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-3 notranslate">
              Languages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#1b222c]/40 border border-[#30363d] rounded-lg space-y-0.5">
                <span className="text-sm text-[#f0f6fc] font-semibold notranslate block">
                  Bahasa Indonesia
                </span>
                <span className="text-xs text-[#8b949e] notranslate block">
                  Native or bilingual proficiency
                </span>
              </div>
              <div className="p-3 bg-[#1b222c]/40 border border-[#30363d] rounded-lg space-y-0.5">
                <span className="text-sm text-[#f0f6fc] font-semibold notranslate block">
                  English
                </span>
                <span className="text-xs text-[#8b949e] notranslate block">
                  Professional working proficiency
                </span>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}