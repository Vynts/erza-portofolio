// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1117]/70 border-t border-[#30363d] py-10 sm:py-14 px-4 sm:px-6 notranslate">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Call to Action Section - Rata Kiri */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's work together.
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              Punya ide proyek, diskusi arsitektur cloud, atau sekadar ingin menyapa? Pintu saya selalu terbuka.
            </p>
          </div>

          {/* Contact Button */}
          <div className="shrink-0">
            <a
              href="mailto:erzafarandhika@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#161b22] hover:bg-[#1c2128] text-xs sm:text-sm font-mono text-white hover:text-[#38bdf8] rounded-xl border border-[#30363d] hover:border-[#424750] transition-all duration-300 group shadow-sm"
            >
              <span>Get in Touch</span>
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar / Copyright - Rata Kiri */}
        <div className="pt-6 border-t border-[#30363d]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8b949e] font-mono">
          <p>© {new Date().getFullYear()} Alvinza Erza Farandhika. Built with Next.js</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Available for new opportunities</span>
          </div>
        </div>

      </div>
    </footer>
  );
}