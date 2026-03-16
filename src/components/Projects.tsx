"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", label: "All Projects" },
  { id: "featured", label: "Featured" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "ml", label: "ML/AI" },
  { id: "systems", label: "Systems" },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("featured");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : activeCategory === "featured"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card-animate",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
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
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#00f0ff] rounded-full blur-[250px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#ff6b35] rounded-full blur-[200px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-[#00f0ff] text-sm font-mono mb-3 block">
            03: Projects
          </span>
          <h2 className="text-display mb-4">
            Selected <span className="gradient-text">works</span>
          </h2>
          <p className="text-white/60 text-body-large max-w-2xl">
            From hospital management systems to lunar superresolution — each
            project represents a unique challenge conquered with code.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Bento Style */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`project-card-animate project-card group relative cursor-pointer ${
                  project.featured && index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => router.push(`/projects/${project.slug}`)}
                data-cursor-text="View"
              >
                {/* Card Content */}
                <div
                  className={`p-8 h-full flex flex-col ${
                    project.featured && index === 0 ? "min-h-[500px]" : "min-h-[350px]"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${project.color}20`,
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: project.color }}
                      />
                    </div>
                    <span className="text-xs text-white/40 font-mono">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`font-bold mb-2 transition-colors duration-300 ${
                      project.featured && index === 0
                        ? "text-3xl md:text-4xl"
                        : "text-xl md:text-2xl"
                    }`}
                    style={{
                      color: hoveredProject === project.id ? project.color : "white",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-4">{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed flex-grow mb-6">
                    {project.featured && index === 0
                      ? project.longDescription
                      : project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, project.featured && index === 0 ? 6 : 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/50 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors icon-bounce"
                        data-cursor-text="GitHub"
                      >
                        <svg
                          className="w-4 h-4 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        View Code
                      </a>
                    )}
                    <motion.span
                      className="flex items-center gap-1 text-sm ml-auto"
                      style={{ color: project.color }}
                      animate={{
                        x: hoveredProject === project.id ? 5 : 0,
                      }}
                    >
                      Learn more
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.span>
                  </div>
                </div>

                {/* Hover Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}10, transparent 40%)`,
                  }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => setActiveCategory("all")}
              className="magnetic-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              <span>View All Projects</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
