import { useState } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import { useWallet } from "../../lib/WalletContext";
import UserProfileModal from "./UserProfileModal";

export default function UserProfile({ className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accounts } = useWallet();

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex items-center gap-2 gradient-button text-black font-semibold px-6 py-3 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-0"
        >
          <Wallet className="w-4 h-4" />
          <span>{formatAddress(accounts[0]) || "Connected"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isModalOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <UserProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}