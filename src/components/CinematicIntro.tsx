import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicIntroProps {
  visible: boolean;
  onComplete: () => void;
}

export function CinematicIntro({ visible, onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState<'particles' | 'emblem' | 'wordmark' | 'exit'>('particles');

  useEffect(() => {
    if (!visible) return;
    setStage('particles');

    const t1 = window.setTimeout(() => setStage('emblem'), 420);
    const t2 = window.setTimeout(() => setStage('wordmark'), 1150);
    const t3 = window.setTimeout(() => setStage('exit'), 2350);
    const t4 = window.setTimeout(() => {
      onComplete();
    }, 2850);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [visible, onComplete]);

  // Lightweight procedural converging blue particle field
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 90;
    const particles = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 160 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.55;
      return {
        angle,
        dist,
        speed: 0.9 + Math.random() * 1.4,
        size: 1 + Math.random() * 2.1,
        alpha: 0.35 + Math.random() * 0.65,
        cyan: i % 3 === 0,
      };
    });

    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = 'rgba(6, 11, 24, 0.34)';
      ctx.fillRect(0, 0, w, h);

      // Subtle central cobalt aura
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 260);
      grad.addColorStop(0, `rgba(20, 89, 232, ${Math.min(0.28, elapsed * 0.18)})`);
      grad.addColorStop(0.55, `rgba(0, 200, 255, ${Math.min(0.08, elapsed * 0.06)})`);
      grad.addColorStop(1, 'rgba(6, 11, 24, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const pull = Math.max(0.08, 1 - elapsed * 0.38 * p.speed);
        const curDist = p.dist * pull;
        const swirl = p.angle + elapsed * 0.45 * (p.cyan ? 1 : 0.7);
        const x = cx + Math.cos(swirl) * curDist;
        const y = cy + Math.sin(swirl) * curDist * 0.72;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan
          ? `rgba(0, 200, 255, ${p.alpha})`
          : `rgba(56, 103, 255, ${p.alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="yuktara-cinematic-intro"
          initial={{ opacity: 1 }}
          animate={stage === 'exit' ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060B18] overflow-hidden select-none"
          aria-label="Yuktara Infotech Opening Sequence"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Skip Intro */}
          <button
            type="button"
            onClick={onComplete}
            className="absolute top-6 right-6 z-20 min-h-[40px] px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase text-slate-300 hover:text-white border border-white/15 hover:border-[#00C8FF]/50 rounded-full transition-colors cursor-pointer"
          >
            Skip Intro
          </button>

          {/* Center Emblem + Brand Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Geometric Y Symbol Stroke Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                stage === 'particles'
                  ? { opacity: 0.2, scale: 0.92 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <svg
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_28px_rgba(0,200,255,0.35)]"
              >
                <defs>
                  <linearGradient id="intro-y-grad" x1="18" y1="16" x2="78" y2="82" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1459E8" />
                    <stop offset="55%" stopColor="#3867FF" />
                    <stop offset="100%" stopColor="#00C8FF" />
                  </linearGradient>
                </defs>
                {/* Animated Line Draw */}
                <motion.path
                  d="M20 22L44 53V82L52 76V47L32 22H20Z"
                  stroke="#00C8FF"
                  strokeWidth="1.5"
                  fill="url(#intro-y-grad)"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={
                    stage !== 'particles'
                      ? { pathLength: 1, fillOpacity: 0.95 }
                      : { pathLength: 0.15, fillOpacity: 0 }
                  }
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                  d="M74 22L52 51V76L44 82V53L62 22H74Z"
                  stroke="#3867FF"
                  strokeWidth="1.5"
                  fill="#3867FF"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={
                    stage !== 'particles'
                      ? { pathLength: 1, fillOpacity: 0.9 }
                      : { pathLength: 0.15, fillOpacity: 0 }
                  }
                  transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                  d="M21 67C11 62 14 45 33 31C52 17 72 13 79 20C85 26 77 41 62 53C46 66 30 71 21 67Z"
                  stroke="#00C8FF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    stage !== 'particles'
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                  d="M78 8L79.8 14L85.8 15.8L79.8 17.6L78 23.6L76.2 17.6L70.2 15.8L76.2 14L78 8Z"
                  fill="#00C8FF"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    stage === 'wordmark' || stage === 'exit'
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </motion.div>

            {/* Brand Wordmark & Tagline */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={
                  stage === 'wordmark' || stage === 'exit'
                    ? { y: '0%', opacity: 1 }
                    : { y: '100%', opacity: 0 }
                }
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.28em] text-white"
              >
                YUKTARA INFOTECH
              </motion.div>
            </div>

            <div className="overflow-hidden mt-3">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={
                  stage === 'wordmark' || stage === 'exit'
                    ? { y: '0%', opacity: 1 }
                    : { y: '100%', opacity: 0 }
                }
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm tracking-[0.26em] uppercase text-[#00C8FF]"
              >
                Connecting Intelligence with Innovation
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={stage === 'wordmark' ? { opacity: 0.65 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 text-[11px] tracking-[0.3em] uppercase text-slate-400"
            >
              Technology · Intelligence · Evolution
            </motion.p>
          </div>

          {/* Horizon light arc */}
          <motion.div
            initial={{ scaleX: 0.3, opacity: 0 }}
            animate={stage === 'wordmark' ? { scaleX: 1, opacity: 0.85 } : { scaleX: 0.3, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-14 w-[min(640px,80vw)] h-[1px] bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
