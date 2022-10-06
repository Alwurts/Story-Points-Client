import Layout from "../components/Layout";
import PageTitleBiOutline from "../components/text/PageTitleBiOutline";
import TextInput from "../components/inputs/TextInput";
import ColorButtonLink from "../components/buttons/ColorButtonLink";

const CreateRoom = () => (
  <Layout title="Create Room">
    <div className="fixed inset-0 flex h-screen flex-col items-center justify-start space-y-16 overflow-y-scroll py-20">
      <PageTitleBiOutline className="flex-col text-8xl" outlineFirst>
        CREATE@@ ROOM
      </PageTitleBiOutline>
      <div className="flex w-full flex-col items-start justify-center space-y-8 px-5 lg:w-8/12 xl:w-7/12">
        <TextInput id="topic" title="Room Topic" />
        <TextInput id="firstName" title="Your Name" />
      </div>
      <ColorButtonLink href="/room/1" className="bg-green-500">
        Create
      </ColorButtonLink>
    </div>
  </Layout>
);

export default CreateRoom;
