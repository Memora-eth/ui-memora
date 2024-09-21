// ClientWrapper.tsx
"use client";

import { AuthProvider } from "@/context/AuthContext";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Headers from "@/components/headers";
import DarkMode from "@/components/common/DarkMode";

const evmNetworks = [
    {
      blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
      chainId: 31,
      chainName: 'RSK Testnet',
      iconUrls: ['https://chainlist.org/unknown-logo.png'],
      name: 'RSK',
      nativeCurrency: {
        name: 'RSK Smart Bitcoin',
        symbol: 'tRBTC',
        decimals: 18,
      },
      networkId: 31,
      rpcUrls: ['https://public-node.testnet.rsk.co'],
      vanityName: 'RSK Testnet',
    },
  ];

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
          walletConnectors: [EthereumWalletConnectors],
          overrides: { evmNetworks },
        }}
      >
        <DarkMode />
        <Headers />
        {children}
      </DynamicContextProvider>
    </AuthProvider>
  );
}