"use client";
import { useWallet } from "../../lib/WalletContext";

export default function LoginButton({ className = "" }) {
   const { login } = useWallet();

   return (
      <button
         onClick={login}
         className={`gradient-button text-black font-semibold px-9 py-3 rounded-md transition transform hover:scale-105 ${className}`}>
         Connect Wallet
      </button>
   );
}
