"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats, education } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function Counter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current * 100) / 100);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span className="counter">
      {typeof count === "number" && count % 1 !== 0
        ? count.toFixed(2)
        : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

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
          className="mb-20"
        >
          <span className="text-[#00f0ff] text-sm font-mono mb-4 block">
            01 — About
          </span>
          <h2 className="text-display">
            Building the{" "}
            <span className="gradient-text">future</span>, one commit at a time
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: About Text */}
          <div ref={textRef} className="space-y-6">
            <div className="overflow-hidden">
              <p className="about-text-line text-body-large text-white/70">
                I&apos;m a Computer Science student at{" "}
                <span className="text-white font-medium">
                  IIT Guwahati
                </span>{" "}
                with a passion for building systems that scale. My journey spans
                from low-level C compilers to cloud-native microservices.
              </p>
            </div>

            <div className="overflow-hidden">
              <p className="about-text-line text-body-large text-white/70">
                At{" "}
                <span className="text-white font-medium">Uber</span>, I shipped{" "}
                <span className="text-[#00f0ff]">54 production diffs</span>{" "}
                across 5 microservices, accelerating queries by{" "}
                <span className="text-[#ff6b35]">27x</span> and reducing
                on-call workload by <span className="text-[#ff6b35]">30%</span>.
              </p>
            </div>

            <div className="overflow-hidden">
              <p className="about-text-line text-body-large text-white/70">
                Beyond engineering, I&apos;ve led a{" "}
                <span className="text-white font-medium">60-member team</span>{" "}
                to deliver production systems and published research at IEEE
                and ASME conferences spanning ML, GNNs, and formal verification.
              </p>
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10 p-6 glass rounded-2xl"
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

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 glass rounded-2xl group hover:border-[#00f0ff]/30 transition-all duration-500"
                data-cursor-hover
              >
                <div className="text-5xl md:text-6xl font-bold mb-2 gradient-text">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
