"use client"
import { useEffect } from "react";
import Headers from "@/components/headers";
import Footers from "@/components/footers";
import Profile from "@/components/user/profile";
import Collections from "@/components/dashboard/collections";
import { useFarcaster } from "@/context/FarcasterContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Dashboard() {
  const { isFarcasterConnected } = useFarcaster();
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <>
      <Headers />
      <main className="pt-[5.5rem] lg:pt-48">
        <Profile />
        {isFarcasterConnected ? (
          <Collections />
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect to Farcaster</h2>
            <p className="mb-8">You need to connect your Farcaster account to access your collections.</p>
            <button 
              onClick={() => setShowAuthFlow(true)}
              className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded"
            >
              Connect to Farcaster
            </button>
          </div>
        )}
      </main>
      <Footers />
    </>
  );
}