import { useRef, useState, useEffect } from 'react';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { Reel } from '../types/reel';
import { ActionIcons } from './ActionIcons';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export function ReelCard({ reel, isActive }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  // Gradient colors for fallback backgrounds
  const gradients = [
    'from-rose-900 via-orange-800 to-amber-700',
    'from-slate-900 via-zinc-800 to-stone-700',
    'from-teal-900 via-cyan-800 to-sky-700',
    'from-emerald-900 via-green-800 to-lime-700',
    'from-fuchsia-900 via-pink-800 to-rose-700',
    'from-amber-900 via-orange-800 to-red-700',
  ];
  const gradientIndex = parseInt(reel.id) % gradients.length;

  return (
    <div className="relative w-full h-full flex-shrink-0 overflow-hidden bg-reel-bg">
      {/* Video / Fallback Background */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={muted}
          playsInline
          onError={() => setVideoError(true)}
          onClick={togglePlay}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-b ${gradients[gradientIndex]} flex items-center justify-center`}
          onClick={togglePlay}
        >
          <div className="text-8xl opacity-30 select-none">{reel.tags[0] === 'sunset' ? '🌅' : reel.tags[0] === 'city' ? '🌆' : reel.tags[0] === 'ocean' ? '🌊' : reel.tags[0] === 'mountains' ? '🏔️' : reel.tags[0] === 'forest' ? '🌿' : '🏜️'}</div>
        </div>
      )}

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

      {/* Top gradient for nav visibility */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Play/Pause tap area */}
      <button
        className="absolute inset-0 w-full h-full focus:outline-none"
        onClick={togglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <Play size={28} className="text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </button>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/60 transition-colors z-10"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Right side action icons */}
      <div className="absolute right-3 bottom-28 z-10">
        <ActionIcons
          likes={reel.likes}
          comments={reel.comments}
          shares={reel.shares}
        />
      </div>

      {/* Bottom info overlay */}
      <div className="absolute bottom-0 left-0 right-16 p-4 pb-6 z-10">
        {/* Author */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm flex-shrink-0">
            {reel.author.charAt(0)}
          </div>
          <span className="text-white font-bold text-sm drop-shadow-md">
            {reel.authorHandle}
          </span>
          <button className="ml-1 px-3 py-0.5 rounded-full border border-white/70 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
            Follow
          </button>
        </div>

        {/* Title */}
        <h2 className="text-white font-extrabold text-lg leading-tight drop-shadow-md mb-1">
          {reel.title}
        </h2>

        {/* Description */}
        <p className="text-white/80 text-sm leading-snug drop-shadow-md line-clamp-2">
          {reel.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {reel.tags.map((tag) => (
            <span
              key={tag}
              className="text-accent text-xs font-bold drop-shadow-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
