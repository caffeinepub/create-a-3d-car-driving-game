import { useRef, useState, useEffect, useCallback } from 'react';
import { mockReels } from '../data/mockReels';
import { ReelCard } from './ReelCard';

export function ReelFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const height = container.clientHeight;
    const index = Math.round(scrollTop / height);
    setActiveIndex(Math.min(index, mockReels.length - 1));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {mockReels.map((reel, index) => (
        <div
          key={reel.id}
          className="w-full snap-start snap-always"
          style={{ height: 'calc(100dvh - 56px)' }}
        >
          <ReelCard reel={reel} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
}
