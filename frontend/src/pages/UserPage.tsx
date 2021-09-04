import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

interface UserPageProps {}

const UserPage: FC<UserPageProps> = (props) => {
  const history = useHistory();

  const [roomId, setRoomId] = useState<undefined | string>("");
  return (
    <>
      <button onClick={() => history.push("/create")}>Create a Room</button>
      <button onClick={() => history.push("/join")}>Join a Room</button>
    </>
  );
};

export default UserPage;
