import Layout from "../../components/Layout";
import PageTitleBiOutline from "../../components/text/PageTitleBiOutline";
import TextInput from "../../components/inputs/TextInput";
import ColorButton from "../../components/buttons/ColorButton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import socket from "../../utils/socket";
import { useRouter } from "next/router";
import axios from "axios";
import { User } from "../../types/user";
import { Room } from "../../types/room";

interface JoinRoomForm {
  userName: string;
}

const JoinRoom = () => {
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);
  const [roomIdIsValid, setRoomIdIsValid] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User>(null);

  const router = useRouter();

  const { roomId } = router.query;

  useEffect(() => {
    if (roomId && !roomIdIsValid) {
      const validateRoom = async (roomToValidate) => {
        const { data: roomReturned }: { data: Room } = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/room/validateroom",
          {
            roomId: roomToValidate,
          }
        );
        if (!roomReturned) {
          router.push("/roomerror");
          return;
        }

        const userSaved: User = JSON.parse(localStorage.getItem("roomUser"));

        if (userSaved) {
          const { data: userInRoom }: { data: any } = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_URL + "/api/room/validateuserinroom",
            {
              roomId: roomToValidate,
              userSavedId: userSaved.id,
            }
          );
          if (userInRoom.currentlyActive) {
            router.push(`/room/${roomId}`);
            return;
          }
          setLoggedUser(userSaved);
          resetForm({ userName: userSaved.userName });
        }
        setRoomIdIsValid(true);
      };
      validateRoom(roomId);
    }
  }, [router.query]);

  const {
    register: registerForm,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, dirtyFields },
    reset: resetForm,
  } = useForm<JoinRoomForm>();

  const onSubmit = async (data: JoinRoomForm) => {
    try {
      setIsJoiningRoom(true);

      console.log(data);
      data = capitalizeInputs(data);

      if (!loggedUser) {
        const newUserRes = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/signup",
          {
            userName: data.userName,
          }
        );
        localStorage.setItem("roomUser", JSON.stringify(newUserRes.data));
        router.push(`/room/${roomId}`);
      }

      if (loggedUser) {
        const newUserRes = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/signin",
          {
            id: loggedUser.id,
            userName: data.userName,
          }
        );
        localStorage.setItem("roomUser", JSON.stringify(newUserRes.data));
        router.push(`/room/${roomId}`);
      }

      setIsJoiningRoom(false);
    } catch (e) {
      setIsJoiningRoom(false);
      console.log(e);
    }
  };

  const capitalizeInputs = (dataToCapitalize) => {
    Object.keys(dataToCapitalize).forEach((inputId) => {
      dataToCapitalize[inputId] = dataToCapitalize[inputId].toUpperCase();
    });
    return dataToCapitalize;
  };

  if (!roomIdIsValid) return null;

  return (
    <Layout title="Join Room">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed inset-0 flex h-screen flex-col items-center justify-start space-y-16 overflow-y-scroll py-20"
      >
        <PageTitleBiOutline className="flex-col text-8xl" outlineFirst>
          {`JOIN ROOM@@ ${roomId}`}
        </PageTitleBiOutline>
        <div className="flex w-full flex-col items-start justify-center space-y-8 px-5 lg:w-8/12 xl:w-7/12">
          <TextInput
            id="userName"
            title="Your Name"
            required
            disabled={isJoiningRoom}
            error={errors["userName"]}
            registerInput={registerForm}
          />
        </div>
        <ColorButton actionIsLoading={isJoiningRoom} className="bg-green-500">
          Join
        </ColorButton>
      </form>
    </Layout>
  );
};

export default JoinRoom;
