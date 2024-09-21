import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Address, formatEther, getAddress, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import MemoraABI from "@/data/MEMORA_ABI.json";
import { wagmiConfig } from "../clientwrapper";
import { readContract } from "wagmi/actions";
import { nounsicon } from "@/data/nouns";
import { actionTypes } from "./CreateAction";
import { NFTData, RawNFTData } from "./types/ActiveLegacyTypes";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/modal";
import { useFarcaster } from "@/context/FarcasterContext";
import { DollarSign, RefreshCcw } from "lucide-react";

export default function ActiveLegacy() {
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    isError: isWriteError,
    error: writeError,
  } = useWriteContract();

  const { farcasterData } = useFarcaster();
  // State management
  const [nftDetails, setNftDetails] = useState<NFTData[]>([]);
  const [tRBTCAmount, setTRBTCAmount] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null);

  // Track the transaction confirmation state
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Get checksum address for the contract
  const checksumAddress: Address = getAddress(
    process.env.NEXT_PUBLIC_MEMORA_CONTRACT_ADDRESS as `0x${string}`
  );

  const { address } = useAccount();

  const { data: nftIds } = useReadContract({
    address: checksumAddress,
    abi: MemoraABI,
    functionName: "getNFTsMintedByOwner",
    args: [address as Address],
  });

  // Function to convert USD to tRBTC (mock conversion)
  const convertUSDToTRBTC = (usdAmount: string) => {
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

  // Handle adding funds to NFT
  const handleAddFunds = async (tokenId: any) => {
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
      toast.success("Please Approve The Transaction", { id: toastId });
    } catch (error) {
      console.error("Add funds error:", error);
      toast.error(`Failed to add funds`, { id: toastId });
    }
  };

  // Handle adding funds to NFT
  const handleCancelTrigger = async (tokenId: any) => {
    if (!tokenId) {
      toast.error("Invalid token ID");
      return;
    }
    const toastId = toast.loading("Canceling Trigger...");
    try {
      await writeContract({
        address: checksumAddress,
        abi: MemoraABI,
        functionName: "disableTrigger",
        args: [tokenId],
      });
      const body = {
        handle: {
          tokenId: Number(tokenId),
          fid: farcasterData?.fid,
        },
      };
      toast.success("Please Approve The Transaction", { id: toastId });
      const axiosRequest = await axios.post(
        "https://memoraapi.bitnata.com/finetune-neg",
        body
      );
      console.log(axiosRequest, "ress");
    } catch (error) {
      console.error("Cancel Trigger error:", error);
      toast.error(`Failed to cancel trigger`, { id: toastId });
    }
  };

  // Fetch NFT details for each ID
  const fetchNFTDetails = async (id: bigint): Promise<NFTData | null> => {
    try {
      const result = (await readContract(wagmiConfig, {
        address: checksumAddress,
        abi: MemoraABI,
        functionName: "tokenInfo",
        args: [id],
      })) as RawNFTData;

      const response = await fetch(result[9]);
      const metadata = await response.json();

      if (result) {
        return {
          id,
          judge: result[0],
          heir: result[1],
          isTriggerDeclared: result[2],
          isHeirSigned: result[3],
          minter: result[4],
          prompt: result[5],
          actions: result[6],
          triggerTimestamp: result[7],
          balance: result[8],
          uri: result[9],
          image: metadata.image,
        };
      }
    } catch (error) {
      console.error(`Error fetching details for NFT ${id}:`, error);
    }
    return null;
  };

  // Regex to validate input is a valid number (supports integers and decimals)
  const handleFundAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*[.,]?[0-9]*$/; // Regex to allow numbers with optional decimal point

    if (value === "" || regex.test(value)) {
      setFundAmount(value.replace(",", ".")); // Replace comma with dot for decimal consistency
    }
  };

  useEffect(() => {
    const fetchAllNFTDetails = async () => {
      if (nftIds && Array.isArray(nftIds)) {
        const details: NFTData[] | null = [];
        for (const id of nftIds) {
          const nftData: NFTData | null = await fetchNFTDetails(id);
          if (nftData) {
            details.push(nftData);
          }
        }
        setNftDetails(details);
      }
    };
    fetchAllNFTDetails();
  }, [nftIds, checksumAddress]);

  const refreshNFTs = async () => {
    const toastId = toast.loading("Refreshing NFTs...");
    try {
      // Manually fetch the NFT IDs
      const newNftIds = await readContract(wagmiConfig, {
        address: checksumAddress,
        abi: MemoraABI,
        functionName: "getNFTsMintedByOwner",
        args: [address as Address],
      });

      // Fetch details for the new NFT IDs
      if (newNftIds && Array.isArray(newNftIds)) {
        const details = await Promise.all(
          newNftIds.map((id) => fetchNFTDetails(id))
        );
        setNftDetails(details.filter((data): data is NFTData => data !== null));
      }
      toast.success("NFTs refreshed successfully!", { id: toastId });
    } catch (error) {
      console.error("Error refreshing NFTs:", error);
      toast.error("Failed to refresh NFTs", { id: toastId });
    }
  };

  // Open the modal with the selected token ID
  const openModal = (tokenId: any) => {
    setSelectedTokenId(tokenId);
    setIsModalOpen(true);
  };

  // Handle modal close after confirmation or error
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed!");
      setIsModalOpen(false);
      window.location.reload();
    }
    if (confirmError) {
      toast.error("Transaction failed!");
    }
  }, [isConfirmed, confirmError]);

  return (
    <div>
      <div className="flex flex-col flex-wrap justify-center">
        <div className="flex flex-row text-center justify-end m-0 pb-5">
          <button
            onClick={() => refreshNFTs()}
            className="p-2 bg-blue text-white rounded-lg hover:bg-opacity-70 flex flex-row gap-1"
          >
            <RefreshCcw />
            Refresh
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {nftDetails.map((item, i) => (
            <article
              key={i}
              className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700"
            >
              <figure className="relative">
                <div>
                  <Image
                    width={120}
                    height={120}
                    src={item.image}
                    alt={`memora#${item.id}`}
                    className="w-full rounded-[0.625rem]"
                    loading="lazy"
                  />
                </div>
              </figure>
              <div className="mt-7 flex items-center justify-between">
                <div>
                  <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                    {`memora #${item.id}`}
                  </span>
                </div>
                {item.isTriggerDeclared ? (
                  <p className=" rounded-xl bg-orange text-jacarta-900 px-2 py-1 text-center text-sm">
                    Triggered
                  </p>
                ) : (
                  <p className=" rounded-xl bg-green text-jacarta-900 px-2 py-1 text-center text-sm">
                    Live
                  </p>
                )}
              </div>
              <div className="mt-2 text-sm">
                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                  Prompt:
                </span>
                <span className="text-jacarta-500 dark:text-jacarta-300">
                  {item.prompt}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                  Action:
                </span>
                <span className="text-jacarta-500 dark:text-jacarta-300">
                  {actionTypes[item.actions].text}
                </span>
              </div>
              <div className="mt-2 text-sm max-w-xs">
                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                  Address Inherited:
                </span>
                <span className="text-jacarta-500 dark:text-jacarta-300 break-all">
                  {item.heir}
                </span>
              </div>
              {actionTypes[item.actions].text === "Transfer Bitcoin" && (
                <>
                  <div className="w-full flex justify-end">
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-white">
                        {item.balance ? formatEther(item.balance) : "0"} RBTC
                      </span>
                      <Image
                        width={30}
                        height={30}
                        alt="btc"
                        src={"https://i.postimg.cc/cJyjRjgb/btc.webp"}
                      />
                    </div>
                  </div>

                  {!item.isTriggerDeclared && (
                    <div className="mt-5 flex items-center">
                      <div className="group flex items-center w-full">
                        <button
                          onClick={() => openModal(item.id)}
                          className={`inline-block w-full rounded-full bg-green py-3 px-8 text-center font-semibold text-white transition-all hover:bg-accent-dark`}
                        >
                          Add Funds
                        </button>
                      </div>
                    </div>
                  )}
                  {item.isTriggerDeclared ? (
                    <div className="mt-5 flex items-center">
                      <div className="group flex items-center w-full">
                        <button
                          onClick={() => handleCancelTrigger(item.id)}
                          className={`inline-block w-full rounded-full bg-red border border-white/20 py-3 px-8 text-center font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0b0b1e] ${
                            isWritePending || isConfirming
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={isWritePending || isConfirming}
                        >
                          {isWritePending || isConfirming
                            ? "Processing..."
                            : "Cancel Trigger"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </article>
          ))}
          <Toaster />
        </div>
      </div>

      {isModalOpen && selectedTokenId && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-white text-center text-lg font-semibold mb-4">
              Add Funds to Memora #{selectedTokenId}
            </h2>
            <div className="mb-6">
              <label
                htmlFor="fund-amount"
                className="mb-2 block font-display text-white"
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
            <button
              onClick={() => handleAddFunds(selectedTokenId)}
              className={`w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark ${
                isWritePending || isConfirming
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isWritePending || isConfirming}
            >
              {isWritePending || isConfirming ? "Processing..." : "Submit"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
