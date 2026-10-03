// Moonbrush CTA: Three.js dust scene behind the contact card.
// Lives in /cta next to createScene.js (the Three.js bundle) and moonbrush-icon.svg.
import { c as createScene } from './createScene.js';

const canvas = document.getElementById('cta-stage');
const section = document.getElementById('contact');
const PROGRESS = 0.78;

if (canvas && section) {
  const iconUrl = new URL('./moonbrush-icon.svg', import.meta.url).href;
  let scene = null;
  let starting = false;

  const start = () => {
    if (scene || starting) return;
    starting = true;
    scene = createScene(canvas, { iconUrl });
    scene.jumpTo(PROGRESS);
    scene.ready.then(() => {
      if (!scene) return;
      scene.jumpTo(PROGRESS);
      canvas.dataset.ready = 'true';
    });
    starting = false;
  };
  const stop = () => {
    if (!scene) return;
    scene.dispose();
    scene = null;
    canvas.dataset.ready = 'false';
  };

  // Run only while the section is near the viewport (saves GPU, keeps the hero scene smooth).
  new IntersectionObserver(
    (entries) => (entries[0].isIntersecting ? start() : stop()),
    { rootMargin: '25% 0px 25% 0px' }
  ).observe(section);

  let t;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => scene && scene.resize(), 120);
  });
}
