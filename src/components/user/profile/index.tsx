"use client";
import { useEffect } from "react";
import tippy from "tippy.js";
import Image from "next/image";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useFarcaster } from "@/context/FarcasterContext";

export default function Profile() {
  const { setShowAuthFlow } = useDynamicContext();
  const { isFarcasterConnected, farcasterData } = useFarcaster();

  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);

  const handleConnectFarcaster = () => {
    setShowAuthFlow(true);
  };

  return (
    <section className="relative bg-light-base pb-12 pt-28 dark:bg-jacarta-800">
      <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <figure className="relative">
          <Image
            unoptimized
            width={138}
            height={200}
            src={farcasterData?.avatar || "/img/user/user_avatar.gif"}
            alt="user avatar"
            className="rounded-xl border-[5px] border-white dark:border-jacarta-600"
          />
          {isFarcasterConnected && (
            <div
              className="absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
              data-tippy-content="Verified Farcaster User"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-[.875rem] w-[.875rem] fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
              </svg>
            </div>
          )}
        </figure>
      </div>

      <div className="container">
        <div className="text-center">
          <h2 className="mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
            {farcasterData?.displayName || 'Anonymous User'}
          </h2>
          <div className="mb-8 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-white py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
            <span data-tippy-content="Farcaster Username">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-4 w-4 fill-jacarta-500 dark:fill-jacarta-300"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
              </svg>
            </span>
            <span className="text-jacarta-500 dark:text-jacarta-300">
              {farcasterData?.username || 'Not connected'}
            </span>
          </div>

          {!isFarcasterConnected && (
            <button
              onClick={handleConnectFarcaster}
              className="mb-6 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Connect to Farcaster
            </button>
          )}

          <p className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">
            {farcasterData?.bio || 'No bio available'}
          </p>
          <span className="text-jacarta-400">
            Farcaster ID: {farcasterData?.fid || 'Unknown'}
          </span>
        </div>
      </div>
    </section>
  );
}