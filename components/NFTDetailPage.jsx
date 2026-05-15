import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, DollarSign } from 'lucide-react';
import { useWeb3Auth } from '../lib/Web3AuthContext';
import { DISPLAY_ASSET_SYMBOL, formatPrice } from '../lib/utils';

// Mock NFT data structure - replace with real API calls
const generateNFTData = (collectionId, tokenId) => {
  return {
    id: `${collectionId}-${tokenId}`,
    collectionId,
    tokenId,
    name: `Collection ${collectionId.toString().padStart(3, '0')}`,
    number: `#${tokenId}`,
    image: '/akuma-characters.png', // Using your existing image
    listPrice: 10.5,
    floorPrice: 10.0,
    topOffer: 10.0,
    lastSale: 9.8,
    traits: [
      { type: 'Background', value: 'Orange Sunset', rarity: 30 },
      { type: 'Eyes', value: 'Focused', rarity: 15 },
      { type: 'Outfit', value: 'Casual Wear', rarity: 45 },
      { type: 'Accessory', value: 'Headphones', rarity: 8 }
    ],
    description: 'A unique NFT from the Akuma collection featuring distinctive traits and characteristics.',
    owner: '0x1234...5678',
    creator: '0x8765...4321'
  };
};

// Loading Skeleton Component
const NFTDetailSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-700 rounded-xl animate-pulse"></div>
        
        {/* Details skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-700 rounded w-2/3 animate-pulse"></div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Trait Component
const TraitCard = ({ trait }) => (
  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
    <div className="text-xs text-gray-400 mb-1">{trait.type}</div>
    <div className="text-white font-medium text-sm mb-1">{trait.value}</div>
    <div className="text-xs text-blue-400">{trait.rarity}% rarity</div>
  </div>
);

// Main NFT Detail Component
const NFTDetailPage = ({ collectionId, tokenId, onClose, onAddToCart }) => {
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { loggedIn } = useWeb3Auth();

  useEffect(() => {
    // Simulate API call
    const fetchNFTData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const data = generateNFTData(collectionId, tokenId);
      setNftData(data);
      setLoading(false);
    };

    fetchNFTData();
  }, [collectionId, tokenId]);

  const handleFavorite = () => {
    if (!loggedIn) {
      alert('Please login to add favorites');
      return;
    }
    setIsFavorited(!isFavorited);
  };

  const handleBuy = () => {
    if (!loggedIn) {
      alert('Please login to purchase NFTs');
      return;
    }
    onAddToCart && onAddToCart(nftData);
  };

  const handleSell = () => {
    if (!loggedIn) {
      alert('Please login to sell NFTs');
      return;
    }
    // Handle sell logic
    console.log('Sell NFT:', nftData);
  };

  if (loading) {
    return <NFTDetailSkeleton />;
  }

  if (!nftData) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">
                {nftData.name} {nftData.number}
              </h1>
              <button
                onClick={handleFavorite}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Star
                  size={20}
                  fill={isFavorited ? "#fbbf24" : "none"}
                  className={isFavorited ? "text-yellow-400" : ""}
                />
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NFT Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden">
                <img
                  src={nftData.image}
                  alt={`${nftData.name} ${nftData.number}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Description */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-300 text-sm">{nftData.description}</p>
              </div>
            </div>

            {/* NFT Details */}
            <div className="space-y-6">
              {/* Pricing Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">List Price</div>
                  <div className="text-white font-bold text-lg">{formatPrice(nftData.listPrice, { symbol: DISPLAY_ASSET_SYMBOL })}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Floor Price</div>
                  <div className="text-white font-bold text-lg">{formatPrice(nftData.floorPrice, { symbol: DISPLAY_ASSET_SYMBOL })}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Top Offer</div>
                  <div className="text-white font-bold text-lg">{formatPrice(nftData.topOffer, { symbol: DISPLAY_ASSET_SYMBOL })}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleBuy}
                  disabled={!loggedIn}
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <ShoppingCart size={20} />
                  <span>Buy {formatPrice(nftData.listPrice, { symbol: DISPLAY_ASSET_SYMBOL })}</span>
                </button>
                <button
                  onClick={handleSell}
                  disabled={!loggedIn}
                  className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <DollarSign size={20} />
                  <span>Sell</span>
                </button>
              </div>

              {/* Traits Section */}
              <div>
                <h3 className="text-white font-semibold mb-4">Traits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {nftData.traits.map((trait, index) => (
                    <TraitCard key={index} trait={trait} />
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token ID</span>
                    <span className="text-white">{nftData.tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Sale</span>
                    <span className="text-white">{formatPrice(nftData.lastSale, { symbol: DISPLAY_ASSET_SYMBOL })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span className="text-white">{nftData.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Creator</span>
                    <span className="text-white">{nftData.creator}</span>
                  </div>
                </div>
              </div>

              {!loggedIn && (
                <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    Please login to purchase or interact with NFTs
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NFTDetailPage;
