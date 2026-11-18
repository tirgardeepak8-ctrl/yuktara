import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ambientAudio } from './utils/ambientAudio';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { AudioDock } from './components/AudioDock';
import { HeroSection } from './components/HeroSection';
import { FloatingShowcaseSection } from './components/FloatingShowcaseSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ComplexityToClaritySection } from './components/ComplexityToClaritySection';
import { ProcessSection } from './components/ProcessSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyYuktaraSection } from './components/WhyYuktaraSection';
import { CtaAndFooterSection } from './components/CtaAndFooterSection';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return false;
    try {
      return sessionStorage.getItem('yuktara_intro_seen') !== '1';
    } catch {
      return true;
    }
  });

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioVolume, setAudioVolume] = useState(() => ambientAudio.getVolume());
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState('');

  // Lenis smooth scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('yuktara_intro_seen', '1');
    } catch {
      // ignore
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setShowIntro(true);
  }, []);

  const handleToggleAudio = useCallback(() => {
    if (audioEnabled) {
      ambientAudio.stop();
      setAudioEnabled(false);
    } else {
      const started = ambientAudio.start();
      setAudioEnabled(started);
    }
  }, [audioEnabled]);

  const handleVolumeChange = useCallback((nextVolume: number) => {
    setAudioVolume(nextVolume);
    ambientAudio.setVolume(nextVolume);
  }, []);

  const openInquiry = useCallback((topic = '') => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  }, []);

  const scrollToSolutions = useCallback(() => {
    const el = document.querySelector('#solutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#080E1E] text-white selection:bg-[#3867FF] selection:text-white">
      {/* Cinematic Opening Sequence */}
      <CinematicIntro visible={showIntro} onComplete={handleIntroComplete} />

      {/* Floating 3-Zone Navigation */}
      <Navbar
        onOpenInquiry={() => openInquiry()}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Editorial Storytelling Flow */}
      <main>
        <HeroSection
          introDone={!showIntro}
          onExploreSolutions={scrollToSolutions}
          onStartProject={() => openInquiry()}
        />

        <FloatingShowcaseSection />

        <AboutSection />

        <ServicesSection onSelectProjectInquiry={(serviceTitle) => openInquiry(serviceTitle)} />

        <ComplexityToClaritySection />

        <ProcessSection />

        <IndustriesSection />

        <ProjectsSection onDiscussProject={(projectName) => openInquiry(projectName)} />

        <WhyYuktaraSection />

        <CtaAndFooterSection
          onStartProject={() => openInquiry()}
          onReplayIntro={handleReplayIntro}
        />
      </main>

      {/* Subtle Bottom-Right Sound Control */}
      <AudioDock
        audioEnabled={audioEnabled}
        volume={audioVolume}
        onToggle={handleToggleAudio}
        onVolumeChange={handleVolumeChange}
      />

      {/* Project Inquiry Modal */}
      <ProjectInquiryModal
        open={inquiryOpen}
        initialTopic={inquiryTopic}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
}
