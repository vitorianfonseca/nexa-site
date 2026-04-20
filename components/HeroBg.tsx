"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vert = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPos;

  float wave(vec3 p, float t) {
    return
      sin(p.x * 1.6 + t * 0.45) * 0.45 +
      sin(p.y * 2.0 + t * 0.35) * 0.38 +
      sin(p.z * 1.3 + t * 0.55) * 0.32 +
      sin((p.x + p.z) * 1.1 + t * 0.30) * 0.28 +
      sin((p.y + p.x) * 1.5 + t * 0.42) * 0.22;
  }

  void main() {
    float disp = wave(position, uTime) * 0.16;
    vec3 newPos = position + normal * disp;
    vNormal  = normalize(normalMatrix * normal);
    vPos     = newPos;
    vViewDir = normalize(cameraPosition - (modelMatrix * vec4(newPos, 1.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const frag = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPos;

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
    return rgb + (l - c * 0.5);
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    float fresnel = pow(1.0 - abs(dot(N, V)), 1.6);

    float hue = fract(
      fresnel * 0.65
      + uTime * 0.05
      + vPos.y * 0.15
      + vPos.x * 0.10
      + 0.60
    );

    vec3 irid = hsl(hue, 0.85, 0.58);
    vec3 base = vec3(0.02, 0.01, 0.07);
    vec3 col  = mix(base, irid, fresnel * 0.88 + 0.03);
    col += irid * pow(fresnel, 0.8) * (0.6 + 0.25 * sin(uTime * 0.7)) * 0.30;
    col += vec3(0.14, 0.04, 0.38) * (1.0 - fresnel) * 0.20;

    gl_FragColor = vec4(col, fresnel * 0.72 + 0.06);
  }
`;

function makeMesh(radius: number, detail: number, uniforms: { uTime: { value: number } }) {
  const geo = new THREE.SphereGeometry(radius, detail, detail);
  const mat = new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
  });
  return new THREE.Mesh(geo, mat);
}

export default function HeroBg() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.offsetWidth || window.innerWidth;
    const H = el.offsetHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    const uniforms = { uTime: { value: 0 } };

    // Esfera principal — grande, deslocada para a direita
    const main = makeMesh(2.4, 96, uniforms);
    main.position.set(2.8, 0.2, -0.5);
    scene.add(main);

    // Esfera secundária — menor, canto oposto, mais funda
    const secondary = makeMesh(1.4, 64, uniforms);
    secondary.position.set(-3.2, -0.8, -2.5);
    scene.add(secondary);

    // Terceira esfera — pequena, canto superior
    const accent = makeMesh(0.7, 48, uniforms);
    accent.position.set(-1.0, 2.8, -1.5);
    scene.add(accent);

    // Mouse parallax suave
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const W = el.offsetWidth || window.innerWidth;
      const H = el.offsetHeight || window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    let r1 = 0, r2 = 0, r3 = 0;

    const tick = (t: number) => {
      rafId = requestAnimationFrame(tick);
      uniforms.uTime.value = t * 0.001;

      // Inércia do mouse
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      r1 += 0.0025;
      r2 -= 0.0018;
      r3 += 0.0032;

      main.rotation.y = r1 + target.x * 0.25;
      main.rotation.x = 0.12 + target.y * 0.15;

      secondary.rotation.y = r2 + target.x * 0.18;
      secondary.rotation.x = -0.08 + target.y * 0.10;

      accent.rotation.y = r3;
      accent.rotation.x = r3 * 0.6;

      // Parallax leve na câmara
      camera.position.x += (target.x * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (target.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
