import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../data/yuktaraData';
import { YuktaraLogo } from './YuktaraLogo';

gsap.registerPlugin(ScrollTrigger);

interface CtaAndFooterSectionProps {
  onStartProject: () => void;
  onReplayIntro: () => void;
}

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

export function CtaAndFooterSection({
  onStartProject,
  onReplayIntro,
}: CtaAndFooterSectionProps) {
  const ctaRef = useRef<HTMLElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!ctaRef.current || !orbRef.current) return;
      gsap.fromTo(
        orbRef.current,
        { scale: 0.72, opacity: 0.45 },
        {
          scale: 1.55,
          opacity: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="contact" className="relative bg-[#080E1E] text-white overflow-hidden">
      {/* Full-Screen Cinematic CTA */}
      <section
        ref={ctaRef}
        className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-12 py-28 overflow-hidden"
      >
        {/* Expanding Glowing Circular Horizon Element */}
        <div
          ref={orbRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(680px,92vw)] aspect-square rounded-full bg-[radial-gradient(circle,rgba(20,89,232,0.42)_0%,rgba(0,200,255,0.16)_38%,rgba(8,14,30,0)_70%)] border border-[#3867FF]/25 shadow-[0_0_120px_rgba(20,89,232,0.35)]"
        />

        {/* Subtle glowing horizon floor arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] h-[220px] rounded-[100%] border-t border-[#00C8FF]/40 bg-[radial-gradient(ellipse_at_top,rgba(56,103,255,0.22),transparent_70%)]"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.26em] text-[#00C8FF] mb-6">
            Let&apos;s Build the Future
          </p>

          <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.94] text-[clamp(2.75rem,7vw,6.25rem)] uppercase">
            The Next Move
            <span className="block text-[#00C8FF]">Starts With You.</span>
          </h2>

          <p className="mt-7 max-w-xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed">
            Have an idea, challenge, or vision? Let&apos;s engineer what&apos;s next.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center gap-2.5 min-h-[50px] px-8 py-3 rounded-full bg-[#1459E8] hover:bg-[#3867FF] text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_36px_rgba(20,89,232,0.5)] cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 min-h-[50px] px-8 py-3 rounded-full border border-white/20 hover:border-[#00C8FF]/70 bg-white/[0.04] hover:bg-white/[0.1] text-white text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer group"
            >
              <span>Talk to Our Team</span>
              <ArrowUpRight className="w-4 h-4 text-[#00C8FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Architectural Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#060B18] px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-4">
              <YuktaraLogo variant="dark" size="md" />
              <p className="text-sm sm:text-base text-slate-300 max-w-sm leading-relaxed">
                {BRAND_CONFIG.tagline}
              </p>
              <button
                type="button"
                onClick={onReplayIntro}
                className="text-xs font-mono uppercase tracking-[0.16em] text-[#00C8FF] hover:text-white transition-colors cursor-pointer pt-2 inline-block"
              >
                Replay Opening Sequence →
              </button>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-4 space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
                Connect
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                  <span>{BRAND_CONFIG.location}</span>
                </p>
                <p>
                  <a
                    href={BRAND_CONFIG.phoneHref}
                    className="inline-flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{BRAND_CONFIG.phone}</span>
                  </a>
                </p>
                <p>
                  <a
                    href={BRAND_CONFIG.emailHref}
                    className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{BRAND_CONFIG.email}</span>
                  </a>
                </p>
              </div>

              <div className="pt-3 flex items-center gap-5 text-sm">
                <a
                  href={BRAND_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-[#00C8FF] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={BRAND_CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-[#00C8FF] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Yuktara Infotech. All rights reserved.</p>
            <p className="font-mono tracking-wider">AI · Engineering · Automation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
