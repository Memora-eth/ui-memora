import React, { useEffect, useState } from 'react'
import NftAction from '../nft/NftAction';
import Image from 'next/image';
import { nounsicon } from '@/data/nouns';
import { useContractWrite, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import MemoraABI from '@/data/MEMORA_ABI.json'
import { Address, getAddress} from 'viem';
// import { useFarcaster } from '@/context/FarcasterContext';
import toast, { Toaster,  } from 'react-hot-toast';


const actionTypes = [
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
];


export default function CreateAction() {
    const [actionForm, setActionForm] = useState({
        'prompt': '',
        'action': actionTypes[0],
        'claimer': '',
        'metadata': nounsicon[0]
    })
    const [showDropdown, setShowDropdown] = useState(false)
    const [showIconDropdown, setShowIconDropdown] = useState(false)

    
    const checksumAddress : Address = getAddress('0xb5B7e3f5c107BF35418dCAaFeB4F8249E3D276a0')

    const { 
      writeContract,
      data: hash,
      isPending: isWritePending,
      isError: isWriteError,
      error: writeError
    } = useWriteContract();
  
    const { 
      isLoading: isConfirming,
      isSuccess: isConfirmed,
      error: confirmError
    } = useWaitForTransactionReceipt({
      hash,
    });

    const handleWriteContract = async () => {
      console.log(actionForm, "TRIGGER")
      const toastId = toast.loading('Preparing transaction...');
      try {
        const result = await writeContract({
          address: checksumAddress,
          abi: MemoraABI,
          functionName: 'mint',
          args: [actionForm.claimer, actionForm.action.id, actionForm.prompt, actionForm.metadata.ipfsHash]
        });
        
        
        toast.loading('Transaction submitted. Waiting for confirmation...', { id: toastId });
      } catch (error) {
        console.error('Contract write error:', error);
        toast.error(`Failed to send transaction`, { id: toastId });
      }
    };
  
    React.useEffect(() => {
      if (isWriteError) {
        toast.dismiss()
        toast.error(`Write error: ${writeError?.name}`);
      }
    }, [isWriteError, writeError]);
  
    React.useEffect(() => {
      if (isConfirmed) {
        toast.dismiss()
        setActionForm({
          'prompt': '',
          'action': actionTypes[0],
          'claimer': '',
          'metadata': nounsicon[0]
        })
        toast.success('Transaction successfully!');
      } else if (confirmError) {
        toast.dismiss()
        toast.error(`Transaction failed: ${confirmError.message}`);
      }
    }, [isConfirmed, confirmError]);
    
    return (
    <>
    <h1 className="mb-6 font-display text-5xl text-white lg:text-6xl text-center mt-10">
          Mint NFT Actions
      </h1>
      <section className="flex justify-center h-[500px] rounded-lg mt-10">

        <div className="flex flex-row gap-10">
          <div className="w-[350px]">
            <NftAction metadata={actionForm.metadata} handleWriteContract={handleWriteContract} isWritePending={isWritePending} isConfirming={isConfirming} hash={hash} />
          </div>

          <div className="flex flex-col h-fit gap-5 w-[600px] mt-10">
            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                What action trigger
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="I want give managing access "
                value={actionForm.prompt}
                onChange={(e) => setActionForm({...actionForm, prompt: e.target.value})}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Whats gonna do 
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
                  className={`dropdown-menu z-50 ${!showDropdown ? 'hidden' : ''} absolute w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800`}
                  aria-labelledby="action-type"
                >
                  {actionTypes.map((elm, i) => (
                    <button
                      onClick={() => {
                        setActionForm({...actionForm, action: elm})
                        setShowDropdown(!showDropdown)
                      }}
                      key={i}
                      className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-base text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <span className="flex items-center">
                        {elm.text}
                      </span>
                    </button>
                  ))}
                </div>
            </div>
            </div>


            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Who is claimer ? (wallet address)
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="0x..."
                value={actionForm.claimer}
                onChange={(e) => setActionForm({...actionForm, claimer: e.target.value})}
              />
            </div>

            <div className="mb-6">
              <label
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Select Icon Image
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
                  className={`dropdown-menu z-50 ${!showIconDropdown ? 'hidden' : ''} absolute w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800`}
                  aria-labelledby="nouns-icon"
                >
                  {nounsicon.map((elm, i) => (
                    <button
                      onClick={() => {
                        setActionForm({...actionForm, metadata: elm})
                        setShowIconDropdown(!setShowIconDropdown)
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
  )
}
