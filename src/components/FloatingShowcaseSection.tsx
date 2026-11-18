import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GENERATED_MEDIA } from '../data/yuktaraData';

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_STATES = [
  {
    index: '01',
    label: 'Abstract Intelligence Wave',
    caption: 'Procedural fluid computation and adaptive real-time geometry.',
    url: 'yuktara.ai/core',
  },
  {
    index: '02',
    label: 'AI Neural Network',
    caption: 'Interconnected decision nodes synthesizing enterprise context.',
    url: 'yuktara.ai/neural',
  },
  {
    index: '03',
    label: 'Architectural Web Interface',
    caption: 'High-velocity digital flagship built for clarity and conversion.',
    url: 'yuktara.ai/platform',
  },
  {
    index: '04',
    label: 'Executive Analytics',
    caption: 'Operational telemetry distilled into immediate strategic signals.',
    url: 'yuktara.ai/telemetry',
  },
  {
    index: '05',
    label: 'Mobile Ecosystem',
    caption: 'Seamless iOS & Android experiences engineered around field teams.',
    url: 'yuktara.ai/mobile',
  },
  {
    index: '06',
    label: 'Connected Digital Ecosystem',
    caption: 'Unified cloud infrastructure linking software, AI, and automation.',
    url: 'yuktara.ai/ecosystem',
  },
] as const;

