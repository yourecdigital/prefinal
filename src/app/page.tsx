import { HomeSections } from "@/components/home-sections";
import { homeSeoMetadata } from "@/lib/page-seo";

export const metadata = homeSeoMetadata();

export default function Home() {
  return <HomeSections />;
}
