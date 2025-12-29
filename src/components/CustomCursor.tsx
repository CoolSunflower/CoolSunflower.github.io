"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverAttr = target.getAttribute("data-cursor-text");
      if (hoverAttr) {
        setHoverText(hoverAttr);
        setIsHovering(true);
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-cursor-hover")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverText("");
    };

    window.addEventListener("mousemove", moveCursor);

    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-hover], [data-cursor-text], input, textarea, [role="button"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const newInteractive = node.querySelectorAll(
              'a, button, [data-cursor-hover], [data-cursor-text], input, textarea, [role="button"]'
            );
            newInteractive.forEach((el) => {
              el.addEventListener("mouseenter", handleMouseEnter);
              el.addEventListener("mouseleave", handleMouseLeave);
            });

            if (
              node.matches &&
              node.matches(
                'a, button, [data-cursor-hover], [data-cursor-text], input, textarea, [role="button"]'
              )
            ) {
              node.addEventListener("mouseenter", handleMouseEnter);
              node.addEventListener("mouseleave", handleMouseLeave);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? (hoverText ? 120 : 60) : 20,
          height: isHovering ? (hoverText ? 120 : 60) : 20,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-300 flex items-center justify-center ${
            isHovering ? "w-full h-full" : "w-full h-full"
          }`}
        >
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-black text-xs font-medium text-center px-2"
            >
              {hoverText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-[#00f0ff] pointer-events-none z-[10002] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
