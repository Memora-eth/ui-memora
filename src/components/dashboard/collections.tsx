"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tippy from "tippy.js";
import CreateAction from "./CreateAction";
import Image from "next/image";
import { collections } from "@/data/collections";
import ActiveLegacy from "./ActiveLegacy";
import Inherited from "./Inherited";

type TabType = "active" | "inherited" | "create";

interface CollectionItem {
  id: number;
  title: string;
  imageSrc: string;
  altText: string;
  details: string;
  creationDate: string;
  status: string;
  type: string;
  liked: boolean;
  likes: number;
  creatorAvatar: string;
  heirAvatar: string;
  platform: string;
  inheritanceDate: string;
}

export default function Collections() {
  const [allItems, setAllItems] = useState<CollectionItem[]>(
    collections as unknown as CollectionItem[]
  );
  const [activeTab, setActiveTab] = useState<TabType>("create");

  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <section className="relative py-24 pt-20">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        {/* Tabs Nav */}
        <ul className="nav nav-tabs scrollbar-custom mb-5 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link relative flex items-center whitespace-nowrap py-3 px-6 ${
                activeTab === "create"
                  ? "active text-jacarta-700 dark:text-white"
                  : "text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              }`}
              onClick={() => handleTabClick("create")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
              </svg>
              <span className="font-display text-base font-medium">
                Create Memora NFT
              </span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link relative flex items-center whitespace-nowrap py-3 px-6 ${
                activeTab === "active"
                  ? "active text-jacarta-700 dark:text-white"
                  : "text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              }`}
              onClick={() => handleTabClick("active")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8h3l-4 4-4-4h3V8h2v4z" />
              </svg>
              <span className="font-display text-base font-medium">
                My Memora
              </span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link relative flex items-center whitespace-nowrap py-3 px-6 ${
                activeTab === "inherited"
                  ? "active text-jacarta-700 dark:text-white"
                  : "text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              }`}
              onClick={() => handleTabClick("inherited")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15v4zM4 9v10h16V9H4zm9-6v2H6V3h7z" />
              </svg>
              <span className="font-display text-base font-medium">
                Inherited Memora
              </span>
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "create" && (
            <div className="tab-pane fade show active" role="tabpanel">
              <CreateAction />
            </div>
          )}
          {(activeTab === "active") && (
            <div className="tab-pane fade show active" role="tabpanel">
              <ActiveLegacy />
            </div>
          )}
          {(activeTab === "inherited") && (
            <div className="tab-pane fade show active" role="tabpanel">
              <Inherited />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
