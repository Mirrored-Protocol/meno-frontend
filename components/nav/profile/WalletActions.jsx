import { LogOut } from "lucide-react";

export default function WalletActions({ onLogout }) {
  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
          Buy Assets
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
          List Assets
        </button>
      </div>

      {/* Disconnect Button */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 py-3 hover:bg-red-500/10 rounded-lg transition-colors mt-4"
      >
        <LogOut className="w-4 h-4" />
        <span className="font-medium">Disconnect</span>
      </button>
    </>
  );
}
