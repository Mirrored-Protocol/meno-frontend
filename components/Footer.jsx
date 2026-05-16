import React from "react";
import { FaTwitter, FaGithub, FaTelegram, FaDiscord } from "react-icons/fa";
import Logo from "./nav/Logo";

export default function Footer() {
   return (
      <footer className="bg-gray-900 border-t border-gray-800">
         <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               {/* Left side - Logo and copyright */}
               <div className="flex flex-col md:flex-row items-center gap-4">
                  <Logo />
                  <div className="text-gray-400 text-sm">
                     Your digital asset marketplace for the Stellar transition | © 2025 MENO
                  </div>
               </div>

               {/* Right side - Social links */}
               <div className="flex items-center gap-4">
                  <a
                     href="#"
                     className="text-gray-600 hover:text-purple-500 transition-colors">
                     <FaTwitter size={20} />
                  </a>

                  <a
                     href="https://github.com/abokixyz"
                     className="text-gray-600 hover:text-purple-500 transition-colors">
                     <FaGithub size={20} />
                  </a>

                  <a
                     href="#"
                     className="text-gray-600 hover:text-purple-500 transition-colors">
                     <FaTelegram size={20} />
                  </a>

                  <a
                     href="#"
                     className="text-gray-600 hover:text-purple-500 transition-colors">
                     <FaDiscord size={20} />
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
}
