import axios from "axios";
import { BASE_URL } from "../config/constants";

const ROOM_URL = BASE_URL + "/room";
const createRoom = (roomId: string, password?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.post(ROOM_URL, { roomId, password });
      return resolve(data.data);
    } catch (error) {
      return reject(error);
    }
  });
};

export { createRoom };
