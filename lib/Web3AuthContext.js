"use client";

import { createContext, useContext, useEffect, useState } from "react";

const Web3AuthContext = createContext();
const STORAGE_KEY = "meno.prototype.session";

const createPrototypeSession = () => {
   const timestamp = Date.now().toString(36).toUpperCase();
   const account = `G${timestamp}${"A".repeat(Math.max(0, 55 - timestamp.length))}`;

   return {
      userInfo: {
         email: "prototype@meno.app",
         name: "Meno Prototype User",
      },
      accounts: [account],
      balance: "1250.0000",
   };
};

export const useWeb3Auth = () => {
   const context = useContext(Web3AuthContext);
   if (!context) {
      throw new Error("useWeb3Auth must be used within Web3AuthProvider");
   }
   return context;
};

export const Web3AuthProvider = ({ children }) => {
   const [loggedIn, setLoggedIn] = useState(false);
   const [loading, setLoading] = useState(true);
   const [userInfo, setUserInfo] = useState(null);
   const [accounts, setAccounts] = useState([]);
   const [balance, setBalance] = useState("0");
   const [isInitialized, setIsInitialized] = useState(false);

   useEffect(() => {
      try {
         const savedSession =
            typeof window !== "undefined"
               ? window.localStorage.getItem(STORAGE_KEY)
               : null;

         if (savedSession) {
            const parsedSession = JSON.parse(savedSession);
            setLoggedIn(true);
            setUserInfo(parsedSession.userInfo ?? null);
            setAccounts(parsedSession.accounts ?? []);
            setBalance(parsedSession.balance ?? "0");
         }
      } catch (error) {
         console.error("Failed to restore prototype wallet session:", error);
      } finally {
         setIsInitialized(true);
         setLoading(false);
      }
   }, []);

   const login = async () => {
      const session = createPrototypeSession();

      setLoggedIn(true);
      setUserInfo(session.userInfo);
      setAccounts(session.accounts);
      setBalance(session.balance);

      if (typeof window !== "undefined") {
         window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      }
   };

   const logout = async () => {
      setLoggedIn(false);
      setUserInfo(null);
      setAccounts([]);
      setBalance("0");

      if (typeof window !== "undefined") {
         window.localStorage.removeItem(STORAGE_KEY);
      }
   };

   return (
      <Web3AuthContext.Provider
         value={{
            web3auth: null,
            provider: null,
            loggedIn,
            loading,
            userInfo,
            accounts,
            balance,
            login,
            logout,
            isInitialized,
         }}>
         {children}
      </Web3AuthContext.Provider>
   );
};
