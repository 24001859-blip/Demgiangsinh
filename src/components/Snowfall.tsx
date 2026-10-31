import React, { useMemo } from 'react';

interface SnowflakeItem {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
}

export const Snowfall: React.FC = () => {
  const snowflakes = useMemo<SnowflakeItem[]>(() => {
    return Array.from({ length: 42 }, (_, idx) => {
      const size = idx % 4 === 0 ? 6 : idx % 2 === 0 ? 4 : 3;
      return {
        id: idx,
        left: `${(idx * 2.43) % 100}%`,
        size,
        duration: `${9 + (idx % 9) * 1.5}s`,
        delay: `-${(idx * 1.3) % 14}s`,
        opacity: 0.4 + (idx % 5) * 0.12,
      };
    });
  }, []);

  return (
    <div className="snowfall-layer" aria-hidden="true">
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="pixel-snowflake"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  );
};
