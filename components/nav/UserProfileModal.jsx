import { useRef, useEffect } from "react";
import { useWallet } from "../../lib/WalletContext";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileMenu from "./profile/ProfileMenu";
import WalletInfo from "./profile/WalletInfo";

export default function UserProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { accounts } = useWallet();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-end">
      <div 
        ref={modalRef}
        className={`user-profile-modal ${isOpen ? 'user-profile-modal-open' : ''}`}
      >
        <ProfileHeader accounts={accounts} onClose={onClose} />
        <ProfileMenu onClose={onClose} />
        <WalletInfo accounts={accounts} onClose={onClose} />
      </div>
    </div>
  );
}
