import Layout from "../components/Layout";
import ColorButtonLink from "../components/buttons/ColorButtonLink";
import PageTitleBiOutline from "../components/text/PageTitleBiOutline";
import ColorButton from "../components/buttons/ColorButton";

const RoomErrorPage = () => (
  <Layout title="StoryMator">
    <div className="fixed inset-0 flex h-screen flex-col items-center justify-center overflow-y-scroll">
      <PageTitleBiOutline className="flex-col text-8xl">
        Room@@Doesn't Exist
      </PageTitleBiOutline>
      {/* <ColorButton className="mt-14 bg-purple-600">Join Room</ColorButton> */}
      <ColorButtonLink href="/create" className="mt-14 bg-cyan-300">
        Create Room
      </ColorButtonLink>
    </div>
  </Layout>
);

export default RoomErrorPage;
