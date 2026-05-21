"use client";

import { useEffect, useRef } from "react";

type AmbientGrillVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** CSS object-position для кадрирования (например center 35%) */
  objectPosition?: string;
};

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

/** Зацикленное фоновое видео без контролов — только атмосфера */
export function AmbientGrillVideo({ src, poster, className = "", objectPosition }: AmbientGrillVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const videoSrc = `${basePath}${src}`;
  const posterSrc = poster ? `${basePath}${poster}` : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => {
      el.play().catch(() => {});
    };
    play();
    el.addEventListener("loadeddata", play);
    return () => el.removeEventListener("loadeddata", play);
  }, [videoSrc]);

  return (
    <div className={`ambient-video ${className}`.trim()} aria-hidden>
      <video
        ref={ref}
        className="ambient-video__media"
        style={objectPosition ? { objectPosition } : undefined}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        tabIndex={-1}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="ambient-video__veil" />
    </div>
  );
}
