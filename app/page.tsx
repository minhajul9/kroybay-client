import { fetchData } from "@/lib/fetchFunction";
import { BannerType, Product } from "@/Types/Types";
import Image from "next/image";
import HomepageProducts from "./HomepageComponents/HomePageProducts";

export default async function Home() {

  const data = await fetchData("/home");

  console.log("home: ", data);

  const {
    banners,
    latestProducts,
    featuredProducts,
  }: {
    banners: BannerType[];
    latestProducts: Product[];
    featuredProducts: Product[];
  } = data.data;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HomepageProducts title="Latest Products" products={latestProducts} />
    </div>
  );
}
