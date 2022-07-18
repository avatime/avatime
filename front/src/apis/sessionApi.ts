import { SessionUserListRes } from "./response/sessionRes";

interface SessionApi {
  requestSessionUserList: (size: number) => Promise<SessionUserListRes>;
}

const sessionApi: SessionApi = {
  requestSessionUserList: function (size: number): Promise<SessionUserListRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userList = [];

        for (let i = 0; i < size; i++) {
          userList.push({ name: `사용자 ${i + 1}` });
        }
        
        resolve({
          userList,
        });
      }, 1000);
    });
  },
};

export default sessionApi;
