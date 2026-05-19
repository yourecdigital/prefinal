"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  startDelay?: number;
  charDelay?: number;
  className?: string;
};

export function TypewriterText({
  text,
  startDelay = 0,
  charDelay = 68,
  className = "",
}: TypewriterTextProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setStarted(true);
      return;
    }

    const startTimer = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(startTimer);
  }, [startDelay, text.length]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), charDelay);
    return () => window.clearTimeout(timer);
  }, [started, count, text.length, charDelay]);

  return (
    <span className={`typewriter ${className}`} aria-label={text}>
      <span className="typewriter__text" aria-hidden="true">
        {text.slice(0, count)}
      </span>
      <span className="typewriter__cursor" aria-hidden="true" />
    </span>
  );
}
