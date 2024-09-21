"use client"
import Headers from "@/components/headers";
import Footers from "@/components/footers";
import Profile from "@/components/user/profile";
import Collections from "@/components/dashboard/collections";
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
      <Collections />
      </main>
      <Footers />
    </>
  );
}
