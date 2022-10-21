import Layout from "../components/Layout";
import PageTitleBiOutline from "../components/text/PageTitleBiOutline";
import TextInput from "../components/inputs/TextInput";
import ColorButton from "../components/buttons/ColorButton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import socket from "../utils/socket";
import { useRouter } from "next/router";

interface CreateRoomForm {
  roomTopic: string;
  userName: string;
}

const CreateRoom = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    socket.on("user:created", (user) => {
      if (user) {
        console.log("user:created");
        console.log(user);
        localStorage.setItem("roomUser", JSON.stringify(user));
        socket.emit("room:create", {
          roomTopic: getValues("roomTopic").toUpperCase(),
          userId: user.id,
        });
      }
    });
    socket.on("room:created", (room) => {
      // Save room
      console.log("room");
      console.log(room);
      setIsCreatingRoom(false);
      router.push(`/room/${room.id}`);
    });

    return () => {
      // Clean up of sockets
      socket.off("user:created");
      socket.off("room:created");
    };
  }, []);

  const {
    register: registerForm,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, dirtyFields },
    reset: resetForm,
  } = useForm<CreateRoomForm>();

  const onCreateRoom = (data) => {
    setIsCreatingRoom(true);
    data = capitalizeInputs(data);
    socket.emit("user:create", { userName: data.userName });
  };

  const capitalizeInputs = (dataToCapitalize) => {
    Object.keys(dataToCapitalize).forEach((inputId) => {
      dataToCapitalize[inputId] = dataToCapitalize[inputId].toUpperCase();
    });
    return dataToCapitalize;
  };

  return (
    <Layout title="Create Room">
      <form
        onSubmit={handleSubmit(onCreateRoom)}
        className="fixed inset-0 flex h-screen flex-col items-center justify-start space-y-16 overflow-y-scroll py-20"
      >
        <PageTitleBiOutline className="flex-col text-8xl" outlineFirst>
          CREATE@@ ROOM
        </PageTitleBiOutline>
        <div className="flex w-full flex-col items-start justify-center space-y-8 px-5 lg:w-8/12 xl:w-7/12">
          <TextInput
            id="roomTopic"
            title="Room Topic"
            required
            disabled={isCreatingRoom}
            error={errors["roomTopic"]}
            registerInput={registerForm}
          />
          <TextInput
            id="userName"
            title="Your Name"
            required
            disabled={isCreatingRoom}
            error={errors["userName"]}
            registerInput={registerForm}
          />
        </div>
        <ColorButton actionIsLoading={isCreatingRoom} className="bg-green-500">
          Create
        </ColorButton>
      </form>
    </Layout>
  );
};

export default CreateRoom;
