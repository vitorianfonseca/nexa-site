"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPos;

  float wave(vec3 p, float t) {
    return
      sin(p.x * 1.8 + t * 0.50) * 0.40 +
      sin(p.y * 2.2 + t * 0.40) * 0.35 +
      sin(p.z * 1.5 + t * 0.65) * 0.30 +
      sin((p.x + p.z) * 1.3 + t * 0.35) * 0.25 +
      sin((p.y + p.z) * 1.7 + t * 0.45) * 0.20;
  }

  void main() {
    float disp = wave(position, uTime) * 0.13;
    vec3 newPos = position + normal * disp;

    vNormal   = normalize(normalMatrix * normal);
    vPos      = newPos;
    vViewDir  = normalize(cameraPosition - (modelMatrix * vec4(newPos, 1.0)).xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPos;

  // HSL → RGB
  vec3 hsl(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    h = mod(h, 1.0) * 6.0;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0.0, c);
    else              rgb = vec3(c, 0.0, x);
    float m = l - c * 0.5;
    return rgb + m;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    // Fresnel — 0 = facing camera, 1 = silhouette
    float fresnel = 1.0 - abs(dot(N, V));
    fresnel = pow(fresnel, 1.4);

    // Iridescent hue: shifts with fresnel angle + time + position
    float hue = fract(
      fresnel * 0.75
      + uTime * 0.06
      + vPos.y * 0.18
      + vPos.x * 0.12
      // anchor the spectrum around purple (0.75)
      + 0.62
    );

    vec3 iridColor = hsl(hue, 0.90, 0.62);

    // Very dark base — almost black
    vec3 base = vec3(0.03, 0.01, 0.09);

    // Blend: dark core, holo on edges
    float blend = fresnel * 0.92 + 0.04;
    vec3 col = mix(base, iridColor, blend);

    // Extra bright rim pulse
    float rim = pow(fresnel, 0.7) * (0.7 + 0.3 * sin(uTime * 0.8));
    col += iridColor * rim * 0.35;

    // Subtle inner glow
    col += vec3(0.18, 0.06, 0.45) * (1.0 - fresnel) * 0.25;

    gl_FragColor = vec4(col, 0.88);
  }
`;

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const SIZE = 520;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 3.8);

    const uTime = { value: 0 };
    const geo = new THREE.SphereGeometry(1.1, 128, 128);
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime },
      transparent: true,
      side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Drag + inertia
    let rotX = 0.18, rotY = 0;
    let velX = 0, velY = 0;
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let autoSpin = true;
    let autoY = 0;

    const cv = renderer.domElement;

    const onDown = (e: MouseEvent) => {
      isDragging = true; autoSpin = false;
      prev = { x: e.clientX, y: e.clientY };
      velX = 0; velY = 0;
      cv.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      velX = (e.clientX - prev.x) * 0.009;
      velY = (e.clientY - prev.y) * 0.009;
      rotY += velX; rotX += velY;
      rotX = Math.max(-1.1, Math.min(1.1, rotX));
      prev = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { isDragging = false; cv.style.cursor = "grab"; };

    cv.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    cv.style.cursor = "grab";

    let rafId = 0;
    const tick = (t: number) => {
      rafId = requestAnimationFrame(tick);
      uTime.value = t * 0.001;

      if (!isDragging) {
        velX *= 0.91; velY *= 0.91;
        rotY += velX; rotX += velY;
        if (Math.abs(velX) + Math.abs(velY) < 0.0005) autoSpin = true;
        if (autoSpin) autoY += 0.004;
      }

      mesh.rotation.y = rotY + autoY;
      mesh.rotation.x = rotX;
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      cv.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      renderer.dispose();
      if (cv.parentNode === el) el.removeChild(cv);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: 520, height: 520, cursor: "grab" }}
      aria-hidden="true"
    />
  );
}
