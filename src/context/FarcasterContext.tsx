// FarcasterContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

interface FarcasterProfile {
  bio: {
    text: string;
    // Add other properties if they exist in the profile
  };
  // Add other profile properties if they exist
}

interface FarcasterMetadata {
  active_status: string;
  custody_address: string;
  display_name: string;
  fid: number;
  follower_count: number;
  following_count: number;
  object: string;
  pfp_url: string;
  power_badge: boolean;
  profile: FarcasterProfile;
  username: string;
  verifications: any[];
  verified_addresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
}

interface FarcasterCredential {
  address: string;
  format: string;
  id: string;
  oauthAccountId: string;
  oauthAccountPhotos: string[];
  oauthDisplayName: string;
  oauthMetadata: FarcasterMetadata;
  oauthProvider: string;
  oauthUsername: string;
  publicIdentifier: string;
}

interface FarcasterData {
  username: string;
  displayName: string;
  avatar: string;
  fid: number;
  bio: string;
}

interface FarcasterContextType {
  isFarcasterConnected: boolean;
  setIsFarcasterConnected: (value: boolean) => void;
  farcasterData: FarcasterData | null;
  updateFarcasterData: (data: FarcasterData) => void;
}

const FarcasterContext = createContext<FarcasterContextType | undefined>(undefined);

export const FarcasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFarcasterConnected, setIsFarcasterConnected] = useState(false);
  const [farcasterData, setFarcasterData] = useState<FarcasterData | null>(null);
  const { user } = useDynamicContext();

  useEffect(() => {
    const farcasterCred = user?.verifiedCredentials?.find(cred => cred.oauthProvider === "farcaster") as FarcasterCredential | undefined;
    if (farcasterCred) {
      setIsFarcasterConnected(true);
      setFarcasterData({
        username: farcasterCred.oauthUsername || '',
        displayName: farcasterCred.oauthDisplayName || '',
        avatar: farcasterCred.oauthAccountPhotos?.[0] || '',
        fid: farcasterCred.oauthMetadata.fid || 0,
        bio: farcasterCred.oauthMetadata.profile.bio.text || '',
      });
    } else {
      setIsFarcasterConnected(false);
      setFarcasterData(null);
    }
  }, [user]);

  const updateFarcasterData = (data: FarcasterData) => {
    setFarcasterData(data);
  };

  return (
    <FarcasterContext.Provider value={{ isFarcasterConnected, setIsFarcasterConnected, farcasterData, updateFarcasterData }}>
      {children}
    </FarcasterContext.Provider>
  );
};

export const useFarcaster = () => {
  const context = useContext(FarcasterContext);
  if (context === undefined) {
    throw new Error('useFarcaster must be used within a FarcasterProvider');
  }
  return context;
};