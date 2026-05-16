import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Building, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Clock,
  AlertCircle,
  Zap
} from 'lucide-react';
import { DISPLAY_ASSET_SYMBOL, MOCK_FIAT_RATE, formatPrice } from '../lib/utils';

// Bank Withdrawal Form Component
const BankWithdrawalForm = ({ assetValue, onBack, onComplete }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
    withdrawalAmount: assetValue * MOCK_FIAT_RATE,
    currency: 'USD'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.routingNumber.trim()) newErrors.routingNumber = 'Routing number is required';
    if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
    if (formData.withdrawalAmount <= 0) newErrors.withdrawalAmount = 'Invalid withdrawal amount';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateForm()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      handleProcessWithdrawal();
    }
  };

  const handleProcessWithdrawal = async () => {
    setIsProcessing(true);
    
    // Simulate asset liquidation and payout request processing.
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setCurrentStep(3);
    
    setTimeout(() => {
      onComplete && onComplete();
    }, 2000);
  };

  const exchangeRate = MOCK_FIAT_RATE;
  const processingFee = formData.withdrawalAmount * 0.025; // 2.5% fee
  const netAmount = formData.withdrawalAmount - processingFee;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
      >
        {/* Header with Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Payout to Bank</h2>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? 'bg-green-600 text-white'
                      : step < currentStep
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step < currentStep ? <Check size={16} /> : step}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span className={currentStep >= 1 ? 'text-green-400' : ''}>Bank Details</span>
            <span className={currentStep >= 2 ? 'text-green-400' : ''}>Confirmation</span>
            <span className={currentStep >= 3 ? 'text-green-400' : ''}>Processing</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Bank Details Form */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Conversion Summary */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Payout Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Asset Value</span>
                    <span className="text-white">
                      {formatPrice(assetValue, { symbol: DISPLAY_ASSET_SYMBOL })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prototype Payout Rate</span>
                    <span className="text-white">
                      1 {DISPLAY_ASSET_SYMBOL} = ${exchangeRate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Gross Amount</span>
                    <span className="text-white">${formData.withdrawalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processing Fee (2.5%)</span>
                    <span className="text-red-400">-${processingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold">
                    <span className="text-white">Net Amount</span>
                    <span className="text-green-400">${netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bank Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className={`w-full bg-gray-800 border ${
                      errors.bankName ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500`}
                    placeholder="e.g., Chase Bank"
                  />
                  {errors.bankName && (
                    <p className="text-red-400 text-sm mt-1">{errors.bankName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      className={`w-full bg-gray-800 border ${
                        errors.accountNumber ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500`}
                      placeholder="Account number"
                    />
                    {errors.accountNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.accountNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={formData.routingNumber}
                      onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                      className={`w-full bg-gray-800 border ${
                        errors.routingNumber ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500`}
                      placeholder="Routing number"
                    />
                    {errors.routingNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.routingNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                    className={`w-full bg-gray-800 border ${
                      errors.accountHolderName ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500`}
                    placeholder="Full name as on bank account"
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-400 text-sm mt-1">{errors.accountHolderName}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Confirmation */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-yellow-200 font-semibold text-sm mb-1">
                      Final Confirmation
                    </h3>
                    <p className="text-yellow-200 text-sm">
                      Please review all details carefully. This transaction cannot be reversed once processed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Transaction Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Settling</span>
                    <span className="text-white">
                      {formatPrice(assetValue, { symbol: DISPLAY_ASSET_SYMBOL })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">To Bank</span>
                    <span className="text-white">{formData.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account</span>
                    <span className="text-white">***{formData.accountNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Holder</span>
                    <span className="text-white">{formData.accountHolderName}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                    <span className="text-white">Final Amount</span>
                    <span className="text-green-400">${netAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Processing Time</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Clock size={16} />
                  <span>Estimated processing time: 1-3 business days</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Processing */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              {isProcessing ? (
                <>
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} className="text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Processing Your Payout</h3>
                  <p className="text-gray-400">
                    Preparing settlement and initiating your bank transfer...
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto"
                  >
                    <Check size={32} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Payout Requested!</h3>
                  <p className="text-gray-400">
                    Your payout request has been recorded. Funds should arrive in your bank account within 1-3 business days once processing completes.
                  </p>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transaction ID</span>
                        <span className="text-white font-mono">TX-{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount Transferred</span>
                        <span className="text-green-400">${netAmount.toFixed(2)} USD</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {currentStep < 3 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onBack}
              className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleNextStep}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {currentStep === 1 ? (
                <>
                  <span>Review & Confirm</span>
                  <ArrowRight size={20} />
                </>
              ) : (
                <>
                  <DollarSign size={20} />
                  <span>Request Payout</span>
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BankWithdrawalForm;
