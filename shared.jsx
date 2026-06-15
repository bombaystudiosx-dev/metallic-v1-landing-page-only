/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;

/* =========================================================
   ICONS
   ========================================================= */
const I = {
  chat: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3.5h10v7H7.5L4 14v-3.5H3z" /></svg>,
  code: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 5 2 8l3 3M11 5l3 3-3 3M9 3l-2 10" /></svg>,
  hub: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2.5" y="2.5" width="4" height="4" /><rect x="9.5" y="2.5" width="4" height="4" /><rect x="2.5" y="9.5" width="4" height="4" /><rect x="9.5" y="9.5" width="4" height="4" /></svg>,
  api: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 8h4M10 8h4M8 2v4M8 10v4M5 5l2 2M9 9l2 2M11 5l-2 2M7 9l-2 2" /></svg>,
  agent: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="8" r="2.5" /><circle cx="8" cy="8" r="5.5" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2" /></svg>,
  ide: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1.5" y="3" width="13" height="10" /><path d="M1.5 6.5h13" /><path d="M5 9.5l1.5 1.5L5 12" /><path d="M8.5 12h3" /></svg>,
  modes: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2l2 4h4l-3 2.5 1 4L8 10l-4 2.5 1-4L2 6h4z" /></svg>,
  models: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="4" cy="8" r="2" /><circle cx="12" cy="4" r="2" /><circle cx="12" cy="12" r="2" /><path d="M6 8h4M6 7.5L10 4M6 8.5L10 12" /></svg>,
  dev: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1.5 4h13v9H1.5zM1.5 6.5h13" /><path d="M4 9.5l1 1-1 1" /><path d="M7.5 11h3" /></svg>,
  price: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v12M5 4.5h4.5a2 2 0 0 1 0 4H5M5 8.5h5a2 2 0 0 1 0 4H5" /></svg>,
  home: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 7.5 8 2l6 5.5V14H10.5v-4h-5v4H2z" /></svg>,
  folder: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 4.5h4l1.5 2H14v6H2z" /></svg>,
  snap: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="8" r="5.5" /><path d="M8 5.5V8l2 2" /></svg>,
  arrow: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>,
  plus: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3v10M3 8h10" /></svg>,
  check: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m3 8 3.5 3.5L13 5" /></svg>,
  x: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4l8 8M12 4l-8 8" /></svg>,
  send: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m2 8 12-5-5 12-2-5z" /></svg>,
  lock: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3.5" y="7.5" width="9" height="6" /><path d="M5.5 7.5V5a2.5 2.5 0 0 1 5 0v2.5" /></svg>,
  ext: () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6.5 3H3v10h10V9.5M9 3h4v4M13 3 7 9" /></svg>
};

/* =========================================================
   BRAND MARK
   ========================================================= */
function BrandMark({ size = 24 }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden>
      <defs>
        <linearGradient id="bm1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d0dae6" />
          <stop offset="55%" stopColor="#5a6878" />
          <stop offset="100%" stopColor="#1a2030" />
        </linearGradient>
        <linearGradient id="bm2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <filter id="bmglow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M22 3 L40 38 H4 Z" fill="url(#bm1)" stroke="#2a3848" strokeWidth="0.8" />
      <path d="M13 30 L22 15 L31 30 L26.5 30 L22 22 L17.5 30 Z" fill="#04080f" stroke="#34d399" strokeWidth="0.7" filter="url(#bmglow)" opacity="0.95" />
      <line x1="4" y1="38" x2="40" y2="38" stroke="url(#bm2)" strokeWidth="1.4" />
    </svg>);

}

/* =========================================================
   NAV STRUCTURE
   ========================================================= */
const NAV_LINKS = [
{ href: "index.html", label: "Home", icon: "home" },
{ href: "index.html?section=products", label: "Products", icon: "folder" },
{ href: "index.html?section=about", label: "About", icon: "agent" },
{ href: "index.html?section=contact", label: "Contact", icon: "send" }];


/* =========================================================
   TOP NAV
   ========================================================= */
function TopNav({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topnav">
      <div className="topnav-inner">
        <a className="brand" href="index.html">
          <BrandMark size={22} />
          METALLIC
          <span className="v1-tag">.V1</span>
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((l) =>
          <a key={l.href} href={l.href} className={"nav-link" + (active === l.href ? " active" : "")}
          style={{ fontSize: 13, color: active === l.href ? "var(--em-bright)" : "var(--text-dim)", padding: "7px 12px", borderRadius: "var(--r-sm)", transition: "all .12s", display: "inline-block" }}
          onMouseEnter={(e) => {if (active !== e.target.getAttribute("href")) e.target.style.color = "var(--text)";e.target.style.background = "var(--surface)";}}
          onMouseLeave={(e) => {e.target.style.color = active === e.target.getAttribute("href") ? "var(--em-bright)" : "var(--text-dim)";e.target.style.background = "transparent";}}>
              {l.label}
            </a>
          )}
        </nav>
        <div className="nav-right">
          <span className="nav-pill"><span className="dot" style={{ backgroundColor: "rgb(255, 84, 142)" }} />Live</span>
          <a href="index.html?section=contact" className="btn btn-ghost" style={{ height: 36, padding: "0 14px", fontSize: 13 }}>Contact</a>
        </div>
      </div>
    </header>);

}

