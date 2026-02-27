import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface ActionIconsProps {
  likes: number;
  comments: number;
  shares: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

export function ActionIcons({ likes, comments, shares }: ActionIconsProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Like */}
      <button
        onClick={handleLike}
        className="flex flex-col items-center gap-1 group"
        aria-label="Like"
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            liked
              ? 'bg-accent text-accent-foreground scale-110'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Heart
            size={22}
            className={liked ? 'fill-current' : ''}
          />
        </div>
        <span className="text-white text-xs font-bold drop-shadow-md">
          {formatCount(likeCount)}
        </span>
      </button>

      {/* Comment */}
      <button
        className="flex flex-col items-center gap-1 group"
        aria-label="Comment"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all duration-200">
          <MessageCircle size={22} />
        </div>
        <span className="text-white text-xs font-bold drop-shadow-md">
          {formatCount(comments)}
        </span>
      </button>

      {/* Share */}
      <button
        className="flex flex-col items-center gap-1 group"
        aria-label="Share"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all duration-200">
          <Share2 size={22} />
        </div>
        <span className="text-white text-xs font-bold drop-shadow-md">
          {formatCount(shares)}
        </span>
      </button>

      {/* Save */}
      <button
        onClick={() => setSaved((prev) => !prev)}
        className="flex flex-col items-center gap-1 group"
        aria-label="Save"
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            saved
              ? 'bg-accent text-accent-foreground scale-110'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Bookmark size={22} className={saved ? 'fill-current' : ''} />
        </div>
      </button>
    </div>
  );
}
