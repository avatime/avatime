import { SessionUserListRes } from "./response/sessionRes";
import { MeetingPickReq } from "./request/sessionReq";

interface SessionApi {
  requestSessionUserList: (size: number) => Promise<SessionUserListRes>;
  patchMeetingPick: (meetingPickReq: MeetingPickReq) => Promise<void>;
}

const sessionApi: SessionApi = {
  requestSessionUserList: function (size: number): Promise<SessionUserListRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userList = [];

        for (let i = 0; i < size; i++) {
          userList.push({
            userId: i,
            userName: `사용자 ${i + 1}`,
            avatarId: i,
            avatarName: `아바타 ${i + 1}`,
            avatarImagePath:
              "https://w.namu.la/s/0c6301df01fc4f180ec65717bad3d0254258abf0be33299e55df7c261040f517518eb9008a1a2cd3d7b8b7777d70182c185bc891b1054dc57b11cc46fd29130a774da72fb99e9cd314a01204db90231f879856a368e1568f38a7ea1340924f90",
          });
        }

        resolve({
          userList,
        });
      }, 1000);
    });
  },
  patchMeetingPick: (meetingPickReq: MeetingPickReq): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }),
};

export default sessionApi;
