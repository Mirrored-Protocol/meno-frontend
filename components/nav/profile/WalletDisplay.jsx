import { useState } from "react";
import { Wallet, Copy, Check } from "lucide-react";

export default function WalletDisplay({ accounts }) {
  const [copied, setCopied] = useState(false);

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (accounts[0]) {
      await navigator.clipboard.writeText(accounts[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Wallet Address with Copy */}
      <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-medium text-sm">Stellar Prototype</div>
            <div className="text-gray-400 text-xs">{formatAddress(accounts[0])}</div>
          </div>
        </div>
        <button
          onClick={copyAddress}
          className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Balance Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Lumens balance preview</span>
          <span className="text-sm text-gray-400">Prototype session</span>
        </div>
      </div>
    </>
  );
}
