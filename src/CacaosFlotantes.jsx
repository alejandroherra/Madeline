"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CacaosFlotantes() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let renderer;

    // El fondo es decorativo: si WebGL no está disponible,
    // no intentamos crear la animación.
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1)
    );

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -5,
      5,
      4,
      -4,
      0.1,
      30
    );

    camera.position.z = 10;

    // Geometría compartida por todos los cacaos.
    const geometry = new THREE.SphereGeometry(1, 24, 16);
    const positions = geometry.attributes.position;

    // Relieve longitudinal para sugerir una mazorca de cacao.
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);

      const angle = Math.atan2(z, x);
      const ridge = 1 + Math.cos(angle * 8) * 0.085;

      positions.setXYZ(
        i,
        x * ridge,
        y,
        z * ridge
      );
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();

    const materials = [
      new THREE.MeshLambertMaterial({
        color: "#9c6238",
      }),
      new THREE.MeshLambertMaterial({
        color: "#b48a49",
      }),
      new THREE.MeshLambertMaterial({
        color: "#6f813f",
      }),
    ];

    scene.add(
      new THREE.AmbientLight(0xffffff, 1.5)
    );

    const light = new THREE.DirectionalLight(
      0xffe2b5,
      2
    );

    light.position.set(-3, 5, 6);
    scene.add(light);

    const settings = [
      {
        x: -0.87,
        y: 0.67,
        size: 0.32,
        phase: 0,
      },
      {
        x: 0.83,
        y: 0.44,
        size: 0.25,
        phase: 1.4,
      },
      {
        x: -0.92,
        y: -0.15,
        size: 0.22,
        phase: 2.8,
      },
      {
        x: 0.9,
        y: -0.58,
        size: 0.34,
        phase: 4.2,
      },
      {
        x: -0.56,
        y: -0.8,
        size: 0.18,
        phase: 5.6,
      },
      {
        x: 0.52,
        y: 0.85,
        size: 0.17,
        phase: 7,
      },
    ];

    const pods = settings.map((setting, index) => {
      const mesh = new THREE.Mesh(
        geometry,
        materials[index % materials.length]
      );

      mesh.scale.set(
        setting.size,
        setting.size * 2.05,
        setting.size
      );

      mesh.rotation.set(
        0.15,
        setting.phase,
        0.4
      );

      scene.add(mesh);

      return {
        mesh,
        ...setting,
        baseX: 0,
        baseY: 0,
      };
    });

    let animationId = 0;
    let disposed = false;
    let lastRender = 0;
    let animationTime = 0;
    let previousTime = performance.now();

    const frameInterval = 1000 / 24;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function updatePods() {
      pods.forEach((pod) => {
        pod.mesh.position.x =
          pod.baseX +
          Math.sin(
            animationTime * 0.25 + pod.phase
          ) *
            0.08;

        pod.mesh.position.y =
          pod.baseY +
          Math.sin(
            animationTime * 0.6 + pod.phase
          ) *
            0.12;

        pod.mesh.rotation.y =
          pod.phase + animationTime * 0.12;

        pod.mesh.rotation.z =
          0.4 +
          Math.sin(
            animationTime * 0.35 + pod.phase
          ) *
            0.12;
      });
    }

    function resize() {
      if (disposed) {
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      const aspect = width / height;
      const halfHeight = 4;
      const halfWidth = halfHeight * aspect;

      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      pods.forEach((pod) => {
        pod.baseX = pod.x * halfWidth;
        pod.baseY = pod.y * halfHeight;
      });

      updatePods();
      renderer.render(scene, camera);
    }

    function animate(now) {
      if (disposed) {
        return;
      }

      animationId = requestAnimationFrame(animate);

      const delta = Math.min(
        (now - previousTime) / 1000,
        0.1
      );

      previousTime = now;
      animationTime += delta;

      if (now - lastRender < frameInterval) {
        return;
      }

      lastRender = now;

      updatePods();
      renderer.render(scene, camera);
    }

    function syncAnimation() {
      cancelAnimationFrame(animationId);
      animationId = 0;

      if (disposed || document.hidden) {
        return;
      }

      if (motionQuery.matches) {
        updatePods();
        renderer.render(scene, camera);
        return;
      }

      previousTime = performance.now();
      lastRender = 0;

      animationId = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    document.addEventListener(
      "visibilitychange",
      syncAnimation
    );

    motionQuery.addEventListener(
      "change",
      syncAnimation
    );

    resize();
    syncAnimation();

    return () => {
      disposed = true;

      cancelAnimationFrame(animationId);

      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        syncAnimation
      );

      motionQuery.removeEventListener(
        "change",
        syncAnimation
      );

      geometry.dispose();

      materials.forEach((material) => {
        material.dispose();
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="jungle-cacaos"
      aria-hidden="true"
    />
  );
}