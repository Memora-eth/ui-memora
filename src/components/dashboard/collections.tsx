"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tippy from "tippy.js";
import CreateAction from "./CreateAction";
import Image from "next/image";
import { collections } from "@/data/collections";

type TabType = "owned" | "herited" | "create";

export default function Collections() {
  const [activeTab, setActiveTab] = useState<TabType>("owned");

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
        <ul
          className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center"
          role="tablist"
        >

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
                <path d="M11.95 7.95l-1.414 1.414L8 6.828 8 20H6V6.828L3.465 9.364 2.05 7.95 7 3l4.95 4.95zm10 8.1L17 21l-4.95-4.95 1.414-1.414 2.537 2.536L16 4h2v13.172l2.536-2.536 1.414 1.414z" />
              </svg>
              <span className="font-display text-base font-medium">
                Create NFT Heritage
              </span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link relative flex items-center whitespace-nowrap py-3 px-6 ${
                activeTab === "owned"
                  ? "active text-jacarta-700 dark:text-white"
                  : "text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              }`}
              onClick={() => handleTabClick("owned")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm9 8h3l-4 4-4-4h3V9h2v4z" />
              </svg>
              <span className="font-display text-base font-medium">
                Owned NFT
              </span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link relative flex items-center whitespace-nowrap py-3 px-6 ${
                activeTab === "herited"
                  ? "active text-jacarta-700 dark:text-white"
                  : "text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              }`}
              onClick={() => handleTabClick("herited")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 5v3h14V5H5zM4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" />
              </svg>
              <span className="font-display text-base font-medium">
                Herited NFT
              </span>
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "owned" && (
            <div className="tab-pane fade show active" role="tabpanel">
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                {collections.slice(0, 4).map((elm, i) => (
                  <article key={i}>
                    <div className="rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                      <Link
                        href={`/collection/${elm.id}`}
                        className="flex space-x-[0.625rem]"
                      >
                        <span className="w-[74.5%]">
                          <Image
                            width={152}
                            height={242}
                            src={elm.images[0]}
                            alt="item 1"
                            className="h-full w-full rounded-[0.625rem] object-cover"
                            loading="lazy"
                          />
                        </span>
                        <span className="flex w-1/3 flex-col space-y-[0.625rem]">
                          {elm.images.slice(1).map((img, i2) => (
                            <Image
                              width={68}
                              height={74}
                              key={i2}
                              src={img}
                              alt="item 1"
                              className="h-full rounded-[0.625rem] object-cover"
                              loading="lazy"
                            />
                          ))}
                        </span>
                      </Link>

                      <Link
                        href={`/collection/${elm.id}`}
                        className="mt-4 block font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
                      >
                        {elm.name}
                      </Link>

                      <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                        <div className="flex flex-wrap items-center">
                          <Link
                            href={`/user/${elm.id}`}
                            className="mr-2 shrink-0"
                          >
                            <Image
                              width={20}
                              height={20}
                              src={elm.avatar}
                              alt="owner"
                              className="h-5 w-5 rounded-full"
                            />
                          </Link>
                          <span className="mr-1 dark:text-jacarta-400">by</span>
                          <Link
                            href={`/user/${elm.id}`}
                            className="text-accent"
                          >
                            <span>{elm.ownerName}</span>
                          </Link>
                        </div>
                        <span className="text-sm dark:text-jacarta-300">
                          {elm.itemCount} Items
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          {activeTab === "herited" && (
            <div className="tab-pane fade show active" role="tabpanel">
              <h2>Herited NFT Content</h2>
              {/* Add your herited NFT content here */}
            </div>
          )}
          {activeTab === "create" && (
            <div className="tab-pane fade show active" role="tabpanel">
              <CreateAction />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
