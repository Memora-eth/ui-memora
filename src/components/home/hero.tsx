import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero relative py-20 md:pt-32">
      <picture className="pointer-events-none absolute inset-0 -z-10">
        <Image
          width={1920}
          height={900}
          src="/img/gradient_dark.jpg"
          alt="gradient dark"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <div className="mx-auto max-w-2xl pt-24 text-center">
          <h1 className="mb-6 font-display text-5xl text-white lg:text-6xl">
            Secure Your Digital Legacy with Memora
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg leading-normal text-jacarta-50">
            Preserve your online presence, manage your digital assets, and ensure your digital legacy lives on for generations to come.
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            Start Your Legacy
          </Link>
        </div>
      </div>
    </section>
  );
}