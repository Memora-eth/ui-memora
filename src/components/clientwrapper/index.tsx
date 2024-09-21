// ClientWrapper.tsx
"use client";

import { AuthProvider } from "@/context/AuthContext";
import { FarcasterProvider } from "@/context/FarcasterContext";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import Headers from "@/components/headers";
import DarkMode from "@/components/common/DarkMode";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, defineChain, } from "viem";
// import { rootstockTestnet } from 'viem/chains';



const rskTestnet = defineChain({
  id: 31,
  name: "RSK Testnet",
  network: "rsk-testnet",
  nativeCurrency: {
    name: "RSK Smart Bitcoin",
    symbol: "tRBTC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.rootstock.io/4MmYWv9uFySkJ1CSYQdKRIFfOa7oPa-T"],
    },
    public: {
      http: ["https://rpc.testnet.rootstock.io/4MmYWv9uFySkJ1CSYQdKRIFfOa7oPa-T"],
    },
  },
  blockExplorers: {
    default: { name: "RSK Explorer", url: "https://explorer.testnet.rsk.co" },
  },
  testnet: true,
});

const evmNetworks = [
  {
    blockExplorerUrls: ["https://explorer.testnet.rsk.co"],
    chainId: 31,
    chainName: "RSK Testnet",
    iconUrls: ["https://chainlist.org/unknown-logo.png"],
    name: "RSK",
    nativeCurrency: {
      name: "RSK Smart Bitcoin",
      symbol: "tRBTC",
      decimals: 18,
    },
    networkId: 31,
    rpcUrls: ["https://rpc.testnet.rootstock.io/4MmYWv9uFySkJ1CSYQdKRIFfOa7oPa-T"],
    vanityName: "RSK Testnet",
  },
];

const config = createConfig({
  chains: [rskTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [rskTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <AuthProvider>
              <FarcasterProvider>
                <DarkMode />
                <Headers />
                {children}
              </FarcasterProvider>
            </AuthProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
