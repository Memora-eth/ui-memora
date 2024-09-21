import React, { useEffect, useState, useMemo } from "react";
import { DollarSign } from "lucide-react";
import NftAction from "../nft/NftAction";
import Image from "next/image";
import { nounsicon } from "@/data/nouns";
import {
  useContractWrite,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import MemoraABI from "@/data/MEMORA_ABI.json";
import { Address, getAddress, parseEther } from "viem";
// import { useFarcaster } from '@/context/FarcasterContext';
import toast, { Toaster } from "react-hot-toast";
import { parse } from "path";

const aiTrainingData = [
  {
    condition: "When I get married",
    keywords: ["married", "wedding", "tie the knot"],
  },
  {
    condition: "When I get a promotion at work",
    keywords: ["promotion", "manager", "senior", "team lead"],
  },
  { condition: "When I have a baby", keywords: ["baby", "parent", "newborn"] },
  {
    condition: "When I move to a new house",
    keywords: ["new house", "move", "unpacked"],
  },
  {
    condition: "When I graduate",
    keywords: ["graduate", "graduation", "university"],
  },
  {
    condition: "When I get a new job",
    keywords: ["new job", "offer", "role", "position"],
  },
  {
    condition: "When I move abroad",
    keywords: ["move abroad", "new country", "expat"],
  },
  {
    condition: "When I go on holiday",
    keywords: ["holiday", "vacation", "trip"],
  },
  {
    condition: "When I pass away",
    keywords: ["died", "die", "death", "passed away"],
  },
  {
    condition: "When I win an ETHGlobal hackathon",
    keywords: ["ETHGlobal", "hackathon", "won"],
  },
];

export const actionTypes = [
  {
    id: 0,
    alt: "MANAGE_ACCOUNT",
    text: "Manage Account",
  },
  {
    id: 1,
    alt: "CLOSE_ACCOUNT",
    text: "Close Account",
  },
  {
    id: 2,
    alt: "TRANSFER_FUNDS",
    text: "Transfer Bitcoin",
  },
];

export default function CreateAction() {
  const [actionForm, setActionForm] = useState({
    prompt: "",
    action: actionTypes[0],
    claimer: "",
    metadata: nounsicon[0],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [fundAmount, setFundAmount] = useState("");
  const [tRBTCAmount, setTRBTCAmount] = useState("");
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

    
    const checksumAddress : Address = getAddress(process.env.NEXT_PUBLIC_MEMORA_CONTRACT_ADDRESS as `0x${string}`)
  // Function to generate suggestions based on user input
  const generateSuggestions = useMemo(
    () => (input: string) => {
      const inputLower = input.toLowerCase();
      return aiTrainingData
        .filter((data) =>
          data.keywords.some((keyword) =>
            inputLower.includes(keyword.toLowerCase())
          )
        )
        .map((data) => data.condition);
    },
    []
  );

  // Update suggestions when prompt changes
  useEffect(() => {
    const newSuggestions = generateSuggestions(actionForm.prompt);
    setSuggestions(newSuggestions);
  }, [actionForm.prompt, generateSuggestions]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setActionForm({ ...actionForm, prompt: suggestion });
    setSuggestions([]);
  };

  // Function to convert USD to tRBTC (mock conversion)
  const convertUSDToTRBTC = (usdAmount: string) => {
    // Mock conversion rate (1 USD = 0.00001 tRBTC)
    const rate = 0.000016;
    const tRBTC = parseFloat(usdAmount) * rate;
    return tRBTC.toFixed(8);
  };

  // Update tRBTC amount when USD amount changes
  useEffect(() => {
    if (fundAmount) {
      const tRBTC = convertUSDToTRBTC(fundAmount);
      setTRBTCAmount(tRBTC);
    } else {
      setTRBTCAmount("");
    }
  }, [fundAmount]);


  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    isError: isWriteError,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
    data: transactionReceipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleWriteContract = async () => {
    console.log(actionForm, "TRIGGER");
    const toastId = toast.loading("Preparing transaction...");
    try {
      const result = await writeContract({
        address: checksumAddress,
        abi: MemoraABI,
        functionName: "mint",
        args: [
          actionForm.claimer,
          actionForm.action.id,
          actionForm.prompt,
          actionForm.metadata.ipfsHash,
        ],
      });

      toast.loading("Transaction submitted. Waiting for confirmation...", {
        id: toastId,
      });
    } catch (error) {
      console.error("Contract write error:", error);
      toast.error(`Failed to send transaction`, { id: toastId });
    }
  };

  React.useEffect(() => {
    if (isWriteError) {
      toast.dismiss();
      toast.error(`Write error: ${writeError?.name}`);
    }
  }, [isWriteError, writeError]);



  const handleAddFunds = React.useCallback(async (tokenId: number) => {
    if (!tokenId || !tRBTCAmount) {
      toast.error("Invalid token ID or amount");
      return;
    }

    const toastId = toast.loading("Adding funds...");
    try {
      const result = await writeContract({
        address: checksumAddress,
        abi: MemoraABI,
        functionName: "addFunds",
        args: [tokenId],
        value: parseEther(tRBTCAmount),
      });

      toast.success("Funds added successfully", { id: toastId });
    } catch (error) {
      console.error("Add funds error:", error);
      toast.error(`Failed to add funds`, { id: toastId });
    }
  }, [tRBTCAmount, writeContract, checksumAddress]);


  React.useEffect(() => {
    if (isConfirmed && transactionReceipt) {
      toast.dismiss();
      const mintedTokenCoin = transactionReceipt?.logs[0].topics[3] as `0x${string}`;
      const convertedTokenCoin = parseInt(mintedTokenCoin, 16);
      setMintedTokenId(convertedTokenCoin);

      console.log("Transaction confirmed:", transactionReceipt);
      toast.success("NFT minted successfully!");

      if (actionForm.action.id === 2 && tRBTCAmount) {
        handleAddFunds(convertedTokenCoin);
        setActionForm({
          prompt: "",
          action: actionTypes[0],
          claimer: "",
          metadata: nounsicon[0],
        });
        setFundAmount("");
        setTRBTCAmount("");
      } else {
        setActionForm({
          prompt: "",
          action: actionTypes[0],
          claimer: "",
          metadata: nounsicon[0],
        });
        setFundAmount("");
        setTRBTCAmount("");
      }
    } else if (confirmError) {
      toast.dismiss();
      toast.error(`Transaction failed: ${confirmError.message}`);
    }
  }, [isConfirmed, confirmError, transactionReceipt, actionForm.action.id, tRBTCAmount, handleAddFunds]);

  return (
    <>
      <h1 className="mb-6 font-display text-5xl text-white lg:text-6xl text-center mt-10">
        Create Your Digital Legacy Plan
      </h1>
      <section className="flex justify-center h-[500px] rounded-lg mt-10">
        <div className="flex flex-row gap-10">
          <div className="w-[350px]">
            <NftAction
              metadata={actionForm.metadata}
              handleWriteContract={handleWriteContract}
              isWritePending={isWritePending}
              isConfirming={isConfirming}
              hash={hash}
            />
          </div>

          <div className="flex flex-col h-fit gap-5 w-[600px] mt-10">
            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                When should this plan activate?
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="E.g., When I get married, When I have a baby..."
                value={actionForm.prompt}
                onChange={(e) =>
                  setActionForm({ ...actionForm, prompt: e.target.value })
                }
              />
              {suggestions.length > 0 && (
                <div className="mt-2 bg-white dark:bg-jacarta-700 rounded-lg shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-jacarta-50 dark:hover:bg-jacarta-600 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                What action should be taken?
              </label>

              <div className="dropdown relative mb-4 cursor-pointer">
                <div
                  className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3.5 px-3 text-base dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                  role="button"
                  id="action-type"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="flex items-center">
                    {actionForm.action.text}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                  </svg>
                </div>

                <div
                  className={`dropdown-menu z-50 ${
                    !showDropdown ? "hidden" : ""
                  } absolute w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800`}
                  aria-labelledby="action-type"
                >
                  {actionTypes.map((elm, i) => (
                    <button
                      onClick={() => {
                        setActionForm({ ...actionForm, action: elm });
                        setShowDropdown(!showDropdown);
                      }}
                      key={i}
                      className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-base text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <span className="flex items-center">{elm.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {actionForm.action.id === 2 && (
              <div className="mb-6">
                <label
                  htmlFor="fund-amount"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Amount to transfer (in USD)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="fund-amount"
                    className="w-full rounded-lg border-jacarta-100 py-3 pl-10 pr-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                    placeholder="Enter amount in USD"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                  />
                </div>
                {tRBTCAmount && (
                  <p className="mt-2 text-sm text-jacarta-500 dark:text-jacarta-300">
                    Equivalent: {tRBTCAmount} tRBTC
                  </p>
                )}
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Who should carry out this action? (Enter wallet address)
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="0x..."
                value={actionForm.claimer}
                onChange={(e) =>
                  setActionForm({ ...actionForm, claimer: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                Choose an icon for this plan
              </label>
              <div className="dropdown relative mb-4 cursor-pointer">
                <div
                  className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3.5 px-3 text-base dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                  role="button"
                  id="nouns-icon"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setShowIconDropdown(!showIconDropdown)}
                >
                  <span className="flex items-center">
                    <Image
                      width={500}
                      height={500}
                      src={actionForm.metadata.imageSrc}
                      alt="eth"
                      className="mr-2 h-5 w-5 rounded-full"
                    />
                    {actionForm.metadata.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                  </svg>
                </div>

                <div
                  className={`dropdown-menu z-50 ${
                    !showIconDropdown ? "hidden" : ""
                  } absolute w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800`}
                  aria-labelledby="nouns-icon"
                >
                  {nounsicon.map((elm, i) => (
                    <button
                      onClick={() => {
                        setActionForm({ ...actionForm, metadata: elm });
                        setShowIconDropdown(!setShowIconDropdown);
                      }}
                      key={i}
                      className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-base text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <span className="flex items-center">
                        <Image
                          width={500}
                          height={500}
                          src={elm.imageSrc}
                          alt="eth"
                          className="mr-2 h-5 w-5 rounded-full"
                        />
                        {elm.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </section>
    </>
  );
}
