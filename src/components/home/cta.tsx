"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/loading";

const CallToAction: React.FC = () => {
  const router = useRouter();
  const { setShowAuthFlow } = useDynamicContext();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleGetStarted = useCallback(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      setShouldNavigate(true);
    } else {
      setShowAuthFlow(true);
      setIsLoading(false);
    }
  }, [isLoggedIn, setShowAuthFlow]);

  useEffect(() => {
    if (shouldNavigate) {
      router.push("/dashboard");
      setShouldNavigate(false);
      setIsLoading(false);
    }
  }, [shouldNavigate, router]);

  return (
    <>
      {isLoading && <Loading />}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Secure Your Digital Legacy Today</span>
            <span className="block text-indigo-200">
              Your Online Life, Your Rules
            </span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={handleGetStarted}
                className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                disabled={isLoading}
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;