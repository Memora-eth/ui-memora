"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

const phrases = [
  "I  want to give my children access to my email account when I pass away.",
  "I  want to give full access to my spouse to my Facebook account when I get married.",
  "I  want to close my Dropbox account and transfer files to my future child when I retire.",
  "I  want to grant management access to my best friend for my LinkedIn account when I change jobs.",
  "I  want to give read-only access to my lawyer for my Google Drive if I get divorced.",
];

const TypewriterEffect = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const typeNextChar = useCallback(() => {
    if (charIndex < phrases[phraseIndex].length) {
      setText((prev) => prev + phrases[phraseIndex][charIndex]);
      setCharIndex((prev) => prev + 1);
    } else {
      setTimeout(() => {
        setText("");
        setCharIndex(0);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }
  }, [charIndex, phraseIndex]);

  useEffect(() => {
    const intervalId = setInterval(typeNextChar, 100);
    return () => clearInterval(intervalId);
  }, [typeNextChar]);

  return (
    <div
      className="text-jacarta-50 mb-8 max-w-md text-lg leading-normal"
      style={{
        fontSize: "24px",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        maxWidth: "600px",
        textAlign: "center",
        margin: "auto",
        overflowWrap: "break-word",
        minHeight: "48px",
      }}
    >
      {text}
    </div>
  );
};

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
          <TypewriterEffect />
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