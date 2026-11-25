import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/auth-nav";
import type { Arch3DMode } from "./sweet-data";

export interface Arch3DCanvasProps {
  mode: Arch3DMode;
  className?: string | undefined;
  interactive?: boolean | undefined;
}

export function Arch3DCanvas({ mode, className = "", interactive = true }: Arch3DModePropsCompat) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Arch3DMode>(mode);
  const rebuildRef = useRef<((nextMode: Arch3DMode) => void) | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
    rebuildRef.current?.(mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let rafId = 0;
    let observer: ResizeObserver | null = null;
    let cleanupRenderer: (() => void) | null = null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("three")
      .then((THREE) => {
        if (disposed || !container) return;

        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          });
        } catch {
          setWebglFailed(true);
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        container.innerHTML = "";
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
        camera.position.set(6.2, 4.4, 7.0);
        camera.lookAt(0, 0.6, 0);

        const ambient = new THREE.AmbientLight(0xf4f1ea, 1.35);
        scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
        keyLight.position.set(7, 11, 6);
        scene.add(keyLight);

        const rimCobalt = new THREE.DirectionalLight(0x2952ff, 1.35);
        rimCobalt.position.set(-7, 4, -5);
        scene.add(rimCobalt);

        const fillWarm = new THREE.DirectionalLight(0xe8502b, 0.85);
        fillWarm.position.set(5, -2, -6);
        scene.add(fillWarm);

        const frontFill = new THREE.DirectionalLight(0xf4f1ea, 0.9);
        frontFill.position.set(2, 2, 8);
        scene.add(frontFill);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        const disposables: { dispose: () => void }[] = [];
        const animatedParts: {
          mesh: InstanceType<typeof THREE.Object3D>;
          baseY: number;
          phase: number;
          amp: number;
        }[] = [];

        function track<T extends { dispose: () => void }>(item: T): T {
          disposables.push(item);
          return item;
        }

        function clearGroup() {
          animatedParts.length = 0;
          while (rootGroup.children.length > 0) {
            const child = rootGroup.children[0];
            if (child) rootGroup.remove(child);
          }
          while (disposables.length > 0) {
            disposables.pop()?.dispose();
          }
        }

        function addBox(
          parent: InstanceType<typeof THREE.Group>,
          w: number,
          h: number,
          d: number,
          x: number,
          y: number,
          z: number,
          material: InstanceType<typeof THREE.Material>,
          wireColor?: number,
        ) {
          const geo = track(new THREE.BoxGeometry(w, h, d));
          const mesh = new THREE.Mesh(geo, material);
          mesh.position.set(x, y, z);
          parent.add(mesh);

          if (wireColor !== undefined) {
            const edges = track(new THREE.EdgesGeometry(geo));
            const lineMat = track(
              new THREE.LineBasicMaterial({
                color: wireColor,
                transparent: true,
                opacity: 0.65,
              }),
            );
            const wire = new THREE.LineSegments(edges, lineMat);
            mesh.add(wire);
          }
          return mesh;
        }

        function buildModel(activeMode: Arch3DMode) {
          clearGroup();

          const slabMat = track(
            new THREE.MeshStandardMaterial({
              color: 0xf4f1ea,
              roughness: 0.42,
              metalness: 0.08,
            }),
          );
          const darkSteelMat = track(
            new THREE.MeshStandardMaterial({
              color: 0x161922,
              roughness: 0.35,
              metalness: 0.72,
            }),
          );
          const cobaltMat = track(
            new THREE.MeshStandardMaterial({
              color: 0x2952ff,
              roughness: 0.28,
              metalness: 0.35,
            }),
          );
          const oxideMat = track(
            new THREE.MeshStandardMaterial({
              color: 0xe8502b,
              roughness: 0.38,
              metalness: 0.2,
            }),
          );
          const glassMat = track(
            new THREE.MeshPhysicalMaterial({
              color: 0x9ec5ff,
              transparent: true,
              opacity: 0.44,
              roughness: 0.12,
              metalness: 0.15,
              reflectivity: 0.9,
            }),
          );

          // Shared base survey grid & coordinate ring
          const grid = track(new THREE.GridHelper(6.6, 14, 0x2952ff, 0x7a8599));
          grid.position.y = -1.15;
          const gridMat = grid.material;
          if (Array.isArray(gridMat)) {
            gridMat.forEach((m) => {
              m.transparent = true;
              m.opacity = 0.28;
            });
          } else {
            gridMat.transparent = true;
            gridMat.opacity = 0.28;
          }
          rootGroup.add(grid);

          const ringGeo = track(new THREE.RingGeometry(2.7, 2.76, 64));
          const ringMat = track(
            new THREE.MeshBasicMaterial({
              color: 0x2952ff,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.55,
            }),
          );
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = -Math.PI / 2;
          ring.position.y = -1.13;
          rootGroup.add(ring);

          if (activeMode === "hero" || activeMode === "massing") {
            const levels = activeMode === "hero" ? 6 : 5;
            // Central structural core
            addBox(
              rootGroup,
              0.78,
              levels * 0.62 + 0.4,
              0.78,
              -0.35,
              0.25,
              -0.2,
              darkSteelMat,
              0x2952ff,
            );

            for (let i = 0; i < levels; i++) {
              const y = -0.85 + i * 0.54;
              const shrink = i > 3 ? 0.8 : 1;
              const shiftX = i % 2 === 0 ? 0.18 : -0.14;
              const shiftZ = i > 2 ? 0.22 : -0.08;

              const floorGroup = new THREE.Group();
              floorGroup.position.set(0, y, 0);

              addBox(
                floorGroup,
                2.8 * shrink,
                0.11,
                2.2 * shrink,
                shiftX,
                0,
                shiftZ,
                slabMat,
                0x111317,
              );
              addBox(
                floorGroup,
                2.55 * shrink,
                0.38,
                1.95 * shrink,
                shiftX,
                0.24,
                shiftZ,
                glassMat,
                0x60a5fa,
              );
              if (i === 1 || i === 4) {
                addBox(
                  floorGroup,
                  0.95,
                  0.14,
                  2.28 * shrink,
                  shiftX - 0.85 * shrink,
                  0.04,
                  shiftZ,
                  i === 1 ? oxideMat : cobaltMat,
                );
              }

              rootGroup.add(floorGroup);
              animatedParts.push({
                mesh: floorGroup,
                baseY: y,
                phase: i * 0.7,
                amp: 0.035,
              });
            }

            // Perimeter columns
            const colCoords: [number, number][] = [
              [-1.15, -0.85],
              [1.15, -0.85],
              [-1.15, 0.85],
              [1.15, 0.85],
            ];
            for (const [cx, cz] of colCoords) {
              addBox(rootGroup, 0.09, levels * 0.54, 0.09, cx, 0.45, cz, darkSteelMat);
            }
          } else if (activeMode === "site") {
            // Stepped terrain contours + solar azimuth orbit + buildable setback box
            const tiers = [
              { w: 4.4, d: 3.6, y: -0.95 },
              { w: 3.6, d: 2.9, y: -0.68 },
              { w: 2.9, d: 2.3, y: -0.41 },
            ];
            tiers.forEach((t, idx) => {
              const m = addBox(
                rootGroup,
                t.w,
                0.22,
                t.d,
                idx * 0.12 - 0.1,
                t.y,
                0,
                idx === 2 ? slabMat : darkSteelMat,
                0x2952ff,
              );
              animatedParts.push({ mesh: m, baseY: t.y, phase: idx * 0.8, amp: 0.025 });
            });
            addBox(rootGroup, 2.0, 1.35, 1.55, 0.15, 0.35, 0, glassMat, 0xe8502b);

            const arcGeo = track(new THREE.TorusGeometry(2.35, 0.035, 12, 64, Math.PI));
            const arc = new THREE.Mesh(arcGeo, oxideMat);
            arc.rotation.z = 0;
            arc.rotation.y = Math.PI / 5;
            arc.position.y = -0.2;
            rootGroup.add(arc);
          } else if (activeMode === "floor-plan") {
            // Calibrated floor slab + interior room walls + extruded room volumes
            addBox(rootGroup, 3.6, 0.16, 2.8, 0, -0.65, 0, slabMat, 0x111317);
            const rooms = [
              { w: 1.5, d: 1.2, x: -0.9, z: -0.6, h: 0.72, mat: cobaltMat },
              { w: 1.4, d: 1.1, x: 0.85, z: -0.65, h: 0.56, mat: glassMat },
              { w: 1.8, d: 1.1, x: -0.65, z: 0.7, h: 0.62, mat: slabMat },
              { w: 1.1, d: 1.1, x: 0.95, z: 0.65, h: 0.85, mat: oxideMat },
            ];
            rooms.forEach((r, idx) => {
              const mesh = addBox(
                rootGroup,
                r.w,
                r.h,
                r.d,
                r.x,
                -0.55 + r.h / 2,
                r.z,
                r.mat,
                0x111317,
              );
              animatedParts.push({
                mesh,
                baseY: -0.55 + r.h / 2,
                phase: idx * 0.9,
                amp: 0.06,
              });
            });
          } else if (activeMode === "interiors") {
            // Sunlit architectural pavilion cutaway (zero co-planar z-fighting)
            addBox(rootGroup, 3.4, 0.14, 2.8, 0, -0.78, 0, slabMat, 0x111317);
            addBox(rootGroup, 0.16, 1.72, 2.62, -1.6, 0.15, 0.08, oxideMat, 0x111317);
            addBox(rootGroup, 3.22, 1.72, 0.16, 0.08, 0.15, -1.3, slabMat, 0x2952ff);
            addBox(rootGroup, 3.4, 0.12, 2.8, 0, 1.09, 0, darkSteelMat, 0x60a5fa);
            // Architectural island, lounge & corner structural column
            const island = addBox(
              rootGroup,
              1.3,
              0.44,
              0.72,
              0.35,
              -0.46,
              0.15,
              cobaltMat,
              0xf4f1ea,
            );
            const lounge = addBox(
              rootGroup,
              1.05,
              0.34,
              0.9,
              -0.68,
              -0.51,
              0.45,
              glassMat,
              0xf4f1ea,
            );
            const column = addBox(
              rootGroup,
              0.18,
              1.72,
              0.18,
              1.38,
              0.15,
              1.15,
              darkSteelMat,
              0x2952ff,
            );
            animatedParts.push({ mesh: island, baseY: -0.46, phase: 0, amp: 0.04 });
            animatedParts.push({ mesh: lounge, baseY: -0.51, phase: 1.1, amp: 0.04 });
            animatedParts.push({ mesh: column, baseY: 0.15, phase: 0.5, amp: 0 });
          } else if (activeMode === "cost") {
            // 5 Stacked & arrayed parametric cost package columns
            const pkgs = [
              { h: 0.9, x: -1.3, mat: darkSteelMat },
              { h: 1.95, x: -0.65, mat: cobaltMat },
              { h: 1.35, x: 0, mat: slabMat },
              { h: 1.65, x: 0.65, mat: oxideMat },
              { h: 1.05, x: 1.3, mat: glassMat },
            ];
            pkgs.forEach((p, idx) => {
              const y = -0.95 + p.h / 2;
              const bar = addBox(rootGroup, 0.48, p.h, 0.88, p.x, y, 0, p.mat, 0x111317);
              animatedParts.push({ mesh: bar, baseY: y, phase: idx * 0.65, amp: 0.08 });
            });
          } else {
            // Compliance envelope wireframe cage enclosing proposed massing
            addBox(rootGroup, 2.1, 1.85, 1.6, 0, 0.1, 0, slabMat, 0x2952ff);
            const cage = addBox(rootGroup, 3.1, 2.4, 2.4, 0, 0.25, 0, glassMat, 0xe8502b);
            animatedParts.push({ mesh: cage, baseY: 0.25, phase: 0.5, amp: 0.05 });
          }
        }

        rebuildRef.current = buildModel;
        buildModel(modeRef.current);

        function handleResize() {
          if (!container) return;
          const width = Math.max(container.clientWidth, 1);
          const height = Math.max(container.clientHeight, 1);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        }

        handleResize();
        observer = new ResizeObserver(handleResize);
        observer.observe(container);

        const startTime = performance.now();
        let targetRotY = 0;
        let targetRotX = 0;

        function animate(now: number) {
          if (disposed) return;
          rafId = requestAnimationFrame(animate);
          const elapsed = (now - startTime) * 0.001;

          if (!reducedMotion) {
            const baseSpin = elapsed * 0.28;
            targetRotY += (baseSpin + pointerRef.current.x * 0.55 - targetRotY) * 0.06;
            targetRotX += (pointerRef.current.y * 0.25 - targetRotX) * 0.06;
            rootGroup.rotation.y = targetRotY;
            rootGroup.rotation.x = targetRotX;

            for (const part of animatedParts) {
              part.mesh.position.y = part.baseY + Math.sin(elapsed * 1.45 + part.phase) * part.amp;
            }
          }

          renderer.render(scene, camera);
        }

        rafId = requestAnimationFrame(animate);

        cleanupRenderer = () => {
          cancelAnimationFrame(rafId);
          observer?.disconnect();
          clearGroup();
          renderer.dispose();
        };
      })
      .catch(() => {
        if (!disposed) setWebglFailed(true);
      });

    return () => {
      disposed = true;
      cleanupRenderer?.();
      rebuildRef.current = null;
    };
  }, []);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function onPointerLeave() {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative select-none ${className}`}
      aria-label={`Interactive 3D architectural model: ${mode}`}
    >
      {webglFailed && (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={withBasePath("/assets/wireframe.jpg")}
            alt="3D architectural wireframe structure"
            className="h-4/5 w-4/5 rounded-3xl object-contain opacity-90"
          />
        </div>
      )}
    </div>
  );
}

type Arch3DModePropsCompat = {
  mode: Arch3DMode;
  className?: string | undefined;
  interactive?: boolean | undefined;
};
