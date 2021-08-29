import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div``;

interface ChatPageProps {}

interface ParamsProps {
  id?: string;
}

const ChatPage: FC<ChatPageProps> = (props) => {
  const params = useParams<ParamsProps>();
  const [message, setMessage] = useState("");
  console.log(params);
  return (
    <Content>
      <p>Your chats will appear here.</p>
      <input
        type={"text"}
        value={message}
        placeholder={"Type your message here"}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={() => {}}>Send</button>
    </Content>
  );
};

export default ChatPage;
