import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CreditCard } from 'lucide-react';
import { useWallet } from '../lib/WalletContext';
import { DISPLAY_ASSET_SYMBOL, formatPrice } from '../lib/utils';

// Shopping Cart Context
const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within ShoppingCartProvider');
  }
  return context;
};

// Shopping Cart Provider
export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (asset) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === asset.id);
      if (exists) {
        return prev; // Don't add duplicates
      }
      return [...prev, { ...asset, addedAt: Date.now() }];
    });
  };

  const removeFromCart = (nftId) => {
    setCartItems(prev => prev.filter(item => item.id !== nftId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.listPrice, 0);
  };

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
      <CheckoutModal />
    </ShoppingCartContext.Provider>
  );
};

// Checkout Modal Component
const CheckoutModal = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getTotalPrice,
    isCheckoutOpen,
    closeCheckout,
  } = useShoppingCart();
  const { loggedIn } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState(null);

  const handlePurchase = async () => {
    if (!loggedIn) {
      setCheckoutMessage({
        tone: 'warning',
        text: 'Connect a wallet session before completing checkout.',
      });
      return;
    }

    setCheckoutMessage(null);
    setIsProcessing(true);
    
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccess(true);
    
    // Clear cart after successful purchase
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
      closeCheckout();
    }, 3000);
  };

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={closeCheckout}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto border border-gray-700"
          onClick={e => e.stopPropagation()}
        >
          {showSuccess ? (
            <SuccessScreen />
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white">Checkout</h2>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {cartItems.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center space-x-1"
                  >
                    <X size={16} />
                    <span>Clear</span>
                  </button>
                  <button
                    onClick={closeCheckout}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={`${item.name} ${item.number}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-xs transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">
                            {item.name} {item.number}
                          </h3>
                          <p className="text-gray-400 text-xs">
                            Collection #{item.collectionId}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {formatPrice(item.listPrice, { symbol: DISPLAY_ASSET_SYMBOL })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-lg font-bold text-white">
                        {formatPrice(getTotalPrice(), { symbol: DISPLAY_ASSET_SYMBOL })}
                      </span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mb-6 text-xs text-gray-400">
                    By completing this staged checkout you agree to the current Meno terms of service.
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing || !loggedIn}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        <span>Complete Purchase</span>
                      </>
                    )}
                  </button>

                  {checkoutMessage && (
                    <div
                      className={`mt-4 rounded-lg border p-3 text-sm text-center ${
                        checkoutMessage.tone === 'warning'
                          ? 'bg-yellow-900 border-yellow-600 text-yellow-200'
                          : 'bg-blue-950 border-blue-700 text-blue-200'
                      }`}
                    >
                      {checkoutMessage.text}
                    </div>
                  )}

                  {!loggedIn && (
                    <div className="mt-4 bg-yellow-900 border border-yellow-600 rounded-lg p-3">
                      <p className="text-yellow-200 text-sm text-center">
                        Connect a wallet session to complete this staged purchase.
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Success Screen Component
const SuccessScreen = () => (
  <div className="text-center py-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
    >
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>
    <h3 className="text-xl font-bold text-white mb-2">Purchase Complete!</h3>
    <p className="text-gray-400 mb-6">
      Your selected assets were staged successfully and marked for wallet delivery.
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        View in Wallet
      </button>
      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        Continue Shopping
      </button>
    </div>
  </div>
);

// Cart Icon Component (for navbar)
export const CartIcon = () => {
  const { cartItems, openCheckout } = useShoppingCart();

  return (
    <button
      onClick={openCheckout}
      className="relative text-gray-400 hover:text-white transition-colors"
    >
      <ShoppingCart size={20} />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};
