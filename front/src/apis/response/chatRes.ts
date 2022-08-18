type ChatType = "ENTER" | "TALK" | "LEAVE";

export interface ChatMessageRes {
  user_id: number;
  name: string;
  chat_type: ChatType;
  message: string;
  created_time: string;
}
