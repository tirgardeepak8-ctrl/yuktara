import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/yuktaraData';

interface ServicesSectionProps {
  onSelectProjectInquiry: (serviceTitle: string) => void;
}

function ServiceVisualStage({ service }: { service: ServiceItem }) {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[560px] rounded-3xl overflow-hidden bg-[#060C1C] border border-white/10">
      {/* Crossfading Architectural Photography */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.42, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Spreading Radial Cobalt Glow */}
      <motion.div
        key={`glow-${service.id}`}
        initial={{ opacity: 0.2, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(20,89,232,0.42),rgba(0,200,255,0.08)_40%,rgba(6,12,28,0.92)_78%)]"
      />

      {/* Mode-Specific Live Interactive Visual Object */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#00C8FF]">
            Service {service.index}
          </span>
          <span className="font-mono text-xs text-slate-400">
            {service.deliverables.join(' · ')}
          </span>
        </div>

        {/* Center Visual Construct */}
        <div className="my-auto py-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={service.visualMode}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              {service.visualMode === 'neural' && (
                <div className="relative h-56 flex items-center justify-center">
                  <svg viewBox="0 0 360 220" className="w-full h-full">
                    <circle cx="180" cy="110" r="82" fill="none" stroke="#3867FF" strokeOpacity="0.35" strokeDasharray="4 6" />
                    <circle cx="180" cy="110" r="52" fill="none" stroke="#00C8FF" strokeOpacity="0.55" />
                    {[
                      [70, 55, 180, 110],
                      [70, 165, 180, 110],
                      [290, 55, 180, 110],
                      [290, 165, 180, 110],
                      [180, 26, 180, 110],
                      [180, 194, 180, 110],
                    ].map(([x1, y1, x2, y2], idx) => (
                      <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00C8FF" strokeOpacity="0.6" strokeWidth="1.5" />
                    ))}
                    <circle cx="180" cy="110" r="18" fill="#1459E8" stroke="#00C8FF" strokeWidth="2" />
                    {[
                      [70, 55],
                      [70, 165],
                      [290, 55],
                      [290, 165],
                      [180, 26],
                      [180, 194],
                    ].map(([cx, cy], idx) => (
                      <circle key={idx} cx={cx} cy={cy} r="6" fill="#00C8FF" />
                    ))}
                  </svg>
                </div>
              )}

              {service.visualMode === 'software' && (
                <div className="relative space-y-3 bg-[#0B1530]/90 border border-white/15 rounded-2xl p-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-[#00C8FF]">Architecture Console</span>
                    <span className="font-mono text-[11px] text-slate-400">TypeScript · Cloud</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 h-20 rounded-xl bg-white/[0.04] border border-white/10 p-3 flex flex-col justify-between">
                      <span className="text-[11px] text-slate-400">Modular Core</span>
                      <div className="h-2 w-4/5 rounded bg-[#3867FF]/70" />
                    </div>
                    <div className="h-20 rounded-xl bg-[#1459E8]/25 border border-[#3867FF]/40 p-3 flex flex-col justify-between">
                      <span className="text-[11px] text-slate-200">API</span>
                      <span className="font-mono text-xs text-[#00C8FF]">Active</span>
                    </div>
                  </div>
                  <div className="h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 flex items-center justify-between font-mono text-xs text-slate-300">
                    <span>Microservices Mesh</span>
                    <span className="text-[#00C8FF]">Synchronized</span>
                  </div>
                </div>
              )}

              {service.visualMode === 'automation' && (
                <div className="flex items-center justify-between gap-2 bg-[#0B1530]/85 border border-white/15 rounded-2xl p-5">
                  {['Ingest', 'Orchestrate', 'Verify', 'Execute'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 flex-1">
                      <div className="flex-1 rounded-xl border border-[#3867FF]/45 bg-[#1459E8]/20 py-4 px-2 text-center">
                        <p className="font-mono text-[10px] text-[#00C8FF]">0{i + 1}</p>
                        <p className="text-xs font-medium text-white mt-1">{step}</p>
                      </div>
                      {i < 3 && <span className="text-[#00C8FF] font-mono text-xs">→</span>}
                    </div>
                  ))}
                </div>
              )}

              {service.visualMode === 'web' && (
                <div className="rounded-2xl border border-white/15 bg-[#F5F7FC] text-[#101B35] p-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="font-display font-bold text-xs tracking-wider">DIGITAL FLAGSHIP</span>
                    <span className="text-[11px] font-mono text-[#1459E8]">60 FPS Motion</span>
                  </div>
                  <div className="py-5">
                    <p className="font-display text-xl font-bold leading-tight">
                      Architectural precision meets conversion engineering.
                    </p>
                  </div>
                  <div className="h-2 w-1/2 rounded-full bg-[#1459E8]" />
                </div>
              )}

              {service.visualMode === 'mobile' && (
                <div className="flex items-center justify-center gap-5">
                  <div className="w-36 h-56 rounded-[24px] border-2 border-white/25 bg-[#080E1E] p-3 flex flex-col justify-between">
                    <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[#1459E8]/35 border border-[#00C8FF]/30" />
                      <div className="h-7 rounded bg-white/10" />
                    </div>
                    <div className="h-6 rounded-full bg-[#1459E8]" />
                  </div>
                  <div className="w-36 h-56 rounded-[24px] border-2 border-[#00C8FF]/45 bg-[#0E1A38] p-3 flex flex-col justify-between translate-y-3">
                    <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
                    <div className="space-y-2">
                      <div className="h-12 rounded-lg bg-white/10" />
                      <div className="h-12 rounded-lg bg-[#00C8FF]/20 border border-[#00C8FF]/40" />
                    </div>
                    <div className="h-6 rounded-full bg-[#00C8FF]" />
                  </div>
                </div>
              )}

              {service.visualMode === 'growth' && (
                <div className="rounded-2xl border border-white/15 bg-[#0B1530]/90 p-5">
                  <p className="font-mono text-xs text-[#00C8FF] mb-4">Acquisition &amp; Compounding Velocity</p>
                  <svg viewBox="0 0 360 120" className="w-full h-32">
                    <defs>
                      <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1459E8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 105 C70 98, 120 78, 180 62 C240 46, 290 25, 350 12 L350 118 L10 118 Z"
                      fill="url(#growth-fill)"
                    />
                    <path
                      d="M10 105 C70 98, 120 78, 180 62 C240 46, 290 25, 350 12"
                      fill="none"
                      stroke="#00C8FF"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Caption */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <p className="text-sm sm:text-base text-slate-200 max-w-md leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection({ onSelectProjectInquiry }: ServicesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SERVICES[activeIdx];

  return (
    <section
      id="solutions"
      className="relative bg-[#080E1E] text-white py-24 sm:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#00C8FF] mb-4">
              Core Capabilities
            </p>
            <h2 className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.5rem,5vw,4.5rem)] uppercase">
              What We Engineer.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore our six integrated disciplines. Hover or select any capability to inspect the underlying architectural craft.
          </p>
        </div>

        {/* Interactive Split Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Interactive Service Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="divide-y divide-white/10">
              {SERVICES.map((service, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left py-5 px-4 rounded-xl transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group ${
                      isActive
                        ? 'bg-[#101B35] border border-[#3867FF]/40'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span
                        className={`font-mono text-xs tabular-nums transition-colors ${
                          isActive ? 'text-[#00C8FF]' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        {service.index}
                      </span>
                      <span
                        className={`font-display text-lg sm:text-xl font-semibold truncate transition-colors ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive
                          ? 'text-[#00C8FF] translate-x-0.5 -translate-y-0.5'
                          : 'text-slate-500 group-hover:text-slate-200'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onSelectProjectInquiry(activeService.title)}
                className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-2.5 rounded-full bg-[#1459E8] hover:bg-[#3867FF] text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <span>Discuss {activeService.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Visual Viewport */}
          <div className="lg:col-span-7">
            <ServiceVisualStage service={activeService} />
          </div>
        </div>
      </div>
    </section>
  );
}
