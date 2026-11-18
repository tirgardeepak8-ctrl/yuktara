import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HeroCoreCanvas } from './HeroCoreCanvas';

interface HeroSectionProps {
  introDone: boolean;
  onExploreSolutions: () => void;
  onStartProject: () => void;
}

const HEADLINE_LINES = [
  'Building the',
  'Intelligence',
  'Behind Business.',
];

export function HeroSection({
  introDone,
  onExploreSolutions,
  onStartProject,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#080E1E] flex flex-col justify-between pt-28 pb-10 px-5 sm:px-8 lg:px-12"
    >
      {/* Subtle architectural ambient gradient & light rays */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_72%_45%,rgba(20,89,232,0.22),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_15%_85%,rgba(0,200,255,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      {/* Interactive 3D Three.js AI Intelligence Core */}
      <HeroCoreCanvas />

      {/* Readability gradient scrim on left side */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[62%] pointer-events-none bg-gradient-to-r from-[#080E1E]/90 via-[#080E1E]/55 to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* Top Spacer */}
      <div className="h-4" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto my-auto">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#00C8FF] mb-6"
          >
            Connecting Intelligence with Innovation
          </motion.p>

          <h1 className="font-display font-bold tracking-[-0.03em] text-white leading-[0.98] text-[clamp(2.65rem,6vw,5.25rem)]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 1 ? 'text-[#3867FF] bg-gradient-to-r from-white via-[#9CC2FF] to-[#00C8FF] bg-clip-text text-transparent' : ''}`}
                  initial={{ y: '105%', opacity: 0 }}
                  animate={introDone ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
                  transition={{
                    duration: 0.78,
                    delay: 0.1 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            We combine AI, engineering, and strategic thinking to help businesses evolve, automate, and scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreSolutions}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-7 py-3 rounded-full bg-[#1459E8] hover:bg-[#3867FF] text-white text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_32px_rgba(20,89,232,0.45)] group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C8FF]"
            >
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3 rounded-full border border-white/20 hover:border-[#00C8FF]/70 bg-white/[0.03] hover:bg-white/[0.08] text-white text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C8FF]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-[#00C8FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Line Indicator */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex items-end justify-between pt-8">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-[1px] bg-white/20 overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent"
            />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-slate-400">
            Scroll to explore
          </span>
        </div>

        <span className="hidden md:block text-xs tracking-[0.16em] uppercase text-slate-400">
          AI · Software · Automation
        </span>
      </div>
    </section>
  );
}
