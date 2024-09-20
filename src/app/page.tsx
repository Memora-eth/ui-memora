import type { Metadata } from "next";
import Home from "@/app/home";

export const metadata: Metadata = {
  title: "Memora",
  description: "Memora",
};

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
