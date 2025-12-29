"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { siteConfig, techStack } from "@/lib/data";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title characters
      const chars = textRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.fromTo(
          chars,
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            duration: 1,
            delay: 2.5,
            ease: "power4.out",
          }
        );
      }

      // Animate subtitle
      gsap.fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 3, ease: "power3.out" }
      );

      // Animate CTA
      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 3.2, ease: "power3.out" }
      );

      // Animate scroll indicator
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 3.5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "Adarsh";
  const lastName = "Gupta";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-[1]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Main Title */}
        <div ref={textRef} className="mb-6 perspective-1000">
          <h1 className="text-hero leading-none">
            <span className="block overflow-hidden">
              {firstName.split("").map((char, i) => (
                <span
                  key={`first-${i}`}
                  className="char inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden gradient-text">
              {lastName.split("").map((char, i) => (
                <span
                  key={`last-${i}`}
                  className="char inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p className="hero-subtitle text-body-large text-white/60 max-w-2xl mx-auto mb-12">
          Full-stack engineer building at the intersection of{" "}
          <span className="text-[#00f0ff]">systems</span> and{" "}
          <span className="text-[#ff6b35]">scale</span>. From embedded sensors
          to cloud-scale microservices — I ship code that matters.
        </motion.p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#projects"
            className="magnetic-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-text="View"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>View Projects</span>
          </motion.a>
          <motion.a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            data-cursor-text="GitHub"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            View GitHub
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>

      {/* Tech Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 py-6 border-t border-white/5">
        <div className="marquee">
          <div className="marquee-content">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="text-sm text-white/30 font-medium whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {techStack.map((tech, i) => (
              <span
                key={`dup-${i}`}
                className="text-sm text-white/30 font-medium whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
