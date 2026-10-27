// Hero background: floating greybox blocks (a nod to Blockout Studio) orbiting a
// wobbling water blob (Fowl Play's water character), over a particle field.
// Loaded lazily; pauses when off-screen or the tab is hidden.
import {
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  Timer,
  WebGLRenderer,
} from 'three';

type Options = { reduceMotion: boolean };

function readPalette() {
  const s = getComputedStyle(document.documentElement);
  const get = (name: string) => new Color(s.getPropertyValue(name).trim() || '#ffffff');
  return {
    accent: get('--accent'),
    accent2: get('--accent-2'),
    accent3: get('--accent-3'),
    surface: get('--surface-2'),
    isLight: s.getPropertyValue('color-scheme').trim() === 'light',
  };
}

// Small deterministic RNG so the layout is the same on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export function mount(host: HTMLElement, { reduceMotion }: Options) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  scene.add(new AmbientLight(0xffffff, 0.55));
  const sun = new DirectionalLight(0xffffff, 1.6);
  sun.position.set(4, 6, 8);
  scene.add(sun);

  let palette = readPalette();
  const world = new Group();
  scene.add(world);

  // --- Water blob -------------------------------------------------------------
  const blobMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColA: { value: palette.accent.clone() },
      uColB: { value: palette.accent.clone().lerp(new Color('#ffffff'), 0.55) },
      uAlpha: { value: palette.isLight ? 0.75 : 0.6 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec3 p = position;
        float d = sin(p.x * 2.1 + uTime * 1.3) * 0.09
                + sin(p.y * 2.7 + uTime * 1.7) * 0.07
                + sin(p.z * 3.1 + uTime * 1.1) * 0.06;
        p += normal * d;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColA;
      uniform vec3 uColB;
      uniform float uAlpha;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float f = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.2);
        vec3 col = mix(uColA * 0.45, uColB, f);
        float spec = pow(max(dot(normalize(vNormal), normalize(vec3(0.4, 0.6, 0.7))), 0.0), 40.0);
        gl_FragColor = vec4(col + spec * 0.8, uAlpha + f * 0.35);
      }`,
  });
  const blob = new Mesh(new IcosahedronGeometry(1.55, 14), blobMat);
  world.add(blob);

  // --- Greybox blocks ---------------------------------------------------------
  const rand = rng(20260927);
  const blockMat = new MeshStandardMaterial({
    color: palette.surface,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });
  const edgeMats = [
    new LineBasicMaterial({ color: palette.accent, transparent: true, opacity: 0.85 }),
    new LineBasicMaterial({ color: palette.accent2, transparent: true, opacity: 0.85 }),
    new LineBasicMaterial({ color: palette.accent3, transparent: true, opacity: 0.85 }),
  ];
  type Block = { obj: Group; baseY: number; phase: number; spin: number };
  const blocks: Block[] = [];
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const w = 0.35 + rand() * 1.1;
    const h = 0.25 + rand() * (rand() > 0.7 ? 1.6 : 0.6);
    const d = 0.35 + rand() * 1.1;
    const geo = new BoxGeometry(w, h, d);
    const g = new Group();
    g.add(new Mesh(geo, blockMat));
    g.add(new LineSegments(new EdgesGeometry(geo), edgeMats[i % edgeMats.length]));
    const angle = (i / COUNT) * Math.PI * 2 + rand() * 0.4;
    const radius = 3 + rand() * 2.6;
    const y = (rand() - 0.5) * 4.2;
    g.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    g.rotation.set(rand() * 0.6, rand() * Math.PI, rand() * 0.4);
    world.add(g);
    blocks.push({ obj: g, baseY: y, phase: rand() * Math.PI * 2, spin: (rand() - 0.5) * 0.4 });
  }

  // --- Particle field -----------------------------------------------------------
  const P = 420;
  const pos = new Float32Array(P * 3);
  for (let i = 0; i < P; i++) {
    pos[i * 3] = (rand() - 0.5) * 30;
    pos[i * 3 + 1] = (rand() - 0.5) * 18;
    pos[i * 3 + 2] = (rand() - 0.5) * 16 - 4;
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new BufferAttribute(pos, 3));
  const pMat = new PointsMaterial({
    color: palette.accent3,
    size: 0.05,
    transparent: true,
    opacity: palette.isLight ? 0.5 : 0.7,
    blending: palette.isLight ? undefined : AdditiveBlending,
    depthWrite: false,
  });
  const particles = new Points(pGeo, pMat);
  scene.add(particles);

  // --- Layout, input, theme -----------------------------------------------------
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  function layout() {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Wide screens: scene sits to the right of the headline. Narrow: centred, pushed back.
    const wide = camera.aspect > 1.15;
    world.position.x = wide ? 3.6 : 0;
    world.position.y = wide ? 0 : -1.2;
    world.scale.setScalar(wide ? 1 : 0.8);
    renderOnce();
  }

  function applyPalette() {
    palette = readPalette();
    blobMat.uniforms.uColA.value.copy(palette.accent);
    blobMat.uniforms.uColB.value.copy(palette.accent).lerp(new Color('#ffffff'), 0.55);
    blobMat.uniforms.uAlpha.value = palette.isLight ? 0.75 : 0.6;
    blockMat.color.copy(palette.surface);
    edgeMats[0].color.copy(palette.accent);
    edgeMats[1].color.copy(palette.accent2);
    edgeMats[2].color.copy(palette.accent3);
    pMat.color.copy(palette.accent3);
    pMat.blending = palette.isLight ? 1 /* NormalBlending */ : AdditiveBlending;
    pMat.opacity = palette.isLight ? 0.5 : 0.7;
    pMat.needsUpdate = true;
    renderOnce();
  }

  new MutationObserver(applyPalette).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', applyPalette);

  // --- Loop ----------------------------------------------------------------------
  const timer = new Timer();
  let elapsed = 0;
  let running = false;
  let raf = 0;

  function update(dt: number) {
    elapsed += dt;
    blobMat.uniforms.uTime.value = elapsed;
    world.rotation.y += dt * 0.12;
    blob.rotation.x += dt * 0.15;
    for (const b of blocks) {
      b.obj.position.y = b.baseY + Math.sin(elapsed * 0.8 + b.phase) * 0.18;
      b.obj.rotation.y += dt * b.spin;
    }
    particles.rotation.y = elapsed * 0.01;
    // Ease the camera toward the pointer for a little parallax.
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(world.position.x * 0.35, 0, 0);
  }

  function renderOnce() {
    renderer.render(scene, camera);
  }

  function frame(t: number) {
    timer.update(t);
    update(Math.min(timer.getDelta(), 1 / 20));
    renderOnce();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    timer.reset();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  new ResizeObserver(layout).observe(host);
  layout();

  if (reduceMotion) {
    // One still frame with a pleasant pose instead of animation.
    update(2.5);
    renderOnce();
  } else {
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(host);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }

  host.classList.add('is-ready');
}
