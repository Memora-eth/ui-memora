"use client";
import React, { useEffect, useState } from "react";
import {
  addMobileMenuToggle,
  removeMenuActive,
} from "@/components/utils/MobileMenuToggle";
import Image from "next/image";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

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

export default function Headers() {
  useEffect(() => {
    addMobileMenuToggle();
    return () => {
      removeMenuActive();
    };
  }, []);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
        walletConnectors: [EthereumWalletConnectors],
        overrides: {evmNetworks},
      }}
    >
      <header
        className={`js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors ${
          scrolled ? "js-page-header--is-sticky" : ""
        }`}
      >
        <div className="flex items-center px-6 py-6 xl:px-24 ">
          <Link href="/" className="shrink-0">
            <Image
              width={100}
              height={50}
              src="/img/logo.png"
              className="max-h-7 dark:hidden"
              alt="Memora | Digital Legacy"
            />
            <Image
              width={100}
              height={50}
              src="/img/logo_white.png"
              className="hidden max-h-7 dark:block"
              alt="Memora | Digital Legacy"
            />
          </Link>

          {/* Menu / Actions */}
          <div className="js-mobile-menu invisible lg:visible fixed inset-0 z-10 ml-auto rtl:mr-auto rtl:ml-0 items-center bg-white opacity-0 dark:bg-jacarta-800 lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent ">
            {/* ... (keep existing mobile menu code) ... */}

            {/* Actions */}
            <div className="ml-8 hidden lg:flex xl:ml-12">
              {/* Dashboard Link */}
              <div className="mr-4 my-auto">
                <Link href="/dashboard">
                  <span className="font-medium text-jacarta-700 dark:text-white hover:text-accent dark:hover:text-accent transition-colors">
                    Dashboard
                  </span>
                </Link>
              </div>
              {/* Dynamic Wallet Widget */}
              <DynamicWidget />
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="ml-auto flex lg:hidden rtl:ml-0 rtl:mr-auto ">
            {/* ... (keep existing mobile menu code) ... */}
            
            {/* Add Dynamic Wallet Widget for mobile */}
            <div className="mr-4">
              <DynamicWidget />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="js-mobile-toggle group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
              aria-label="open mobile menu"
            >
              {/* ... (keep existing mobile menu toggle code) ... */}
            </button>
          </div>
        </div>
      </header>
    </DynamicContextProvider>
  );
}