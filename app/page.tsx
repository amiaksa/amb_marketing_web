import FeaturesSection from "@/components/FeaturesSection";
import HomePageClient from "../components/HomePageClient";
import DeviceShowcaseSection from "@/components/DeviceShowcaseSection";
import ProductVersionsScroll from "@/components/ProductVersionsScroll";
import AMBIntroSection from "@/components/AMBIntroSection";
import IphonePinnedShowcaseV2 from "@/components/IphonePinnedShowcaseV2";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <>
  <HomePageClient />
  <FeaturesSection />
  <DeviceShowcaseSection />
  <ProductVersionsScroll />
  <AMBIntroSection />
  <IphonePinnedShowcaseV2 />
  </> ;

}