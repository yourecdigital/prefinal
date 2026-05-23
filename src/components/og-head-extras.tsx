import { OG_IMAGE_URL } from "@/lib/og-share";

/** Доп. теги для VK и старых парсеров (дублируют metadata openGraph). */
export function OgHeadExtras() {
  return (
    <>
      <link rel="image_src" href={OG_IMAGE_URL} />
      <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:image:src" content={OG_IMAGE_URL} />
    </>
  );
}
