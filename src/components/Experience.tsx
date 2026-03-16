"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      // Animate experience cards
      gsap.fromTo(
        ".experience-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="section-padding relative overflow-hidden bg-[#030303]"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff] rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35] rounded-full blur-[200px]" />
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
            02: Experience
          </span>
          <h2 className="text-display">
            Where I&apos;ve made{" "}
            <span className="gradient-text">impact</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
            <div
              className="timeline-progress absolute top-0 left-0 w-full h-full origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #00f0ff 0%, #ff6b35 100%)",
              }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card relative grid md:grid-cols-2 gap-8 md:gap-16 ${
                  index % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full transform -translate-x-1/2 z-10"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 20px ${exp.color}`,
                  }}
                />

                {/* Content */}
                <motion.div
                  className={`pl-8 md:pl-0 ${
                    index % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:col-start-2"
                  }`}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Period */}
                  <div
                    className={`flex items-center gap-3 mb-4 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: exp.color }}
                    >
                      {exp.period}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">{exp.location}</span>
                  </div>

                  {/* Company & Role */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {exp.company}
                  </h3>
                  <p className="text-lg text-white/70 mb-1">{exp.role}</p>
                  <span className="text-xs uppercase tracking-wider text-white/40 mb-4 block">
                    {exp.type}
                  </span>

                  {/* Description */}
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-sm text-white/50 ${
                          index % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                        }`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: exp.color }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/60 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Empty space for alternating layout */}
                <div className={index % 2 === 0 ? "hidden md:block" : "hidden"} />
              </div>
            ))}
          </div>
        </div>

        {/* Resume Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.a
            href="/resume.pdf"
            target="_blank"
            className="magnetic-btn inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-text="Download"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download Resume</span>
          </motion.a>
        </motion.div> */}
      </div>
    </section>
  );
}
