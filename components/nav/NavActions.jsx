"use client";

import { useWallet } from "../../lib/WalletContext";

export default function NavActions({ onLoginClick }) {
   const { loggedIn, accounts } = useWallet();

   const formatAddress = (address) => {
      if (!address) return "";
      return `${address.substring(0, 6)}...${address.substring(
         address.length - 4
      )}`;
   };

   return (
      <button onClick={onLoginClick} className="gradient-button">
         {loggedIn ? formatAddress(accounts[0]) || "Connected" : "Login"}
      </button>
   );
}
