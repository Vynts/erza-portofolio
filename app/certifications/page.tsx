"use client";

import React, { useState } from 'react';

interface Item {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

const itemsData: (Item & { category: 'cert' | 'award' })[] = [
  { id: 1, category: 'cert', title: "Belajar Dasar Cloud dan Gen AI di AWS", issuer: "Dicoding Indonesia", date: "2026", image: "/certs/dicoding.jpg", credentialUrl: "https://www.dicoding.com/certificates/1OP8RELELZQK" },
  { id: 2, category: 'cert', title: "Spec-Driven Development dengan Kiro", issuer: "Dicoding Indonesia", date: "2026", image: "/certs/dicoding.jpg", credentialUrl: "https://www.dicoding.com/certificates/81P2OL97YZOY" },
  { id: 3, category: 'cert', title: "Belajar Membuat Front-End Web untuk Pemula", issuer: "Dicoding Indonesia", date: "2026", image: "/certs/dicoding.jpg", credentialUrl: "http://dicoding.com/certificates/07Z67360JPQR" },
  { id: 4, category: 'cert', title: "Belajar Dasar Pemrograman Web", issuer: "Dicoding Indonesia", date: "2026", image: "/certs/dicoding.jpg", credentialUrl: "https://www.dicoding.com/certificates/RVZK01NNOZD5" },
  { id: 5, category: 'cert', title: "TOEIC® Listening and Reading SCORE 665", issuer: "International Test Center", date: "2025", image: "/certs/toeic.jpg", credentialUrl: "/certs/toeic.jpg" },
  { id: 101, category: 'award', title: "Finalis LKS Cloud Computing Nasional", issuer: "LKS Nasional", date: "2025", image: "/awards/lks-nasional.jpg", credentialUrl: "/awards/lks-nasional.jpg" },
  { id: 102, category: 'award', title: "Juara 1 LKS Cloud Computing Prov. Lampung", issuer: "LKS Provinsi", date: "2025", image: "/awards/lks-provinsi.jpg", credentialUrl: "/awards/lks-provinsi.jpg" },
  { id: 103, category: 'award', title: "Medali Perunggu Olympic Ahmad Dahlan (Web Design)", issuer: "Olympic Ahmad Dahlan", date: "2024", image: "/awards/olympic-ahmad-dahlan.jpg", credentialUrl: "/awards/olympic-ahmad-dahlan.jpg" },
  { id: 104, category: 'award', title: "Juara 2 Lks Cloud Computing Tingkat Kota Metro", issuer: "LKS Kota Metro", date: "2024", image: "/awards/lks-kota-metro.jpg", credentialUrl: "/awards/lks-kota-metro.jpg" },
];

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<'cert' | 'award'>('cert');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const filteredItems = itemsData.filter(item => item.category === activeTab);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-10 px-4 sm:px-6 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
        
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight notranslate">Achievements</h1>
          <div className="flex gap-4 sm:gap-6 border-b border-[#30363d]/40 pb-px">
            <button 
              onClick={() => { setActiveTab('cert'); setCurrentPage(1); }}
              className={`pb-3 text-sm sm:text-base font-semibold transition-colors relative ${activeTab === 'cert' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}
            >
              Certifications
              {activeTab === 'cert' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#58a6ff]" />}
            </button>
            <button 
              onClick={() => { setActiveTab('award'); setCurrentPage(1); }}
              className={`pb-3 text-sm sm:text-base font-semibold transition-colors relative ${activeTab === 'award' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}
            >
              Awards
              {activeTab === 'award' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#58a6ff]" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((item) => {
            const CardContent = (
              <div className="bg-[#1b222c] border border-[#30363d]/60 hover:border-[#444c56] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-200 h-full justify-between">
                <div className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-[#0d1117]/50 rounded-lg p-2 shrink-0">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <div className="mt-4 flex-1 flex flex-col w-full">
                  <h2 className="text-sm font-semibold text-[#f0f6fc] line-clamp-3 leading-snug break-words">
                    {item.title}
                  </h2>
                  <p className="text-[11px] text-[#8b949e] mt-2 shrink-0">
                    {item.issuer} • {item.date}
                  </p>
                </div>
              </div>
            );

            return item.credentialUrl ? (
              <a key={item.id} href={item.credentialUrl} target="_blank" rel="noopener noreferrer" className="block h-full">{CardContent}</a>
            ) : (
              <div key={item.id} className="h-full">{CardContent}</div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button 
                key={pageNumber} 
                onClick={() => paginate(pageNumber)} 
                className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === pageNumber ? "bg-[#58a6ff] text-white" : "bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}