import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface HeroCoreCanvasProps {
  className?: string;
}

const _dummyObj = new THREE.Object3D();

export function HeroCoreCanvas({ className = '' }: HeroCoreCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [contextFailed, setContextFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setContextFailed(true);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextFailed(true);
    };
    const onContextRestored = () => {
      setContextFailed(false);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080e1e, 0.065);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 7.6);

    // Studio Reflection Environment (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    // 3-Point Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x6fa8ff, 0x080e1e, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xeef6ff, 2.2);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00c8ff, 2.6);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(0x3867ff, 4.5, 12, 1.5);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Composite AI Intelligence Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // 1. Inner luminous energy lattice
    const innerGeo = new THREE.IcosahedronGeometry(0.88, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1459e8,
      emissive: 0x00c8ff,
      emissiveIntensity: 0.75,
      metalness: 0.4,
      roughness: 0.2,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);
    geometries.push(innerGeo);
    materials.push(innerMat);

    // 2. Optical Sapphire Glass Sphere
    const glassGeo = new THREE.SphereGeometry(1.38, 48, 48);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xaad4ff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.32 : 1,
      ior: 1.55,
      thickness: 1.4,
      attenuationColor: new THREE.Color(0x1459e8),
      attenuationDistance: 2.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      depthWrite: false,
    });
    const glassSphere = new THREE.Mesh(glassGeo, glassMat);
    glassSphere.renderOrder = 2;
    coreGroup.add(glassSphere);
    geometries.push(glassGeo);
    materials.push(glassMat);

    // 3. Liquid Metallic Sculpted Ribbon
    const ribbonGeo = new THREE.TorusKnotGeometry(1.62, 0.09, 140, 20, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x3867ff,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      anisotropy: 0.75,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    coreGroup.add(ribbonMesh);
    geometries.push(ribbonGeo);
    materials.push(ribbonMat);

    // 4. Precision Counter-Rotating Orbital Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(2.25, 0.018, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00c8ff,
      emissive: 0x00c8ff,
      emissiveIntensity: 1.1,
      metalness: 0.85,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.set(Math.PI / 3, 0.25, 0);
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.014, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x3867ff,
      emissive: 0x1459e8,
      emissiveIntensity: 0.85,
      metalness: 0.9,
      roughness: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.set(-Math.PI / 4, 0.4, 0.2);
    coreGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.05, 0.009, 12, 120);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x8bb6ff,
      metalness: 0.95,
      roughness: 0.2,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.set(Math.PI / 2.2, -0.5, 0);
    coreGroup.add(ring3);

    geometries.push(ringGeo1, ringGeo2, ringGeo3);
    materials.push(ringMat1, ringMat2, ringMat3);

    // 5. Instanced Orbital Light Nodes
    const nodeCount = 44;
    const nodeGeo = new THREE.OctahedronGeometry(0.045, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x00c8ff,
      emissive: 0x00c8ff,
      emissiveIntensity: 1.6,
      roughness: 0.2,
      metalness: 0.5,
    });
    const nodeInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    nodeInstanced.frustumCulled = false;
    const nodeParams = Array.from({ length: nodeCount }, (_, idx) => ({
      radius: 2.0 + (idx % 4) * 0.42,
      speed: (0.18 + (idx % 5) * 0.06) * (idx % 2 === 0 ? 1 : -1),
      phase: (idx / nodeCount) * Math.PI * 2,
      tilt: ((idx % 7) - 3) * 0.28,
      scale: 0.7 + (idx % 3) * 0.25,
    }));
    coreGroup.add(nodeInstanced);
    geometries.push(nodeGeo);
    materials.push(nodeMat);

    // 6. Subtle Perspective Digital Floor Grid
    const gridHelper = new THREE.GridHelper(26, 36, 0x1459e8, 0x101b35);
    gridHelper.position.y = -2.85;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.28;
    scene.add(gridHelper);

    // 7. Ambient Starfield / Particle Depth
    const starCount = 320;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 22;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x6fb7ff,
      size: 0.038,
      transparent: true,
      opacity: 0.72,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);
    geometries.push(starGeo);
    materials.push(starMat);

    // Pre-warm shaders on real GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Responsive Positioning: Center-right on desktop so headline stays balanced
    const updateCorePlacement = (w: number) => {
      if (w >= 1024) {
        coreGroup.position.set(1.55, 0.05, 0);
        coreGroup.scale.setScalar(1);
      } else {
        coreGroup.position.set(0, 0.35, -0.5);
        coreGroup.scale.setScalar(0.78);
      }
    };
    updateCorePlacement(width);

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      updateCorePlacement(w);
    };
    window.addEventListener('resize', onResize);

    // Software WebGL pacing helper
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        innerCore.rotation.y += dt * 0.28;
        innerCore.rotation.x += dt * 0.14;
        ribbonMesh.rotation.y -= dt * 0.22;
        ribbonMesh.rotation.z += dt * 0.12;
        ring1.rotation.z += dt * 0.35;
        ring2.rotation.z -= dt * 0.25;
        ring3.rotation.y += dt * 0.18;
        starPoints.rotation.y = elapsed * 0.018;

        for (let i = 0; i < nodeCount; i++) {
          const p = nodeParams[i];
          const angle = p.phase + elapsed * p.speed;
          const x = Math.cos(angle) * p.radius;
          const z = Math.sin(angle) * p.radius;
          const y = Math.sin(angle * 2 + p.tilt) * 0.65;
          _dummyObj.position.set(x, y, z);
          _dummyObj.scale.setScalar(p.scale);
          _dummyObj.rotation.set(elapsed, angle, 0);
          _dummyObj.updateMatrix();
          nodeInstanced.setMatrixAt(i, _dummyObj.matrix);
        }
        nodeInstanced.instanceMatrix.needsUpdate = true;
      }

      // Exponential damping cursor parallax
      const targetRotY = pointerRef.current.x * 0.26;
      const targetRotX = pointerRef.current.y * 0.18;
      coreGroup.rotation.y = THREE.MathUtils.damp(coreGroup.rotation.y, targetRotY, 3.2, dt);
      coreGroup.rotation.x = THREE.MathUtils.damp(coreGroup.rotation.x, targetRotX, 3.2, dt);

      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      envTex.dispose();
      renderer.dispose();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  if (contextFailed) {
    return (
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(20,89,232,0.35),rgba(8,14,30,1)_65%)] ${className}`}
        aria-hidden="true"
      />
    );
  }

  return <div ref={mountRef} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true" />;
}
