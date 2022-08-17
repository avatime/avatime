import { OpenVidu } from "openvidu-browser";
import { getToken } from "../apis/openViduApi";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useOpenvidu = (userId: number, meetingRoomId: number, gender: string) => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();
  const [session, setSession] = useState<any>();

  const leaveSession = useCallback(() => {
    console.log("AAAA", session);
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  useEffect(() => {
    const openVidu = new OpenVidu();
    let session = openVidu.initSession();

    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, "");
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => {
        return [
          ...(prev.filter((it) => it.userId !== +data.userId)),
          { streamManager: subscriber, userId: +data.userId, gender: data.gender },
        ];
      });
    });

    session.on("streamDestroyed", (event) => {
      event.preventDefault();

      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => prev.filter((it) => it.userId !== +data.userId));
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken(String(meetingRoomId)).then((token) => {
      session!
        .connect(token, JSON.stringify({ userId, gender }))
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

    setSession(session);
    return () => {
      if (session) {
        session.disconnect();
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [gender, meetingRoomId, userId]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => leaveSession());
    return () => {
      window.removeEventListener("beforeunload", () => leaveSession());
    };
  }, [leaveSession]);

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
    () => [{ streamManager: publisher, userId, gender }, ...subscribers],
    [gender, publisher, subscribers, userId]
  );

  return {
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
  };
};
