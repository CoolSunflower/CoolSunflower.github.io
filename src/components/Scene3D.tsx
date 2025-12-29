"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  const particlesCount = 5000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const cols = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 3;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color gradient from cyan to orange
      const t = Math.random();
      cols[i * 3] = t * 1 + (1 - t) * 0; // R
      cols[i * 3 + 1] = t * 0.42 + (1 - t) * 0.94; // G
      cols[i * 3 + 2] = t * 0.21 + (1 - t) * 1; // B
    }
    return [pos, cols];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Smooth rotation based on time
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      // Mouse influence
      ref.current.rotation.x += mouse.y * 0.1;
      ref.current.rotation.y += mouse.x * 0.1;
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 + mouse.y * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 + mouse.x * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.position.x = 2.5 + mouse.x * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[2.5, 0, -2]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial
        color="#00f0ff"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15 - mouse.y * 0.2;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1 + mouse.x * 0.2;
      meshRef.current.position.y = 0.8 + Math.cos(state.clock.getElapsedTime() * 0.4) * 0.4;
      meshRef.current.position.x = -2.5 - mouse.x * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2.5, 0.8, -3]}>
      <torusGeometry args={[1, 0.3, 16, 50]} />
      <meshBasicMaterial
        color="#ff6b35"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      meshRef.current.position.y = -1 + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, -4]}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <CameraRig />
        <ParticleField />
        {/* <FloatingGeometry />
        <FloatingTorus />
        <FloatingOctahedron /> */}
      </Canvas>
    </div>
  );
}
