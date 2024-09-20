/* eslint-disable react/no-unescaped-entities */
import Headers from "@/components/headers";
import Footers from "@/components/footers";
import Profile from "@/components/user/profile";
import NftCard from "@/components/nft/NftCard";

export const metadata = {
  title: "Memora",
};

export default function Dashboard() {
  return (
    <>
      <Headers />
      <main className="pt-[5.5rem] lg:pt-48">
        <Profile />

        
      </main>

      <div>
      
      <h1 className=" text-white pt-10 text-center">Create New Actions</h1>
      <section className="flex justify-center h-[500px] rounded-lg  justify-center mt-10">

        <div className="flex flex-row gap-10">
          <NftCard/>

          <div className="flex flex-col gap-5">
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
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                What's going to happen?
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="Managing, Closing, Claiming"
              />
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
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Select Icon Image
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="1"
              />
            </div>
          </div>
        </div>  
      </section>
      </div>

      <div className=" flex justify-center h-64 rounded-lg">
          <div className="flex flex-row pt-10 gap-2">
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">Linked Account</h1>
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">NFT Status</h1>
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">Heir Status</h1>
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">Recent Activity</h1>
          </div>
      </div>

      
      
      <Footers />
    </>
  );
}
