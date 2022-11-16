import Layout from "../components/Layout";
import PageTitleBiOutline from "../components/text/PageTitleBiOutline";
import TextInput from "../components/inputs/TextInput";
import ColorButton from "../components/buttons/ColorButton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import socket from "../utils/socket";
import { useRouter } from "next/router";
import axios from "axios";
import { User } from "../types/user";
import ConnectionDialog from "../components/dialogs/ConnectionDialog";
import ErrorDialog from "../components/dialogs/ErrorBanner";
import { notifySameRoute } from "../utils/banner";

interface CreateRoomForm {
  roomTopic: string;
  userName: string;
}

const CreateRoom = () => {
  const [loggedUser, setLoggedUser] = useState<User>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);
  const [showConnectionDialog, setShowConnectionDialog] =
    useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const userSaved: User = JSON.parse(localStorage.getItem("roomUser"));
    if (userSaved) {
      setLoggedUser(userSaved);
      resetForm({ userName: userSaved?.userName });
    }
  }, []);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset: resetForm,
  } = useForm<CreateRoomForm>();

  const onSubmit = async (data: CreateRoomForm) => {
    try {
      setIsCreatingRoom(true);
      data = capitalizeInputs(data);
      let newUserRes;
      if (!loggedUser) {
        newUserRes = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/signup",
          {
            userName: data.userName,
          }
        );
        localStorage.setItem("roomUser", JSON.stringify(newUserRes.data));
      }

      if (loggedUser) {
        newUserRes = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/signin",
          {
            id: loggedUser.id,
            userName: data.userName,
          }
        );
        localStorage.setItem("roomUser", JSON.stringify(newUserRes.data));
      }

      const newRoomRes = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/room/createroom",
        {
          roomTopic: data.roomTopic,
          moderatorId: newUserRes.data.id,
        }
      );

      setIsCreatingRoom(false);
      router.push(`/room/${newRoomRes.data.id}`);
    } catch (e) {
      setIsCreatingRoom(false);
      notifySameRoute(router, {
        messageType: "error",
        message: "Unknown error",
      });
      console.log(e);
    }
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
        onSubmit={handleSubmit(onSubmit)}
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
