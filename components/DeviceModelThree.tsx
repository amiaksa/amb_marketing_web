"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
  height?: number;
};

function createRoundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, (Math.PI * 3) / 2, false);
  return shape;
}

function disposeObject3D(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const mesh = o as unknown as THREE.Mesh;
    if ((mesh as any).isMesh) {
      mesh.geometry?.dispose?.();
      const mat = mesh.material as unknown as
        | THREE.Material
        | THREE.Material[]
        | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose?.();
    }
  });
}

export default function DeviceModelThree({ className, height = 460 }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const view = mount.ownerDocument?.defaultView;
    if (!view) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.2, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(view.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(4, 6, 6);
    const rim = new THREE.DirectionalLight(0x30b4da, 0.85);
    rim.position.set(-6, 2, -4);
    scene.add(ambient, key, rim);

    const group = new THREE.Group();
    scene.add(group);

    // Fallback device while model loads (procedural geometry)
    const fallback = new THREE.Group();
    group.add(fallback);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.65,
      roughness: 0.35,
    });
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0b1020,
      metalness: 0.1,
      roughness: 0.2,
      emissive: new THREE.Color(0x0b1020),
      emissiveIntensity: 0.55,
    });
    const outlineMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.6,
      transparent: true,
      opacity: 0.08,
    });

    const bodyShape = createRoundedRectShape(2.25, 3.2, 0.35);
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 6,
      curveSegments: 10,
      steps: 1,
    });
    bodyGeo.center();

    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    fallback.add(bodyMesh);

    const screenShape = createRoundedRectShape(1.72, 2.62, 0.23);
    const screenGeo = new THREE.ShapeGeometry(screenShape, 20);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, 0.205);
    fallback.add(screenMesh);

    const outlineGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.44,
      bevelEnabled: false,
      steps: 1,
    });
    outlineGeo.center();
    const outline = new THREE.Mesh(outlineGeo, outlineMat);
    outline.position.z = -0.02;
    fallback.add(outline);

    const bumpGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.14, 32, 1);
    const bump = new THREE.Mesh(bumpGeo, bodyMat);
    bump.rotation.x = Math.PI / 2;
    bump.position.set(0.66, 1.08, 0.205);
    fallback.add(bump);

    const lensGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.1, 24, 1);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x0b1020,
      metalness: 0.2,
      roughness: 0.15,
      emissive: new THREE.Color(0x0b1020),
      emissiveIntensity: 0.25,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0.66, 1.08, 0.28);
    fallback.add(lens);

    group.rotation.y = -0.5;
    group.rotation.x = 0.18;

    let targetY = group.rotation.y;
    let targetX = group.rotation.x;
    let loadedObject: THREE.Object3D | null = null;
    let cancelled = false;
    let raf = 0;

    const resize = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onMove = (ev: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5;
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      targetY = -0.5 + x * 0.55;
      targetX = 0.18 + -y * 0.25;
    };

    const tick = () => {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, 0.08);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.08);
      renderer.render(scene, camera);
      raf = view.requestAnimationFrame(tick);
    };

    const loadObjMtl = async () => {
      try {
        const [{ MTLLoader }, { OBJLoader }] = await Promise.all([
          import("three/examples/jsm/loaders/MTLLoader.js"),
          import("three/examples/jsm/loaders/OBJLoader.js"),
        ]);

        const mtlUrl = encodeURI("/Asset 2ldpi.mtl");
        const objUrl = encodeURI("/Asset 2ldpi.obj");

        const mtlLoader = new MTLLoader();
        mtlLoader.setPath("/");
        mtlLoader.load(
          mtlUrl,
          (materials) => {
            if (cancelled) return;
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
              objUrl,
              (obj) => {
                if (cancelled) return;

                // Center + scale
                const box = new THREE.Box3().setFromObject(obj);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                obj.position.sub(center);

                const maxDim = Math.max(size.x, size.y, size.z) || 1;
                const scale = 3.2 / maxDim;
                obj.scale.setScalar(scale);

                // Make sure materials render nicely
                obj.traverse((o) => {
                  const mesh = o as unknown as THREE.Mesh;
                  if ((mesh as any).isMesh) {
                    const mat = mesh.material as unknown as
                      | THREE.Material
                      | THREE.Material[]
                      | undefined;
                    if (Array.isArray(mat))
                      mat.forEach((m) => ((m as any).side = THREE.DoubleSide));
                    else if (mat) (mat as any).side = THREE.DoubleSide;
                  }
                });

                group.remove(fallback);
                loadedObject = obj;
                group.add(obj);
              },
              undefined,
              () => {
                // keep fallback
              },
            );
          },
          undefined,
          () => {
            // keep fallback
          },
        );
      } catch {
        // keep fallback
      }
    };

    resize();
    loadObjMtl();
    mount.addEventListener("pointermove", onMove);

    let ro: ResizeObserver | null = null;
    const RO = (view as unknown as { ResizeObserver?: typeof ResizeObserver })
      .ResizeObserver;
    if (RO) {
      ro = new RO(() => resize());
      ro.observe(mount);
    } else {
      view.addEventListener("resize", resize);
    }

    raf = view.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (raf) view.cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onMove);
      if (ro) ro.disconnect();
      else view.removeEventListener("resize", resize);

      if (loadedObject) disposeObject3D(loadedObject);
      disposeObject3D(fallback);
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [height]);

  return (
    <div className={className}>
      <div
        ref={mountRef}
        className="relative w-full overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-b from-white to-slate-50 shadow-xl"
        style={{ height }}
      />

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
  height?: number;
};

function createRoundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, (Math.PI * 3) / 2, false);
  return shape;
}

export default function DeviceModelThree({ className, height = 460 }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const view = mount.ownerDocument?.defaultView;
    if (!view) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(view.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    camera.position.set(0, 0.2, 6.5);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(4, 6, 6);
    const rim = new THREE.DirectionalLight(0x30b4da, 0.85);
    rim.position.set(-6, 2, -4);
    scene.add(ambient, key, rim);

    const group = new THREE.Group();
    scene.add(group);

    // Fallback device while model loads
    const fallback = new THREE.Group();
    group.add(fallback);

    const bodyShape = createRoundedRectShape(2.6, 4.9, 0.55);
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.14,
      bevelSegments: 6,
      curveSegments: 14,
      steps: 1,
    });
    bodyGeo.computeVertexNormals();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0b1220,
      metalness: 0.65,
      roughness: 0.35,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI;
    fallback.add(body);

    const screenGeo = new THREE.PlaneGeometry(2.15, 4.05);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x071225,
      emissive: 0x0b3552,
      emissiveIntensity: 0.45,
      metalness: 0.1,
      roughness: 0.2,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0, 0.24);
    fallback.add(screen);

    const edges = new THREE.EdgesGeometry(bodyGeo, 16);
    const outline = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 })
    );
    fallback.add(outline);
    </div>
  );
}

    group.rotation.y = -0.5;
    group.rotation.x = 0.18;

    let loadedObject: THREE.Object3D | null = null;
    let cancelled = false;

    const loadObjMtl = async () => {
      try {
        const [{ MTLLoader }, { OBJLoader }] = await Promise.all([
          import("three/examples/jsm/loaders/MTLLoader.js"),
          import("three/examples/jsm/loaders/OBJLoader.js"),
        ]);

        const mtlUrl = encodeURI("/Asset 2ldpi.mtl");
        const objUrl = encodeURI("/Asset 2ldpi.obj");

        const mtlLoader = new MTLLoader();
        mtlLoader.setPath("/");
        mtlLoader.load(
          mtlUrl,
          (materials) => {
            if (cancelled) return;
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
              objUrl,
              (obj) => {
                if (cancelled) return;

                const box = new THREE.Box3().setFromObject(obj);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                obj.position.sub(center);
                const maxDim = Math.max(size.x, size.y, size.z) || 1;
                obj.scale.setScalar(4.9 / maxDim);

                group.remove(fallback);
                loadedObject = obj;
                group.add(obj);
              },
              undefined,
              () => {
                // keep fallback
              }
            );
          },
          undefined,
          () => {
            // keep fallback
          }
        );
      } catch {
        // keep fallback
      }
    };

    loadObjMtl();

    const resize = () => {
      const w = mount.clientWidth;
      const h = height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    let ro: ResizeObserver | null = null;
    const RO = (view as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    if (RO) {
      ro = new RO(resize);
      ro.observe(mount);
    } else {
      view.addEventListener("resize", resize);
    }

    let targetRotX = group.rotation.x;
    let targetRotY = group.rotation.y;
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = -0.5 + nx * 0.35;
      targetRotX = 0.18 + -ny * 0.25;
    };
    mount.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const dt = clock.getDelta();
      group.rotation.y += dt * 0.08;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.08);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.06);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onMove);
      if (ro) ro.disconnect();
      else view.removeEventListener("resize", resize);

      if (loadedObject) group.remove(loadedObject);
      scene.remove(group);

      bodyGeo.dispose();
      screenGeo.dispose();
      bodyMat.dispose();
      screenMat.dispose();
      edges.dispose();
      (outline.material as THREE.Material).dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, [height]);

  return (
    <div className={className}>
      <div
        ref={mountRef}
        className="relative w-full overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-b from-white to-slate-50 shadow-xl"
        style={{ height }}
      />
    </div>
  );
}

