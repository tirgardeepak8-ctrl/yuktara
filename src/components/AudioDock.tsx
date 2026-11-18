import { Volume2, VolumeX } from 'lucide-react';

interface AudioDockProps {
  audioEnabled: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (nextVolume: number) => void;
}

export function AudioDock({
  audioEnabled,
  volume,
  onToggle,
  onVolumeChange,
}: AudioDockProps) {
  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0B1328]/85 border border-white/15 text-white shadow-lg"
      role="region"
      aria-label="Ambient Sound Controls"
    >
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-slate-200 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C8FF]"
        aria-pressed={audioEnabled}
      >
        {audioEnabled ? (
          <Volume2 className="w-3.5 h-3.5 text-[#00C8FF]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span>Sound: {audioEnabled ? 'On' : 'Off'}</span>
      </button>

      {audioEnabled && (
        <label className="flex items-center gap-1.5 pl-2 border-l border-white/15">
          <span className="sr-only">Ambient audio volume</span>
          <input
            type="range"
            min={0.05}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 accent-[#00C8FF] cursor-pointer"
          />
        </label>
      )}
    </div>
  );
}
