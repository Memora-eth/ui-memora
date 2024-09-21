import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HumanProofContextType {
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
}

const HumanProofContext = createContext<HumanProofContextType | undefined>(undefined);

export const WorldCoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <HumanProofContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </HumanProofContext.Provider>
  );
};

export const useHumanProof = () => {
  const context = useContext(HumanProofContext);
  if (context === undefined) {
    throw new Error('useHumanProof must be used within an WorldCoinProvider');
  }
  return context;
};