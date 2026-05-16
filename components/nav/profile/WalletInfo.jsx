import { useState } from "react";
import { useWallet } from "../../../lib/WalletContext";
import WalletDisplay from "./WalletDisplay";
import WalletActions from "./WalletActions";

export default function WalletInfo({ accounts, onClose }) {
  const { logout } = useWallet();

  const handleLogout = async () => {
    onClose();
    if (logout) {
      await logout();
    }
  };

  return (
    <div className="p-6 border-t border-gray-700/50 space-y-4">
      <div className="text-sm text-gray-400 mb-2">Connected wallet</div>
      <WalletDisplay accounts={accounts} />
      <WalletActions onLogout={handleLogout} />
    </div>
  );
}