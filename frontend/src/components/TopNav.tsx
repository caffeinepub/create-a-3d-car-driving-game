import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

type Tab = 'foryou' | 'following' | 'explore';

export function TopNav() {
  const [activeTab, setActiveTab] = useState<Tab>('foryou');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'following', label: 'Following' },
    { id: 'foryou', label: 'For You' },
    { id: 'explore', label: 'Explore' },
  ];

  return (
    <header className="h-14 flex-shrink-0 flex items-center justify-between px-4 bg-reel-bg/95 backdrop-blur-md border-b border-white/5 z-50 relative">
      {/* Logo */}
      <div className="flex items-center gap-2 w-20">
        <img
          src="/assets/generated/reel-icon.dim_64x64.png"
          alt="Reel icon"
          className="w-7 h-7 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <img
          src="/assets/generated/reel-logo.dim_400x100.png"
          alt="Reel"
          className="h-6 object-contain hidden sm:block"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="text-white font-extrabold text-lg tracking-tight sm:hidden">
          Reel
        </span>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-accent text-accent-foreground'
                : 'text-white/60 hover:text-white/90'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 w-20 justify-end">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          aria-label="Create"
        >
          <Plus size={18} />
        </button>
      </div>
    </header>
  );
}
