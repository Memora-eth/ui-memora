import type { Metadata } from "next";
import Home from "@/app/home";

export const metadata: Metadata = {
  title: "Memora - Secure your digital legacy",
  description: "Memora is a secure digital legacy platform",
};

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
