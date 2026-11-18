import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TRANSFORMATION_STAGES } from '../data/yuktaraData';

gsap.registerPlugin(ScrollTrigger);

export function ComplexityToClaritySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!pinRef.current) return;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=2400',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            TRANSFORMATION_STAGES.length - 1,
            Math.floor(self.progress * TRANSFORMATION_STAGES.length)
          );
          setStageIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stage = TRANSFORMATION_STAGES[stageIndex];

  return (
    <section
      ref={sectionRef}
      id="transformation"
      className="relative bg-[#F5F7FC] text-[#101B35] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="min-h-screen w-full flex flex-col justify-center py-16 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1440px] w-full mx-auto">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#1459E8] mb-3">
                Digital Metamorphosis
              </p>
              <h2 className="font-display font-bold tracking-[-0.03em] leading-[0.95] text-[clamp(2.4rem,5.5vw,4.75rem)] uppercase">
                From Complexity
                <span className="block text-[#1459E8]">To Clarity.</span>
              </h2>
            </div>

            {/* Interactive Stage Pills (functional state selector) */}
            <div className="flex items-center gap-2 bg-white border border-[#101B35]/10 rounded-full p-1.5 shadow-sm">
              {TRANSFORMATION_STAGES.map((item, idx) => (
                <button
                  key={item.index}
                  type="button"
                  onClick={() => setStageIndex(idx)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-full font-mono text-xs tabular-nums transition-all cursor-pointer ${
                    stageIndex === idx
                      ? 'bg-[#101B35] text-white'
                      : 'text-slate-500 hover:text-[#101B35]'
                  }`}
                >
                  {item.index}
                </button>
              ))}
            </div>
          </div>

          {/* Central Morphing Frame */}
          <div className="relative rounded-3xl overflow-hidden bg-[#080E1E] border border-[#101B35]/15 shadow-[0_28px_70px_-15px_rgba(16,27,53,0.22)] aspect-[16/10] sm:aspect-[16/8] max-h-[560px] w-full">
            {TRANSFORMATION_STAGES.map((item, idx) => {
              const active = idx === stageIndex;
              return (
                <div
                  key={item.index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    active ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-700 ${
                      idx <= 1
                        ? 'bg-[#080E1E]/75'
                        : idx === 2
                          ? 'bg-gradient-to-tr from-[#080E1E]/85 via-[#1459E8]/35 to-[#080E1E]/55'
                          : 'bg-gradient-to-t from-[#080E1E]/85 via-[#080E1E]/35 to-transparent'
                    }`}
                  />
                </div>
              );
            })}

            {/* Progressive Topology Overlay */}
            <svg
              viewBox="0 0 1000 420"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              {/* Stage 1 & 2: Fragmented disconnected nodes */}
              {stageIndex === 0 && (
                <g stroke="#64748B" strokeDasharray="4 8" strokeWidth="1.2" opacity="0.6">
                  <rect x="160" y="90" width="90" height="55" rx="8" fill="rgba(16,27,53,0.5)" />
                  <rect x="440" y="210" width="110" height="60" rx="8" fill="rgba(16,27,53,0.5)" />
                  <rect x="730" y="110" width="95" height="55" rx="8" fill="rgba(16,27,53,0.5)" />
                </g>
              )}

              {stageIndex === 1 && (
                <g stroke="#3867FF" strokeWidth="1.2" opacity="0.65">
                  <path d="M180 120 L480 260 L760 110 L360 320 L620 90" fill="none" strokeDasharray="3 5" />
                  <circle cx="180" cy="120" r="6" fill="#3867FF" />
                  <circle cx="480" cy="260" r="6" fill="#3867FF" />
                  <circle cx="760" cy="110" r="6" fill="#3867FF" />
                  <circle cx="360" cy="320" r="6" fill="#3867FF" />
                  <circle cx="620" cy="90" r="6" fill="#3867FF" />
                </g>
              )}

              {stageIndex === 2 && (
                <g>
                  <circle cx="500" cy="200" r="68" fill="rgba(20,89,232,0.22)" stroke="#00C8FF" strokeWidth="1.8" />
                  {[
                    [200, 120],
                    [220, 290],
                    [780, 120],
                    [760, 290],
                  ].map(([x, y], i) => (
                    <g key={i}>
                      <line x1={x} y1={y} x2="500" y2="200" stroke="#00C8FF" strokeWidth="1.6" strokeOpacity="0.85" />
                      <circle cx={x} cy={y} r="7" fill="#00C8FF" />
                    </g>
                  ))}
                  <circle cx="500" cy="200" r="14" fill="#00C8FF" />
                </g>
              )}

              {stageIndex === 3 && (
                <g>
                  <line x1="180" y1="200" x2="820" y2="200" stroke="#00C8FF" strokeWidth="2.2" />
                  {[180, 393, 606, 820].map((cx, i) => (
                    <g key={i}>
                      <circle cx={cx} cy="200" r="16" fill="#1459E8" stroke="#00C8FF" strokeWidth="2" />
                      <circle cx={cx} cy="200" r="5" fill="#FFFFFF" />
                    </g>
                  ))}
                </g>
              )}
            </svg>

            {/* Stage Copy Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/85 to-transparent text-white flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#00C8FF] mb-2">
                  Stage {stage.index} — {stage.label}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  {stage.headline}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {stage.caption}
                </p>
              </div>

              <div className="font-mono text-xs text-slate-400 tabular-nums shrink-0">
                {stage.index} / 04
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
