"use client";

import Modal from "../Modal";
import { useWeb3Auth } from "../../lib/Web3AuthContext";

export default function LoginModal({ isOpen, onClose }) {
   const { loggedIn, loading, userInfo, accounts, balance, login, logout } =
      useWeb3Auth();

   const handleLogin = async () => {
      try {
         await login();
         onClose();
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   const handleLogout = async () => {
      try {
         await logout();
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   const formatBalance = (balance) => {
      const parsed = Number.parseFloat(balance);
      if (Number.isNaN(parsed)) return "0.000";
      return parsed.toFixed(3);
   };

   const formatAddress = (address) => {
      if (!address) return "";
      return `${address.substring(0, 6)}...${address.substring(
         address.length - 4
      )}`;
   };

   if (loading) {
      return (
         <Modal isOpen={isOpen} onClose={onClose} title="Initializing...">
            <div className="space-y-4 text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400 mx-auto"></div>
               <p className="text-gray-300">Restoring prototype wallet...</p>
            </div>
         </Modal>
      );
   }

   if (loggedIn) {
      return (
         <Modal isOpen={isOpen} onClose={onClose} title="Wallet Connected">
            <div className="space-y-4">
               {userInfo && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                     <h3 className="text-white font-medium mb-2">
                        Account Info
                     </h3>
                     <p className="text-gray-300 text-sm">
                        Email: {userInfo.email || "N/A"}
                     </p>
                     <p className="text-gray-300 text-sm">
                        Name: {userInfo.name || "N/A"}
                     </p>
                  </div>
               )}

               {accounts.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                     <h3 className="text-white font-medium mb-2">
                        Wallet Details
                     </h3>
                     <p className="text-gray-300 text-sm mb-1">
                        Address: {formatAddress(accounts[0])}
                     </p>
                     <p className="text-gray-300 text-sm">
                        Balance: {formatBalance(balance)} XLM
                     </p>
                  </div>
               )}

               <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Disconnect Wallet
               </button>
            </div>
         </Modal>
      );
   }

   return (
      <Modal isOpen={isOpen} onClose={onClose} title="Login to Meno">
         <div className="space-y-4">
            <p className="text-gray-300">
               Start a local prototype wallet session to continue
            </p>
            <div className="space-y-3">
               <button
                  onClick={handleLogin}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Launch Prototype Wallet
               </button>

               {["Freighter", "Albedo", "WalletConnect"].map(
                  (wallet) => (
                     <button
                        key={wallet}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                        disabled>
                        Connect {wallet} (Planned)
                     </button>
                  )
               )}
            </div>
         </div>
      </Modal>
   );
}
