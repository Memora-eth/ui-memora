"use client";

import { useEffect } from "react";

export default function DarkMode() {
  useEffect(() => {
    const htmlElm = document.getElementsByTagName("html")[0];
    htmlElm.classList.add("dark");
  }, []);
  return <></>;
}
