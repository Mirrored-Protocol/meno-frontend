import { ChevronRight, Search, Wallet, User, Heart } from "lucide-react";

export default function ExploreMenu({ isOpen, onToggle, onNavigate }) {
  const exploreSubItems = [
    { icon: Wallet, label: "Portfolio", path: "/portfolio" },
    { icon: User, label: "Assets", path: "/nfts" },
    { icon: Heart, label: "Favourites", path: "/favourites" },
  ];

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
      >
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5" />
          <span className="text-base font-normal">Explore</span>
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      
      {/* Explore Sub-items */}
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        {exploreSubItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate(item.path)}
            className="w-full px-6 py-3 text-left flex items-center gap-4 hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white ml-6"
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-normal">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
