import Link from "next/link";
import Layout from "../components/Layout";
import SolidBoxShadowButton from "../components/SolidBoxShadowButton";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <div className="flex h-screen flex-col items-center justify-center space-y-2">
      <h1 className="fill-white text-9xl font-black outline-1 outline-offset-4 outline-black">
        Home
      </h1>
      <SolidBoxShadowButton>Start</SolidBoxShadowButton>
    </div>
  </Layout>
);

export default IndexPage;
