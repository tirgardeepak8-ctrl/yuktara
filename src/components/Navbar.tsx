import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { YuktaraLogo } from './YuktaraLogo';

interface NavbarProps {
  onOpenInquiry: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects', href: '#projects' },
] as const;

export function Navbar({ onOpenInquiry, audioEnabled, onToggleAudio }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080E1E]/85 backdrop-blur-md border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C8FF] rounded-sm shrink-0"
          >
            <YuktaraLogo variant="dark" size="sm" />
          </a>

          {/* Zone 2: 5 concise single-line links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative py-1 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C8FF]"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-[#00C8FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="hidden sm:inline-flex items-center gap-2 min-h-[40px] px-5 py-2 rounded-full bg-[#1459E8] hover:bg-[#3867FF] text-white text-xs font-semibold tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_24px_rgba(20,89,232,0.35)] hover:shadow-[0_0_32px_rgba(56,103,255,0.55)] group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C8FF]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/5 text-white hover:border-[#00C8FF]/60 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#080E1E] flex flex-col justify-between px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <YuktaraLogo variant="dark" size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 my-auto">
              {NAV_LINKS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * idx }}
                  className="font-display text-3xl font-semibold text-white hover:text-[#00C8FF] transition-colors flex items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-[#3867FF] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onToggleAudio}
                  className="inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2 rounded-full border border-white/15 text-xs font-medium tracking-wider uppercase text-slate-200"
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4 text-[#00C8FF]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  <span>Sound: {audioEnabled ? 'On' : 'Off'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenInquiry();
                  }}
                  className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[#1459E8] text-white text-sm font-semibold"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
