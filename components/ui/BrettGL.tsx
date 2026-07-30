"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BRETT_SILHOUETTE_PATH } from "./brett-silhouette";

/**
 * Brett in real 3D (WebGL).
 *
 * basedbrett.com fakes its 3D with a hand-animated Lottie file, which can only
 * be authored in After Effects. This is the procedural alternative and it's
 * genuinely dimensional: the outer silhouette is extruded into real geometry
 * with a bevelled rim, the artwork is printed on the front face, and it's lit
 * by a key light plus lime and magenta rim lights so the edges catch colour as
 * it turns.
 *
 * Only the silhouette becomes geometry — extruding all 284 paths of the source
 * trace would produce millions of triangles for detail the camera never sees at
 * this angle.
 */

interface Props {
  className?: string;
  /** Extrusion depth in SVG units (the logo's own 1254-unit space). */
  depth?: number;
  /** Set false to hold still (used for reduce-motion). */
  animate?: boolean;
}

export function BrettGL({ className = "", depth = 130, animate = true }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Declared up front: the async texture load closes over it.
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true); // no WebGL — caller shows the flat mark
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 1, 5000);
    camera.position.set(0, 0, 2350);

    // ---- geometry ---------------------------------------------------------
    // SVG y grows downward, three.js y grows up: negate y as we trace, then
    // recentre on the origin so rotation happens about the mark's middle.
    const shape = svgPathToShape(BRETT_SILHOUETTE_PATH);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 26,
      bevelSize: 20,
      bevelSegments: 5,
      curveSegments: 20,
    });

    // Record where the silhouette sat on the original 1254 canvas BEFORE
    // recentring — the printed face needs that offset to line up.
    geometry.computeBoundingBox();
    const pre = geometry.boundingBox!;
    const shapeCx = (pre.max.x + pre.min.x) / 2;
    const shapeCy = (pre.max.y + pre.min.y) / 2;

    geometry.center();
    geometry.computeVertexNormals();

    const body = new THREE.MeshStandardMaterial({
      color: 0x9ccf10,
      roughness: 0.46,
      metalness: 0.06,
    });

    const group = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, body);
    group.add(mesh);

    // ---- printed face -----------------------------------------------------
    // brett-face.png is a square render of the FULL 1254 canvas, so the plane
    // is canvas-sized and shifted by however far the silhouette's centre sat
    // from the canvas centre. Canvas centre in three-space is (627, -627).
    const CANVAS = 1254;
    const faceOffsetX = CANVAS / 2 - shapeCx;
    const faceOffsetY = -CANVAS / 2 - shapeCy;

    const loader = new THREE.TextureLoader();
    loader.load("/img/brett-face.png", (tex) => {
      if (disposed) {
        tex.dispose();
        return;
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(CANVAS, CANVAS),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          alphaTest: 0.04,
          toneMapped: false,
        }),
      );
      // Sits just clear of the bevelled front so it never z-fights the body.
      plane.position.set(faceOffsetX, faceOffsetY, depth / 2 + 34);
      group.add(plane);
      render();
    });

    scene.add(group);

    // ---- lights -----------------------------------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(-700, 900, 1400);
    scene.add(key);

    const limeRim = new THREE.DirectionalLight(0xc8fd00, 1.5);
    limeRim.position.set(1300, 300, -500);
    scene.add(limeRim);

    const magentaRim = new THREE.DirectionalLight(0xe0427f, 1.0);
    magentaRim.position.set(-1200, -700, -400);
    scene.add(magentaRim);

    // ---- interaction + loop ----------------------------------------------
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;
    let t = 0;

    const onPointerMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const hoverable = !window.matchMedia("(hover: none)").matches;
    if (hoverable && animate) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    function render() {
      renderer.render(scene, camera);
    }

    function frame() {
      if (disposed) return;
      t += 0.0125;

      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;

      // Idle: a slow figure-of-eight sway so it never looks like a fixed spin.
      group.rotation.y = Math.sin(t * 0.75) * 0.42 + pointer.x * 0.62;
      group.rotation.x = Math.sin(t * 0.5) * 0.1 + pointer.y * 0.3;
      group.rotation.z = Math.sin(t * 0.4) * 0.035;
      group.position.y = Math.sin(t * 0.85) * 34;

      render();
      raf = requestAnimationFrame(frame);
    }

    // Size to the container and keep the mark filling it on resize.
    const resize = () => {
      const { clientWidth: cw, clientHeight: ch } = mount;
      if (!cw || !ch) return;
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      // Pull the camera back on narrow boxes so nothing clips at the edges.
      camera.position.z = 2350 * (cw < ch ? ch / cw : 1) * 0.96;
      camera.updateProjectionMatrix();
      render();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    if (animate) {
      raf = requestAnimationFrame(frame);
    } else {
      group.rotation.set(0, -0.2, 0);
      render();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      body.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry?.dispose?.();
          const m = o.material as THREE.Material & { map?: THREE.Texture };
          m?.map?.dispose?.();
          m?.dispose?.();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [depth, animate]);

  if (failed) return null;

  return <div ref={mountRef} className={className} aria-hidden />;
}

/**
 * Minimal SVG path -> THREE.Shape converter.
 *
 * The silhouette only ever uses M / C / Z (it's generated that way in
 * scripts, see brett-silhouette.ts), so a full path grammar isn't needed.
 * y is negated because SVG's y axis points down and three.js's points up.
 */
function svgPathToShape(d: string): THREE.Shape {
  const shape = new THREE.Shape();
  const tokens = d.match(/[MCZ][^MCZ]*/gi) ?? [];

  for (const token of tokens) {
    const cmd = token[0].toUpperCase();
    const n = (token.slice(1).match(/-?\d+\.?\d*/g) ?? []).map(Number);

    if (cmd === "M") {
      shape.moveTo(n[0], -n[1]);
    } else if (cmd === "C") {
      for (let i = 0; i + 5 < n.length; i += 6) {
        shape.bezierCurveTo(n[i], -n[i + 1], n[i + 2], -n[i + 3], n[i + 4], -n[i + 5]);
      }
    } else if (cmd === "Z") {
      shape.closePath();
    }
  }

  return shape;
}
