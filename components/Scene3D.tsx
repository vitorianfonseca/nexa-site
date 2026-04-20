"use client";

import { useEffect, useRef } from "react";

const N = 180;
const THRESH = 0.42;
const FOV = 3.8;
const SCALE_FACTOR = 0.43;

// Fibonacci sphere — distribuição uniforme de pontos
function fibSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = phi * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

function buildEdges(pts: [number, number, number][]): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[j][0] - pts[i][0];
      const dy = pts[j][1] - pts[i][1];
      const dz = pts[j][2] - pts[i][2];
      if (dx * dx + dy * dy + dz * dz < THRESH * THRESH) edges.push([i, j]);
    }
  }
  return edges;
}

function rotateX([x, y, z]: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}
function rotateY([x, y, z]: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}

const BASE_PTS = fibSphere(N);
const EDGES = buildEdges(BASE_PTS);

// Pré-renderiza o glow dot numa canvas offscreen
function makeGlowSprite(): HTMLCanvasElement {
  const size = 48;
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0,   "rgba(220, 200, 255, 1.0)");
  grad.addColorStop(0.25,"rgba(185, 150, 255, 0.75)");
  grad.addColorStop(0.55,"rgba(130,  90, 220, 0.35)");
  grad.addColorStop(1,   "rgba( 80,  40, 180, 0.0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 520;
    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const SCALE = SIZE * SCALE_FACTOR;

    const glow = makeGlowSprite();

    // Estado de rotação
    let rx = 0.22, ry = 0;
    let velX = 0, velY = 0;
    let dragging = false;
    let autoSpin = true, autoY = 0;
    let prevX = 0, prevY = 0;

    // Projeção perspetiva — retorna [screenX, screenY, z_world]
    const project = ([x, y, z]: [number, number, number]): [number, number, number] => {
      const p = FOV / (FOV + z + 1);
      return [CX + x * SCALE * p, CY - y * SCALE * p, z];
    };

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Aplica rotações
      const rotated = BASE_PTS.map(pt => rotateY(rotateX(pt, rx), ry + autoY));

      // Ordena arestas por z médio (back to front)
      const edgeOrder = EDGES
        .map(([i, j]) => ({ i, j, z: (rotated[i][2] + rotated[j][2]) / 2 }))
        .sort((a, b) => a.z - b.z);

      // Desenha arestas
      for (const { i, j, z } of edgeOrder) {
        const depth = (z + 1) / 2; // 0=trás, 1=frente
        if (depth < 0.05) continue;

        const [x1, y1] = project(rotated[i]);
        const [x2, y2] = project(rotated[j]);

        const alpha = 0.03 + depth * 0.38;
        // Azul-violeta atrás → roxo brilhante à frente
        const br = Math.round(60  + depth * 120);
        const bg = Math.round(20  + depth *  60);
        const bb = Math.round(160 + depth *  80);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${br},${bg},${bb},${alpha})`;
        ctx.lineWidth = 0.5 + depth * 0.5;
        ctx.stroke();
      }

      // Ordena pontos back to front
      const dotOrder = rotated
        .map((p, i) => ({ i, z: p[2] }))
        .sort((a, b) => a.z - b.z);

      // Desenha dots com glow sprite
      for (const { i, z } of dotOrder) {
        const depth = (z + 1) / 2;
        if (depth < 0.08) continue;

        const [sx, sy] = project(rotated[i]);
        const coreR  = 0.7 + depth * 2.6;
        const glowR  = coreR * 4.5;

        // Glow (sprite pré-renderizado)
        ctx.globalAlpha = depth * 0.75;
        ctx.drawImage(glow, sx - glowR, sy - glowR, glowR * 2, glowR * 2);
        ctx.globalAlpha = 1;

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, coreR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(200 + depth * 50)}, ${Math.round(180 + depth * 30)}, 255, ${0.5 + depth * 0.5})`;
        ctx.fill();
      }
    };

    // Loop de animação
    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      if (!dragging) {
        velX *= 0.91; velY *= 0.91;
        rx += velX; ry += velY;
        rx = Math.max(-1.1, Math.min(1.1, rx));
        if (Math.abs(velX) + Math.abs(velY) < 0.0005) autoSpin = true;
        if (autoSpin) autoY += 0.004;
      }
      draw();
    };
    rafId = requestAnimationFrame(loop);

    // Drag
    const onDown = (e: MouseEvent) => {
      dragging = true; autoSpin = false;
      prevX = e.clientX; prevY = e.clientY;
      velX = 0; velY = 0;
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      velY = (e.clientX - prevX) * 0.009;
      velX = (e.clientY - prevY) * 0.009;
      rx += velX; ry += velY;
      rx = Math.max(-1.1, Math.min(1.1, rx));
      prevX = e.clientX; prevY = e.clientY;
    };
    const onUp = () => { dragging = false; canvas.style.cursor = "grab"; };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={520}
      style={{ cursor: "grab" }}
      aria-hidden="true"
    />
  );
}
