import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DISPLAY_ASSET_SYMBOL, formatPrice } from '../lib/utils';
import NFTDetailPage from './NFTDetailPage';
import { useShoppingCart } from './ShoppingCartProvider';
import TermsAgreement from './TermsAgreement';
import BankWithdrawalForm from './BankWithdrawalForm';

const NFTCard = ({ collection, showFiat }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const { addToCart } = useShoppingCart();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleCardClick = () => {
    setShowDetail(true);
  };

  const handleAddToCart = (nftData) => {
    addToCart(nftData);
    setShowDetail(false);
  };

  const handleSellFlow = (nftData) => {
    setSelectedNFT(nftData);
    setShowDetail(false);
    setShowTerms(true);
  };

  const handleTermsAgree = () => {
    setShowTerms(false);
    setShowWithdrawal(true);
  };

  const handleWithdrawalComplete = () => {
    setShowWithdrawal(false);
    setSelectedNFT(null);
    // Could show success message or redirect
  };

  const handleBackToDetail = () => {
    setShowTerms(false);
    setShowDetail(true);
  };

  const handleBackToTerms = () => {
    setShowWithdrawal(false);
    setShowTerms(true);
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 group border border-gray-800 flex cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Collection Image */}
        <div className="w-36 bg-gray-800 flex items-center justify-center p-4 flex-shrink-0 overflow-hidden">
          {collection.image ? (
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-150"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-150">
              <span className="text-white font-bold text-lg">
                {collection.name?.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Collection Info */}
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white text-base">
                {collection.name}
              </h3>
              {collection.verified && (
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">✓</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-400 text-xs">Volume</p>
                <p className="font-medium text-white">
                  {formatPrice(collection.volume, {
                    showFiat,
                    symbol: DISPLAY_ASSET_SYMBOL,
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">24h</p>
                <p
                  className={`font-medium ${
                    collection.change24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {collection.change24h >= 0 ? "+" : ""}
                  {collection.change24h}%
                </p>
              </div>
            </div>
          </div>

          <button 
            className="w-full py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            View Collection
          </button>
        </div>
      </motion.div>

      {/* NFT Detail Modal */}
      {showDetail && (
        <NFTDetailPage
          collectionId={collection.id}
          tokenId={Math.floor(Math.random() * 9999) + 1}
          onClose={() => setShowDetail(false)}
          onAddToCart={handleAddToCart}
          onSell={handleSellFlow}
        />
      )}

      {/* Terms Agreement Modal */}
      {showTerms && selectedNFT && (
        <TermsAgreement
          onAgree={handleTermsAgree}
          onBack={handleBackToDetail}
          onClose={() => {
            setShowTerms(false);
            setSelectedNFT(null);
          }}
        />
      )}

      {/* Bank Withdrawal Modal */}
      {showWithdrawal && selectedNFT && (
        <BankWithdrawalForm
          nftValue={selectedNFT.listPrice}
          onBack={handleBackToTerms}
          onComplete={handleWithdrawalComplete}
        />
      )}
    </>
  );
};

export default NFTCard;
