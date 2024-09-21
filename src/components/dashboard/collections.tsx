"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tippy from "tippy.js";
import CreateAction from "./CreateAction";
import Image from "next/image";
import { collections } from "@/data/collections";

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
        <ul className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
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
                Create Legacy NFT
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
                Active Legacy
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
                Inherited Legacy
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
          {(activeTab === "active" || activeTab === "inherited") && (
            <div className="tab-pane fade show active" role="tabpanel">
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                {allItems
                  .filter((item) => item.type === activeTab)
                  .map((item, i) => (
                    <article
                      key={i}
                      className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700"
                    >
                      <figure className="relative">
                        <Link href={`/legacy/${item.id}`}>
                          <Image
                            width={230}
                            height={230}
                            src={item.imageSrc}
                            alt={item.altText}
                            className="w-full rounded-[0.625rem]"
                            loading="lazy"
                          />
                        </Link>
                        <div className="absolute left-3 -bottom-3">
                          <div className="flex -space-x-2">
                            <Image
                              width={24}
                              height={24}
                              src={item.creatorAvatar}
                              alt="creator"
                              className="h-6 w-6 rounded-full border-2 border-white dark:border-jacarta-600"
                              data-tippy-content="Creator"
                            />
                            <Image
                              width={24}
                              height={24}
                              src={item.heirAvatar}
                              alt="heir"
                              className="h-6 w-6 rounded-full border-2 border-white dark:border-jacarta-600"
                              data-tippy-content="Heir"
                            />
                          </div>
                        </div>
                      </figure>
                      <div className="mt-7 flex items-center justify-between">
                        <Link href={`/legacy/${item.id}`}>
                          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                            {item.title}
                          </span>
                        </Link>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          Platform:
                        </span>
                        <span className="text-jacarta-500 dark:text-jacarta-300">
                          {item.platform}
                        </span>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <span className="text-sm text-jacarta-500 dark:text-jacarta-300">
                          {activeTab === "active"
                            ? <p>{item.creationDate}</p>
                            : <p>{item.inheritanceDate}</p>}
                        </span>
                        <Link
                          href={`/legacy/${item.id}`}
                          className="group flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mr-1 mb-[3px] h-4 w-4 fill-jacarta-500 group-hover:fill-accent dark:fill-jacarta-200"
                          >
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.25 4 6.824 5.387 5.385 7.5H8v2H2v-6h2V6c1.824-2.43 4.729-4 8-4zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z" />
                          </svg>
                          <span className="font-display text-sm font-semibold group-hover:text-accent dark:text-jacarta-200">
                            View Details
                          </span>
                        </Link>
                      </div>
                      {activeTab === "active" ? (
                        <button className="bg-green hover:bg-accent-dark text-white font-bold py-2 px-4">
                          Add Funds
                        </button>
                      ) : null}
                    </article>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
