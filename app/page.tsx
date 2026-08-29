'use client';

import { ArrowDownRight, ArrowUpRight, Download, Globe, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang, useT } from './i18n/lang';
import { homeArchCat, homeArchDesc, homeProj } from './i18n/home-content';
import LangToggle from './i18n/LangToggle';
import BrandMark from './components/BrandMark';
import Link from 'next/link';
import { projects as workProjects } from './work/projects';

function ThaiFlag({className=""}:{className?:string}){return <svg className={className} viewBox="0 0 900 600" style={{display:'inline-block',width:'18px',height:'12px',verticalAlign:'-1px',borderRadius:'2px',overflow:'hidden',boxShadow:'0 0 0 1px rgba(255,255,255,0.25)',marginRight:'6px'}} aria-hidden="true"><rect width="900" height="600" fill="#EF3340"/><rect y="100" width="900" height="400" fill="#FFFFFF"/><rect y="200" width="900" height="200" fill="#00247D"/></svg>}

function NovaStar({className="",style={}}:{className?:string;style?:React.CSSProperties}){return <svg className={className} style={{display:'inline-block',width:'11px',height:'13px',verticalAlign:'-1px',marginLeft:'5px',filter:'drop-shadow(0 0 5px currentColor)',...style}} viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" d="M50 0C55 27 66 42 100 50C66 58 55 73 50 100C45 73 34 58 0 50C34 42 45 27 50 0Z"/></svg>}

/* Career trajectory: a left→right worklife timeline whose bright end feeds the
   tail of a mother comet, flanked by two baby comets, all shedding sparks.
   Three star nodes sit on the line (month/year always shown); hover/tap a
   node to raise its detail card. Canvas does the motion; a DOM layer does
   the labels + interaction. Collapses to a vertical list on phones. */
const TJ_STOPS = [
  { date: 'exp_1_date', role: 'exp_1_role', company: 'exp_1_company', desc: 'exp_1_desc', accent: '#9d84ff', nf: 0 },
  { date: 'exp_2_date', role: 'exp_2_role', company: 'exp_2_company', desc: 'exp_2_desc', accent: '#c3b0ff', nf: 0.5 },
  { date: 'exp_3_date', role: 'exp_3_role', company: 'exp_3_company', desc: 'exp_3_desc', accent: '#ffffff', nf: 1 },
] as const;
const TJ_STAR_PATH = 'M50 0C55 27 66 42 100 50C66 58 55 73 50 100C45 73 34 58 0 50C34 42 45 27 50 0Z';

function TrajectoryField() {
  const t = useT();
  const [canvasRef, inView] = useInView('150px');

  useEffect(() => {
    if (!inView) return;
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext('2d');
    if (!g) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const starPath = new Path2D(TJ_STAR_PATH);
    let raf = 0, t = 0, W = 0, H = 0, vert = false, last = 0;
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; c: string };
    const sparks: Spark[] = [];

    const resize = () => {
      const p = c.parentElement;
      if (!p) return;
      W = p.clientWidth; H = p.clientHeight;
      vert = W < 1024;
      const d = Math.min(devicePixelRatio, 1.5);
      c.width = W * d; c.height = H * d;
      c.style.width = W + 'px'; c.style.height = H + 'px';
      g.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();

    const rgba = (hex: string, a: number) => {
      const n = parseInt(hex.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };
    const drawStar = (x: number, y: number, rad: number, glow: string, blur: number) => {
      g.save();
      g.translate(x, y);
      const k = rad / 50;
      g.scale(k, k);
      g.translate(-50, -50);
      g.shadowColor = glow; g.shadowBlur = blur / k;
      g.fillStyle = '#fff';
      g.fill(starPath);
      g.restore();
    };
    const comet = (hx: number, hy: number, dx: number, dy: number, len: number, w: number, headR: number, col: string) => {
      const ex = hx + dx * len, ey = hy + dy * len;
      const nx = -dy, ny = dx;
      const grad = g.createLinearGradient(hx, hy, ex, ey);
      grad.addColorStop(0, rgba(col, 0.5));
      grad.addColorStop(0.5, rgba(col, 0.16));
      grad.addColorStop(1, rgba(col, 0));
      g.fillStyle = grad;
      g.beginPath();
      g.moveTo(hx + nx * w, hy + ny * w);
      g.quadraticCurveTo(hx + dx * len * 0.5 + nx * w * 0.32, hy + dy * len * 0.5 + ny * w * 0.32, ex, ey);
      g.quadraticCurveTo(hx + dx * len * 0.5 - nx * w * 0.32, hy + dy * len * 0.5 - ny * w * 0.32, hx - nx * w, hy - ny * w);
      g.closePath();
      g.fill();
      const cg = g.createRadialGradient(hx, hy, 0, hx, hy, headR * 4.5);
      cg.addColorStop(0, rgba(col, 0.5));
      cg.addColorStop(1, 'transparent');
      g.fillStyle = cg;
      g.beginPath(); g.arc(hx, hy, headR * 4.5, 0, 6.283); g.fill();
      drawStar(hx, hy, headR, col, 22);
    };

    const draw = (now = 0) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 24) return;
      last = now;
      if (!reduced) t += 1;
      g.clearRect(0, 0, W, H);

      const bob = reduced ? 0 : Math.sin(t * 0.028) * (vert ? 5 : 9);
      const drift = reduced ? 0 : Math.sin(t * 0.019 + 1.3) * (vert ? 4 : 7);
      let nodeAt: (f: number) => { x: number; y: number };
      let lineAt: (f: number) => { x: number; y: number };
      let strokeLine: (lw: number, style: string | CanvasGradient) => void;
      let dir: { x: number; y: number };
      let mother: { x: number; y: number };
      let lineStart: { x: number; y: number };

      // one quadratic Bézier point helper (straight P0→P1, then curve P1→ctrl→P2)
      const bez = (p0: number, p1: number, p2: number, u: number) =>
        (1 - u) * (1 - u) * p0 + 2 * (1 - u) * u * p1 + u * u * p2;

      if (vert) {
        const gx = 24, y0 = 4, y1 = H - 54;
        const yk = y0 + (y1 - y0) * 0.72;
        const my2 = y1 + 18 + bob;
        mother = { x: gx + drift, y: my2 };
        dir = { x: 0, y: -1 };
        lineStart = { x: gx, y: y0 };
        const nsy = y0 + (yk - y0) * 0.06, ney = y0 + (yk - y0) * 0.94;
        nodeAt = (f) => ({ x: gx, y: nsy + (ney - nsy) * f });
        const cy = yk + (my2 - yk) * 0.5;
        lineAt = (f) => {
          const py = y0 + (my2 - y0) * f;
          if (py <= yk) return { x: gx, y: py };
          const u = (py - yk) / (my2 - yk);
          return { x: bez(gx, gx, mother.x, u), y: bez(yk, cy, my2, u) };
        };
        strokeLine = (lw, style) => {
          g.strokeStyle = style; g.lineWidth = lw; g.lineCap = 'round';
          g.beginPath();
          g.moveTo(gx, y0); g.lineTo(gx, yk);
          g.quadraticCurveTo(gx, cy, mother.x, my2);
          g.stroke();
        };
      } else {
        const ly = H * 0.5, mx = Math.min(W - 90, W * 0.95), xk = W * 0.84;
        const nsx = W * 0.14, nex = W * 0.72;
        mother = { x: mx, y: ly + bob };
        dir = { x: -1, y: 0 };
        lineStart = { x: 0, y: ly };
        nodeAt = (f) => ({ x: nsx + (nex - nsx) * f, y: ly });
        const cx = xk + (mx - xk) * 0.5;
        lineAt = (f) => {
          const px = f * mx;
          if (px <= xk) return { x: px, y: ly };
          const u = (px - xk) / (mx - xk);
          return { x: bez(xk, cx, mx, u), y: bez(ly, ly, mother.y, u) };
        };
        strokeLine = (lw, style) => {
          g.strokeStyle = style; g.lineWidth = lw; g.lineCap = 'round';
          g.beginPath();
          g.moveTo(0, ly); g.lineTo(xk, ly);
          g.quadraticCurveTo(cx, ly, mx, mother.y);
          g.stroke();
        };
      }
      const drawHead = (hx: number, hy: number, headR: number, col: string) => {
        const cg = g.createRadialGradient(hx, hy, 0, hx, hy, headR * 5);
        cg.addColorStop(0, rgba(col, 0.5));
        cg.addColorStop(0.4, rgba(col, 0.16));
        cg.addColorStop(1, 'transparent');
        g.fillStyle = cg;
        g.beginPath(); g.arc(hx, hy, headR * 5, 0, 6.283); g.fill();
        drawStar(hx, hy, headR, col, 26);
      };

      // timeline line: fades in from the far edge, dead straight through the
      // markers, then a flexing whip into the (moving) mother
      const lg = g.createLinearGradient(lineStart.x, lineStart.y, mother.x, mother.y);
      lg.addColorStop(0, 'rgba(150,120,255,0)');
      lg.addColorStop(0.12, 'rgba(150,120,255,0.24)');
      lg.addColorStop(0.4, 'rgba(170,140,255,0.68)');
      lg.addColorStop(0.78, 'rgba(204,186,255,0.97)');
      lg.addColorStop(1, 'rgba(255,255,255,1)');
      strokeLine(vert ? 24 : 34, 'rgba(142,108,255,0.12)');
      strokeLine(vert ? 4 : 5.6, lg);
      g.save();
      g.globalCompositeOperation = 'lighter';
      const wg = g.createLinearGradient(nodeAt(1).x, nodeAt(1).y, mother.x, mother.y);
      wg.addColorStop(0, 'rgba(200,180,255,0)');
      wg.addColorStop(1, 'rgba(255,255,255,0.62)');
      strokeLine(vert ? 12 : 18, wg);
      g.restore();

      // pulse travelling the whole line toward the present
      if (!reduced) {
        const pp = (t * 0.0033) % 1.5;
        if (pp <= 1) {
          const pt = lineAt(pp);
          const pgr = g.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 28);
          pgr.addColorStop(0, `rgba(255,255,255,${0.6 * Math.sin(pp * Math.PI)})`);
          pgr.addColorStop(1, 'transparent');
          g.fillStyle = pgr;
          g.beginPath(); g.arc(pt.x, pt.y, 28, 0, 6.283); g.fill();
        }
      }

      // node glows under each marker (desktop only — on the stacked layout the
      // DOM stars flow at their own y and the canvas can't track them, so the
      // crisp CSS drop-shadow on .tj-star carries the glow there instead)
      if (!vert) {
        TJ_STOPS.forEach((s, i) => {
          const p = nodeAt(s.nf);
          const pulse = 0.8 + 0.2 * Math.sin(t * 0.05 + i * 1.7);
          const glowR = 44 * pulse;
          const gcol = s.accent === '#ffffff' ? '#d6cbff' : s.accent;
          const ng = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          ng.addColorStop(0, rgba(gcol, 0.44));
          ng.addColorStop(0.5, rgba(gcol, 0.1));
          ng.addColorStop(1, 'transparent');
          g.fillStyle = ng;
          g.beginPath(); g.arc(p.x, p.y, glowR, 0, 6.283); g.fill();
        });
      }

      // comets: two babies with their own tails, then the mother (tail = the line)
      const my = mother.y;
      const b1 = { x: mother.x + (vert ? -24 : -188), y: my + (vert ? -56 : -98) + Math.sin(t * 0.024) * 9 };
      const b2 = { x: mother.x + (vert ? 22 : -56), y: my + (vert ? 46 : 86) + Math.cos(t * 0.02) * 11 };
      comet(b1.x, b1.y, dir.x, dir.y, vert ? 62 : 256, vert ? 7 : 16, vert ? 6 : 14, '#ccb9ff');
      comet(b2.x, b2.y, dir.x, dir.y, vert ? 50 : 200, vert ? 6 : 13, vert ? 5.5 : 11, '#bba6ff');
      // two soft wisps trailing the mother for volume, then her head
      drawHead(mother.x + dir.x * (vert ? 26 : 54), my + dir.y * (vert ? 26 : 54), vert ? 13 : 24, '#ad96ff');
      drawHead(mother.x + dir.x * (vert ? 52 : 108), my + dir.y * (vert ? 52 : 108), vert ? 9 : 16, '#9c85f5');
      drawHead(mother.x, my, vert ? 21 : 40, '#c8b3ff');

      // sparks shed continuously by every comet head
      if (!reduced && t % 2 === 0) {
        [{ x: mother.x, y: my, n: 3 }, { ...b1, n: 2 }, { ...b2, n: 2 }].forEach((e, si) => {
          for (let k = 0; k < e.n; k++) {
            if (sparks.length > 260) break;
            const spd = 0.4 + Math.random() * 1.9;
            sparks.push({
              x: e.x + (Math.random() - 0.5) * 6, y: e.y + (Math.random() - 0.5) * 6,
              vx: dir.x * spd * 0.72 + (Math.random() - 0.5) * 1.3,
              vy: dir.y * spd * 0.72 + (Math.random() - 0.5) * 1.3,
              life: 0, max: 22 + Math.random() * 40,
              r: (si === 0 ? 1.1 : 0.7) + Math.random() * 1.4,
              c: Math.random() < 0.5 ? '#ffffff' : (Math.random() < 0.6 ? '#c9b6ff' : '#a98cff'),
            });
          }
        });
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.life++; sp.x += sp.vx; sp.y += sp.vy; sp.vx *= 0.985; sp.vy *= 0.985;
        const al = 1 - sp.life / sp.max;
        if (al <= 0) { sparks.splice(i, 1); continue; }
        g.globalAlpha = al * 0.85;
        g.fillStyle = sp.c;
        g.beginPath(); g.arc(sp.x, sp.y, Math.max(0.4, sp.r * al), 0, 6.283); g.fill();
      }
      g.globalAlpha = 1;
    };

    if (reduced) draw();
    else raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('resize', resize); };
  }, [inView, canvasRef]);

  return (
    <div className="tj-field">
      <canvas ref={canvasRef} className="tj-canvas" aria-hidden="true" />
      <ol className="tj-nodes" aria-label="Career timeline">
        {TJ_STOPS.map((s) => (
          <li
            key={s.company}
            className="tj-node"
            style={{ '--acc': s.accent, '--nf': s.nf } as React.CSSProperties}
          >
            <span className="tj-mini">
              <span className="tj-mini-date">{t(s.date)}</span>
              <span className="tj-mini-co">{t(s.company)}</span>
            </span>
            <span className="tj-star" aria-hidden="true">
              <NovaStar style={{ width: '100%', height: '100%', margin: 0, filter: 'none' }} />
            </span>
            <span className="tj-detail">
              <span className="tj-detail-role">{t(s.role)}</span>
              <span className="tj-detail-desc">{t(s.desc)}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const sections = [['origin','ORIGIN'],['identity','IDENTITY'],['experience','TRAJECTORY'],['capabilities','CAPABILITIES'],['work','SELECTED WORK'],['archive','ARCHIVE'],['contact','CONTACT']];
const projects = [
 {n:'01',title:'Potter Mobile+',kind:'FULL-STACK COMMERCE',outcome:'A production commerce platform spanning storefront, trade-in, stock, booking, PromptPay payments, live support, AI-assisted pricing, and a complete admin backoffice.',role:'Product design · Full-stack development',year:'2026',tools:'Next.js 16 · Supabase · Claude API',accent:'#75aaff',sigil:'P+',orbit:'COMMERCE / AI / PAYMENTS',href:'/work/potter-mobile-plus'},
 {n:'02',title:'Potter Mobile Pawn',kind:'PRODUCTION PWA',outcome:'A production pawn-management system covering contracts, signatures, interest, redemption, cash ledger, role access, and multi-branch audit trails.',role:'Full-stack product development',year:'2026',tools:'Next.js 16 · Supabase · Puppeteer',accent:'#8cffc1',sigil:'PP',orbit:'PWA / CONTRACTS / OPERATIONS',href:'/work/potter-mobile-pawn'},
 {n:'03',title:'Polaris',kind:'SYSTEM + EXTENSION',outcome:'A real-time case reporting dashboard and browser extension connecting support workflows with a legacy enterprise system.',role:'System design · Development',year:'2026',tools:'Next.js · TypeScript · Browser extension',accent:'#a8ff60',sigil:'PX',orbit:'DASHBOARD / EXTENSION / SYNC',href:'/work/polaris'},
];
const archive = [
 ['2026','Potter Mobile Plus','CODE','Product design & full-stack development','Next.js / Supabase / Claude API','/work/potter-mobile-plus'],
 ['2026','Potter Mobile Pawn','CODE','Full-stack product development','Next.js / Supabase / Puppeteer / PWA','/work/potter-mobile-pawn'],
 ['2026','Polaris','CODE','System design & development','Next.js / TypeScript / Chrome extension','/work/polaris'],
 ['2026','Cinema Ticket Booking System','CODE','Full-stack development','Go / Vue 3 / MongoDB / Redis','/work/cinema-ticket-booking-system'],
 ['2025','Reading List','CODE','Full-stack REST API & typed React SPA','React / Express / Prisma / SQLite','/work/reading-list'],
 ['2025','CodeLabs Tech','UX/UI','UX/UI + graphic & brand design · incl. AI Solutions Marketplace','Figma / Illustrator / Canva','/work/codelabs-tech'],
 ['2025','MindDojo','DESIGN','Graphic design for events & media','Illustrator / Canva','/work/minddojo'],
 ['2024','Hoklong Metaverse','3D','3D modeling for metaverse tourism','Maya / Substance 3D Painter','/work/hoklong-metaverse'],
 ['2024','Freelance Graphic Design','DESIGN','Artwork for game promotions & events','Illustrator','/work/freelance-graphic-design'],
 ['2023','TIC-TACTICS','UX/UI','UX/UI design & front-end development','Figma / Front-end','/work/tic-tactics'],
 ['2023','University 3D Project','3D','3D modeling & asset design','Maya / Substance 3D Painter','/work/university-3d-project'],
 ['2022','TA Recruitment','UX/UI','Requirements, wireframes & UX/UI design','Figma','/work/ta-recruitment'],
 ['2022','Kumi Shop','UX/UI','UX/UI design & front-end development','Figma / Photoshop','/work/kumi-shop'],
];

// Runs a canvas loop only while its element is on (or near) screen.
function useInView(rootMargin='200px'){const ref=useRef<HTMLCanvasElement>(null);const[inView,setInView]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>setInView(e.isIntersecting),{rootMargin});io.observe(el);return()=>io.disconnect()},[rootMargin]);return[ref,inView]as const}

function Universe(){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const c=ref.current;if(!c)return;const x=c.getContext('2d');if(!x)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let raf=0,t=0,mx=0,my=0,sy=scrollY,ease=scrollY,W=innerWidth,H=innerHeight;const mod=(n:number,m:number)=>((n%m)+m)%m;let stars:{x:number;y:number;r:number;d:number;a:number;p:number;tw:number}[]=[];const meteors:{x:number;y:number;vx:number;vy:number;l:number;life:number}[]=[];const sprite=document.createElement('canvas');sprite.width=sprite.height=16;const sc=sprite.getContext('2d')!;const sg=sc.createRadialGradient(8,8,0,8,8,8);sg.addColorStop(0,'#fdf9ff');sg.addColorStop(.5,'rgba(240,236,255,.5)');sg.addColorStop(1,'rgba(240,236,255,0)');sc.fillStyle=sg;sc.fillRect(0,0,16,16);const size=()=>{const d=Math.min(devicePixelRatio,1.5);W=innerWidth;H=innerHeight;c.width=W*d;c.height=H*d;c.style.width=W+'px';c.style.height=H+'px';x.setTransform(d,0,0,d,0,0);stars=Array.from({length:Math.min(150,Math.floor(W/9))},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.5,d:Math.random()*3+.4,a:Math.random()*.6+.25,p:Math.random()*6.28,tw:Math.random()*.04+.006}))};const move=(e:PointerEvent)=>{mx=(e.clientX/W-.5)*10;my=(e.clientY/H-.5)*8};const scroll=()=>{sy=scrollY};const spawn=()=>{meteors.push({x:Math.random()*W*.7-80,y:Math.random()*H*.35-120,vx:Math.random()*4+2.4,vy:Math.random()*5+7,l:Math.random()*140+110,life:1})};let last=0;const draw=(now=0)=>{raf=requestAnimationFrame(draw);if(now-last<22)return;last=now;ease+=(sy-ease)*.08;x.clearRect(0,0,W,H);for(let i=0;i<stars.length;i++){const s=stars[i];const off=(reduced?0:t*.011*s.d)-ease*(.12+s.d*.14);const px=s.x+mx*s.d*.18,py=mod(s.y+off,H)+my*s.d*.18;const tk=reduced?1:.72+.28*Math.sin(t*s.tw+s.p);x.globalAlpha=s.a*tk;const sz=s.r*3.4;x.drawImage(sprite,px-sz/2,py-sz/2,sz,sz)}x.globalAlpha=1;if(meteors.length){x.lineCap='round';x.lineWidth=2;for(let i=meteors.length-1;i>=0;i--){const m=meteors[i];m.x+=m.vx;m.y+=m.vy;m.life-=.011;const n=Math.hypot(m.vx,m.vy),ux=m.vx/n,uy=m.vy/n,al=Math.max(0,Math.min(1,m.life*1.5)),hx=m.x-ux*m.l*.5,hy=m.y-uy*m.l*.5;x.strokeStyle='rgba(214,202,255,'+al*.5+')';x.beginPath();x.moveTo(m.x,m.y);x.lineTo(hx,hy);x.stroke();x.strokeStyle='rgba(214,202,255,'+al*.14+')';x.beginPath();x.moveTo(hx,hy);x.lineTo(m.x-ux*m.l,m.y-uy*m.l);x.stroke();x.fillStyle='rgba(255,255,255,'+al+')';x.beginPath();x.arc(m.x,m.y,1.7,0,6.283);x.fill();if(m.life<=0||m.y-m.l>H||m.x-m.l>W)meteors.splice(i,1)}}if(!reduced&&meteors.length<2&&Math.random()<.0038)spawn();t++};const vis=()=>{cancelAnimationFrame(raf);if(!document.hidden)raf=requestAnimationFrame(draw)};size();draw();addEventListener('resize',size);addEventListener('pointermove',move,{passive:true});addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',vis);return()=>{cancelAnimationFrame(raf);removeEventListener('resize',size);removeEventListener('pointermove',move);removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',vis)}},[]);return <canvas ref={ref} className="universe" aria-hidden="true"/>}
function SolarSystemCanvas(){const[ref,inView]=useInView('200px');useEffect(()=>{const c=ref.current;if(!c||!inView)return;const ctx=c.getContext('2d');if(!ctx)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let raf=0,t=0,W=0,H=0,mx=.5,my=.5,tmx=.5,tmy=.5;const nodes=[{rx:.18,ry:.065,sp:.0045,r:6,col:'#a78fff',lab:'✦ VISUAL'},{rx:.30,ry:.100,sp:.0032,r:8,col:'#8e6cff',lab:'✦ EXPERIENCE'},{rx:.44,ry:.140,sp:.0024,r:10,col:'#9cff71',lab:'✦ CODE'},{rx:.60,ry:.185,sp:.0016,r:12,col:'#ff5d82',lab:'✦ 3D & MOTION'},{rx:.78,ry:.230,sp:.0010,r:14,col:'#c4a6ff',lab:'✦ SYSTEM ARCH'}];
  const spr=(size:number,paint:(g:CanvasRenderingContext2D)=>void)=>{const s=document.createElement('canvas');s.width=s.height=size;const g=s.getContext('2d')!;g.translate(size/2,size/2);paint(g);return s};
  const SUN=200;const sunSprite=spr(SUN*2,(g)=>{const sr=48;const glow=g.createRadialGradient(0,0,0,0,0,sr*3.8);glow.addColorStop(0,'#fff');glow.addColorStop(.2,'#a78fff');glow.addColorStop(.55,'#8e6cff');glow.addColorStop(.85,'rgba(142,108,255,.28)');glow.addColorStop(1,'transparent');g.fillStyle=glow;g.beginPath();g.arc(0,0,sr*3.8,0,6.283);g.fill();const body=g.createRadialGradient(-10,-10,0,0,0,sr);body.addColorStop(0,'#fff');body.addColorStop(.35,'#c4a6ff');body.addColorStop(.75,'#8e6cff');body.addColorStop(1,'#481d9b');g.fillStyle=body;g.beginPath();g.arc(0,0,sr,0,6.283);g.fill();g.font='30px sans-serif';g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.fillText('✦',0,1)});
  const nodeSprites=nodes.map(n=>spr(80,(g)=>{const gr=g.createRadialGradient(0,0,0,0,0,36);gr.addColorStop(0,'#fff');gr.addColorStop(.3,'#fff');gr.addColorStop(.5,n.col);gr.addColorStop(1,'transparent');g.fillStyle=gr;g.beginPath();g.arc(0,0,36,0,6.283);g.fill()}));
  ctx.font='600 10px monospace';const labW=nodes.map(n=>ctx.measureText(n.lab).width);
  const resize=()=>{const d=Math.min(devicePixelRatio,1.5);W=c.parentElement?.clientWidth||innerWidth;H=c.parentElement?.clientHeight||innerHeight;c.width=W*d;c.height=H*d;c.style.width=W+'px';c.style.height=H+'px';ctx.setTransform(d,0,0,d,0,0)};
  const move=(e:MouseEvent)=>{tmx=e.clientX/W;tmy=e.clientY/H};
  let last=0;const draw=(now=0)=>{raf=requestAnimationFrame(draw);if(now-last<22)return;last=now;if(!reduced)t+=1.6;mx+=(tmx-mx)*.03;my+=(tmy-my)*.03;ctx.clearRect(0,0,W,H);const cx=W/2+(mx-.5)*26,cy=H/2+(my-.5)*18;
    for(let i=0;i<nodes.length;i++){const o=nodes[i],rx=W*o.rx,ry=H*o.ry;const iX=Math.sin(t*(.003+i*.0008)+i*2.1)*(26+i*7),iY=Math.cos(t*(.004+i*.0006)+i*1.6)*(14+i*5);const rot=Math.sin(t*(.0025+i*.0005)+i*1.3)*.12+(-.15+Math.cos(t*(.003+i*.0008)+i*.9)*.07);ctx.save();ctx.translate(cx+iX,cy+iY);ctx.rotate(rot);ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,6.283);ctx.strokeStyle=i%2===0?'rgba(142,108,255,.42)':'rgba(167,143,255,.3)';ctx.lineWidth=i===2?2:1.4;ctx.setLineDash(i%2!==0?[12,10]:[]);ctx.stroke();ctx.restore()}
    ctx.setLineDash([]);ctx.save();ctx.translate(cx,cy);
    const ring=(rad:number,sx:number,sy:number,rv:number,col:string,lw:number,dash:number[])=>{ctx.save();ctx.rotate(rv);ctx.scale(sx,sy);ctx.beginPath();ctx.arc(0,0,rad,0,6.283);ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.stroke();ctx.restore()};
    ring(115,1,.35+Math.sin(t*.005)*.05,Math.sin(t*.003)*.14,'rgba(142,108,255,.8)',2.2,[]);
    ring(165,.38+Math.sin(t*.004)*.05,1,.8+Math.cos(t*.0035)*.12,'rgba(167,143,255,.7)',1.6,[14,10]);
    ring(225,1,.42+Math.cos(t*.004)*.06,-.5+Math.sin(t*.0025)*.12,'rgba(196,166,255,.55)',1.8,[8,14]);
    ctx.setLineDash([]);const ss=1+Math.sin(t*.008)*.06;ctx.save();ctx.rotate(Math.sin(t*.003)*.1);ctx.scale(ss,ss);ctx.drawImage(sunSprite,-SUN,-SUN);ctx.restore();ctx.restore();
    for(let index=0;index<nodes.length;index++){const o=nodes[index],rx=W*o.rx,ry=H*o.ry,lw=labW[index];const iX=Math.sin(t*(.003+index*.0008)+index*2.1)*(26+index*7),iY=Math.cos(t*(.004+index*.0006)+index*1.6)*(14+index*5);const rot=Math.sin(t*(.0025+index*.0005)+index*1.3)*.12+(-.15+Math.cos(t*(.003+index*.0008)+index*.9)*.07);const rCx=cx+iX,rCy=cy+iY;const a=t*o.sp+index*1.2566,ux=rx*Math.cos(a),uy=ry*Math.sin(a);const px=rCx+ux*Math.cos(rot)-uy*Math.sin(rot),py=rCy+ux*Math.sin(rot)+uy*Math.cos(rot);const sc=.82+.38*((Math.sin(a)+1)/2),pr=o.r*sc;ctx.save();ctx.translate(px,py);ctx.drawImage(nodeSprites[index],-40,-40);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(0,0,pr*.7,0,6.283);ctx.fill();ctx.font='600 10px monospace';ctx.fillStyle='rgba(5,5,8,.92)';ctx.strokeStyle=o.col;ctx.lineWidth=1.2;ctx.beginPath();ctx.roundRect(-lw/2-8,pr+6,lw+16,20,10);ctx.fill();ctx.stroke();ctx.fillStyle=o.col;ctx.textAlign='center';ctx.fillText(o.lab,0,pr+19);ctx.restore()}
  };resize();draw();addEventListener('resize',resize);addEventListener('pointermove',move,{passive:true});return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('pointermove',move)}},[inView]);return <canvas ref={ref} className="solar-system-canvas" aria-hidden="true"/>}
