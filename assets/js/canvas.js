/* ── CANVAS — floating particles on curved path ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const PARTICLES = 55;
const particles = Array.from({length: PARTICLES}, () => ({
  x: Math.random() * 2000 - 500,
  y: Math.random() * 900,
  r: 0.4 + Math.random() * 1.2,
  speed: 0.08 + Math.random() * 0.18,
  opacity: 0.05 + Math.random() * 0.2,
  drift: (Math.random() - 0.5) * 0.15
}));

/* SVG-like curved rail painted on canvas */
const NODES = [
  {x: 0.08, y: 0.52},
  {x: 0.22, y: 0.38},
  {x: 0.38, y: 0.62},
  {x: 0.55, y: 0.35},
  {x: 0.70, y: 0.58},
  {x: 0.85, y: 0.40},
  {x: 1.00, y: 0.52},
];

let dotT = 0; // 0→1 along the curve, cycling

function getPointOnCurve(t) {
  const segs = NODES.length - 1;
  const seg  = Math.min(Math.floor(t * segs), segs - 1);
  const lt   = (t * segs) - seg;
  const p0   = NODES[seg];
  const p1   = NODES[seg + 1];
  const mx   = (p0.x + p1.x) / 2;
  // simple quadratic: P0 → mid → P1
  const bx = (1-lt)*(1-lt)*p0.x + 2*(1-lt)*lt*mx + lt*lt*p1.x;
  const by = (1-lt)*(1-lt)*p0.y + 2*(1-lt)*lt*((p0.y+p1.y)/2) + lt*lt*p1.y;
  return { x: bx * W, y: by * H };
}

function drawRail() {
  ctx.beginPath();
  for (let i = 0; i <= 200; i++) {
    const pt = getPointOnCurve(i / 200);
    i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
  }
  ctx.strokeStyle = 'rgba(26,37,64,0.55)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // glow segment around dotT
  const start = Math.max(0, dotT - 0.08);
  const end   = Math.min(1, dotT + 0.08);
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const pt = getPointOnCurve(start + (end - start) * (i / 60));
    i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
  }
  ctx.strokeStyle = 'rgba(79,142,247,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // moving dot on rail
  const dp = getPointOnCurve(dotT);
  ctx.beginPath();
  ctx.arc(dp.x, dp.y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(79,142,247,0.8)';
  ctx.shadowColor = '#4f8ef7';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;

  // small node dots
  NODES.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x * W, n.y * H, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30,53,100,0.6)';
    ctx.fill();
  });
}

function frame() {
  ctx.clearRect(0, 0, W, H);

  drawRail();

  particles.forEach(p => {
    p.x += p.speed;
    p.y += p.drift;
    if (p.x > W + 20) { p.x = -20; p.y = Math.random() * H; }
    if (p.y < 0 || p.y > H) p.drift *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(79,142,247,${p.opacity})`;
    ctx.fill();
  });

  dotT = (dotT + 0.0008) % 1;
  requestAnimationFrame(frame);
}

frame();