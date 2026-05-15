import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

const TermsAgreement = ({ onAgree, onBack, onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async () => {
    if (!isAgreed) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
    onAgree && onAgree();
    setIsLoading(false);
  };

  return (
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
        className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Terms of Service Agreement</h2>
            <p className="text-gray-400 text-sm">Please read and agree to continue</p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-200 font-semibold text-sm mb-1">
                Important Notice
              </h3>
              <p className="text-yellow-200 text-sm">
                This action starts a payout request based on your digital asset position. Please read all terms carefully before proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Before proceeding, please confirm the following:
          </p>
          
          <p className="text-white text-sm font-medium mb-4">
            I understand and acknowledge that by using Meno's payout flow, I am requesting settlement of my selected digital asset value into a fiat payout method such as a bank account or card.
          </p>

          <div className="space-y-4">
            <p className="text-white text-sm font-medium">I agree that:</p>
            
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span>I am the rightful owner of the digital assets I choose to settle through this payout flow.</span>
              </li>
              
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span>I understand that once payout processing begins, the request may become irreversible depending on settlement status.</span>
              </li>
              
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span>I acknowledge that finalized payout processing may not be reversible.</span>
              </li>
              
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span>I am solely responsible for ensuring that my local laws and regulations allow for digital asset liquidation and fiat payout.</span>
              </li>
              
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span>Meno is not responsible for incorrect wallet activity, tax obligations, or third-party payout limitations related to this request.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-white text-sm font-medium">
              By continuing, I give my informed consent to proceed with Meno's prototype payout service.
            </p>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-1">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 transition-all ${
                isAgreed 
                  ? 'bg-green-600 border-green-600' 
                  : 'border-gray-400 group-hover:border-gray-300'
              }`}>
                {isAgreed && (
                  <CheckCircle size={16} className="text-white absolute -top-0.5 -left-0.5" />
                )}
              </div>
            </div>
            <span className="text-gray-300 text-sm leading-relaxed">
              I agree to the above and wish to proceed with payout processing.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <button
            onClick={handleProceed}
            disabled={!isAgreed || isLoading}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Proceed to Payout</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Legal Notice */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs">
            This agreement is governed by the laws of your jurisdiction. 
            By proceeding, you acknowledge that you have read and understood these terms.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TermsAgreement;
