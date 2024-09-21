import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Address, getAddress } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import MemoraABI from '@/data/MEMORA_ABI.json'
import { wagmiConfig } from '../clientwrapper';
import { readContract } from 'wagmi/actions';
import { nounsicon } from '@/data/nouns';
import { actionTypes } from './CreateAction';



interface NFTData {
    id: bigint | null;
    judge: `0x${string}`
    heir: `0x${string}`
    isTriggerDeclared: boolean,
    isHeirSigned: boolean,
    minter: `0x${string}`,
    prompt: string,
    actions: number,
    triggerTimestamp: number,
    balance: number,
    uri: string
}

export default function ActiveLegacy({activeTab} : {activeTab: String}) {
    const [nftDetails, setNftDetails] = useState<NFTData[]>([]);
    const checksumAddress: Address = getAddress(process.env.NEXT_PUBLIC_MEMORA_CONTRACT_ADDRESS as `0x${string}`)
    const {address} = useAccount()
    
    const { data: nftIds } = useReadContract({
        address: checksumAddress,
        abi: MemoraABI,
        functionName: 'getNFTsMintedByOwner',
        args: [address as Address],
    })

  const fetchNFTDetails = async (id: bigint): Promise<NFTData | null> => {
    try {
      const result  = await readContract(wagmiConfig, {
        address: checksumAddress,
        abi: MemoraABI,
        functionName: 'tokenInfo',
        args: [id],
      }) as RawNFTData

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
            uri: result[9]
        };
      }
    } catch (error) {
      console.error(`Error fetching details for NFT ${id}:`, error);
    }
    return null;
  };

  useEffect(() => {
    const fetchAllNFTDetails = async () => {
      if (nftIds && Array.isArray(nftIds)) {
        const details: NFTData[] | null = [];
        for (const id of nftIds) {
          const nftData : NFTData | null = await fetchNFTDetails(id);

          console.log(nftData)
          if (nftData) {
            details.push(nftData);
          }
        }
        setNftDetails(details);
      }
    };

    fetchAllNFTDetails();
  }, [nftIds, checksumAddress]);

  useEffect(() => {
    console.log(nftDetails)
  }, [nftDetails])
  

  return (
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                {nftDetails
                //   .filter((item) => item.type === activeTab)
                  .map((item, i) => (
                    <article key={i} className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                      <figure className="relative">
                        <div>
                          <Image
                            width={230}
                            height={230}
                            src={nounsicon[0].imageSrc}
                            alt={`memora#${item.id}`}
                            className="w-full rounded-[0.625rem]"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                      <div className="mt-7 flex items-center justify-between">
                        <div >
                          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                            {`memora #${item.id}`}
                          </span>
                        </div>
                        {item.isTriggerDeclared && <p className=" rounded-xl bg-green text-jacarta-900 px-2 py-1 text-center text-sm">Triggered</p>}
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          Action:
                        </span>
                        <span className="text-jacarta-500 dark:text-jacarta-300">
                          {actionTypes[item.actions].text}
                        </span>
                      </div>
            
                      <div className="mt-8 flex items-center justify-between">
                        {/* <span className="text-sm text-jacarta-500 dark:text-jacarta-300">
                            {Number(item.triggerTimestamp)}

                            Created: {new Date(Number(item.triggerTimestamp) / 1000).toLocaleDateString()}
                        </span> */}
                        {
                            !item.isTriggerDeclared && <div
                          className="group flex items-center"
                        >
                          <button className="font-display text-sm font-semibold group-hover:text-white dark:text-jacarta-700 bg-accent hover:bg-opacity-35 rounded-lg p-3">
                            Add Funds
                          </button>
                        </div>
                        }

                        <div className='flex flex-row gap-1 max-w-80'>
                        <span className=" text-white pt-1  ">
                            {item.balance ? item.balance : '0'} RBTC
                        </span>
                        <Image width={30} height={30} alt='btc' src={'https://i.postimg.cc/cJyjRjgb/btc.webp'}/>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
  )
}
