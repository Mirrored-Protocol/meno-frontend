import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, DollarSign } from 'lucide-react';
import { useWallet } from '../lib/WalletContext';
import { DISPLAY_ASSET_SYMBOL, formatPrice } from '../lib/utils';

// Mock asset data structure - replace with real API calls
const generateAssetData = (collectionId, tokenId) => {
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
    description: 'A collectible digital asset from the Akuma collection featuring distinctive traits and characteristics.',
    owner: 'G...PROTOTYPE',
    creator: 'G...CREATOR'
  };
};

// Loading Skeleton Component
const AssetDetailSkeleton = () => (
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

// Main Asset Detail Component
const AssetDetailPage = ({ collectionId, tokenId, onClose, onAddToCart }) => {
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const { loggedIn } = useWallet();

  useEffect(() => {
    // Simulate API call
    const fetchAssetData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const data = generateAssetData(collectionId, tokenId);
      setAssetData(data);
      setLoading(false);
    };

    fetchAssetData();
  }, [collectionId, tokenId]);

  const handleFavorite = () => {
    if (!loggedIn) {
      setStatusMessage({
        tone: 'warning',
        text: 'Connect a wallet session to save favorites.',
      });
      return;
    }
    setStatusMessage(null);
    setIsFavorited(!isFavorited);
  };

  const handleBuy = () => {
    if (!loggedIn) {
      setStatusMessage({
        tone: 'warning',
        text: 'Connect a wallet session before adding this asset to checkout.',
      });
      return;
    }
    setStatusMessage({
      tone: 'success',
      text: 'Asset added to your checkout queue.',
    });
    onAddToCart && onAddToCart(assetData);
  };

  const handleSell = () => {
    if (!loggedIn) {
      setStatusMessage({
        tone: 'warning',
        text: 'Connect a wallet session before listing assets.',
      });
      return;
    }
    setStatusMessage({
      tone: 'info',
      text: 'Listing flow is still staged while Stellar settlement is being integrated.',
    });
    console.log('List asset:', assetData);
  };

  if (loading) {
    return <AssetDetailSkeleton />;
  }

  if (!assetData) {
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
                {assetData.name} {assetData.number}
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
            {/* Asset Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden">
                <img
                  src={assetData.image}
                  alt={`${assetData.name} ${assetData.number}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Description */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-300 text-sm">{assetData.description}</p>
              </div>
            </div>

            {/* Asset Details */}
            <div className="space-y-6">
              {/* Pricing Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">List Price</div>
                  <div className="text-white font-bold text-lg">{formatPrice(assetData.listPrice, { symbol: DISPLAY_ASSET_SYMBOL })}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Floor Price</div>
                  <div className="text-white font-bold text-lg">{formatPrice(assetData.floorPrice, { symbol: DISPLAY_ASSET_SYMBOL })}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Top Offer</div>
                  <div className="text-white font-bold text-lg">{formatPrice(assetData.topOffer, { symbol: DISPLAY_ASSET_SYMBOL })}</div>
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
                  <span>Buy {formatPrice(assetData.listPrice, { symbol: DISPLAY_ASSET_SYMBOL })}</span>
                </button>
                <button
                  onClick={handleSell}
                  disabled={!loggedIn}
                  className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <DollarSign size={20} />
                  <span>List Asset</span>
                </button>
              </div>

              {statusMessage && (
                <div
                  className={`rounded-lg border p-4 text-sm ${
                    statusMessage.tone === 'success'
                      ? 'bg-emerald-950 border-emerald-700 text-emerald-200'
                      : statusMessage.tone === 'info'
                        ? 'bg-blue-950 border-blue-700 text-blue-200'
                        : 'bg-yellow-900 border-yellow-600 text-yellow-200'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Traits Section */}
              <div>
                <h3 className="text-white font-semibold mb-4">Traits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {assetData.traits.map((trait, index) => (
                    <TraitCard key={index} trait={trait} />
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Asset ID</span>
                    <span className="text-white">{assetData.tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Sale</span>
                    <span className="text-white">{formatPrice(assetData.lastSale, { symbol: DISPLAY_ASSET_SYMBOL })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span className="text-white">{assetData.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Creator</span>
                    <span className="text-white">{assetData.creator}</span>
                  </div>
                </div>
              </div>

              {!loggedIn && (
                <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    Connect a wallet session to purchase or interact with this asset.
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

export default AssetDetailPage;
