import Image from "next/image";
import { Nouns } from "../dashboard/types/CreateActionTypes";

interface NftActionProps {
  metadata: Nouns
  handleWriteContract: () => void,
  isWritePending: boolean,
  isConfirming: boolean
  hash: string | undefined
}


export default function NftAction({metadata, handleWriteContract, isWritePending, isConfirming, hash} : NftActionProps) {
  
    return (
      <div className=" bg-jacarta-700 h-fit w-full rounded-xl p-10 flex flex-col gap-y-10">
        <div className="rounded-xl   h-fit w-full block">
        <Image alt="nft-action" width={0} height={0} sizes="100vw" className="rounded-xl h-fit w-full" src={String(metadata.imageSrc)}></Image>
        </div>

        <div id="card-content" className="flex flex-col gap-y-5">
            <div className="flex flex-row justify-between">
                <h1 className="text-white py-1 justify-start">Memora NFT</h1>
                <p className=" rounded-xl bg-[#FF9100] text-jacarta-900  px-2 py-1 text-center">RTK</p>
            </div>

            <div className="flex flex-row gap-3">
                <div className="rounded-xl h-[50px] w-[50px] block">
                <Image alt="avatar" width={50} height={50} className="rounded-xl" src="https://themesflat.co/html/axiesv/assets/images/avatar/avt-2.jpg"></Image>
                </div>

                <div className="flex flex-col m-0">
                <h2 className="">Owned By</h2>
                <h2 className="text-white">Zexoverz</h2>
                </div>
            </div>

            <div className="justify-center text-center">
              <button
                onClick={() => handleWriteContract()}
                disabled={isWritePending || isConfirming}
                className={`inline-block w-full ${isWritePending || isConfirming ? 'opacity-50' : ''} rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark`}
              >
                {isWritePending ? 'Preparing...' : isConfirming ? 'Confirming txn...' : 'Mint'}
                <div>
                
                </div>
              </button>

              {hash && isConfirming && (
                  <div className="pt-3">
                    <a href={`https://explorer.testnet.rootstock.io/tx/${hash}`} className=" hover:text-accent text-white mt-5" target="_blank" rel="noopener noreferrer">
                      View on Roostock exlporer
                  </a>
                  </div>
                )}
            </div>

            

          
        </div>
      </div>
    );
  }