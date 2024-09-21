import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import { useFarcaster } from "@/context/FarcasterContext";
import toast, { Toaster } from "react-hot-toast";

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
  const { farcasterData } = useFarcaster();
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const checksumAddress: Address = getAddress(
    process.env.NEXT_PUBLIC_MEMORA_CONTRACT_ADDRESS as `0x${string}`
  );

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

  const handleFundAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*[.,]?[0-9]*$/;

    if (value === "" || regex.test(value)) {
      setFundAmount(value.replace(",", "."));
    }
  };

  useEffect(() => {
    const newSuggestions = generateSuggestions(actionForm.prompt);
    setSuggestions(newSuggestions);
  }, [actionForm.prompt, generateSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    setActionForm({ ...actionForm, prompt: suggestion });
    setSuggestions([]);
  };

  const convertUSDToTRBTC = (usdAmount: string) => {
    const rate = 0.000016;
    const tRBTC = parseFloat(usdAmount) * rate;
    return tRBTC.toFixed(8);
  };

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
    const toastId = toast.loading("Preparing transaction...");
    try {
      await writeContract({
        address: checksumAddress,
        abi: MemoraABI,
        functionName: "mint",
        args: [
          actionForm.claimer,
          actionForm.action.id,
          actionForm.prompt,
          actionForm.metadata.ipfsHash,
          farcasterData?.fid || 0,
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

  useEffect(() => {
    if (isWriteError) {
      toast.dismiss();
      toast.error(`Write error: ${writeError?.name}`);
    }
  }, [isWriteError, writeError]);

  const handleAddFunds = useCallback(
    async (tokenId: number) => {
      if (!tokenId || !tRBTCAmount) {
        toast.error("Invalid token ID or amount");
        return;
      }

      const toastId = toast.loading("Adding funds...");
      try {
        await writeContract({
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
    },
    [tRBTCAmount, writeContract, checksumAddress]
  );

  useEffect(() => {
    if (isConfirmed && transactionReceipt) {
      toast.dismiss();
      const mintedTokenCoin = transactionReceipt?.logs[0]
        .topics[3] as `0x${string}`;
      const convertedTokenCoin = parseInt(mintedTokenCoin, 16);
      setMintedTokenId(convertedTokenCoin);

      console.log("Transaction confirmed:", transactionReceipt);
      toast.success("NFT minted successfully!");

      if (actionForm.action.id === 2 && tRBTCAmount) {
        handleAddFunds(convertedTokenCoin);
      }

      setActionForm({
        prompt: "",
        action: actionTypes[0],
        claimer: "",
        metadata: nounsicon[0],
      });
      setFundAmount("");
      setTRBTCAmount("");

      if (isMobile) {
        setCurrentStep(1);
      }
    } else if (confirmError) {
      toast.dismiss();
      toast.error(`Transaction failed: ${confirmError.message}`);
    }
  }, [
    isConfirmed,
    confirmError,
    transactionReceipt,
    actionForm.action.id,
    tRBTCAmount,
    handleAddFunds,
    isMobile,
  ]);

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const renderForm = () => (
    <div className="w-full lg:w-[600px]">
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
          className="w-full rounded-lg border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
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
          htmlFor="action-type"
          className="mb-2 block font-display text-jacarta-700 dark:text-white"
        >
          What action should be taken?
        </label>
        <div className="relative">
          <button
            className="w-full flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3.5 px-3 text-base dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{actionForm.action.text}</span>
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
          </button>
          {showDropdown && (
            <div className="absolute z-10 w-full mt-2 py-2 bg-white rounded-lg shadow-xl dark:bg-jacarta-800">
              {actionTypes.map((elm, i) => (
                <button
                  key={i}
                  className="w-full px-4 py-2 text-left hover:bg-jacarta-50 dark:hover:bg-jacarta-600"
                  onClick={() => {
                    setActionForm({ ...actionForm, action: elm });
                    setShowDropdown(false);
                  }}
                >
                  {elm.text}
                </button>
              ))}
            </div>
          )}
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
              type="text"
              id="fund-amount"
              className="w-full rounded-lg border-jacarta-100 py-3 pl-10 pr-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
              placeholder="Enter amount in USD"
              value={fundAmount}
              onChange={handleFundAmountChange}
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
          htmlFor="action-claimer"
          className="mb-2 block font-display text-jacarta-700 dark:text-white"
        >
          Who should carry out this action? (Enter wallet address)
        </label>
        <input
          type="text"
          id="action-claimer"
          className="w-full rounded-lg border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
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
        <div className="relative">
          <button
            className="w-full flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3.5 px-3 text-base dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
            onClick={() => setShowIconDropdown(!showIconDropdown)}
          >
            <span className="flex items-center">
              <Image
                width={20}
                height={20}
                src={actionForm.metadata.imageSrc}
                alt="Selected icon"
                className="mr-2 rounded-full"
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
          </button>
          {showIconDropdown && (
            <div className="absolute overflow-scroll overflow-x-hidden h-60 z-10 w-full mt-2 py-2 bg-white rounded-lg shadow-xl dark:bg-jacarta-800">
              {nounsicon.map((elm, i) => (
                <button
                  key={i}
                  className="w-full px-4 py-2 text-left hover:bg-jacarta-50 dark:hover:bg-jacarta-600 flex items-center"
                  onClick={() => {
                    setActionForm({ ...actionForm, metadata: elm });
                    setShowIconDropdown(false);
                  }}
                >
                  <Image
                    width={20}
                    height={20}
                    src={elm.imageSrc}
                    alt={elm.title}
                    className="mr-2 rounded-full"
                  />
                  {elm.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {isMobile && currentStep === 1 && (
        <button
          onClick={handleNextStep}
          className="w-full mt-6 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
        >
          Next
        </button>
      )}
    </div>
  );

  const renderMobileNftAction = () => (
    <div className="w-full">
      <NftAction
        metadata={actionForm.metadata}
        dataFarcaster={farcasterData}
        handleWriteContract={handleWriteContract}
        isWritePending={isWritePending}
        isConfirming={isConfirming}
        hash={hash}
      />
      <button
        onClick={handlePreviousStep}
        className="w-full mt-4 rounded-full bg-jacarta-100 py-3 px-8 text-center font-semibold text-jacarta-700 transition-all hover:bg-jacarta-200"
      >
        Back to Form
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 font-display text-3xl md:text-4xl lg:text-5xl text-white text-center mt-10">
        Create Your Digital Legacy Plan
      </h1>
      <div className="flex flex-col lg:flex-row justify-center gap-6 mt-10">
        {!isMobile && (
          <div className="w-full lg:w-[350px] mb-6 lg:mb-0">
            <NftAction
              metadata={actionForm.metadata}
              dataFarcaster={farcasterData}
              handleWriteContract={handleWriteContract}
              isWritePending={isWritePending}
              isConfirming={isConfirming}
              hash={hash}
            />
          </div>
        )}
        {(!isMobile || (isMobile && currentStep === 1)) && renderForm()}
        {isMobile && currentStep === 2 && renderMobileNftAction()}
      </div>
      <Toaster />
    </div>
  );
}
