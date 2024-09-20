import type { Metadata } from "next";
import Footers from "@/components/footers";
import Headers from "@/components/headers";

export const metadata: Metadata = {
  title: "Memora",
  description: "Memora",
};
export default function Home() {
  return (
    <>
      <Headers />
      <main></main>
      <Footers />
    </>
  );
}
