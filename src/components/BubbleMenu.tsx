"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  logo?: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
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

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!bubbles.length) return;

    gsap.killTweensOf([...bubbles, ...labels]);
    gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(labels, { y: 24, autoAlpha: 0 });

    bubbles.forEach((bubble, i) => {
      const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
      const tl = gsap.timeline({ delay });
      tl.to(bubble, {
        scale: 1,
        duration: animationDuration,
        ease: animationEase,
      });
      if (labels[i]) {
        tl.to(
          labels[i],
          {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration,
            ease: "power3.out",
          },
          "-=" + animationDuration * 0.9
        );
      }
    });

    return () => {
      gsap.killTweensOf([...bubbles, ...labels]);
    };
  }, [animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      const bubbles = bubblesRef.current.filter(Boolean);
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (bubble && item) {
          const rotation = isDesktop ? (item.rotation ?? 0) : 0;
          gsap.set(bubble, { rotation });
        }
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuItems]);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onMenuClick?.(false);
  };

  return (
    <>
      <style>{`
        .bubble-menu-items .pill-link {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 2.5rem;
          border-radius: 9999px;
          font-size: 1.125rem;
          font-weight: 500;
          text-transform: lowercase;
          letter-spacing: 0.02em;
          text-decoration: none;
          background: rgba(255,255,255,0.1);
          color: #fff;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .bubble-menu-items .pill-link:hover {
          transform: scale(1.08) !important;
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            padding: 1.5rem 3rem;
            font-size: 1.25rem;
          }
        }
        @media (max-width: 600px) {
          .bubble-menu-items .pill-link {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`bubble-menu-items flex flex-col items-center justify-center h-full ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo at top */}
        {logo && (
          <div className="mb-8 text-3xl font-bold tracking-tighter">
            {typeof logo === "string" ? <span>{logo}</span> : logo}
          </div>
        )}

        {/* Navigation pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 max-w-2xl px-4">
          {menuItems.map((item, i) => (
            <a
              key={item.label}
              ref={(el) => {
                if (el) bubblesRef.current[i] = el;
              }}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="pill-link"
              style={
                {
                  "--item-rot": `${item.rotation ?? 0}deg`,
                  "--hover-bg": item.hoverStyles?.bgColor ?? "#00f0ff",
                  "--hover-text": item.hoverStyles?.textColor ?? "#000",
                } as React.CSSProperties
              }
              aria-label={item.ariaLabel || item.label}
              data-cursor-text={item.label}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  backgroundColor: item.hoverStyles?.bgColor ?? "#00f0ff",
                  color: item.hoverStyles?.textColor ?? "#000",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <span
                ref={(el) => {
                  if (el) labelRefs.current[i] = el;
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

      </div>
    </>
  );
}
