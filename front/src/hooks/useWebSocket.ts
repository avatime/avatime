/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as Stomp from "@stomp/stompjs";
import { WS_BASE_URL } from "../apis/url";

interface Param {
  onConnect: (frame: Stomp.Frame, client: Stomp.Client) => void;
  beforeDisconnected: (frame: Stomp.Frame, client: Stomp.Client) => void;
  reconnectDelay?: number;
}

export const useWebSocket = (param: Param) => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    let stompClient: Stomp.Client | undefined;
    const config: Stomp.StompConfig = {
      connectHeaders: {},
      brokerURL: WS_BASE_URL,
      reconnectDelay: param.reconnectDelay ? param.reconnectDelay : 5000,
      onConnect: (frame) => {
        console.log("소켓 연결 성공!!", frame);
        setConnected(true);
        param.onConnect(frame, stompClient!);
      },
      onDisconnect: (frame) => {
        console.log("소켓 연결 끊음!!", frame);
        setConnected(false);
        param.beforeDisconnected(frame, stompClient!);
      },
      logRawCommunication: false,
    };
    stompClient = new Stomp.Client(config);
    stompClient.activate();

    return () => {
      stompClient?.deactivate();
    };
  }, []);

  return connected;
};
