"use client";

import React, { useState, useEffect } from "react";

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState<string>("basics");

  useEffect(() => {
    const sections = [
      "basics",
      "projects",
      "education",
      "awards",
      "skills",
      "languages",
    ];

    const handleScroll = () => {
      // 1. Cek apakah sudah mentok paling bawah halaman secara presisi
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;
      if (isAtBottom) {
        setActiveSection("languages");
        return;
      }

      // 2. Tentukan garis deteksi (titik acuan) di layar, misalnya 25% dari atas viewport (sekitar posisi navbar/sidebar)
      const detectionLine = window.innerHeight * 0.25;

      let currentSection = "basics";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Jika bagian atas kontainer sudah melewati garis deteksi kita,
          // tandai section ini sebagai yang paling aktif saat ini.
          if (rect.top <= detectionLine) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Jalankan sekali saat mount untuk inisialisasi posisi awal
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-6 sm:py-12 px-4 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8">
        {/* Navigation Sidebar */}
        <aside className="print:hidden">
          <div className="md:sticky md:top-28 space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#58a6ff] uppercase hidden md:block mb-4">
              Navigasi
            </span>

            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-4 md:gap-1 border-b md:border-b-0 border-[#30363d] scrollbar-none whitespace-nowrap notranslate">
              {[
                { id: "basics", name: "Basics" },
                { id: "projects", name: "Projects" },
                { id: "education", name: "Education" },
                { id: "awards", name: "Awards" },
                { id: "skills", name: "Skills" },
                { id: "languages", name: "Languages" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm transition-colors py-1.5 px-3 md:px-0 bg-[#161b22] md:bg-transparent rounded-md md:rounded-none border border-[#30363d] md:border-0 font-medium ${
                    activeSection === item.id
                      ? "text-white font-bold md:border-l-2 md:border-[#58a6ff] md:pl-3"
                      : "text-[#8b949e] hover:text-[#f0f6fc]"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="space-y-6">
          {/* Header Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
                CV
              </h1>
              <p className="text-sm text-[#58a6ff] mt-1 break-words notranslate">
                Alvinza Erza Farandhika - Junior DevOps Engineer | Cloud &
                Backend
              </p>
            </div>
            <a
              href="/documents/CV_Alvinza_Erza_Farandhika.pdf"
              download="CV_Alvinza_Erza_Farandhika.pdf"
              className="flex items-center justify-center p-2.5 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] rounded-lg transition-colors border border-[#30363d] print:hidden shrink-0"
              aria-label="Download CV"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
            </a>
          </div>

          {/* Section: Basics */}
          <section
            id="basics"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-sm sm:text-base font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-2 notranslate">
              Basics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">
                  Name:
                </span>
                <span className="text-[#f0f6fc] font-semibold break-words">
                  Alvinza Erza Farandhika
                </span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">
                  Label:
                </span>
                <span className="text-[#58a6ff] font-semibold break-words notranslate">
                  Junior DevOps Engineer | Cloud & Backend
                </span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">
                  Email:
                </span>
                <a
                  href="mailto:vendzaky@gmail.com"
                  className="text-[#f0f6fc] hover:text-[#58a6ff] transition-colors break-all"
                >
                  vendzaky@gmail.com
                </a>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">
                  Location:
                </span>
                <span className="text-[#f0f6fc] break-words notranslate">
                  Lampung, Indonesia
                </span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-2 sm:col-span-2">
                <span className="text-[#8b949e] text-xs sm:text-sm notranslate">
                  Github:
                </span>
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
            <h2 className="text-sm sm:text-base font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-2 notranslate">
              Projects & Experience
            </h2>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
                <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2">
                  <span className="text-xs text-[#8b949e] notranslate">
                    2026 - Sekarang
                  </span>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#21262d] text-[#58a6ff] px-2.5 py-1 rounded-md border border-[#30363d] notranslate">
                    Ongoing
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#f0f6fc] leading-tight">
                    Nocsphere (Automasi Billing & Infrastruktur MikroTik)
                  </h3>
                  <div className="text-xs sm:text-sm text-[#58a6ff] font-medium break-words">
                    FastAPI, MikroTik API (RouterOS), WhatsApp Gateway, Telegram
                    Bot, Payment Gateway
                  </div>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed pt-1 text-justify">
                    Membangun sistem integrasi real-time menggunakan FastAPI
                    untuk menyinkronkan data pembayaran pengguna dengan kontrol
                    akses jaringan PPPoE pada MikroTik secara otomatis, dengan
                    integrasi WhatsApp gateway, bot Telegram, dan payment
                    gateway.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#30363d] pt-8 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
                <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2">
                  <span className="text-xs text-[#8b949e] notranslate">
                    Sept 2025 - Des 2025
                  </span>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#21262d] text-[#58a6ff] px-2.5 py-1 rounded-md border border-[#30363d]">
                    Belajar
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-[#f0f6fc]">
                      Learning Member
                    </h3>
                    <div className="text-xs sm:text-sm text-[#8b949e] font-medium">
                      FR Academy (CV. FR-System)
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    Mengikuti program pengembangan backend intensif berbasis
                    proyek dengan standar industri.
                  </p>
                  <div className="bg-[#1b222c]/50 border border-[#30363d]/50 rounded-lg p-4 space-y-2 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#f0f6fc] leading-tight">
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
                      Sebagai Lead Developer, membangun sistem manajemen
                      pembayaran sekolah berbasis Flask dan MySQL yang mencakup
                      perancangan skema database relasional, pengolahan logika
                      transaksi keuangan, dan manajemen data siswa secara
                      terstruktur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Education */}
          <section
            id="education"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-sm sm:text-base font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-2 notranslate">
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
              <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2">
                <span className="text-xs text-[#8b949e] notranslate">
                  2023 - 2026
                </span>
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#21262d] text-[#58a6ff] px-2.5 py-1 rounded-md border border-[#30363d]">
                  Graduated
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#f0f6fc] notranslate">
                  SMK Muhammadiyah 3 Metro, Lampung
                </h3>
                <p className="text-xs sm:text-sm text-[#8b949e]">
                  Teknik Komputer dan Jaringan
                </p>
              </div>
            </div>
          </section>

          {/* Section: Awards */}
          <section
            id="awards"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-sm sm:text-base font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-2 notranslate">
              Awards
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4">
                <span className="text-xs text-[#8b949e] notranslate">2025</span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                    Finalis LKS Nasional
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    Bidang Lomba: Cloud Computing
                  </p>
                </div>
              </div>
              <div className="border-t border-[#30363d] pt-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4">
                <span className="text-xs text-[#8b949e] notranslate">2025</span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                    Juara 1 LKS Tingkat Provinsi Lampung
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    Bidang Lomba: Cloud Computing
                  </p>
                </div>
              </div>
              <div className="border-t border-[#30363d] pt-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4">
                <span className="text-xs text-[#8b949e] notranslate">2024</span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                    Medali Perunggu Olympic Ahmad Dahlan Nasional
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    Bidang Lomba: Web Design
                  </p>
                </div>
              </div>
              <div className="border-t border-[#30363d] pt-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4">
                <span className="text-xs text-[#8b949e] notranslate">2024</span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                    Juara 2 LKS Cloud Computing Tingkat Kota Metro
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    Bidang Lomba: Cloud Computing
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Skills */}
          <section
            id="skills"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-sm sm:text-base font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-2 notranslate">
              Skills
            </h2>
            <div className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 border-b border-[#30363d]/50 pb-4">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  Cloud & DevOps:
                </span>
                <span className="text-[#c9d1d9]">
                  AWS (EC2, RDS, S3, EFS, Lambda, API Gateway, SNS, IAM, IoT
                  Core), Docker & Containerization, CI/CD (GitHub Actions),
                  Cloudflare
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 border-b border-[#30363d]/50 pb-4">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  Monitoring & Observability:
                </span>
                <span className="text-[#c9d1d9]">
                  Prometheus (PromQL, Exporters, Pushgateway), Grafana
                  (Dashboarding)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 border-b border-[#30363d]/50 pb-4">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  Networking & OS:
                </span>
                <span className="text-[#c9d1d9]">
                  Linux Server (Debian, Ubuntu, Fedora, Amazon Linux), MikroTik
                  (PPPoE/Routing), Subnetting, SSH, Bash Scripting
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 border-b border-[#30363d]/50 pb-4">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  Programming & Backend:
                </span>
                <span className="text-[#c9d1d9]">
                  Python (FastAPI, Flask), REST API Development, JavaScript
                  (Dasar), PHP (Dasar), HTML5, CSS3 (Bootstrap)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 border-b border-[#30363d]/50 pb-4">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  Databases:
                </span>
                <span className="text-[#c9d1d9]">
                  Relational Databases (MySQL, SQL Querying & Schema Design),
                  DynamoDB (AWS NoSQL)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 border-b border-[#30363d]/50 pb-4">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  Tools & Platform:
                </span>
                <span className="text-[#c9d1d9]">
                  Git/GitHub, Postman, Figma, Visual Studio Code, Linux CLI,
                  Cloudflare
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2">
                <span className="font-semibold text-[#58a6ff] shrink-0">
                  AI & Productivity:
                </span>
                <span className="text-[#c9d1d9]">
                  AI-Assisted Development, Prompt Engineering for Code
                  Optimization, Debugging & Refactoring
                </span>
              </div>
            </div>
          </section>

          {/* Section: Languages */}
          <section
            id="languages"
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8 space-y-6 scroll-mt-28"
          >
            <h2 className="text-sm sm:text-base font-semibold text-[#f0f6fc] tracking-wider uppercase border-b border-[#30363d] pb-2 notranslate">
              Languages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-[#f0f6fc] font-semibold notranslate">
                  Bahasa Indonesia
                </span>
                <span className="block text-xs text-[#8b949e] notranslate">
                  Native or bilingual proficiency
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[#f0f6fc] font-semibold notranslate">
                  English
                </span>
                <span className="block text-xs text-[#8b949e] notranslate">
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
