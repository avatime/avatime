import { RequestConfig } from "./avatimeApi";
import { ChatMessageReq } from "./request/chatReq";

export interface ChatApi {
  sendMessage(chatMessageReq: ChatMessageReq, requestConfig: RequestConfig<void>): Promise<void>;
}
