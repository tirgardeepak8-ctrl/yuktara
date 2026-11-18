import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GENERATED_MEDIA } from '../data/yuktaraData';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_STATES = [
  {
    index: '01',
    title: 'Foundational Architecture',
    subtitle: 'Dark abstract digital infrastructure built for stability.',
    image: GENERATED_MEDIA.architecture,
  },
  {
    index: '02',
    title: 'Connected Intelligence Networks',
    subtitle: 'Autonomous nodes linking operational tools and insights.',
    image: GENERATED_MEDIA.spatialDisplay,
  },
  {
    index: '03',
    title: 'Unified Digital Ecosystem',
    subtitle: 'Full-spectrum enterprise clarity across every touchpoint.',
    image: GENERATED_MEDIA.infrastructure,
  },
] as const;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [aboutState, setAboutState] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const idx = Math.min(2, Math.floor(self.progress * 3));
          setAboutState(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white text-[#101B35] py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        {/* Editorial Left Column */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#1459E8] mb-5">
              Who We Are
            </p>
            <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[clamp(2.2rem,4.5vw,3.9rem)] text-[#101B35]">
              Technology should move businesses forward.{' '}
              <span className="text-slate-400">Not hold them back.</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-xl">
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
              Yuktara Infotech is a technology and innovation company building intelligent digital solutions for modern businesses.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We transform complex challenges into practical technology, automation, and digital experiences that help organizations operate smarter and grow faster.
            </p>

            {/* Interactive 3-State Selector */}
            <div className="pt-6 border-t border-[#101B35]/10 space-y-3">
              {ABOUT_STATES.map((item, idx) => {
                const active = aboutState === idx;
                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={() => setAboutState(idx)}
                    className={`w-full text-left flex items-baseline gap-4 py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                      active ? 'bg-[#F5F7FC] text-[#101B35]' : 'text-slate-500 hover:text-[#101B35]'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        active ? 'text-[#1459E8] font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {item.index}
                    </span>
                    <div>
                      <p className="font-display text-sm sm:text-base font-semibold">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cinematic Right Visual Frame */}
        <div className="lg:col-span-6 relative min-h-[420px] lg:min-h-[580px] rounded-3xl overflow-hidden bg-[#080E1E]">
          {ABOUT_STATES.map((item, idx) => {
            const active = aboutState === idx;
            return (
              <div
                key={item.index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  active ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E]/90 via-[#080E1E]/25 to-transparent" />
              </div>
            );
          })}

          {/* Overlay Visual Network Layer for State 2 & State 3 */}
          <svg
            viewBox="0 0 600 600"
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
              aboutState >= 1 ? 'opacity-80' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <g stroke="#00C8FF" strokeWidth="1.2" strokeOpacity={aboutState === 2 ? '0.65' : '0.35'}>
              <line x1="120" y1="180" x2="290" y2="270" />
              <line x1="290" y1="270" x2="460" y2="160" />
              <line x1="290" y1="270" x2="430" y2="410" />
              <line x1="140" y1="400" x2="290" y2="270" />
              {aboutState === 2 && (
                <>
                  <line x1="120" y1="180" x2="460" y2="160" />
                  <line x1="140" y1="400" x2="430" y2="410" />
                  <circle cx="290" cy="270" r="95" fill="none" stroke="#3867FF" strokeDasharray="4 6" />
                </>
              )}
            </g>
            {[
              [120, 180],
              [290, 270],
              [460, 160],
              [430, 410],
              [140, 400],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i === 1 ? 7 : 4.5}
                fill="#00C8FF"
              />
            ))}
          </svg>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C8FF]">
                State {ABOUT_STATES[aboutState].index} / 03
              </p>
              <p className="font-display text-xl sm:text-2xl font-semibold mt-1">
                {ABOUT_STATES[aboutState].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
