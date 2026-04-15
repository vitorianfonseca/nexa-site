"use client";

import { useEffect, useRef } from "react";

// Golden-ratio distribution of N points on a unit sphere
function generateSpherePoints(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

// Pre-compute edges (pairs within 3D distance threshold)
function buildEdges(pts: [number, number, number][], threshold: number): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[j][0] - pts[i][0];
      const dy = pts[j][1] - pts[i][1];
      const dz = pts[j][2] - pts[i][2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

function rotY(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c - z * s, y, x * s + z * c];
}
function rotX(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}

const N = 160;
const EDGE_THRESHOLD = 0.42;
const BASE_POINTS = generateSpherePoints(N);
const EDGES = buildEdges(BASE_POINTS, EDGE_THRESHOLD);

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ rx: 0, ry: 0 });
  const targetRef = useRef({ rx: 0, ry: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 520;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const SCALE = SIZE * 0.34;
    const FOV = SIZE * 1.5;

    let autoRotY = 0;

    function project(x: number, y: number, z: number) {
      const s = FOV / (FOV + z * SCALE);
      return { px: cx + x * SCALE * s, py: cy + y * SCALE * s, s, z };
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Smooth lerp toward target
      mouseRef.current.rx += (targetRef.current.rx - mouseRef.current.rx) * 0.06;
      mouseRef.current.ry += (targetRef.current.ry - mouseRef.current.ry) * 0.06;
      autoRotY += 0.004;

      const ry = autoRotY + mouseRef.current.ry;
      const rx = mouseRef.current.rx;

      // Rotate & project all points
      const proj = BASE_POINTS.map(([x, y, z]) => {
        const [rx1, ry1, rz1] = rotY(x, y, z, ry);
        const [rx2, ry2, rz2] = rotX(rx1, ry1, rz1, rx);
        return project(rx2, ry2, rz2);
      });

      // Sort by depth so front points draw on top
      const order = proj.map((_, i) => i).sort((a, b) => proj[a].z - proj[b].z);

      // Draw edges
      for (const [i, j] of EDGES) {
        const p1 = proj[i], p2 = proj[j];
        const avgZ = (p1.z + p2.z) / 2;
        const brightness = (avgZ + 1) / 2; // 0..1
        const alpha = brightness * 0.35 + 0.04;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(126, 76, 196, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Draw points
      for (const i of order) {
        const p = proj[i];
        const brightness = (p.z + 1) / 2;
        const r = brightness * 2.2 + 0.6;
        const alpha = brightness * 0.85 + 0.12;

        // Soft glow — bright highlights use #C8A2E8, core uses #7E4CC4
        const grd = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 4);
        grd.addColorStop(0, `rgba(200, 162, 232, ${alpha * 0.6})`);
        grd.addColorStop(1, "rgba(59, 30, 127, 0)");
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 162, 232, ${alpha})`;
        ctx.fill();
      }

      // Outer ambient glow ring
      const grd2 = ctx.createRadialGradient(cx, cy, SIZE * 0.28, cx, cy, SIZE * 0.46);
      grd2.addColorStop(0, "rgba(126, 76, 196, 0)");
      grd2.addColorStop(0.7, "rgba(126, 76, 196, 0.04)");
      grd2.addColorStop(1, "rgba(126, 76, 196, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, SIZE * 0.46, 0, Math.PI * 2);
      ctx.fillStyle = grd2;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current.ry = nx * 1.2;
      targetRef.current.rx = ny * 0.6;
    };
    const onLeave = () => {
      targetRef.current.rx = 0;
      targetRef.current.ry = 0;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    draw();

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ maxWidth: 520, maxHeight: 520 }}
      aria-hidden="true"
    />
  );
}
