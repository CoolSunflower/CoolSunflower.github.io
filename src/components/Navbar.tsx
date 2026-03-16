"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";
import BubbleMenu from "./BubbleMenu";

// Convert navLinks to BubbleMenu format
const bubbleMenuItems = [
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: -6,
    hoverStyles: { bgColor: "#00f0ff", textColor: "#000000" },
  },
  {
    label: "experience",
    href: "#experience",
    ariaLabel: "Experience",
    rotation: 5,
    hoverStyles: { bgColor: "#ff6b35", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: -4,
    hoverStyles: { bgColor: "#a855f7", textColor: "#ffffff" },
  },
  {
    label: "research",
    href: "#research",
    ariaLabel: "Research",
    rotation: 6,
    hoverStyles: { bgColor: "#22c55e", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -5,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#000000" },
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);

  // Delay showing nav elements to sync with preloader
  useEffect(() => {
    const timer = setTimeout(() => setShowNav(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past hero (approximately viewport height)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);

      // Determine active section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!showNav) return null;

  return (
    <>
      {/* Hero Navigation - Only visible when not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-6 right-6 md:right-12 z-[1002] flex items-center gap-3"
          >
            {/* Let's Talk Button */}
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center h-12 md:h-14 px-5 md:px-6 rounded-full bg-white text-black text-sm font-medium shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-text="Email"
            >
              Let&apos;s Talk
            </motion.a>          
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Menu - Always available but positioned differently based on scroll */}
      {/* update: only render at top, i.e. not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed z-[1001] top-6 right-[140px] md:right-[180px]"
          >
            <motion.button
              type="button"
              className="inline-flex flex-col items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] w-12 h-12 md:w-14 md:h-14 border-0 cursor-pointer p-0 transition-transform hover:scale-105"
              onClick={() => setIsBubbleMenuOpen(!isBubbleMenuOpen)}
              aria-label="Toggle menu"
              aria-pressed={isBubbleMenuOpen}
              data-cursor-text="Menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className="block mx-auto rounded-[2px] transition-transform duration-300"
                style={{
                  width: 22,
                  height: 2,
                  background: "#111",
                  transform: isBubbleMenuOpen
                    ? "translateY(4px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block mx-auto rounded-[2px] transition-transform duration-300"
                style={{
                  marginTop: "6px",
                  width: 22,
                  height: 2,
                  background: "#111",
                  transform: isBubbleMenuOpen
                    ? "translateY(-4px) rotate(-45deg)"
                    : "none",
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Menu Overlay */}
      <AnimatePresence>
        {isBubbleMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl"
            onClick={() => setIsBubbleMenuOpen(false)}
          >
            <BubbleMenu
              logo={<span className="text-xl font-bold gradient-text">AG</span>}
              items={bubbleMenuItems}
              menuAriaLabel="Toggle navigation"
              menuBg="#ffffff"
              menuContentColor="#111111"
              useFixedPosition={true}
              animationEase="back.out(1.5)"
              animationDuration={0.5}
              staggerDelay={0.1}
              onMenuClick={(open) => {
                if (!open) setIsBubbleMenuOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolled Navbar - Visible after scrolling past hero */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 right-0 z-[1001] py-3"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between glass rounded-full px-4 md:px-6 py-2.5">
                {/* Logo */}
                <Link
                  href="/"
                  className="relative z-10"
                  data-cursor-text="Home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <motion.span
                    className="text-xl font-bold tracking-tighter gradient-text"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    AG.
                  </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className={`nav-link text-xs ${
                        activeSection === link.href.replace("#", "")
                          ? "text-white"
                          : ""
                      }`}
                      data-cursor-hover
                    >
                      {link.name}
                    </button>
                  ))}
                </div>

                {/* Right Side: Let's Talk + Menu Toggle (Mobile shows both) */}
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    className="md:hidden inline-flex flex-col items-center justify-center rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.12)] w-10 h-10 border-0 cursor-pointer p-0 transition-transform hover:scale-105"
                    onClick={() => setIsBubbleMenuOpen(!isBubbleMenuOpen)}
                    aria-label="Toggle menu"
                    aria-pressed={isBubbleMenuOpen}
                    data-cursor-text="Menu"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className="block mx-auto rounded-[2px] transition-transform duration-300"
                      style={{
                        width: 18,
                        height: 2,
                        background: "#111",
                        transform: isBubbleMenuOpen
                          ? "translateY(4px) rotate(45deg)"
                          : "none",
                      }}
                    />
                    <span
                      className="block mx-auto rounded-[2px] transition-transform duration-300"
                      style={{
                        marginTop: "5px",
                        width: 18,
                        height: 2,
                        background: "#111",
                        transform: isBubbleMenuOpen
                          ? "translateY(-3px) rotate(-45deg)"
                          : "none",
                      }}
                    />
                  </motion.button>

                  <motion.a
                    href={`mailto:${siteConfig.email}`}
                    className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor-text="Email"
                  >
                    Let&apos;s Talk
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
