/* ── CANVAS — floating particles on curved path ── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
resize(); window.addEventListener('resize', resize);
 
const NODES = [
  {x:.06,y:.52},{x:.20,y:.36},{x:.36,y:.64},{x:.52,y:.34},
  {x:.68,y:.60},{x:.84,y:.38},{x:1.0,y:.52}
];
 
const particles = Array.from({length:48}, () => ({
  x: Math.random() * 2200 - 200,
  y: Math.random() * 900,
  r: .4 + Math.random() * 1.0,
  speed: .06 + Math.random() * .15,
  opacity: .035 + Math.random() * .12,
  drift: (Math.random() - .5) * .11
}));
 
let dotT = 0;
 
function ptOnCurve(t) {
  const segs = NODES.length - 1;
  const s  = Math.min(Math.floor(t * segs), segs - 1);
  const lt = t * segs - s;
  const a  = NODES[s], b = NODES[s+1];
  const mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
  return {
    x: ((1-lt)*(1-lt)*a.x + 2*(1-lt)*lt*mx + lt*lt*b.x)*W,
    y: ((1-lt)*(1-lt)*a.y + 2*(1-lt)*lt*my + lt*lt*b.y)*H
  };
}
 
function frame() {
  ctx.clearRect(0,0,W,H);
 
  /* rail base */
  ctx.beginPath();
  for (let i=0;i<=240;i++) { const p=ptOnCurve(i/240); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); }
  ctx.strokeStyle='rgba(22,35,66,0.5)'; ctx.lineWidth=1; ctx.stroke();
 
  /* glow segment */
  const gs=Math.max(0,dotT-.09), ge=Math.min(1,dotT+.09);
  ctx.beginPath();
  for (let i=0;i<=60;i++) { const p=ptOnCurve(gs+(ge-gs)*(i/60)); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); }
  ctx.strokeStyle='rgba(79,142,247,0.28)'; ctx.lineWidth=1.5; ctx.stroke();
 
  /* dot */
  const dp=ptOnCurve(dotT);
  ctx.beginPath(); ctx.arc(dp.x,dp.y,2.5,0,Math.PI*2);
  ctx.fillStyle='rgba(79,142,247,0.88)';
  ctx.shadowColor='#4f8ef7'; ctx.shadowBlur=14;
  ctx.fill(); ctx.shadowBlur=0;
 
  /* nodes */
  NODES.forEach(n => {
    ctx.beginPath(); ctx.arc(n.x*W,n.y*H,1.8,0,Math.PI*2);
    ctx.fillStyle='rgba(40,65,120,0.45)'; ctx.fill();
  });
 
  /* particles */
  particles.forEach(p => {
    p.x+=p.speed; p.y+=p.drift;
    if(p.x>W+20){p.x=-20;p.y=Math.random()*H;}
    if(p.y<0||p.y>H) p.drift*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(79,142,247,${p.opacity})`; ctx.fill();
  });
 
  dotT=(dotT+.0007)%1;
  requestAnimationFrame(frame);
}
frame();