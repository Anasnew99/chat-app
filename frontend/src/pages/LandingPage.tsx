import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = (props) => {
  const history = useHistory();

  const [roomId, setRoomId] = useState<undefined | string>("");
  return (
    <>
      <input
        type={"text"}
        value={roomId}
        placeholder={"Enter Room ID"}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={() => {
          history.push("/chat/" + roomId);
        }}
      >
        Go To Chat Room
      </button>
    </>
  );
};

export default LandingPage;
