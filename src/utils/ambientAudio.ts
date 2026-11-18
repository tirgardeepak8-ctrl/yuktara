/**
 * Procedural Ambient Audio Engine using Web Audio API.
 * Generates a subtle futuristic midnight ambient pad with zero external files.
 * Audio stays OFF until explicitly activated by visitor interaction.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private isPlaying = false;
  private volume = 0.28;

  constructor() {
    try {
      const savedVolume = localStorage.getItem('yuktara_audio_volume');
      if (savedVolume !== null) {
        const parsed = parseFloat(savedVolume);
        if (!Number.isNaN(parsed)) {
          this.volume = Math.max(0, Math.min(1, parsed));
        }
      }
    } catch {
      // ignore storage errors in restricted iframes
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    return this.ctx;
  }

  public start(): boolean {
    const ctx = this.ensureContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    if (this.isPlaying) return true;

    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, this.volume * 0.22), now + 1.4);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, now);
    filter.Q.setValueAtTime(1.2, now);

    // Subtle slow filter modulation LFO for breathing atmospheric pad
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now);
    lfoGain.gain.setValueAtTime(140, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);

    // Harmonic chord: Deep A1 (55Hz), E2 (82.41Hz), B2 (123.47Hz), C#3 (138.59Hz)
    const freqs = [
      { freq: 55.0, type: 'sine' as OscillatorType, gain: 0.42 },
      { freq: 82.41, type: 'triangle' as OscillatorType, gain: 0.16 },
      { freq: 110.0, type: 'sine' as OscillatorType, gain: 0.2 },
      { freq: 164.81, type: 'sine' as OscillatorType, gain: 0.09 },
      { freq: 220.4, type: 'sine' as OscillatorType, gain: 0.05 },
    ];

    const createdOscs: OscillatorNode[] = [];
    for (const voice of freqs) {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();
      osc.type = voice.type;
      osc.frequency.setValueAtTime(voice.freq, now);
      voiceGain.gain.setValueAtTime(voice.gain, now);
      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start(now);
      createdOscs.push(osc);
    }

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    this.masterGain = masterGain;
    this.filterNode = filter;
    this.lfo = lfo;
    this.oscillators = createdOscs;
    this.isPlaying = true;

    try {
      localStorage.setItem('yuktara_audio_pref', 'on');
    } catch {
      // ignore
    }

    return true;
  }

  public stop(): void {
    if (!this.ctx || !this.masterGain || !this.isPlaying) {
      this.isPlaying = false;
      return;
    }

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const gain = this.masterGain;
    const oscs = [...this.oscillators];
    const lfo = this.lfo;

    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    window.setTimeout(() => {
      oscs.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {
          // ignore
        }
      });
      if (lfo) {
        try {
          lfo.stop();
          lfo.disconnect();
        } catch {
          // ignore
        }
      }
      try {
        this.filterNode?.disconnect();
        gain.disconnect();
      } catch {
        // ignore
      }
    }, 650);

    this.oscillators = [];
    this.lfo = null;
    this.masterGain = null;
    this.filterNode = null;
    this.isPlaying = false;

    try {
      localStorage.setItem('yuktara_audio_pref', 'off');
    } catch {
      // ignore
    }
  }

  public setVolume(value: number): void {
    this.volume = Math.max(0, Math.min(1, value));
    try {
      localStorage.setItem('yuktara_audio_volume', String(this.volume));
    } catch {
      // ignore
    }
    if (this.ctx && this.masterGain && this.isPlaying) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(Math.max(0.005, this.volume * 0.22), now, 0.12);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioEngine();
