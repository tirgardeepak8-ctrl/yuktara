import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { BRAND_CONFIG, SERVICES } from '../data/yuktaraData';

interface ProjectInquiryModalProps {
  open: boolean;
  initialTopic?: string;
  onClose: () => void;
}

export function ProjectInquiryModal({
  open,
  initialTopic = '',
  onClose,
}: ProjectInquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    initialTopic || SERVICES[0].title
  );
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setSelectedService(initialTopic);
    }
  }, [initialTopic]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name or organization.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid business email address.');
      return;
    }
    if (phone.trim() && phone.trim().length < 7) {
      setError('Please provide a valid phone number or leave it blank.');
      return;
    }
    if (!brief.trim()) {
      setError('Please share a short overview of what you want to build.');
      return;
    }

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setBrief('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="absolute inset-0 bg-[#050914]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl rounded-3xl bg-[#0D162E] border border-white/15 text-white p-6 sm:p-9 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C8FF]">
                  Start a Project
                </p>
                <h2 id="inquiry-modal-title" className="font-display text-2xl sm:text-3xl font-bold mt-1">
                  Let&apos;s engineer what&apos;s next.
                </h2>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close project inquiry modal"
                className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#00C8FF] mx-auto" />
                <h3 className="font-display text-2xl font-semibold text-white">
                  Inquiry Recorded
                </h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Your brief for <span className="text-white font-medium">{selectedService}</span> is ready. You can also reach us directly at{' '}
                  <a href={BRAND_CONFIG.phoneHref} className="text-[#00C8FF] underline">
                    {BRAND_CONFIG.phone}
                  </a>{' '}
                  or{' '}
                  <a href={BRAND_CONFIG.emailHref} className="text-[#00C8FF] underline">
                    {BRAND_CONFIG.email}
                  </a>
                  .
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="min-h-[44px] px-7 py-2.5 rounded-full bg-[#1459E8] hover:bg-[#3867FF] text-white text-sm font-semibold cursor-pointer"
                  >
                    Return to Site
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inq-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Name / Organization
                    </label>
                    <input
                      id="inq-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name or company"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00C8FF] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="inq-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Business Email
                    </label>
                    <input
                      id="inq-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00C8FF] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inq-phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone (Optional)
                    </label>
                    <input
                      id="inq-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 ..."
                      className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00C8FF] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="inq-scope" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Primary Focus
                    </label>
                    <select
                      id="inq-scope"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-xl bg-[#080E1E] border border-white/15 focus:border-[#00C8FF] px-4 py-2.5 text-sm text-white outline-none transition-colors"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Enterprise Transformation">Enterprise Transformation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="inq-brief" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Overview
                  </label>
                  <textarea
                    id="inq-brief"
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Briefly describe your operational challenge, product vision, or timeline."
                    className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00C8FF] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs font-medium text-rose-400" role="alert">
                    {error}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    Direct line: {BRAND_CONFIG.phone}
                  </span>
                  <button
                    type="submit"
                    className="min-h-[44px] px-7 py-2.5 rounded-full bg-[#1459E8] hover:bg-[#3867FF] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Submit Project Brief
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
