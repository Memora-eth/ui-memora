/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  addMobileMenuToggle,
  removeMenuActive,
} from "@/components/utils/MobileMenuToggle";
import Image from "next/image";
import Link from "next/link";

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

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
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
              alt="Xhibiter | NFT Marketplace"
            />
            <Image
              width={100}
              height={50}
              src="/img/logo_white.png"
              className="hidden max-h-7 dark:block"
              alt="Xhibiter | NFT Marketplace"
            />
          </Link>

          {/* Menu / Actions */}
          <div className="js-mobile-menu invisible lg:visible fixed inset-0 z-10 ml-auto rtl:mr-auto rtl:ml-0 items-center bg-white opacity-0 dark:bg-jacarta-800 lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent ">
            {/* Mobile Logo / Menu Close */}
            <div className="t-0 fixed left-0 z-10 flex w-full items-center justify-between bg-white p-6 dark:bg-jacarta-800 lg:hidden">
              {/* Mobile Logo */}
              <Link href="/" className="shrink-0">
                <Image
                  width={130}
                  height={28}
                  src="/img/logo.png"
                  className="max-h-7 dark:hidden"
                  alt="Xhibiter | NFT Marketplace"
                />
                <Image
                  width={130}
                  height={28}
                  src="/img/logo_white.png"
                  className="hidden max-h-7 dark:block"
                  alt="Xhibiter | NFT Marketplace"
                />
              </Link>

              {/* Mobile Menu Close */}
              <button
                className="js-mobile-close group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                aria-label="close mobile menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* Mobile Connect Wallet / Socials */}
            <div className="mt-10 w-full lg:hidden">
              <span className="  js-wallet block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
                Connect Wallet
              </span>

              <hr className="my-5 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />

              {/* Socials */}
              <div className="flex items-center justify-center space-x-5">
                {/* Social icons... */}
              </div>
            </div>

            {/* Actions */}
            <div className="ml-8 hidden lg:flex xl:ml-12">
              {/* Dashboard Link */}
              <div className="mr-4 my-auto">
                <Link href="/dashboard">
                  <span className=" font-medium text-jacarta-700 dark:text-white hover:text-accent dark:hover:text-accent transition-colors">
                    Dashboard
                  </span>
                </Link>
              </div>
              <div className="cursor-pointer rtl:ml-2 js-wallet group flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="ml-auto flex lg:hidden rtl:ml-0 rtl:mr-auto ">
            {/* Profile */}
            <Link
              href="/edit-profile"
              className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
              aria-label="profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
              </svg>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="js-mobile-toggle group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
              aria-label="open mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
