import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/yuktaraData';

interface ProjectsSectionProps {
  onDiscussProject: (projectName: string) => void;
}

export function ProjectsSection({ onDiscussProject }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative bg-[#F5F7FC] text-[#101B35] py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#101B35]/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#1459E8] mb-3">
              Case Study Architecture
            </p>
            <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.94] text-[clamp(2.5rem,5.5vw,4.75rem)] uppercase">
              Selected Works.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-600 leading-relaxed">
            Modular editorial case study showcases structured for verified enterprise engagements—ready to highlight live client architectures and outcomes.
          </p>
        </div>

        {/* Alternating Editorial Portfolio Rows */}
        <div className="mt-16 space-y-24 sm:space-y-32">
          {FEATURED_PROJECTS.map((project, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Floating Browser Frame Image */}
                <div
                  className={`lg:col-span-7 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="group rounded-2xl sm:rounded-3xl bg-[#0B1328] border border-[#101B35]/15 shadow-[0_24px_65px_-18px_rgba(16,27,53,0.22)] overflow-hidden transition-transform duration-700 hover:-translate-y-1">
                    {/* Minimal Browser Header */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#101B35] border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white/25" />
                        <span className="w-2 h-2 rounded-full bg-white/25" />
                        <span className="w-2 h-2 rounded-full bg-[#00C8FF]/70" />
                      </div>
                      <span className="font-mono text-[11px] text-slate-300">
                        {project.accentLabel}
                      </span>
                      <span className="font-mono text-[11px] text-[#00C8FF] tabular-nums">
                        {project.index}
                      </span>
                    </div>

                    {/* Visual Frame */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#080E1E]">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E]/60 via-transparent to-transparent opacity-80" />
                    </div>
                  </div>
                </div>

                {/* Editorial Details Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    reversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 font-mono text-xs text-slate-500 mb-4">
                    <span className="text-[#1459E8] font-semibold tabular-nums">{project.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.industry}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#101B35] leading-tight">
                    {project.name}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#101B35]/10 space-y-2">
                    <p className="text-xs font-medium text-slate-500">
                      Services Delivered:{' '}
                      <span className="text-[#101B35]">{project.services.join(' · ')}</span>
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      {project.outcomeNote}
                    </p>
                  </div>

                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={() => onDiscussProject(project.name)}
                      className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 rounded-full border border-[#101B35]/20 hover:border-[#1459E8] hover:bg-[#1459E8] hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer group"
                    >
                      <span>Request Architecture Brief</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