function PortalCanvas({type,accent}:{type:string;accent:string}){const[canvasRef,inView]=useInView('150px');const isHovered=useRef(false);const entryProgress=useRef(0);useEffect(()=>{if(!inView){entryProgress.current=0;return}const canvas=canvasRef.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;let animId=0,t=0,mx=.5,my=.5;const resize=()=>{canvas.width=canvas.offsetWidth*2;canvas.height=canvas.offsetHeight*2;ctx.setTransform(2,0,0,2,0,0)};resize();const particles=Array.from({length:18},()=>({angle:Math.random()*Math.PI*2,speed:Math.random()*.02+.01,dist:Math.random()*45+15,r:Math.random()*2+1}));const nodes=Array.from({length:6},(_,i)=>({angle:(i/6)*Math.PI*2+Math.random()*.5,dist:20+i*5+Math.random()*6,speed:(Math.random()*.015+.008)*(i%2===0?1:-1),r:3,cx:0,cy:0}));const codeChars=['0','1','<','>','/','{','}',';','=>','Next','SQL','GO','AL'];const streams=Array.from({length:7},(_,i)=>({x:(i+1)*20-75,y:Math.random()*-60,speed:Math.random()*1.5+1,char:codeChars[Math.floor(Math.random()*codeChars.length)]}));let last=0;const draw=(now=0)=>{animId=requestAnimationFrame(draw);if(now-last<24)return;last=now;const w=canvas.offsetWidth,h=canvas.offsetHeight,cx=w/2,cy=h/2;ctx.clearRect(0,0,w,h);if(entryProgress.current<1){entryProgress.current=Math.min(1,entryProgress.current+.04)}const pExp=entryProgress.current;const easeScale=Math.sin(pExp*Math.PI*.5)*(1+Math.sin(pExp*Math.PI)*.2);if(pExp<.95){ctx.save();ctx.beginPath();ctx.arc(cx,cy,pExp*75,0,Math.PI*2);ctx.strokeStyle=accent;ctx.lineWidth=2*(1-pExp);ctx.globalAlpha=(1-pExp)*.7;ctx.shadowBlur=15;ctx.shadowColor=accent;ctx.stroke();ctx.restore()}if(type==='VISUAL'){for(const p of particles){p.angle+=isHovered.current?p.speed*2.5:p.speed;const currentDist=p.dist*easeScale;const px=cx+Math.cos(p.angle)*currentDist+(mx-.5)*12;const py=cy+Math.sin(p.angle)*(currentDist*.5)+(my-.5)*12;ctx.beginPath();ctx.arc(px,py,p.r*(isHovered.current?1.4:1)*easeScale,0,Math.PI*2);ctx.fillStyle=accent;ctx.shadowBlur=isHovered.current?15:5;ctx.shadowColor=accent;ctx.globalAlpha=(isHovered.current?.9:.6)*Math.min(1,pExp*1.5);ctx.fill()}}else if(type==='EXPERIENCE'){ctx.strokeStyle=accent;ctx.lineWidth=1;ctx.shadowBlur=isHovered.current?12:5;ctx.shadowColor=accent;nodes.forEach((n,i)=>{n.angle+=isHovered.current?n.speed*2:n.speed;const currentDist=(n.dist+Math.sin(t*.03+i)*5)*easeScale;n.cx=cx+Math.cos(n.angle)*currentDist+(mx-.5)*14;n.cy=cy+Math.sin(n.angle)*(currentDist*.75)+(my-.5)*14});for(let i=0;i<nodes.length;i++){const n1=nodes[i];for(let j=i+1;j<nodes.length;j++){const n2=nodes[j];const dist=Math.hypot(n1.cx-n2.cx,n1.cy-n2.cy);if(dist<72*easeScale){ctx.beginPath();ctx.moveTo(n1.cx,n1.cy);ctx.lineTo(n2.cx,n2.cy);ctx.globalAlpha=(1-dist/(72*easeScale))*(isHovered.current?.85:.45)*Math.min(1,pExp*1.5);ctx.stroke()}}}nodes.forEach(n=>{ctx.beginPath();ctx.arc(n.cx,n.cy,n.r*easeScale,0,Math.PI*2);ctx.fillStyle=accent;ctx.globalAlpha=.95*Math.min(1,pExp*1.5);ctx.fill()})}else if(type==='CODE'){ctx.font='11px var(--font-mono), monospace';ctx.fillStyle=accent;ctx.shadowBlur=isHovered.current?12:5;ctx.shadowColor=accent;for(const s of streams){s.y+=isHovered.current?s.speed*2:s.speed;if(s.y>h/2+50){s.y=-60;s.char=codeChars[Math.floor(Math.random()*codeChars.length)]}ctx.globalAlpha=(isHovered.current?.95:.65)*Math.min(1,pExp*1.5);ctx.fillText(s.char,cx+s.x*easeScale,cy+s.y)}}ctx.shadowBlur=0;t++};draw();const handlePointer=(e:PointerEvent)=>{const rect=canvas.getBoundingClientRect();mx=(e.clientX-rect.left)/rect.width;my=(e.clientY-rect.top)/rect.height};const parent=canvas.parentElement;if(parent){parent.addEventListener('pointermove',handlePointer);parent.addEventListener('mouseenter',()=>(isHovered.current=true));parent.addEventListener('mouseleave',()=>(isHovered.current=false))}return()=>{cancelAnimationFrame(animId);if(parent)parent.removeEventListener('pointermove',handlePointer)}},[type,accent,inView,canvasRef]);return <canvas ref={canvasRef} className="portal-canvas" aria-hidden="true"/>}

