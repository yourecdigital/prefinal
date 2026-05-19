"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

const LAYERS = [
  { src: "/mountains/caucasus-far.png",  scrollSpeed: 0.08,  mouseSpeed: 0.015, cls: "caucasus-layer--far" },
  { src: "/mountains/caucasus-mid.png",  scrollSpeed: 0.18,  mouseSpeed: 0.035, cls: "caucasus-layer--mid" },
  { src: "/mountains/caucasus-near.png", scrollSpeed: 0.30,  mouseSpeed: 0.06,  cls: "caucasus-layer--near" },
] as const;

function ParallaxLayer({
  src, scrollSpeed, mouseSpeed, cls, scrollYProgress, mouseX, mouseY,
}: {
  src: string; scrollSpeed: number; mouseSpeed: number; cls: string;
  scrollYProgress: MotionValue<number>;
  mouseX: MotionValue<number>; mouseY: MotionValue<number>;
}) {
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", `${scrollSpeed * 100}%`]);
  const smoothScrollY = useSpring(scrollY, { stiffness: 90, damping: 30, mass: 0.6 });

  const mx = useTransform(mouseX, (v) => v * mouseSpeed * 40);
  const my = useTransform(mouseY, (v) => v * mouseSpeed * 20);
  const smoothMx = useSpring(mx, { stiffness: 50, damping: 25, mass: 1 });
  const smoothMy = useSpring(my, { stiffness: 50, damping: 25, mass: 1 });

  return (
    <motion.div
      style={{ y: smoothScrollY, x: smoothMx, translateY: smoothMy }}
      className={`caucasus-layer-wrap ${cls}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${src}`}
        alt=""
        aria-hidden
        className="caucasus-layer__img"
        decoding="async"
        loading="eager"
      />
    </motion.div>
  );
}

type Props = {
  scrollRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  heightClassName?: string;
};

export function CaucasusMountains({
  scrollRef,
  className = "",
  heightClassName = "h-[min(52vh,480px)] sm:h-[min(48vh,500px)] md:h-[min(46vh,520px)]",
}: Props) {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef ?? localRef,
    offset: scrollRef ? ["start start", "end start"] : ["start end", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = useCallback(
    (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth) * 2 - 1;
      const cy = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(cx);
      mouseY.set(cy);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  const mistOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.4, 0.25]);

  return (
    <motion.div
      ref={localRef}
      className={`caucasus-mountains ${heightClassName} ${className}`}
      aria-hidden
    >
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__glow" />
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__mist" />

      <div className="caucasus-mountains__stack">
        {LAYERS.map((layer) => (
          <ParallaxLayer
            key={layer.src}
            src={layer.src}
            scrollSpeed={layer.scrollSpeed}
            mouseSpeed={layer.mouseSpeed}
            cls={layer.cls}
            scrollYProgress={scrollYProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      <div className="caucasus-mountains__particles" aria-hidden>
        <span className="mountain-particle mountain-particle--1" />
        <span className="mountain-particle mountain-particle--2" />
        <span className="mountain-particle mountain-particle--3" />
      </div>
    </motion.div>
  );
}
