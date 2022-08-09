import { OpenVidu } from "openvidu-browser";
import { getToken } from "../apis/openViduApi";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useOpenvidu = (userId: number, meetingRoomId: number) => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();

  useEffect(() => {
    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, "");
      setSubscribers((prev) => [
        ...prev,
        { streamManager: subscriber, userId: +event.stream.connection.data },
      ]);
    });

    session.on("streamDestroyed", (event) => {
      event.preventDefault();
      
      setSubscribers((prev) => {
        let index = prev.findIndex((it) => it.userId === +event.stream.connection.data);
        return -1 < index ? prev.splice(index, 1) : prev;
      });
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken(String(meetingRoomId)).then((token) => {
      session
        .connect(token, userId)
        .then(async () => {
          await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          const devices = await openVidu.getDevices();
          const videoDevices = devices.filter((device) => device.kind === "videoinput");

          const publisher = openVidu.initPublisher("", {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          setPublisher(publisher);
          session.publish(publisher);
        })
        .catch((error) => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    });

    return () => {
      session.disconnect();
      setSubscribers([]);
    };
  }, [meetingRoomId, userId]);

  const onChangeCameraStatus = useCallback(
    (status: boolean) => {
      publisher?.publishVideo(status);
    },
    [publisher]
  );

  const onChangeMicStatus = useCallback(
    (status: boolean) => {
      publisher?.publishAudio(status);
    },
    [publisher]
  );

  const streamList = useMemo(
    () => [{ streamManager: publisher, userId }, ...subscribers],
    [publisher, subscribers, userId]
  );

  return {
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
  };
};
