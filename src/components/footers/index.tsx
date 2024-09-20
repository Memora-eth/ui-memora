import Socials from "@/components/footers/Socials";
import Image from "next/image";
import Link from "next/link";

export default function Footers() {
  return (
    <footer className="page-footer bg-white dark:bg-jacarta-900">
      <div className="container">
        <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
          <div className="col-span-full sm:col-span-3 md:col-span-4">
            <Link href="/" className="mb-6 inline-block">
              <Image
                width={130}
                height={28}
                src="/img/logo_white.png"
                className="max-h-7 dark:hidden"
                alt="Memora | Logo"
              />
              <Image
                width={100}
                height={28}
                src="/img/logo.png"
                className="hidden max-h-7 dark:block"
                alt="Memora | Logo Dark"
              />
            </Link>
            <p className="mb-12 dark:text-jacarta-300">
              Secure your digital legacy with Memora. Our blockchain-powered platform 
              helps you manage and preserve your online presence for future generations.
            </p>

            <div className="flex space-x-5">
              <Socials />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
          <span className="text-sm dark:text-jacarta-400">
            &copy; {new Date().getFullYear()} Memora. All rights reserved.{" "}
          </span>
          <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
            <li>
              <a href="#" className="hover:text-accent">
                Terms and conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}