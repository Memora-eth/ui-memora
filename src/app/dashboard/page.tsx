"use client"
import Headers from "@/components/headers";
import Footers from "@/components/footers";
import Profile from "@/components/user/profile";
import CreateAction from "@/components/dashboard/CreateAction";

// export const metadata = {
//   title: "Memora",
// };



export default function Dashboard() {

  return (
    <>
      <Headers />
      <main className="pt-[5.5rem] lg:pt-48">
        <Profile />

        
      </main>

      <CreateAction/>
      
      <section className=" flex justify-center h-64 rounded-lg mt-20">
          <div className="flex flex-row pt-10 gap-2">
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">Linked Account</h1>
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">NFT Status</h1>
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">Heir Status</h1>
            <h1 className=" cursor-pointer hover:text-white h-10 bg-jacarta-700 rounded-lg p-2">Recent Activity</h1>
          </div>
      </section>

      
      
      <Footers />
    </>
  );
}
