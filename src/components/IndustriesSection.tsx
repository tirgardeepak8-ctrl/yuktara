import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES } from '../data/yuktaraData';

export function IndustriesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = INDUSTRIES[activeIdx];

  return (
    <section
      id="industries"
      className="relative bg-[#080E1E] text-white py-24 sm:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#00C8FF] mb-3">
              Industries We Serve
            </p>
            <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.0] text-[clamp(2.25rem,4.5vw,4rem)]">
              Domain-aware engineering across seven core sectors.
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base text-slate-300 leading-relaxed">
            Every industry carries distinct regulatory, operational, and customer realities. Hover or select a sector to preview our focus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Interactive Industry List */}
          <div className="lg:col-span-5 divide-y divide-white/10 border-t border-b border-white/10">
            {INDUSTRIES.map((industry, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={industry.id}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left py-4 sm:py-5 px-3 flex items-center justify-between gap-4 transition-colors duration-300 cursor-pointer group ${
                    active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs tabular-nums transition-colors ${
                        active ? 'text-[#00C8FF]' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {industry.index}
                    </span>
                    <span
                      className={`font-display text-lg sm:text-xl font-semibold truncate transition-colors ${
                        active ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {industry.name}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      active
                        ? 'text-[#00C8FF] translate-x-0.5 -translate-y-0.5'
                        : 'text-slate-500 group-hover:text-slate-200'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Immersive Photographic Showcase */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-[#0D1733] border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Measured Scrim for 4.5:1 Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/45 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#00C8FF] mb-2">
                Sector {current.index}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {current.name}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                {current.focus}
              </p>
              <p className="mt-4 pt-4 border-t border-white/15 font-mono text-xs text-slate-300">
                {current.capabilities}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
