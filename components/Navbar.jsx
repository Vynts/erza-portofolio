"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/posts", label: "Posts" },
  { href: "/repositories", label: "Repositories" },
  { href: "/certifications", label: "Certifications" },
  { href: "/reads", label: "Reads" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bahasaAktif, setBahasaAktif] = useState("ID");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const match = document.cookie.match(new RegExp("(^| )googtrans=([^;]+)"));
    if (match) setBahasaAktif(match[2].endsWith("/en") ? "ENG" : "ID");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const gantiBahasa = (bahasa) => {
    const domain = window.location.hostname.replace(/^www\./, "");
    const nilaiCookie = bahasa === "ENG" ? "/id/en" : "/id/id";

    document.cookie = `googtrans=${nilaiCookie}; path=/; domain=${domain};`;
    document.cookie = `googtrans=${nilaiCookie}; path=/;`;

    setBahasaAktif(bahasa);
    setIsLangOpen(false);
    window.location.reload();
  };

  return (
    <nav
      className={`w-full h-20 sticky top-0 left-0 z-50 border-b transition-colors duration-300 notranslate ${
        isScrolled
          ? "bg-[#0d1117]/85 backdrop-blur-md border-[#30363d] shadow-lg"
          : "bg-[#0d1117] border-transparent"
      }`}
    >
      {/* DIUBAH: Menggunakan max-w-7xl dan px-6 md:px-12 agar lebih melebar ke samping */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
        
        {/* LOGO */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="font-bold text-white text-xl ml-1 fs-5tracking-tight hover:text-[#58a6ff] transition-colors"
          >
            Alvinza Erza F
          </Link>
        </motion.div>

        {/* DESKTOP NAV & ACTIONS */}
        <div className="flex items-center space-x-3 md:space-x-6">
          
          {/* NAVIGASI DESKTOP */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-[#8b949e] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#21262d] rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* DROPDOWN TRANSLATOR */}
          <div className="relative inline-block text-left select-none" ref={langRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-[#161b22] text-[#c9d1d9] border border-[#30363d] px-3 py-2 rounded-md text-sm font-semibold hover:bg-[#21262d] hover:border-[#8b949e] transition-all focus:outline-none"
            >
              <svg className="w-4 h-4 text-[#8b949e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>{bahasaAktif}</span>
              <motion.svg
                animate={{ rotate: isLangOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-3.5 h-3.5 text-[#8b949e]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>

            {/* POPUP DROPDOWN */}
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-32 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => gantiBahasa("ID")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        bahasaAktif === "ID"
                          ? "text-[#58a6ff] bg-[#21262d] font-semibold"
                          : "text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                      }`}
                    >
                      Indonesia
                    </button>
                    <button
                      onClick={() => gantiBahasa("ENG")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        bahasaAktif === "ENG"
                          ? "text-[#58a6ff] bg-[#21262d] font-semibold"
                          : "text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* HAMBURGER BUTTON MOBILE */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#8b949e] hover:text-white p-2 rounded-md hover:bg-[#161b22] focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#0d1117]/95 backdrop-blur-xl border-b border-[#30363d] px-6 py-4 absolute top-20 left-0 w-full overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-1.5">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "text-white bg-[#21262d]"
                          : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        body > .skiptranslate,
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </nav>
  );
}