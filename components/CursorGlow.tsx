"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  
  // Gunakan koordinat tengah layar sebagai posisi awal agar tidak hilang di pojok
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          // Opacity ditingkatkan sedikit agar warnanya benar-benar terlihat jelas
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(37, 99, 235, 0.08) 55%, transparent 80%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}