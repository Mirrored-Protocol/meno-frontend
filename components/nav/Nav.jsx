"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import { useWallet } from "../../lib/WalletContext";

export default function Navbar() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { loggedIn } = useWallet();

   return (
      <nav className="flex items-center justify-between w-full px-4 md:px-10 py-4 bg-neutral-950 border-b border-gray-800 z-50 relative">
         <Logo />
         <div className="hidden md:flex  justify-center  md:w-[40vw]b xl_custom:w-[63vw] ">
            <SearchBar />
         </div>

         <div className="flex items-center gap-4">
            {loggedIn ? (
               <UserProfile className="hidden md:block" />
            ) : (
               <LoginButton className="hidden md:inline-block" />
            )}

            <button
               className="md:hidden"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               aria-label="Toggle menu">
               {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
               ) : (
                  <Menu className="w-6 h-6" />
               )}
            </button>
         </div>
      </nav>
   );
}
