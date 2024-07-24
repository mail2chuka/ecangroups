
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { InfoData, InfoDataThree, InfoDataTwo } from "../../public/data/InfoData";
import Info from "@/components/Info";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title={"Home Page"}>
   
      <Hero/>   
      <Info {...InfoData} position={1} />
      <Info {...InfoDataTwo} position={2} />
      <Info {...InfoDataThree} position={3} />
   </Layout>
  );
}
