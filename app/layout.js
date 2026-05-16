import "./globals.css";
import { WalletProvider } from "../lib/WalletContext";

export const metadata = {
   title: "Meno - Stellar Digital Asset Marketplace",
   description: "Discover digital collectibles and prepare for Stellar-native settlement flows.",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className="bg-violet-400 text-white">
            <WalletProvider>
               {children}
            </WalletProvider>
         </body>
      </html>
   );
}