/* =========================================================
   APP SIDEBAR (inner pages)
   ========================================================= */
function AppSidebar({ active }) {
  return (
    <aside className="app-sidebar">
      <div className="sb-section">Main</div>
      {NAV_LINKS.slice(1).map((l) => {
        const Icon = I[l.icon];
        return (
          <a key={l.href} href={l.href}
          className={"sb-item" + (active === l.href ? " active" : "")}>
            <span className="sb-icon"><Icon /></span>
            <span>{l.label}</span>
          </a>);

      })}
      <div className="sb-section">Memory</div>
      <a href="#" className="sb-item"><span className="sb-icon"><I.folder /></span><span>Projects</span><span className="sb-badge">12</span></a>
      <a href="#" className="sb-item"><span className="sb-icon"><I.snap /></span><span>Snapshots</span><span className="sb-badge">48</span></a>
      <div className="sb-spacer" />
      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-avatar">V1</div>
          <div className="sb-who">
            <b>operator</b>
            <span>founder · private</span>
          </div>
        </div>
      </div>
    </aside>);

}

/* =========================================================
   SPARKLINE
   ========================================================= */
function Spark({ data, color = "#34d399", h = 32 }) {
  const mx = Math.max(...data),mn = Math.min(...data);
  const W = 100;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * W;
    const y = h - (v - mn) / (mx - mn || 1) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const id = "sg" + color.replace(/[^a-f0-9]/gi, "");
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" className="spark-svg" style={{ height: h }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" points={pts} />
      <polygon fill={`url(#${id})`} points={`0,${h} ${pts} ${W},${h}`} />
    </svg>);

}

/* =========================================================
   NEURAL CANVAS (hero background)
   ========================================================= */
function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const EM = "#10b981",EM2 = "#34d399",DIM = "rgba(16,185,129,";

    const nodes = [];
    const packets = [];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function init() {
      nodes.length = 0;
      const count = Math.floor(w * h / 18000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    function spawnPacket(a, b) {
      packets.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0, speed: 0.008 + Math.random() * 0.006 });
    }

    let frame = 0;
    function tick() {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // update nodes
      for (const n of nodes) {
        n.x += n.vx;n.y += n.vy;n.pulse += 0.02;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],b = nodes[j];
          const dx = a.x - b.x,dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            const alpha = (1 - d / 160) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // occasionally spawn packet
            if (frame % 180 === 0 && Math.random() < 0.04) spawnPacket(a, b);
          }
        }
      }

      // draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) {packets.splice(i, 1);continue;}
        const x = p.ax + (p.bx - p.ax) * p.t;
        const y = p.ay + (p.by - p.ay) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = EM2;
        ctx.shadowColor = EM;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // draw nodes
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${0.4 + pulse * 0.4})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {resize();init();});
    ro.observe(canvas.parentElement || canvas);
    resize();init();tick();
    return () => {cancelAnimationFrame(raf);ro.disconnect();};
  }, []);

  return <canvas ref={ref} id="hero-canvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* =========================================================
   MARQUEE
   ========================================================= */
function Marquee() {
  const items = ["ALWAYS-ON", "PRIVATE BY DEFAULT", "SIX COGNITIVE MODES", "BYOK", "REMOTE AGENTS", "VECTOR MEMORY", "42 MODELS", "EMOTIONAL PRECISION", "128 AI AGENTS", "MULTI-MODAL", "INVITE ONLY", "ACCESS BY INVITE", "248 SKILL MODULES", "ENTERPRISE READY"];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
      </div>
    </div>);

}

/* =========================================================
   FOOTER
   ========================================================= */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="foot-bottom" style={{ paddingTop: '16px', paddingBottom: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-mute)', fontSize: '12px' }}>© 2026 Metallic.V1</span>
          <a href="index.html?section=terms" style={{ color: 'var(--text-dim)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Terms</a>
          <a href="index.html?section=privacy" style={{ color: 'var(--text-dim)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Privacy</a>
          <a href="#" style={{ color: 'var(--text-dim)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Security</a>
          <a href="#" style={{ color: 'var(--text-dim)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Status</a>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { I, BrandMark, TopNav, AppSidebar, Spark, NeuralCanvas, Marquee, SiteFooter });