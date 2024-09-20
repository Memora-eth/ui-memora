import type { Metadata } from "next";
import Footers from "@/components/footers";
import Headers from "@/components/headers";
import Hero from "@/components/home/hero";
import Process from "@/components/home/process";
import Features from "@/components/home/features";
import CallToAction from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Memora",
  description: "Memora",
};
export default function Home() {
  return (
    <>
      <Headers />
      <main>
        <Hero />
        <Process />
        <Features />
        <CallToAction />
      </main>
      <Footers />
    </>
  );
}
