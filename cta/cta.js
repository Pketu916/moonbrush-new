// Moonbrush CTA: Three.js dust scene behind the contact card.
// Lives in /cta next to createScene.js (the Three.js bundle) and moonbrush-icon.svg.
import { c as createScene } from './createScene.js';

const canvas = document.getElementById('cta-stage');
const section = document.getElementById('contact');
const PROGRESS = 0.78;

if (canvas && section) {
  // Icon inlined so no extra file is needed in the repo.
  const iconUrl = "data:image/svg+xml,%3Csvg width=%22109%22 height=%2273%22 viewBox=%220 0 109 73%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%0A%3Cpath d=%22M41.4669 65.0637C34.0426 57.2652 30.4168 47.8265 30.4168 36.1721C30.4168 24.5176 34.0426 15.1364 41.4957 7.33801C43.3374 5.40998 45.2942 3.71217 47.3661 2.27334C43.5101 0.805742 39.3375 0 34.7332 0C24.6902 0 16.5753 3.36685 9.89911 10.3308C3.25174 17.2947 0 25.7262 0 36.1721C0 46.6179 3.22297 55.1358 9.87034 62.0709C16.4889 69.006 24.6327 72.4017 34.7332 72.4017C39.3375 72.4017 43.5101 71.6247 47.3661 70.1571C45.2942 68.7183 43.3374 67.0205 41.4669 65.0637Z%22 fill=%22white%22/%3E%0A%3Cpath d=%22M98.7896 10.3886C92.0847 3.42468 83.9985 0.0290527 74.0418 0.0290527C66.7901 0.0290527 60.5456 1.8132 55.1356 5.41026C55.0781 5.46781 54.9917 5.52536 54.9342 5.55414C54.2723 5.98579 53.668 6.47499 53.035 6.96419C52.6321 7.25195 52.258 7.53972 51.8551 7.85626C51.6537 8.02892 51.4522 8.23036 51.2508 8.43179C50.5602 9.06487 49.8408 9.66918 49.1789 10.3598C42.5315 17.3237 39.2798 25.7552 39.2798 36.2011C39.2798 46.647 42.5028 55.1648 49.1501 62.1C49.7544 62.733 50.4163 63.3086 51.0494 63.8553C51.3084 64.0855 51.5674 64.3733 51.8264 64.6035C52.1717 64.8913 52.5458 65.179 52.9198 65.4668C53.5817 65.9848 54.2436 66.5028 54.9342 66.9632C54.9917 67.0207 55.0781 67.0783 55.1356 67.1071C60.5456 70.6754 66.7614 72.4595 74.013 72.4595C84.0272 72.4595 92.1134 69.0927 98.8184 62.1287C105.495 55.1936 108.746 46.7045 108.746 36.2299C108.746 25.7552 105.495 17.4101 98.7896 10.4174V10.3886ZM94.0703 57.8986C88.6315 63.4525 81.869 66.3013 74.013 66.3013C68.9484 66.3013 64.3729 65.1215 60.3154 62.8481C60.5744 62.5892 60.8622 62.359 61.1211 62.1C67.7973 55.1648 71.0491 46.6758 71.0491 36.2011C71.0491 25.7265 67.7973 17.3813 61.0924 10.3886C60.8334 10.1296 60.5456 9.89939 60.2866 9.6404C64.3729 7.33828 68.9484 6.15845 74.013 6.15845C81.8115 6.15845 88.5452 8.97854 94.0415 14.5036C99.509 20.0287 102.3 27.338 102.3 36.2011C102.3 45.0643 99.5378 52.3735 94.099 57.9274L94.0703 57.8986Z%22 fill=%22white%22/%3E%0A%3C/svg%3E";
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
