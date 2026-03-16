"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00f0ff] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#ff6b35] rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-[#00f0ff] text-sm font-mono mb-3 block">
            01: About
          </span>
          <h2 className="text-display">
            Building the{" "}
            <span className="gradient-text">future</span>, one commit at a time
          </h2>
        </motion.div>

        <div className="max-w-4xl">
          <div ref={textRef} className="space-y-6">
            <div className="overflow-hidden">
              <p className="about-text-line text-body-large text-white/70">
                I&apos;m Adarsh Gupta, a Computer Science undergraduate at the Indian
                Institute of Technology Guwahati with a strong interest in
                building scalable systems and applied AI. I enjoy working across
                the stack, from high-performance backend services and
                distributed systems to data-driven products and machine learning
                pipelines. During my internships at Uber, I shipped production
                features across multiple microservices and built tools that
                significantly improved system performance and operational
                efficiency.
              </p>
            </div>

            <div className="overflow-hidden">
              <p className="about-text-line text-body-large text-white/70">
                Beyond industry work, I&apos;ve contributed to research and
                engineering projects spanning graph neural networks, embedded
                sensing systems, compilers, and real-time infrastructure. I&apos;m
                particularly interested in solving complex systems problems and
                building technology that is both performant and practical at
                scale.
              </p>
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 p-5 glass rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff]/20 to-[#ff6b35]/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#00f0ff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {education.institution}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {education.degree}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-[#00f0ff]">
                      GPA: {education.gpa}
                    </span>
                    <span className="text-white/40">|</span>
                    <span className="text-[#ff6b35]">
                      Minor: {education.minorGpa}
                    </span>
                    <span className="text-white/40">|</span>
                    <span className="text-white/60">{education.expected}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