export function FloatingShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const browserRef = useRef<HTMLDivElement | null>(null);
  const bgTypeRef = useRef<HTMLDivElement | null>(null);
  const fgTypeRef = useRef<HTMLDivElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Live Procedural 3D Blue Wave inside Browser Stage 01
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const renderWave = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      ctx.fillStyle = '#070E22';
      ctx.fillRect(0, 0, w, h);

      // Ambient gradient glow
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.5, w * 0.55);
      glow.addColorStop(0, 'rgba(56, 103, 255, 0.35)');
      glow.addColorStop(0.5, 'rgba(0, 200, 255, 0.12)');
      glow.addColorStop(1, 'rgba(7, 14, 34, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Layered 3D-perspective wave ribbons
      const layers = 18;
      for (let l = 0; l < layers; l++) {
        const progress = l / (layers - 1);
        ctx.beginPath();
        const baseY = h * (0.28 + progress * 0.48);
        for (let x = 0; x <= w; x += 14) {
          const nx = x / w;
          const wave1 = Math.sin(nx * 5.2 + t * 1.15 + l * 0.32) * (24 + progress * 18);
          const wave2 = Math.cos(nx * 9.0 - t * 0.8 + l * 0.45) * 10;
          const y = baseY + wave1 + wave2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.14 + Math.sin(progress * Math.PI) * 0.45;
        ctx.strokeStyle = l % 3 === 0 ? `rgba(0, 200, 255, ${alpha})` : `rgba(56, 103, 255, ${alpha})`;
        ctx.lineWidth = l % 4 === 0 ? 1.8 : 1;
        ctx.stroke();
      }

      t += 0.022;
      rafId = requestAnimationFrame(renderWave);
    };

    rafId = requestAnimationFrame(renderWave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP ScrollTrigger Pinned Sequence
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!triggerRef.current || !browserRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=3200',
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              SHOWCASE_STATES.length - 1,
              Math.floor(self.progress * SHOWCASE_STATES.length)
            );
            setActiveIndex(idx);
          },
        },
      });

      // Gentle 3D tilt choreography of the floating browser mockup
      tl.fromTo(
        browserRef.current,
        { rotateX: 8, rotateY: -5, scale: 0.94 },
        { rotateX: 0, rotateY: 4, scale: 1, ease: 'none', duration: 0.5 }
      ).to(browserRef.current, {
        rotateX: -4,
        rotateY: -3,
        scale: 0.98,
        ease: 'none',
        duration: 0.5,
      });

      if (bgTypeRef.current) {
        gsap.to(bgTypeRef.current, {
          xPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top bottom',
            end: '+=4000',
            scrub: 0.6,
          },
        });
      }

      if (fgTypeRef.current) {
        gsap.to(fgTypeRef.current, {
          xPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top bottom',
            end: '+=4000',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = SHOWCASE_STATES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative bg-[#EAECEF] text-[#101B35] overflow-hidden"
    >
      {/* Top Oversized Typography Intro */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[#101B35] text-[clamp(3rem,8.5vw,7.5rem)] uppercase">
            We Build
            <span className="block text-[#1459E8]">What&apos;s Next.</span>
          </h2>
          <p className="max-w-sm text-sm sm:text-base text-slate-600 leading-relaxed">
            An interactive digital canvas translating intelligent architecture into responsive web, software, and mobile systems.
          </p>
        </div>
      </div>

      {/* Pinned Floating Browser Stage */}
      <div
        ref={triggerRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-12 overflow-hidden"
      >
        {/* Oversized Kinetic Typography Behind Browser */}
        <div
          ref={bgTypeRef}
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-[18%] left-0 whitespace-nowrap font-display font-bold uppercase tracking-[-0.04em] text-[clamp(4.5rem,13vw,12rem)] leading-none text-[#101B35]/[0.06]"
        >
          CODE · CREATE · TRANSFORM · CODE · CREATE · TRANSFORM
        </div>

        {/* Center Floating Browser Window */}
        <div
          style={{ perspective: '1400px' }}
          className="relative z-10 w-full max-w-[1060px] mx-auto"
        >
          <div
            ref={browserRef}
            className="w-full rounded-2xl sm:rounded-3xl bg-[#0B1328] border border-[#101B35]/15 shadow-[0_32px_90px_-15px_rgba(16,27,53,0.38)] overflow-hidden will-change-transform"
          >
            {/* Minimal Architectural Browser Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0E1833] border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8FF]/70" />
              </div>

              <div className="px-4 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-slate-300 tracking-wide truncate max-w-[240px] sm:max-w-xs">
                {current.url}
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-[#00C8FF] tabular-nums">
                <span>{current.index}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">06</span>
              </div>
            </div>

            {/* Morphing Visual Viewport inside the Browser */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#070E22] overflow-hidden">
              {/* Stage 0: Procedural 3D Blue Wave */}
              <div
                className={`absolute inset-0 transition-all duration-700 ${
                  activeIndex === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <canvas ref={waveCanvasRef} className="w-full h-full block" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C8FF]">
                      01 · Intelligence Wave
                    </p>
                    <p className="font-display text-xl sm:text-2xl font-semibold text-white mt-1">
                      Adaptive Computational Surface
                    </p>
                  </div>
                </div>
              </div>

              {/* Stage 1: Neural Intelligence Network */}
              <div
                className={`absolute inset-0 transition-all duration-700 bg-[#081026] flex items-center justify-center p-6 sm:p-10 ${
                  activeIndex === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <svg viewBox="0 0 800 420" className="w-full h-full max-h-[380px]">
                  <defs>
                    <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#1459E8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Neural edges */}
                  {[
                    [140, 110, 320, 90],
                    [140, 210, 320, 210],
                    [140, 310, 320, 330],
                    [140, 110, 320, 210],
                    [140, 210, 320, 90],
                    [140, 310, 320, 210],
                    [320, 90, 500, 150],
                    [320, 210, 500, 150],
                    [320, 210, 500, 270],
                    [320, 330, 500, 270],
                    [500, 150, 660, 210],
                    [500, 270, 660, 210],
                  ].map(([x1, y1, x2, y2], idx) => (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={idx % 3 === 0 ? '#00C8FF' : '#3867FF'}
                      strokeOpacity="0.45"
                      strokeWidth="1.6"
                    />
                  ))}
                  {/* Nodes */}
                  {[
                    [140, 110],
                    [140, 210],
                    [140, 310],
                    [320, 90],
                    [320, 210],
                    [320, 330],
                    [500, 150],
                    [500, 270],
                    [660, 210],
                  ].map(([cx, cy], idx) => (
                    <g key={idx}>
                      <circle cx={cx} cy={cy} r="22" fill="url(#node-glow)" />
                      <circle cx={cx} cy={cy} r="6.5" fill="#0B1328" stroke="#00C8FF" strokeWidth="2.5" />
                    </g>
                  ))}
                </svg>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C8FF]">
                    02 · Neural Architecture
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-white mt-1">
                    Custom AI Agents &amp; Decision Graphs
                  </p>
                </div>
              </div>

              {/* Stage 2: Architectural Web Platform Interface */}
              <div
                className={`absolute inset-0 transition-all duration-700 bg-[#F5F7FC] text-[#101B35] p-6 sm:p-10 flex flex-col justify-between ${
                  activeIndex === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#101B35]/10 pb-4">
                  <span className="font-display font-bold tracking-wider text-sm">YUKTARA STUDIO</span>
                  <div className="flex gap-5 text-xs font-medium text-slate-600">
                    <span>Architecture</span>
                    <span>Systems</span>
                    <span>Deployment</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-6 items-center my-auto py-4">
                  <div className="col-span-7">
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#1459E8] mb-2">
                      03 · Web &amp; Digital Flagships
                    </p>
                    <h4 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-[#101B35]">
                      Precision digital interfaces designed for enterprise clarity.
                    </h4>
                  </div>
                  <div className="col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-[#101B35]/10">
                    <img
                      src={GENERATED_MEDIA.fintechStudio}
                      alt="Minimalist executive architecture interface"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Stage 3: Executive Analytics & Telemetry */}
              <div
                className={`absolute inset-0 transition-all duration-700 bg-[#0A1329] text-white p-6 sm:p-10 flex flex-col justify-between ${
                  activeIndex === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C8FF]">
                      04 · Executive Analytics
                    </p>
                    <h4 className="font-display text-xl sm:text-2xl font-semibold mt-1">
                      Unified Operational Intelligence
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-slate-400">Real-Time Sync</span>
                </div>

                <div className="grid grid-cols-3 gap-4 my-auto">
                  {[
                    { label: 'Workflow Pipelines', value: 'Automated' },
                    { label: 'Data Silos', value: 'Unified' },
                    { label: 'Response Architecture', value: 'Sub-Second' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-white/[0.04] border border-white/10 p-4"
                    >
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="font-display text-lg sm:text-xl font-semibold text-white mt-2">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Clean bar chart SVG */}
                <div className="h-24 flex items-end gap-2 pt-2 border-t border-white/10">
                  {[34, 48, 42, 65, 58, 76, 72, 88, 82, 95, 91, 100].map((v, i) => (
                    <div
                      key={i}
                      style={{ height: `${v}%` }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-[#1459E8] to-[#00C8FF]/80"
                    />
                  ))}
                </div>
              </div>

              {/* Stage 4: Mobile Application Ecosystem */}
              <div
                className={`absolute inset-0 transition-all duration-700 bg-gradient-to-br from-[#0F1B3A] to-[#070D1F] text-white p-6 sm:p-10 flex items-center justify-between gap-8 ${
                  activeIndex === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="max-w-md">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C8FF]">
                    05 · Mobile Applications
                  </p>
                  <h4 className="font-display text-2xl sm:text-3xl font-bold mt-2">
                    Native iOS &amp; Android engineered for real operational speed.
                  </h4>
                </div>
                <div className="hidden sm:flex items-center gap-4 shrink-0">
                  <div className="w-36 h-64 rounded-[26px] border-2 border-white/20 bg-[#080E1E] p-3 flex flex-col justify-between shadow-2xl">
                    <div className="w-12 h-1 rounded-full bg-white/20 mx-auto" />
                    <div className="space-y-2">
                      <div className="h-14 rounded-lg bg-[#1459E8]/30 border border-[#3867FF]/40" />
                      <div className="h-8 rounded-lg bg-white/5" />
                      <div className="h-8 rounded-lg bg-white/5" />
                    </div>
                    <div className="h-7 rounded-full bg-[#1459E8]" />
                  </div>
                  <div className="w-36 h-64 rounded-[26px] border-2 border-[#00C8FF]/40 bg-[#0C1633] p-3 flex flex-col justify-between shadow-2xl translate-y-4">
                    <div className="w-12 h-1 rounded-full bg-white/20 mx-auto" />
                    <div className="space-y-2.5">
                      <div className="h-20 rounded-lg bg-gradient-to-br from-[#1459E8]/40 to-[#00C8FF]/20 border border-[#00C8FF]/30" />
                      <div className="h-6 rounded bg-white/10" />
                      <div className="h-6 rounded bg-white/10" />
                    </div>
                    <div className="h-7 rounded-full bg-[#00C8FF]/80" />
                  </div>
                </div>
              </div>

              {/* Stage 5: Connected Digital Ecosystem */}
              <div
                className={`absolute inset-0 transition-all duration-700 bg-[#080E1E] ${
                  activeIndex === 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img
                  src={GENERATED_MEDIA.architecture}
                  alt="Connected digital enterprise ecosystem"
                  className="w-full h-full object-cover opacity-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C8FF]">
                    06 · Connected Digital Ecosystem
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-white mt-1">
                    Synchronized Infrastructure Across Web, AI &amp; Automation
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Stepper Bar inside Mockup Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#091024] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-300 truncate">{current.caption}</p>
              <div className="flex items-center gap-1.5">
                {SHOWCASE_STATES.map((st, idx) => (
                  <button
                    key={st.index}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Preview stage ${st.index}: ${st.label}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx ? 'w-7 bg-[#00C8FF]' : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Oversized Kinetic Bottom Typography */}
        <div
          ref={fgTypeRef}
          aria-hidden="true"
          className="pointer-events-none select-none mt-8 sm:mt-10 whitespace-nowrap font-display font-bold uppercase tracking-[-0.04em] text-[clamp(3.25rem,9vw,8.5rem)] leading-none text-[#101B35]"
        >
          ENGINEERING INTELLIGENCE · ENGINEERING INTELLIGENCE
        </div>
      </div>
    </section>
  );
}
