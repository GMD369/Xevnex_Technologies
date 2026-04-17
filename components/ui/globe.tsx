"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function cssVar(name: string): string {
  if (typeof window === "undefined") return "#ffffff";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#ffffff";
}

const GLOBE_RADIUS = 2.6;
const ARC_COUNT = 28;
const DOT_COUNT = 320;

function generateArcPoints(
  from: [number, number],
  to: [number, number],
  radius: number,
  segments = 40,
): THREE.Vector3[] {
  const toVec = (lat: number, lon: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
  };

  const start = toVec(...from);
  const end = toVec(...to);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(start, end, t).normalize();
    const arc = Math.sin(Math.PI * t) * 0.5;
    point.multiplyScalar(radius + arc);
    points.push(point);
  }

  return points;
}

const connections: Array<[[number, number], [number, number]]> = [
  [[40.7, -74], [51.5, -0.1]],
  [[51.5, -0.1], [35.7, 139.7]],
  [[35.7, 139.7], [1.3, 103.8]],
  [[1.3, 103.8], [-33.9, 151.2]],
  [[-33.9, 151.2], [40.7, -74]],
  [[37.8, -122.4], [48.9, 2.3]],
  [[48.9, 2.3], [55.8, 37.6]],
  [[55.8, 37.6], [28.6, 77.2]],
  [[33.7, 73.1], [22.3, 114.2]],
  [[22.3, 114.2], [37.8, -122.4]],
  [[19.1, 72.9], [41.0, 29.0]],
  [[41.0, 29.0], [52.5, 13.4]],
  [[-23.5, -46.6], [4.7, -74.1]],
  [[4.7, -74.1], [40.7, -74]],
  [[59.9, 10.7], [48.9, 2.3]],
  [[34.1, -118.2], [37.8, -122.4]],
  [[25.2, 55.3], [31.5, 74.3]],
  [[1.3, 103.8], [13.8, 100.5]],
  [[51.5, -0.1], [-33.9, 151.2]],
  [[35.7, 139.7], [22.3, 114.2]],
  [[-26.2, 28.0], [41.0, 29.0]],
  [[6.5, 3.4], [-26.2, 28.0]],
  [[30.0, 31.2], [41.0, 29.0]],
  [[43.7, -79.4], [40.7, -74]],
  [[45.5, -73.6], [43.7, -79.4]],
  [[47.6, -122.3], [34.1, -118.2]],
  [[50.1, 8.7], [52.5, 13.4]],
  [[48.2, 16.4], [48.9, 2.3]],
];

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Dot positions on sphere surface
  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = Math.random() * Math.PI * 2;
      positions.push(
        GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
        GLOBE_RADIUS * Math.cos(phi),
        GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
      );
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Wireframe sphere
  const wireGeometry = useMemo(
    () => new THREE.SphereGeometry(GLOBE_RADIUS, 36, 18),
    [],
  );

  // Arc lines (built as THREE.Line objects to avoid SVG <line> JSX ambiguity)
  const arcLines = useMemo(() => {
    return connections.slice(0, ARC_COUNT).map((conn, i) => {
      const points = generateArcPoints(conn[0], conn[1], GLOBE_RADIUS);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: cssVar("--color-accent"),
        transparent: true,
        opacity: 0.45,
      });
      const lineObj = new THREE.Line(geo, mat);
      return { lineObj, key: i };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe shell */}
      <mesh geometry={wireGeometry}>
        <meshBasicMaterial
          color={cssVar("--color-surface-strong")}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Surface dots */}
      <points geometry={dotGeometry}>
        <pointsMaterial
          color={cssVar("--color-accent")}
          size={0.032}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Connection arcs */}
      {arcLines.map(({ lineObj, key }) => (
        <primitive key={key} object={lineObj} />
      ))}

      {/* City node dots */}
      {connections.slice(0, ARC_COUNT).flatMap((conn, i) =>
        conn.map((coord, j) => {
          const phi = (90 - coord[0]) * (Math.PI / 180);
          const theta = (coord[1] + 180) * (Math.PI / 180);
          const pos: [number, number, number] = [
            -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
            GLOBE_RADIUS * Math.cos(phi),
            GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
          ];
          return (
            <mesh key={`${i}-${j}`} position={pos}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={cssVar("--color-accent-strong")} />
            </mesh>
          );
        }),
      )}
    </group>
  );
}

export function Globe() {
  return (
    <div
      className="h-full w-full"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GlobeScene />
        <EffectComposer>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.05}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
