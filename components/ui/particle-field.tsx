"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Read a CSS variable from :root at runtime ── */
function cssVar(name: string): string {
  if (typeof window === "undefined") return "#ffffff";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#ffffff";
}

/* ── Shared mouse ref across layers ── */
const globalMouse = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    globalMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    globalMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
}

/* ── A single particle layer ── */
function ParticleLayer({
  count,
  spread,
  size,
  color,
  opacity,
  rotSpeed,
  mouseGain,
  zOffset = 0,
}: {
  count: number;
  spread: number;
  size: number;
  color: string;
  opacity: number;
  rotSpeed: number;
  mouseGain: number;
  zOffset?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 + zOffset;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count, spread, zOffset]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, size, opacity],
  );

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    ref.current.rotation.y = t * rotSpeed;
    ref.current.rotation.x = t * rotSpeed * 0.38;
    // Smooth parallax toward mouse position
    ref.current.position.x +=
      (globalMouse.x * mouseGain - ref.current.position.x) * 0.035;
    ref.current.position.y +=
      (globalMouse.y * mouseGain - ref.current.position.y) * 0.035;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Deep background — dim accent, large spread, barely visible */}
        <ParticleLayer
          count={2200}
          spread={16}
          size={0.018}
          color={cssVar("--color-accent")}
          opacity={0.25}
          rotSpeed={0.008}
          mouseGain={0.2}
          zOffset={-3}
        />
        {/* Mid layer — main accent */}
        <ParticleLayer
          count={1400}
          spread={11}
          size={0.028}
          color={cssVar("--color-accent")}
          opacity={0.65}
          rotSpeed={0.018}
          mouseGain={0.6}
        />
        {/* Near layer — bright highlights, counter-rotate */}
        <ParticleLayer
          count={400}
          spread={7}
          size={0.042}
          color={cssVar("--color-accent")}
          opacity={0.85}
          rotSpeed={-0.012}
          mouseGain={1.1}
          zOffset={2}
        />
        {/* Spark layer — strong accent, very few, very bright */}
        <ParticleLayer
          count={120}
          spread={5}
          size={0.06}
          color={cssVar("--color-accent-strong")}
          opacity={0.7}
          rotSpeed={0.025}
          mouseGain={1.5}
          zOffset={3}
        />
      </Canvas>
    </div>
  );
}
