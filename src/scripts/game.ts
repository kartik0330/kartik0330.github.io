// The "game layer": synthesized UI sounds (muted by default), loot-drop reveals and
// the level HUD events. No audio files: every sound is a few oscillator notes.

const SOUND_KEY = 'sound';
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx: AudioContext | null = null;
let soundOn = false;
try {
  soundOn = localStorage.getItem(SOUND_KEY) === 'on';
} catch {}

function audio(): AudioContext | null {
  if (!soundOn) return null;
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, delay = 0) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  amp.gain.setValueAtTime(gain, t);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(amp).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const sfx = {
  hover: () => tone(1320, 0.025, 'triangle', 0.012),
  click: () => {
    tone(660, 0.05, 'square', 0.025);
    tone(990, 0.06, 'square', 0.02, 0.045);
  },
  levelUp: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.11, 'square', 0.022, i * 0.075)),
  complete: () => [784, 988, 1175, 1568, 1976].forEach((f, i) => tone(f, 0.14, 'triangle', 0.03, i * 0.09)),
};

function setSound(on: boolean) {
  soundOn = on;
  try {
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
  } catch {}
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
  });
  if (on) sfx.click();
}

function initSound() {
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(soundOn));
    b.addEventListener('click', () => setSound(!soundOn));
  });

  const interactive = 'a, button, summary, [data-sfx]';
  let lastHover: Element | null = null;
  if (canHover) {
    document.addEventListener('pointerover', (e) => {
      const el = (e.target as Element).closest(interactive);
      if (el && el !== lastHover) sfx.hover();
      lastHover = el;
    });
  }
  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest(interactive);
    if (el && !el.matches('[data-sound-toggle]')) sfx.click();
  });
}

function initReveal() {
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-revealed'));
    return;
  }
  // Stagger siblings so a grid drops in one card after another.
  items.forEach((el) => {
    const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')) : [];
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 6) * 70}ms`);
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-revealed');
        io.unobserve(el);
        // Hand the element back to its own hover/transition styles once it has landed.
        const delay = parseInt(el.style.getPropertyValue('--reveal-delay')) || 0;
        setTimeout(() => {
          el.removeAttribute('data-reveal');
          el.classList.remove('is-revealed');
          el.style.removeProperty('--reveal-delay');
        }, delay + 650);
      }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

initSound();
initReveal();
