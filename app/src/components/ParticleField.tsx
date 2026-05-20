import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleData {
  id: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  nx: number;
  ny: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  alpha: number;
  color: THREE.Color;
  isDraw: boolean;
  value: string;
  no: number;
}

const PRODUCT_CODES = [
  'V-001', 'B-234', 'C-089', 'V-156', 'B-342', 'C-567', 'V-098', 'B-765', 'V-432', 'C-111',
  'B-888', 'V-555', 'C-321', 'B-999', 'V-777', 'C-444', 'B-123', 'V-666', 'C-888', 'B-456',
];

const CUSTOMER_NAMES = [
  'Maria S.', 'Ana C.', 'Joao P.', 'Bruna L.', 'Fernanda R.', 'Camila M.', 'Juliana T.',
  'Patricia A.', 'Amanda B.', 'Larissa D.', 'Vanessa F.', 'Carolina H.', 'Isabela J.',
  'Natasha K.', 'Daniela N.', 'Roberta Q.', 'Tatiana W.', 'Simone X.', 'Eliane Z.', 'Monica E.',
];

const PRICE_VALUES = [
  'R$89,00', 'R$129,00', 'R$45,00', 'R$199,00', 'R$67,00', 'R$299,00', 'R$34,00', 'R$159,00',
  'R$78,00', 'R$249,00', 'R$56,00', 'R$189,00', 'R$99,00', 'R$349,00', 'R$23,00', 'R$149,00',
  'R$79,00', 'R$269,00', 'R$112,00', 'R$399,00',
];

function getValueForIndex(index: number): string {
  const cycleIndex = index % 60;
  if (cycleIndex < 20) return PRODUCT_CODES[cycleIndex % PRODUCT_CODES.length];
  if (cycleIndex < 40) return CUSTOMER_NAMES[(cycleIndex - 20) % CUSTOMER_NAMES.length];
  return PRICE_VALUES[(cycleIndex - 40) % PRICE_VALUES.length];
}

