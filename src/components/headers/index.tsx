"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHumanProof } from "@/context/WorldCoinContext";
import {
  addMobileMenuToggle,
  removeMenuActive,
} from "@/components/utils/MobileMenuToggle";
import Image from "next/image";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

export default function Headers() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isVerified, setIsVerified } = useHumanProof();

  const { user } = useDynamicContext();

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

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user, setIsLoggedIn]);

  const verifyProof = async (proof: any) => {
    console.log("VERIFYING PROOF", proof);
    const response = await fetch(
      "https://memoraapi.bitnata.com/world_coin/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...proof, action: "mfa_worldcoin" }),
      }
    );
    if (response.ok) {
      const { verified } = await response.json();
      return verified;
    } else {
      const { code, detail } = await response.json();
      throw new Error(`Error Code ${code}: ${detail}`);
    }
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };

  return (
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
          {/* Actions */}
          <div className="ml-8 hidden lg:flex xl:ml-12">
            {/* Dashboard Link */}
            {isLoggedIn && (
              <div className="mr-4 my-auto">
                <Link href="/dashboard">
                  <span className="font-medium text-jacarta-700 dark:text-white hover:text-accent dark:hover:text-accent transition-colors">
                    Dashboard
                  </span>
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="mr-4 my-auto">
                <Image
                  width={100}
                  height={50}
                  src="/img/worldcoin.png"
                  className="max-h-7 dark:hidden"
                  alt="Worldcoin | Digital Identity"
                />
                
                <IDKitWidget
                  app_id="app_staging_3a580c8d6ce2a862e767e30f5585fb80"
                  action="mfa_worldcoin"
                  verification_level={VerificationLevel.Device}
                  handleVerify={verifyProof}
                  onSuccess={onSuccess}
                >
                  {({ open }) => (
                    <div className="d-flex">
                      <button
                        className={`nav-link relative flex items-center whitespace-nowrap py-3 px-6 ${
                          isVerified
                            ? "active text-jacarta-700 dark:text-white"
                            : "text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                        }`}
                        onClick={open}
                      >
                        {isVerified ? "Verified" : "Verify"}
                      </button>
                    </div>
                  )}
                </IDKitWidget>
              </div>
            )}

            {/* Dynamic Wallet Widget */}
            <DynamicWidget />
          </div>
        </div>

        {/* Mobile Menu Actions */}
        <div className="ml-auto flex lg:hidden rtl:ml-0 rtl:mr-auto ">
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
  );
}
