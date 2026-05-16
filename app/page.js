'use client';
import { useWallet } from "../lib/WalletContext";
import Navbar from "../components/nav/Nav";
import ConnectedNavbar from "../components/nav/ConnectedNavbar";
import Hero from "../components/Hero";
import AssetGrid from "../components/AssetGrid";
import ActionSection from "../components/ActionSection";
import CollectionTable from "../components/CollectionTable";
import Footer from "../components/Footer";
import { ShoppingCartProvider } from '../components/ShoppingCartProvider';

// Wrap your app with ShoppingCartProvider

export default function Home() {
  const { loggedIn } = useWallet();

  if (loggedIn) {
    return (
      <ShoppingCartProvider>
      <div className="min-h-screen bg-neutral">
        <ConnectedNavbar />
        <Hero />
        <CollectionTable />
      </div>
      </ShoppingCartProvider>
    );
  }

  return (
    <ShoppingCartProvider>
       <div className="min-h-screen bg-neutral">
        <Navbar />
        <Hero />
        <CollectionTable />
        <AssetGrid />
        <ActionSection />
        <Footer />
      </div>
    </ShoppingCartProvider>
   
  );
}