import Headers from "@/components/headers";
import Footers from "@/components/footers";
import Profile from "@/components/user/profile";

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
      <Footers />
    </>
  );
}
