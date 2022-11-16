import Layout from "../components/Layout";
import ColorButtonLink from "../components/buttons/ColorButtonLink";
import PageTitleBiOutline from "../components/text/PageTitleBiOutline";
import ColorButton from "../components/buttons/ColorButton";
import { useEffect, useState } from "react";
import { returnAndRemoveQueryParams } from "../utils/banner";
import { useRouter } from "next/router";

const RoomErrorPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const { errorMessage } = router.query;
    if (errorMessage) {
      setErrorMessage(errorMessage as string);
    }
  }, [router, router.query]);
  return (
    <Layout title="StoryMator">
      <div className="fixed inset-0 flex h-screen flex-col items-center justify-center overflow-y-scroll">
        <PageTitleBiOutline className="flex-col text-8xl">
          {`Room@@${errorMessage ?? "Error"}`}
        </PageTitleBiOutline>
        {/* <ColorButton className="mt-14 bg-purple-600">Join Room</ColorButton> */}
        <ColorButtonLink href="/create" className="mt-14 bg-cyan-300">
          Create Room
        </ColorButtonLink>
      </div>
    </Layout>
  );
};

export default RoomErrorPage;
