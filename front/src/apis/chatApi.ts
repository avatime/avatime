import { ChatMessageReq } from "./request/chatReq";
import axios from "axios";

interface ChatApi {
  sendMessage: (chatMessageReq: ChatMessageReq) => Promise<void>;
}

const chatApi: ChatApi = {
  sendMessage: async function (chatMessageReq: ChatMessageReq): Promise<void> {
    await axios.post("http://localhost:8080/api/v1/chatting/send", chatMessageReq);
  },
};

export default chatApi;