function getColorForIndex(index: number): THREE.Color {
  const colors = [
    new THREE.Color('#FFFFFF'),
    new THREE.Color('#FF9F1C'),
    new THREE.Color('#FFB84D'),
    new THREE.Color('#B0B0B0'),
    new THREE.Color('#555555'),
  ];
  return colors[index % colors.length];
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function customEasing1(t: number): number {
  return t < 0.5 ? 6.6 * Math.pow(t, 3) : 0.5 + 0.5 * Math.sin((t - 0.5) * Math.PI);
}

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    camera.position.set(0, 0, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;
    rendererRef.current = renderer;

    // Sprite texture
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 256;
    spriteCanvas.height = 256;
    const sCtx = spriteCanvas.getContext('2d')!;
    const gradient = sCtx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, '#FF9F1C');
    gradient.addColorStop(0.5, '#FFB84D');
    gradient.addColorStop(1.0, '#FF9F1C');
    sCtx.fillStyle = gradient;
    sCtx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    sCtx.shadowBlur = 4;
    sCtx.fillRect(0, 0, 256, 256);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // Particle count
    const PARTICLE_COUNT = 528;

    // Geometry & Material
    const geometry = new THREE.PlaneGeometry(1, 1);

    const vertexShader = `
      uniform float time;
      uniform float angle;
      uniform float speed;
      uniform float amplitude;
      varying vec2 vUv;
      varying float vAlpha;
      varying vec3 vColor;
      attribute float alpha;
      attribute vec3 customColor;
      void main() {
        vUv = uv;
        vAlpha = alpha;
        vColor = customColor;
        vec4 mPosition = modelMatrix * vec4(position, 1.0);
        float theta = angle + time * speed;
        float vx = mPosition.x + cos(theta) * amplitude - 400.0;
        float vy = mPosition.y + sin(theta) * 120.0;
        mPosition = vec4(vx, vy, mPosition.z, 1.0);
        gl_Position = projectionMatrix * viewMatrix * mPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D texture1;
      uniform float time;
      uniform float opacity;
      varying vec2 vUv;
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        vec4 color = texture2D(texture1, vUv);
        color.a *= vAlpha * opacity;
        gl_FragColor = vec4(vColor, color.a);
      }
    `;

    const uniforms: Record<string, THREE.IUniform> = {
      time: { value: 0.0 },
      texture1: { value: spriteTexture },
      angle: { value: 0.0 },
      speed: { value: 0.6 },
      amplitude: { value: 300.0 },
      opacity: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(uniforms),
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    // Generate grid layout
    const particles: ParticleData[] = [];
    const columns: number[] = [];
    let totalAssigned = 0;
    let colIdx = 0;
    while (totalAssigned < PARTICLE_COUNT) {
      const colCount = Math.max(16 - colIdx, 4);
      const count = Math.min(colCount, PARTICLE_COUNT - totalAssigned);
      columns.push(count);
      totalAssigned += count;
      colIdx++;
    }

    let particleIdx = 0;
    const colSpacing = 28;
    const rowSpacing = 32;
    const startX = -((columns.length - 1) * colSpacing) / 2;

    for (let c = 0; c < columns.length; c++) {
      const colCount = columns[c];
      const colX = startX + c * colSpacing;
      const startY = ((colCount - 1) * rowSpacing) / 2;
      for (let r = 0; r < colCount; r++) {
        const x = colX + (Math.random() - 0.5) * 8;
        const y = startY - r * rowSpacing + (Math.random() - 0.5) * 8;
        const nx = Math.floor(Math.random() * 2000 - 1000);
        const ny = Math.floor(Math.random() * 2000 - 1000);

        let ox: number, oy: number;
        if (particleIdx < 176) {
          ox = nx - 1400;
          oy = ny - 700;
        } else {
          ox = nx + 1400;
          oy = ny + 700;
        }

        const w = 40 + Math.random() * 50;
        const h = 8 + Math.random() * 6;

        particles.push({
          id: particleIdx,
          x,
          y,
          ox,
          oy,
          nx,
          ny,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          w,
          h,
          rot: Math.random() * 360,
          alpha: Math.random() * 0.7 + 0.2,
          color: getColorForIndex(particleIdx),
          isDraw: false,
          value: getValueForIndex(particleIdx),
          no: 0,
        });
        particleIdx++;
      }
    }

    // Draw order sorting
    const sortList = [...Array(particles.length).keys()];
    for (let i = sortList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sortList[i], sortList[j]] = [sortList[j], sortList[i]];
    }
    sortList.forEach((targetIndex, i) => {
      particles[targetIndex].no = i;
    });

    // Instanced mesh
    const instancedMesh = new THREE.InstancedMesh(geometry, material, PARTICLE_COUNT);
    scene.add(instancedMesh);

    // Attributes
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const alphas = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < particles.length; i++) {
      colors[i * 3] = particles[i].color.r;
      colors[i * 3 + 1] = particles[i].color.g;
      colors[i * 3 + 2] = particles[i].color.b;
      alphas[i] = particles[i].alpha;
    }

    geometry.setAttribute('customColor', new THREE.InstancedBufferAttribute(colors, 3));
    geometry.setAttribute('alpha', new THREE.InstancedBufferAttribute(alphas, 1));

    // Clock
    const clock = new THREE.Clock();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    const heroEl = container.parentElement;
    const handleScroll = () => {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const heroHeight = heroEl.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (heroHeight * 0.8)));
      scrollProgressRef.current = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const dummy = new THREE.Object3D();

    function animate() {
      frameRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      material.uniforms.time.value = time * 0.05;

      const scrollProgress = scrollProgressRef.current;
      const easedProgress = customEasing1(scrollProgress);

      // Determine active particles based on scroll
      const threshold = easedProgress * PARTICLE_COUNT;
      for (let i = 0; i < particles.length; i++) {
        particles[i].isDraw = particles[i].no < threshold;
      }

      const activeParticles = particles.filter((p) => p.isDraw);

      // Opacity
      const progress = activeParticles.length / PARTICLE_COUNT;
      material.uniforms.opacity.value = 1 - Math.pow(progress, 3);

      // Camera interpolation
      const cameraZ = 1000 + (600 - 1000) * easedProgress;
      const cameraY = 0 + 180 * easedProgress;
      camera.position.z += (cameraZ - camera.position.z) * 0.05;
      camera.position.y += (cameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Phase 2: disperse after 70%
      const phase2Progress = scrollProgress > 0.7 ? (scrollProgress - 0.7) / 0.3 : 0;
      const disperseStrength = phase2Progress * 800;

      // Update instances
      let activeIdx = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isDraw) {
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i, dummy.matrix);
          continue;
        }

        // Position: interpolate from origin to target
        const t = Math.min(1, (threshold - p.no) / 50);
        const eased = easeInOutCubic(t);

        let px = p.ox + (p.x - p.ox) * eased;
        let py = p.oy + (p.y - p.oy) * eased;

        // Phase 2: disperse from mouse
        if (phase2Progress > 0) {
          const dx = px - mouseRef.current.x * 400;
          const dy = py - mouseRef.current.y * 300;
          const dist = Math.sqrt(dx * dx + dy * dy) + 1;
          const force = (1 - Math.min(1, dist / 600)) * disperseStrength;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
        }

        dummy.position.set(px, py, 0);
        dummy.scale.set(p.w, p.h, 1);
        dummy.rotation.z = p.rot * Math.PI / 180;
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        activeIdx++;
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    }

    animate();

    // IntersectionObserver for visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.1) {
            renderer.domElement.style.opacity = '1';
          } else {
            renderer.domElement.style.opacity = '0';
          }
        });
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    if (heroEl) observer.observe(heroEl);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}
