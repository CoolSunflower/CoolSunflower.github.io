"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { publications, research } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Research() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for publication cards
      gsap.utils.toArray<HTMLElement>(".pub-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="research"
      className="section-padding relative overflow-hidden bg-[#030303]"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#a855f7] rounded-full blur-[250px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#00f0ff] rounded-full blur-[200px]" />
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
            04: Research
          </span>
          <h2 className="text-display mb-4">
            Publications & <span className="gradient-text">Research</span>
          </h2>
          <p className="text-white/60 text-body-large max-w-2xl">
            Contributing to the frontiers of ML, computer vision, and formal
            verification through peer-reviewed research.
          </p>
        </motion.div>

        {/* Publications */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            Publications
          </motion.h3>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <motion.article
                key={index}
                className="pub-card p-6 md:p-8 glass rounded-2xl group hover:border-[#00f0ff]/30 transition-all duration-500"
                data-cursor-hover
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        pub.status === "Published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {pub.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 group-hover:text-[#00f0ff] transition-colors">
                      {pub.title}
                    </h4>
                    <p className="text-white/60 text-sm mb-3">{pub.venue}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span>{pub.location}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{pub.date}</span>
                    </div>
                  </div>

                  {/* Link */}
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-2 text-sm text-[#00f0ff] hover:underline"
                      data-cursor-text="Read"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Preprint
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Research Experience */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff6b35]" />
            Research Experience
          </motion.h3>

          <div className="space-y-4">
            {research.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-5 glass rounded-xl group hover:border-[#ff6b35]/30 transition-all duration-500"
                data-cursor-hover
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{
                      background:
                        index === 0
                          ? "rgba(0, 240, 255, 0.1)"
                          : index === 1
                          ? "rgba(255, 107, 53, 0.1)"
                          : "rgba(168, 85, 247, 0.1)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      style={{
                        color:
                          index === 0
                            ? "#00f0ff"
                            : index === 1
                            ? "#ff6b35"
                            : "#a855f7",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h4 className="font-semibold group-hover:text-[#ff6b35] transition-colors">
                        {item.role}
                        <span className="text-white/40 font-normal"> @ </span>
                        <span className="text-white/70">{item.institution}</span>
                      </h4>
                      <span className="text-xs text-white/40 font-mono flex-shrink-0">
                        {item.period}
                      </span>
                    </div>
                    
                    {item.lab && (
                      <p className="text-sm text-white/50 mb-2">{item.lab}{item.advisor && ` • Advisor: ${item.advisor}`}</p>
                    )}
                    
                    {item.description && (
                      <p className="text-sm text-white/60 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    
                    {/* Skills Tags */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill: string, skillIdx: number) => (
                          <span
                            key={skillIdx}
                            className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/50 border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
