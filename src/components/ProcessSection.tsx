import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STAGES } from '../data/yuktaraData';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setActiveStage(PROCESS_STAGES.length - 1);
      return;
    }

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !progressBarRef.current) return;

      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.4,
            onUpdate: (self) => {
              const idx = Math.min(
                PROCESS_STAGES.length - 1,
                Math.floor(self.progress * PROCESS_STAGES.length)
              );
              setActiveStage(idx);
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-white text-[#101B35] py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-[#101B35]/10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#1459E8] mb-3">
              Our Process
            </p>
            <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.0] text-[clamp(2.2rem,4.5vw,3.75rem)]">
              Disciplined execution from concept to scale.
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base text-slate-600 leading-relaxed">
            Every engagement follows four deliberate phases designed to minimize risk and deliver measurable velocity.
          </p>
        </div>

        {/* Glowing Horizontal Timeline Beam (Desktop) */}
        <div className="relative hidden md:block h-[2px] w-full bg-slate-200 mb-10 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-gradient-to-r from-[#1459E8] via-[#3867FF] to-[#00C8FF] shadow-[0_0_14px_rgba(0,200,255,0.6)]"
          />
        </div>

        {/* 4 Process Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STAGES.map((stage, idx) => {
            const active = idx <= activeStage;
            return (
              <div
                key={stage.index}
                onMouseEnter={() => setActiveStage(idx)}
                className={`relative pt-6 border-t md:border-t-0 transition-colors duration-300 ${
                  active ? 'border-[#1459E8]' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`font-mono text-sm font-semibold tabular-nums transition-colors ${
                      active ? 'text-[#1459E8]' : 'text-slate-400'
                    }`}
                  >
                    {stage.index}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      active ? 'bg-[#00C8FF]' : 'bg-slate-200'
                    }`}
                  />
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tight uppercase text-[#101B35]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
