"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Dynamically import Three.js components to avoid SSR issues
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Grain Texture Overlay */}
      <div className="grain" />

      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          {/* Hero Section with 3D Background */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Experience Section */}
          <Experience />

          {/* Projects Section */}
          <Projects />

          {/* Research Section */}
          <Research />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
