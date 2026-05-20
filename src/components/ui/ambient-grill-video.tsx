"use client";

type AmbientGrillVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

/** Зацикленное фоновое видео без контролов — только атмосфера */
export function AmbientGrillVideo({ src, poster, className = "" }: AmbientGrillVideoProps) {
  const videoSrc = `${basePath}${src}`;
  const posterSrc = poster ? `${basePath}${poster}` : undefined;

  return (
    <div className={`ambient-video ${className}`.trim()} aria-hidden>
      <video
        className="ambient-video__media"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
