import { motion } from 'motion/react';
import { WHY_PILLARS } from '../data/yuktaraData';

export function WhyYuktaraSection() {
  return (
    <section
      id="why-yuktara"
      className="relative bg-[#101B35] text-white py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Subtle architectural radial lighting */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(0,200,255,0.12),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="max-w-4xl mb-16 sm:mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#00C8FF] mb-5">
            Why Yuktara
          </p>
          <h2 className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,4.8vw,4.25rem)] uppercase">
            We don&apos;t just implement technology.{' '}
            <span className="text-[#00C8FF]">We make it mean something.</span>
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {WHY_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="py-7 sm:py-9 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline group"
            >
              <div className="md:col-span-1 font-mono text-sm text-[#00C8FF] tabular-nums">
                {pillar.index}
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#00C8FF] transition-colors">
                  {pillar.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  {pillar.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
