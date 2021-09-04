import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import Form from "../components/Form";
import { createRoom } from "../apis/RoomAPI";

interface ICreateForm {
  roomId: string;
  password?: string;
}

const initialValues = {
  roomId: "",
  password: undefined,
};

const inputs = [
  {
    type: "text",
    placeholder: "Enter Room ID",
    name: "roomId",
  },
  {
    type: "text",
    placeholder: "Enter Password",
    name: "password",
  },
];

const CreateRoom: FC = (props) => {
  const history = useHistory();

  const handleCreateRoom = async (values: ICreateForm) => {
    console.log("Creating Room");
    try {
      await createRoom(values.roomId, values.password);
      alert("Room Created");
      history.push("/room/" + values.roomId);
    } catch (error) {
      alert("Error in Creaing room");
    }
  };

  return (
    <>
      <Form
        initialValues={initialValues}
        inputs={inputs}
        buttonProps={{ label: "Create Room" }}
        onSubmit={handleCreateRoom}
      />
    </>
  );
};

export default CreateRoom;