function BlackHoleCanvas({isWarping=false}:{isWarping?:boolean}){const[canvasRef,inView]=useInView('200px');const isHovered=useRef(false);const entryProgress=useRef(0);const warpProgress=useRef(0);useEffect(()=>{if(!inView){entryProgress.current=0;return}const canvas=canvasRef.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;let animId=0,t=0;let idleTimer:NodeJS.Timeout|null=null;let isIdlePulled=false;let pullProgress=0;let startX=0,startY=0;const resize=()=>{const parent=canvas.parentElement;const w=canvas.offsetWidth||parent?.offsetWidth||innerWidth;const h=canvas.offsetHeight||parent?.offsetHeight||innerHeight;const d=Math.min(devicePixelRatio,1.25);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)};resize();const particles=Array.from({length:75},()=>({r:Math.random()*580+160,angle:Math.random()*Math.PI*2,speed:Math.random()*.008+.0025,size:Math.random()*2.2+.8,alpha:Math.random()*.3+.06,hue:Math.random()<.75?'#8e6cff':'#c4b5ff'}));let last=0;const draw=(now=0)=>{animId=requestAnimationFrame(draw);if(now-last<16)return;last=now;const w=canvas.offsetWidth||innerWidth;const h=canvas.offsetHeight||innerHeight;let cx=w/2,cy=h/2;const section=canvas.closest('.contact') as HTMLElement;const wrap=section?.querySelector('.contact-content-wrap');if(wrap&&section){const wrapRect=wrap.getBoundingClientRect();const sectionRect=section.getBoundingClientRect();if(sectionRect.height>0&&wrapRect.height>0){cx=(wrapRect.left-sectionRect.left)+wrapRect.width/2;cy=(wrapRect.top-sectionRect.top)+wrapRect.height/2}}ctx.clearRect(0,0,w,h);if(isWarping){warpProgress.current=Math.min(1,warpProgress.current+.05)}else{warpProgress.current=Math.max(0,warpProgress.current-.04)}const wp=warpProgress.current;if(entryProgress.current<1){entryProgress.current=Math.min(1,entryProgress.current+.02)}const pExp=entryProgress.current;const easeScale=Math.sin(pExp*Math.PI*.5)*(1+Math.sin(pExp*Math.PI)*.25)*(1+wp*1.2);const bhX=cx,bhY=cy;const rs=Math.min(1,Math.max(.4,w/1100));const outerR=880*easeScale*rs,midR=640*easeScale*rs,innerR=440*easeScale*rs;if(pExp<.98||wp>0){const shockR=pExp*950+wp*1100;const shockAlpha=Math.max(0,(1-pExp)*.7)+wp*.8;ctx.save();ctx.beginPath();ctx.arc(bhX,bhY,shockR,0,Math.PI*2);ctx.strokeStyle=`rgba(196,166,255,${shockAlpha})`;ctx.lineWidth=3*(1-pExp)+wp*10;ctx.stroke();ctx.beginPath();ctx.arc(bhX,bhY,Math.max(1,(1-pExp)*250+wp*450),0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${shockAlpha*.6})`;ctx.fill();ctx.restore()}ctx.save();ctx.translate(bhX,bhY);ctx.scale(1,.42);if(easeScale>.05){ctx.beginPath();ctx.arc(0,0,outerR,0,Math.PI*2);ctx.strokeStyle='rgba(142,108,255,0.08)';ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.arc(0,0,midR,0,Math.PI*2);ctx.strokeStyle='rgba(167,143,255,0.12)';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(0,0,innerR,0,Math.PI*2);ctx.strokeStyle='rgba(196,166,255,0.18)';ctx.lineWidth=2.2;ctx.stroke()}for(const p of particles){const currentSpeed=p.speed*(1+(outerR-p.r)/300)*(isHovered.current?1.4:1)*(1+wp*10);p.angle+=currentSpeed;p.r-=.4+wp*12;if(p.r<80){p.r=Math.random()*150+550;p.angle=Math.random()*Math.PI*2}const renderR=p.r*easeScale*rs;const px=Math.cos(p.angle)*renderR,py=Math.sin(p.angle)*renderR;const pAlpha=Math.max(0,Math.min(1,(p.r-80)/250))*p.alpha*Math.min(1,pExp*1.5)*(1+wp*.8);ctx.beginPath();ctx.arc(px,py,p.size*Math.min(2.2,pExp*1.2+wp*1.8),0,Math.PI*2);ctx.fillStyle=wp>.3?'#ffffff':p.hue;ctx.globalAlpha=pAlpha;ctx.fill()}if(wp>.05){ctx.strokeStyle=`rgba(228,227,238,${wp*.8})`;ctx.lineWidth=1.5+wp*2.5;ctx.beginPath();for(let i=0;i<20;i++){const a=(i/20)*Math.PI*2+t*.04;const r1=90+wp*140;const r2=r1+120+wp*380;ctx.moveTo(Math.cos(a)*r1,Math.sin(a)*r1);ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2)}ctx.stroke()}ctx.restore();const eventRadius=410*easeScale*rs*(1+wp*3.5);if(eventRadius>2){const glowGrad=ctx.createRadialGradient(bhX,bhY,eventRadius*.3,bhX,bhY,eventRadius*3);glowGrad.addColorStop(0,isHovered.current||wp>.2?'rgba(142,108,255,0.55)':'rgba(142,108,255,0.22)');glowGrad.addColorStop(.3,'rgba(167,143,255,0.18)');glowGrad.addColorStop(.65,'rgba(74,40,167,0.05)');glowGrad.addColorStop(1,'rgba(5,5,5,0)');ctx.beginPath();ctx.arc(bhX,bhY,eventRadius*3,0,Math.PI*2);ctx.fillStyle=glowGrad;ctx.globalAlpha=Math.min(1,pExp*1.2+wp*.5);ctx.fill();ctx.beginPath();ctx.arc(bhX,bhY,eventRadius+2.5,0,Math.PI*2);ctx.strokeStyle=isHovered.current||wp>.2?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.3)';ctx.lineWidth=2+wp*3;ctx.stroke();ctx.beginPath();ctx.arc(bhX,bhY,eventRadius,0,Math.PI*2);ctx.fillStyle='rgba(5,5,5,0.92)';ctx.fill()}if(isIdlePulled){pullProgress=Math.min(1,pullProgress+.006);const easeP=Math.pow(pullProgress,1.8);const currentDistScale=1-easeP;const btnEl=section?.querySelector('.contact-button') as HTMLElement;let targetBhX=bhX,targetBhY=bhY;if(btnEl&&section){const bR=btnEl.getBoundingClientRect();const sR=section.getBoundingClientRect();targetBhX=(bR.left-sR.left)+bR.width/2;targetBhY=(bR.top-sR.top)+bR.height/2;}const dx=startX-targetBhX;const dy=startY-targetBhY;const rot=pullProgress*Math.PI*4.5;const curX=targetBhX+(dx*Math.cos(rot)-dy*Math.sin(rot))*currentDistScale;const curY=targetBhY+(dy*Math.cos(rot)+dx*Math.sin(rot))*currentDistScale;ctx.save();ctx.beginPath();ctx.arc(curX,curY,14*(1-easeP*.3),0,Math.PI*2);ctx.strokeStyle=`rgba(196,166,255,${Math.min(1,pullProgress*3)})`;ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.arc(curX,curY,6*(1-easeP*.2),0,Math.PI*2);ctx.fillStyle='#ffffff';ctx.shadowColor='#a78fff';ctx.shadowBlur=20;ctx.fill();for(let k=1;k<=8;k++){const tailP=Math.max(0,pullProgress-k*.018);const tailEase=Math.pow(tailP,1.8);const tailDistScale=1-tailEase;const tailRot=tailP*Math.PI*4.5;const tx=targetBhX+(dx*Math.cos(tailRot)-dy*Math.sin(tailRot))*tailDistScale;const ty=targetBhY+(dy*Math.cos(tailRot)+dx*Math.sin(tailRot))*tailDistScale;ctx.beginPath();ctx.arc(tx,ty,Math.max(1,5-k*.5),0,Math.PI*2);ctx.fillStyle=`rgba(167,143,255,${(1-k/9)*.6})`;ctx.fill()}ctx.restore();if(pullProgress>.88){isHovered.current=true;}}t++};draw();const handleMove=(e:MouseEvent)=>{const section=canvas.closest('.contact') as HTMLElement;if(section){const sR=section.getBoundingClientRect();startX=e.clientX-sR.left;startY=e.clientY-sR.top;if(isIdlePulled){isIdlePulled=false;pullProgress=0;section.style.cursor='';}if(idleTimer)clearTimeout(idleTimer);idleTimer=setTimeout(()=>{isIdlePulled=true;section.style.cursor='none';},750);const btn=section.querySelector('.contact-button') as HTMLElement;if(btn){const btnRect=btn.getBoundingClientRect();const btnCx=btnRect.left+btnRect.width/2;const btnCy=btnRect.top+btnRect.height/2;const dist=Math.hypot(e.clientX-btnCx,e.clientY-btnCy);if(dist<180){isHovered.current=true;}else if(!isIdlePulled){isHovered.current=false;}}}};const handleLeave=()=>{const section=canvas.closest('.contact') as HTMLElement;if(section)section.style.cursor='';isIdlePulled=false;pullProgress=0;if(idleTimer)clearTimeout(idleTimer);};const section=canvas.closest('.contact') as HTMLElement;if(section){section.addEventListener('mousemove',handleMove as EventListener);section.addEventListener('mouseleave',handleLeave as EventListener);const btn=section.querySelector('.contact-button');if(btn){btn.addEventListener('mouseenter',()=>(isHovered.current=true));btn.addEventListener('mouseleave',()=>(isHovered.current=false))}}const ro=new ResizeObserver(resize);ro.observe(canvas);window.addEventListener('resize',resize);return()=>{cancelAnimationFrame(animId);if(idleTimer)clearTimeout(idleTimer);ro.disconnect();window.removeEventListener('resize',resize);if(section){section.style.cursor='';section.removeEventListener('mousemove',handleMove as EventListener);section.removeEventListener('mouseleave',handleLeave as EventListener);}}},[inView,canvasRef,isWarping]);return <canvas ref={canvasRef} className="black-hole-canvas" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1}} aria-hidden="true"/>}

function RevealBurst({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){const ref=useRef<HTMLDivElement>(null);const[active,setActive]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setActive(true)}},{rootMargin:'0px 0px -40px 0px',threshold:.08});io.observe(el);return()=>io.disconnect()},[]);return <div ref={ref} className={`supernova-reveal ${active?'active':''} ${className}`} style={{transitionDelay:`${delay}s`,position:'relative',zIndex:10}}>{children}</div>}

function renderProjectTitle(title: string) {
  if (title.endsWith('+')) {
    const base = title.slice(0, -1).trim();
    const words = base.split(' ');
    if (words.length > 1) {
      const firstPart = words.slice(0, -1).join(' ');
      const lastWord = words[words.length - 1];
      return (
        <span className="clean-project-title">
          {firstPart}{' '}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {lastWord}<span className="accent-plus">+</span>
          </span>
        </span>
      );
    }
    return (
      <span className="clean-project-title" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {base}<span className="accent-plus">+</span>
      </span>
    );
  }
  return <span className="clean-project-title">{title}</span>;
}

export default function Home(){const t=useT();const{lang}=useLang();const[active,setActive]=useState('origin');const[progress,setProgress]=useState(0);const[filter,setFilter]=useState('ALL');const[contactOpen,setContactOpen]=useState(false);const[isWarping,setIsWarping]=useState(false);const[toastMsg,setToastMsg]=useState('');const[formState,setFormState]=useState({name:'',email:'',message:''});const[sentStatus,setSentStatus]=useState(false);const[quickProj,setQuickProj]=useState<any>(null);const[timeStr,setTimeStr]=useState('');
const filtered=useMemo(()=>filter==='ALL'?archive:archive.filter(p=>p[2]===filter),[filter]);
const filterCounts=useMemo(()=>{const c:Record<string,number>={ALL:archive.length,DESIGN:0,'UX/UI':0,CODE:0,'3D':0};archive.forEach(a=>{const cat=a[2];if(c[cat]!==undefined)c[cat]++;});return c;},[]);
const normKey=(s:string)=>s.toLowerCase().replace(/plus|\+/g,'+').replace(/[^a-z0-9+]/g,'');

const allModalProjects=useMemo(()=>{
  const featuredKeys=projects.map(p=>normKey(p.title));
  const remainingArchive=archive.filter(item=>!featuredKeys.includes(normKey(item[1])));
  const formattedArchive=remainingArchive.map(item=>{
    const slug=item[5].replace('/work/','');
    const matchedWork=workProjects.find(w=>normKey(w.slug)===normKey(slug)||normKey(w.title)===normKey(item[1]));
    const itemAccent=matchedWork?.accent||(item[2]==='3D'?'#c084fc':item[2]==='UX/UI'?'#38bdf8':item[2]==='CODE'?'#9cff71':'#f43f5e');
    return{title:item[1],kind:item[2]==='CODE'?'FULL-STACK DEVELOPMENT':item[2]==='3D'?'3D MODELING & ART':item[2]==='UX/UI'?'UX/UI DESIGN':'GRAPHIC & BRAND DESIGN',outcome:item[3],role:item[3],year:item[0],tools:item[4],accent:itemAccent,href:item[5],isFeatured:false};
  });
  const featuredModalProjs=projects.map(p=>{
    const slug=p.href.replace('/work/','');
    const matchedWork=workProjects.find(w=>normKey(w.slug)===normKey(slug)||normKey(w.title)===normKey(p.title));
    return{...p,accent:matchedWork?.accent||p.accent,isFeatured:true};
  });
  return [...featuredModalProjs,...formattedArchive].map((item,i)=>({...item,n:i<9?`0${i+1}`:`${i+1}`}));
},[]);
const currentIdx=quickProj?allModalProjects.findIndex(p=>normKey(p.title)===normKey(quickProj.title)):-1;
const handlePrevProj=()=>{if(currentIdx>0)setQuickProj(allModalProjects[currentIdx-1]);else setQuickProj(allModalProjects[allModalProjects.length-1]);};
const handleNextProj=()=>{if(currentIdx>=0&&currentIdx<allModalProjects.length-1)setQuickProj(allModalProjects[currentIdx+1]);else setQuickProj(allModalProjects[0]);};
useEffect(()=>{const update=()=>{const now=new Date();const fmt=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}).format(now);setTimeStr(`${fmt} (UTC+7)`);};update();const timer=setInterval(update,1000);return()=>clearInterval(timer);},[]);
useEffect(()=>{const handleKeyDown=(e:KeyboardEvent)=>{if(e.key==='Escape'){setContactOpen(false);setQuickProj(null);}if(quickProj){if(e.key==='ArrowLeft')handlePrevProj();if(e.key==='ArrowRight')handleNextProj();}};window.addEventListener('keydown',handleKeyDown);return()=>window.removeEventListener('keydown',handleKeyDown);},[quickProj,currentIdx]);
const showToast=(msg:string)=>{setToastMsg(msg);setTimeout(()=>setToastMsg(''),3500);};const copyEmail=(e?:React.MouseEvent)=>{if(e)e.preventDefault();navigator.clipboard.writeText('zephyrxzep@gmail.com');showToast(t('toast_copied'));};const handleStartProject=()=>{setIsWarping(true);showToast('🕳️ WARP DRIVE: SINGULARITY ENTRY ENGAGED');setTimeout(()=>{setContactOpen(true);setIsWarping(false);},420);};const handleSubmit=async(e:React.FormEvent)=>{e.preventDefault();setSentStatus(true);const accessKey=process.env.NEXT_PUBLIC_WEB3FORMS_KEY||'e37912b4-8540-46f6-8324-b6c7e89c7dec';try{const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:accessKey,name:formState.name,email:formState.email,message:formState.message,subject:`✦ Portfolio Project Inquiry from ${formState.name}`,from_name:formState.name})});const data=await res.json();if(data.success||res.ok){showToast('✓ ส่งข้อความเข้าอีเมลเรียบร้อยแล้ว!');setFormState({name:'',email:'',message:''});}else{showToast('❌ เกิดข้อผิดพลาดในการส่งข้อความ');}}catch{showToast('❌ ไม่สามารถส่งข้อความได้ กรุณาตรวจสอบอินเทอร์เน็ต');}finally{setSentStatus(false);setContactOpen(false);}};useEffect(()=>{let guardUntil=0;const scroll=()=>{setProgress(Math.min(100,scrollY/(document.documentElement.scrollHeight-innerHeight)*100));let current='origin';for(const[id]of sections){const e=document.getElementById(id);if(e&&e.getBoundingClientRect().top<innerHeight*.48)current=id}setActive(current);history.replaceState(null,'','#'+current);if(Date.now()>guardUntil){try{sessionStorage.setItem('home:y',String(Math.round(scrollY)))}catch{}}};try{const y=+(sessionStorage.getItem('home:y')||0);const ts=+(sessionStorage.getItem('home:restore')||0);if(y>0&&(Date.now()-ts<8000||document.referrer.includes('/work/'))){guardUntil=Date.now()+600;const r=()=>scrollTo({top:y,behavior:'auto'});r();requestAnimationFrame(r);setTimeout(r,60);setTimeout(r,200);setTimeout(r,400)}sessionStorage.removeItem('home:restore')}catch{}scroll();addEventListener('scroll',scroll,{passive:true});const heroEl=document.getElementById('origin');const hio=heroEl?new IntersectionObserver(([e])=>document.body.classList.toggle('hero-out',!e.isIntersecting),{rootMargin:'80px'}):null;if(heroEl&&hio)hio.observe(heroEl);return()=>{removeEventListener('scroll',scroll);hio?.disconnect();document.body.classList.remove('hero-out')}},[]);return <main>
  <Universe/><div className="noise" aria-hidden="true"/>
  <header className="topbar"><BrandMark href="#origin" label="Punnathat Samoprong — home" onClick={()=>showToast('✦ NOVA CORE: SINGULARITY ENGAGED')}/><nav className="topbar-constellation" aria-label="Constellation Navigation">{sections.map(([id,label],i)=>{const isActive=active===id;return <a key={id} href={'#'+id} className={`topbar-star-node ${isActive?'active':''}`} title={`0${i} ${label}`} aria-current={isActive?'location':undefined}><span className="star-icon">✦</span></a>;})}</nav><div className="topbar-actions"><LangToggle/></div></header>
  <section id="origin" className="hero section hero-centered"><SolarSystemCanvas/><div className="coordinates">13.7563° N<br/>100.5018° E</div><div className="hero-copy hero-copy-centered"><div className="hero-eyebrow-capsule"><span className="eyebrow-dot" aria-hidden="true"/><p className="eyebrow">{t('hero_eyebrow')}</p></div><h1><span className="h1-line">{t('hero_h1_a')}</span><span className="h1-line">{t('hero_h1_b')} <em>{t('hero_h1_em')}</em></span></h1><div className="hero-meta-centered"><p>{t('hero_meta')}</p></div><div className="actions actions-centered"><a className="button primary" href="#work">{t('hero_cta_explore')} <ArrowDownRight className="ico" aria-hidden="true"/></a><a className="button" href="/Punnathat_Samoprong_Resume.pdf" download>{t('hero_cta_resume')} <Download className="ico" aria-hidden="true"/></a></div></div><div className="scroll-cue"><span>{t('hero_scroll_cue')}</span><i/></div></section>
  <section id="identity" className="identity section"><div className="section-index"><span>01</span><p>{t('sec_identity')}</p></div><RevealBurst delay={0.1}><div className="portrait-wrap interactive-portrait" onClick={()=>showToast('✦ PUNNATHAT SAMOPRONG: CREATIVE TECHNOLOGIST [AUTHENTICATED]')}><div className="portrait-frame"><Image src="/profile.png" alt="Portrait of Punnathat Samoprong" fill sizes="(max-width:800px) 82vw,38vw" priority/></div></div></RevealBurst><RevealBurst delay={0.25}><div className="identity-copy"><p className="eyebrow">{t('id_eyebrow')}</p><h2>{t('id_h2_a')} <em>{t('id_h2_em')}</em></h2><p className="lead">{t('id_lead')}</p><div className="identity-meta"><span style={{display:'inline-flex',alignItems:'center'}}><ThaiFlag/>{t('id_meta_location')} {timeStr && <b style={{fontWeight:400,opacity:.75,marginLeft:'8px',fontFamily:'var(--font-mono)',fontSize:'11px'}}>• {timeStr}</b>}</span><span className="identity-available"><i/>{t('id_meta_available')}</span><a href="/Punnathat_Samoprong_Resume.pdf" download>{t('id_resume')} <b>↓</b></a></div><div className="keywords"><span className="keyword-tag"><i>✦</i> {t('kw_fullstack')}</span><span className="keyword-tag"><i>✦</i> {t('kw_erp')}</span><span className="keyword-tag"><i>✦</i> {t('kw_uxui')}</span><span className="keyword-tag"><i>✦</i> {t('kw_ct')}</span></div></div></RevealBurst></section>
  <section id="experience" className="experience section"><div className="section-index"><span>02</span><p>{t('sec_experience')}</p></div><RevealBurst delay={0}><div className="trajectory-heading"><p className="eyebrow">{t('exp_eyebrow')}</p><h2>{t('exp_h2_a')} <em>{t('exp_h2_em')}</em></h2><p>{t('exp_intro')}</p></div></RevealBurst><RevealBurst delay={0.12}><TrajectoryField/></RevealBurst></section>
  <section id="capabilities" className="capabilities section"><div className="section-index"><span>03</span><p>{t('sec_capabilities')}</p></div><RevealBurst delay={0}><div className="section-heading"><p className="eyebrow">{t('cap_eyebrow')}</p><h2>{t('cap_h2_a')} <em>{t('cap_h2_em')}</em></h2></div></RevealBurst><div className="portals">{[
      {title:'VISUAL',accent:'#ff5d82',filter:'DESIGN',skills:'Brand identity|Graphic design|Campaign artwork|Typography|Motion & 3D',tools:['PS','AI','AE','BLENDER']},
      {title:'EXPERIENCE',accent:'#5596ff',filter:'UX/UI',skills:'UX research|Information architecture|Wireframes|Prototypes|Design systems',tools:['FIGMA','MIRO','PROTOTYPING']},
      {title:'CODE',accent:'#a8ff60',filter:'CODE',skills:'Next.js & React|Supabase & SQL|Go & distributed systems|ERP / AL Language|Performance & accessibility',tools:['TYPESCRIPT','GO','AL','SQL']}
    ].map((p,i)=>{const label=t(({VISUAL:'cap_visual',EXPERIENCE:'cap_experience',CODE:'cap_code'} as const)[p.title as 'VISUAL'|'EXPERIENCE'|'CODE']);const skills=t(({VISUAL:'sk_visual',EXPERIENCE:'sk_experience',CODE:'sk_code'} as const)[p.title as 'VISUAL'|'EXPERIENCE'|'CODE']);return <RevealBurst key={p.title} delay={i*.16}><article className="portal" style={{'--accent':p.accent} as React.CSSProperties} onClick={()=>{setFilter(p.filter);showToast(t('toast_filtered').replace('{X}',label));const el=document.getElementById('archive');if(el)el.scrollIntoView({behavior:'smooth'})}}><span className="portal-num">0{i+1}</span><div className="portal-ring"><PortalCanvas type={p.title} accent={p.accent}/><i/><i/><span><ArrowUpRight className="ico" aria-hidden="true"/></span></div><h3>{label}</h3><ul>{skills.split('|').map(x=><li key={x}><span className="bullet">✦</span>{x}</li>)}</ul><div className="portal-tools-wrap">{p.tools.map(tool=><span className="tech-pill" key={tool} onClick={(e)=>{e.stopPropagation();setFilter(p.filter);showToast(t('toast_filtered_tool').replace('{X}',tool));const el=document.getElementById('archive');if(el)el.scrollIntoView({behavior:'smooth'})}}>{tool}</span>)}</div><div className="portal-cta-tag"><span>{t('cap_explore_missions').replace('{X}',label)}</span><b><ArrowUpRight className="ico" aria-hidden="true"/></b></div></article></RevealBurst>;})}</div></section>
  <section id="work" className="work section"><div className="section-index"><span>04</span><p>{t('sec_work')}</p></div><RevealBurst delay={0}><div className="section-heading"><p className="eyebrow">{t('work_eyebrow')}</p><h2>{t('work_h2_a')} <em>{t('work_h2_em')}</em></h2></div></RevealBurst><div className="projects">{projects.map((p,i)=><RevealBurst key={p.title} delay={i*.15}><article className={`project ${i % 2 !== 0 ? 'even' : ''}`} style={{'--accent':p.accent} as React.CSSProperties}><div className="project-visual"><Link className="project-floating-frame" href={p.href} aria-label={`Open ${p.title}`}><div className="project-glow-sphere"/><span className="project-sigil-float" aria-hidden="true"><i className="orbit orbit-a"/><i className="orbit orbit-b"/><i className="orbit orbit-c"/><span className="sigil-star">✦</span><span className="satellite satellite-a"/><span className="satellite satellite-b"/><span className="satellite satellite-c"/></span></Link></div><div className="project-copy"><span className="project-num-watermark" aria-hidden="true">{p.n}</span><p className="eyebrow">{homeProj(lang,p.title,'kind',p.kind)}</p><h3>{renderProjectTitle(p.title)}</h3><p>{homeProj(lang,p.title,'outcome',p.outcome)}</p><dl><div><dt>{t('fld_role')}</dt><dd>{homeProj(lang,p.title,'role',p.role)}</dd></div><div><dt>{t('fld_year')}</dt><dd>{p.year}</dd></div><div><dt>{t('fld_tools')}</dt><dd>{p.tools}</dd></div></dl><div style={{display:'flex',gap:'14px',alignItems:'center',flexWrap:'wrap'}}><button className="button" onClick={()=>setQuickProj(p)}>QUICK VIEW ✦</button><Link className="project-link-float" style={{marginTop:0}} href={p.href}>{t('work_cta')} <ArrowUpRight className="ico" aria-hidden="true"/></Link></div></div></article></RevealBurst>)}</div></section>
  <section id="archive" className="archive section"><div className="section-index"><span>05</span><p>{t('sec_archive')}</p></div><RevealBurst delay={0}><div className="section-heading archive-head"><div><p className="eyebrow">{t('arc_eyebrow')}</p><h2>{t('arc_h2_a')} <em>{t('arc_h2_em')}</em></h2></div><div className="filters" role="group" aria-label="Filter projects">{(['ALL','DESIGN','UX/UI','CODE','3D'] as const).map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{t(({'ALL':'flt_all','DESIGN':'flt_design','UX/UI':'flt_uxui','CODE':'flt_code','3D':'flt_3d'} as const)[f])} <span className="filter-count-badge">({filterCounts[f] || 0})</span></button>)}</div></div></RevealBurst><RevealBurst delay={0.15}><div className="archive-list">{filtered.map(p=>{const modalData=allModalProjects.find(m=>normKey(m.title)===normKey(p[1]));const isFeatured=modalData?.isFeatured;return <div className="archive-row" key={p[1]} style={{cursor:'pointer'}} onClick={()=>modalData&&setQuickProj(modalData)}><span>{p[0]}</span><strong>{p[1]} {isFeatured && <NovaStar style={{color:modalData?.accent||'#8e6cff'}}/>}</strong><span>{homeArchCat(lang,p[2])}</span><span>{homeArchDesc(lang,p[1],p[3])}</span><span>{p[4]}</span><b><ArrowUpRight className="ico" aria-hidden="true"/></b></div>;})}</div></RevealBurst></section>
  <section id="contact" className="contact section" style={{position:'relative',isolation:'isolate'}}><BlackHoleCanvas isWarping={isWarping}/><RevealBurst delay={0.15}><div className={`contact-content-wrap ${isWarping || contactOpen ? 'warped-sucked' : ''}`}><p className="eyebrow">{t('ct_eyebrow')}</p><h2><span className="contact-h2-line">{t('ct_h2_a')}</span> <em>{t('ct_h2_em')}</em></h2><p>{t('ct_body')}</p><button className="contact-button" onClick={handleStartProject}><span>{t('ct_start')}</span><b><ArrowUpRight className="ico" aria-hidden="true"/></b></button><div className="contact-details"><button style={{background:'none',border:'none',color:'inherit',font:'inherit',cursor:'pointer'}} onClick={copyEmail}>zephyrxzep@gmail.com</button><a href="tel:+66987070173">+66 098-707-0173</a></div></div></RevealBurst><footer><span>© 2026 PUNNATHAT SAMOPRONG</span><div><button style={{background:'none',border:'none',color:'inherit',font:'inherit',cursor:'pointer'}} onClick={copyEmail}>{t('ft_email')}</button><a href="https://www.linkedin.com/in/punnathat-samoprong/" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://github.com/ZXzep" target="_blank" rel="noreferrer">GITHUB</a><a href="/Punnathat_Samoprong_Resume.pdf" download>{t('ft_resume')}</a></div><span style={{display:'inline-flex',alignItems:'center'}}><ThaiFlag/>{lang==='th'?'กรุงเทพฯ':'BANGKOK'} <span style={{margin:'0 6px',opacity:.5}}>/</span> <Globe style={{width:'13px',height:'13px',color:'#8e6cff',marginRight:'4px'}} aria-hidden="true"/>{lang==='th'?'ทั่วโลก':'WORLDWIDE'}</span></footer></section>

 {quickProj && (
  <div className="qv-modal-backdrop" onClick={(e)=>e.target===e.currentTarget&&setQuickProj(null)}>
   <div className="qv-modal-card" style={{'--accent':quickProj.accent} as React.CSSProperties} role="dialog" aria-modal="true">
    <button className="qv-close-btn" onClick={()=>setQuickProj(null)} aria-label="Close modal"><X className="ico" aria-hidden="true"/></button>
    <div className="qv-header">
     <p className="eyebrow" style={{color:'var(--accent, #a78fff)'}}>{quickProj.n} / {allModalProjects.length} • {homeProj(lang,quickProj.title,'kind',quickProj.kind)}</p>
     <h3>{renderProjectTitle(quickProj.title)} {quickProj.isFeatured && <NovaStar style={{color:'var(--accent, #a78fff)',width:'16px',height:'18px',marginLeft:'6px'}}/>}</h3>
    </div>
    <div className="qv-body">
     <p>{homeProj(lang,quickProj.title,'outcome',quickProj.outcome)}</p>
     <dl className="qv-grid">
      <div><dt>{t('fld_role')}</dt><dd>{homeProj(lang,quickProj.title,'role',quickProj.role)}</dd></div>
      <div><dt>{t('fld_year')}</dt><dd>{quickProj.year}</dd></div>
      <div><dt>{t('fld_tools')}</dt><dd>{quickProj.tools}</dd></div>
     </dl>
     <div className="qv-actions">
      <Link className="project-link-float" style={{marginTop:0}} href={quickProj.href} onClick={()=>setQuickProj(null)}>{t('work_cta')} <ArrowUpRight className="ico" aria-hidden="true"/></Link>
     </div>
    </div>
   </div>
  </div>
 )}

 {contactOpen && (
  <div className="modal-overlay" onClick={(e)=>e.target===e.currentTarget&&setContactOpen(false)}>
   <div className="singularity-core-bg" aria-hidden="true"/>
   <div className="modal-card celestial-portal" role="dialog" aria-modal="true">
    <button className="modal-close" onClick={()=>setContactOpen(false)} aria-label="Close modal"><X className="ico" aria-hidden="true"/></button>
    <div className="modal-header">
     <p className="eyebrow">{t('md_badge')}</p>
     <h3>{t('md_h3_a')} <em>{t('md_h3_em')}</em></h3>
     <p className="lead">{t('md_intro')}</p>
    </div>
    <div className="modal-quick-actions">
     <a className="modal-action-card" href="mailto:zephyrxzep@gmail.com">
      <span className="action-title">{t('md_open_mail')}</span>
      <span className="action-value">zephyrxzep@gmail.com <ArrowUpRight className="ico" aria-hidden="true"/></span>
     </a>
     <a className="modal-action-card" href="tel:+66987070173">
      <span className="action-title">{t('md_call')}</span>
      <span className="action-value">+66 098-707-0173 <ArrowUpRight className="ico" aria-hidden="true"/></span>
     </a>
    </div>
    <div className="modal-divider"><span>{t('md_divider')}</span></div>
    <form className="modal-form" onSubmit={handleSubmit}>
     <div className="modal-input-group">
      <label>{t('md_label_name')}</label>
      <input type="text" placeholder={t('md_ph_name')} required value={formState.name} onChange={(e)=>setFormState({...formState,name:e.target.value})}/>
     </div>
     <div className="modal-input-group">
      <label>{t('md_label_email')}</label>
      <input type="email" placeholder={t('md_ph_email')} required value={formState.email} onChange={(e)=>setFormState({...formState,email:e.target.value})}/>
     </div>
     <div className="modal-input-group">
      <label>{t('md_label_msg')}</label>
      <textarea placeholder={t('md_ph_msg')} required value={formState.message} onChange={(e)=>setFormState({...formState,message:e.target.value})}/>
     </div>
     <button type="submit" className="modal-submit-btn">{sentStatus?t('md_sending'):<>{t('md_send')} <ArrowUpRight className="ico" aria-hidden="true"/></>}</button>
    </form>
   </div>
  </div>
 )}

 {toastMsg && <div className="toast-notice">{toastMsg}</div>}
 </main>}
