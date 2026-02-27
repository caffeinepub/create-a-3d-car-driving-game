import { TopNav } from './components/TopNav';
import { ReelFeed } from './components/ReelFeed';

export default function App() {
  return (
    <div className="flex flex-col h-dvh bg-reel-bg overflow-hidden">
      <TopNav />
      <ReelFeed />
      {/* Footer attribution */}
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <p className="text-white/30 text-[10px] font-medium whitespace-nowrap">
          © {new Date().getFullYear()} Built with{' '}
          <span className="text-accent">♥</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'reel-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline pointer-events-auto hover:text-white/60 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
