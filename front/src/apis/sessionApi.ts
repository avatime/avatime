import { FinalPickResultRes, SessionUserListRes } from "./response/sessionRes";
import { MeetingPickReq } from "./request/sessionReq";

interface SessionApi {
  requestSessionUserList: (size: number) => Promise<SessionUserListRes>;
  patchMeetingPick: (meetingPickReq: MeetingPickReq) => Promise<void>;
  getFinalPickResult: (meetingRoomId: number, size: number) => Promise<FinalPickResultRes>;
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
              i < size / 2
                ? "https://w.namu.la/s/0c6301df01fc4f180ec65717bad3d0254258abf0be33299e55df7c261040f517518eb9008a1a2cd3d7b8b7777d70182c185bc891b1054dc57b11cc46fd29130a774da72fb99e9cd314a01204db90231f879856a368e1568f38a7ea1340924f90"
                : "https://w.namu.la/s/45e263641521ef908d0a78f709545c80a3a591953d9cc900756ef872832c50870a87a4f72cb4a3a49c6148c53a23b42fb3e6b8a6ab75543969200cb1d8ea8e6c4d5831f1842a2b64eb08595e8134d5a617c1747cc6dc8ae9e642bd1e476451526eee4c927cdb77917cbe8f9c29adacfa",
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
  getFinalPickResult: function (meetingRoomId: number, size: number): Promise<FinalPickResultRes> {
    return new Promise((resolve) => {
      const resultList = [];

      for (let i = 0; i < size; i++) {
        resultList.push({
          userId: i,
          userName: `사용자 ${i + 1}`,
          gender: i < size / 2 ? "M" : "F",
          avatarId: i,
          avatarName: `아바타 ${i + 1}`,
          avatarImagePath:
            i < size / 2
              ? "https://w.namu.la/s/0c6301df01fc4f180ec65717bad3d0254258abf0be33299e55df7c261040f517518eb9008a1a2cd3d7b8b7777d70182c185bc891b1054dc57b11cc46fd29130a774da72fb99e9cd314a01204db90231f879856a368e1568f38a7ea1340924f90"
              : "https://w.namu.la/s/45e263641521ef908d0a78f709545c80a3a591953d9cc900756ef872832c50870a87a4f72cb4a3a49c6148c53a23b42fb3e6b8a6ab75543969200cb1d8ea8e6c4d5831f1842a2b64eb08595e8134d5a617c1747cc6dc8ae9e642bd1e476451526eee4c927cdb77917cbe8f9c29adacfa",
          pickUserId: i < size / 2 ? 4 : getRandomInt(0, size / 2),
        });
      }

      resolve({
        matched: false,
        meetingRoomId: 0,
        resultList,
      });
    });
  },
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export default sessionApi;
