import { ChatMessageReq } from "./request/chatReq";
import { axiosInstance } from './axiosInstance';

interface ChatApi {
  sendMessage: (chatMessageReq: ChatMessageReq) => Promise<void>;
}

const chatApi: ChatApi = {
  sendMessage: async function (chatMessageReq: ChatMessageReq): Promise<void> {
    await axiosInstance.post("/chatting/send", chatMessageReq);
  },
};

export default chatApi;
