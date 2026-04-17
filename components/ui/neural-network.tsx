"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Read a CSS variable from :root at runtime ── */
function cssVar(name: string): string {
  if (typeof window === "undefined") return "#ffffff";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#ffffff";
}

const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 2.2;
const BOUNDS = 6;

function NeuralGraph() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.002,
      ),
    }));
  }, []);

  const pointGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(NODE_COUNT * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // max possible pairs
    const maxPairs = NODE_COUNT * NODE_COUNT;
    const positions = new Float32Array(maxPairs * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const pointMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: cssVar("--color-accent"),
        size: 0.08,
        transparent: true,
        opacity: 1,
      }),
    [],
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: cssVar("--color-accent"),
        transparent: true,
        opacity: 0.25,
      }),
    [],
  );

  useFrame(() => {
    // Move nodes
    for (const node of nodes) {
      node.position.add(node.velocity);
      if (Math.abs(node.position.x) > BOUNDS) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > BOUNDS) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > BOUNDS / 2) node.velocity.z *= -1;
    }

    // Update point positions
    const pts = pointGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < NODE_COUNT; i++) {
      pts[i * 3] = nodes[i].position.x;
      pts[i * 3 + 1] = nodes[i].position.y;
      pts[i * 3 + 2] = nodes[i].position.z;
    }
    pointGeometry.attributes.position.needsUpdate = true;

    // Update line positions
    const lns = lineGeometry.attributes.position.array as Float32Array;
    let idx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < CONNECTION_DISTANCE) {
          lns[idx++] = nodes[i].position.x;
          lns[idx++] = nodes[i].position.y;
          lns[idx++] = nodes[i].position.z;
          lns[idx++] = nodes[j].position.x;
          lns[idx++] = nodes[j].position.y;
          lns[idx++] = nodes[j].position.z;
        }
      }
    }
    // Zero out unused slots
    for (let k = idx; k < lns.length; k++) lns[k] = 0;
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.setDrawRange(0, idx / 3);
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointGeometry} material={pointMaterial} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export function NeuralNetworkBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NeuralGraph />
      </Canvas>
    </div>
  );
}
