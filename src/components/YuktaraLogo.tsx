interface YuktaraLogoProps {
  variant?: 'dark' | 'light';
  showWordmark?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function YuktaraLogo({
  variant = 'dark',
  showWordmark = true,
  className = '',
  size = 'md',
}: YuktaraLogoProps) {
  const iconDim = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-11 w-11' : 'h-8 w-8';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#101B35]';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconDim} shrink-0`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="yuktara-y-left" x1="12" y1="12" x2="34" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0E349A" />
            <stop offset="100%" stopColor="#1459E8" />
          </linearGradient>
          <linearGradient id="yuktara-y-right" x1="48" y1="12" x2="26" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3867FF" />
            <stop offset="100%" stopColor="#00C8FF" />
          </linearGradient>
          <linearGradient id="yuktara-arc" x1="8" y1="48" x2="54" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C8FF" />
            <stop offset="55%" stopColor="#3867FF" />
            <stop offset="100%" stopColor="#00C8FF" />
          </linearGradient>
        </defs>

        {/* Left wing of sculpted geometric Y */}
        <path
          d="M12 14L27.5 34.5L27.5 55L33.5 50.5L33.5 31L21 14H12Z"
          fill="url(#yuktara-y-left)"
        />
        {/* Right wing and stem highlight */}
        <path
          d="M49 14L33.5 34.5L33.5 50.5L27.5 55V34.5L40 14H49Z"
          fill="url(#yuktara-y-right)"
        />
        {/* Orbital ascending arc */}
        <path
          d="M14 45C7.5 41.5 9.5 30.5 22 21.5C34.5 12.5 47.5 9.5 52.5 14C56.5 17.5 51.5 27.5 41.5 35.5C30.5 44.5 19.5 48 14 45Z"
          stroke="url(#yuktara-arc)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* 4-point intelligence spark */}
        <path
          d="M52 5L53.3 9.2L57.5 10.5L53.3 11.8L52 16L50.7 11.8L46.5 10.5L50.7 9.2L52 5Z"
          fill="#00C8FF"
        />
      </svg>

      {showWordmark && (
        <span
          className={`font-display font-bold tracking-[0.14em] uppercase text-sm md:text-[15px] leading-none whitespace-nowrap ${textColor}`}
        >
          Yuktara Infotech
        </span>
      )}
    </span>
  );
}
