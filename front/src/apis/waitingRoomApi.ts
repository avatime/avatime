import { SidoRes } from "./response/sidoRes";
import { SuccessRes } from "./response/successRes";
import { WaitingRoomInfoReq } from "./request/waitingRoomInfoReq";
import { WaitingRoomNameReq } from "./request/waitingRoomNameReq";
import { WaitingRoomInfoRes } from "./response/waitingRoomInfoRes";
import { WaitingRoomEnterReq } from "./request/waitingRoomEnterReq ";
//나이어린순으로 정렬
//지역 가나다 순으로 정렬
//방제목 검색
//gender -> req 변경
//filter api

//get sidoname--------------------------------------
interface SidoApi {
  receive: () => Promise<Array<SidoRes>>;
}

const sidoApi: SidoApi = {
  receive: function (): Promise<SidoRes[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },
};

//대기방 삭제?????----------------------------------------------

interface WaitingRoomDeleteApi {
  deleteWaitingRoom(waitingRoomNameReq: WaitingRoomNameReq): Promise<SuccessRes>;
}

const waitingRoomDeleteApi: WaitingRoomDeleteApi = {
  deleteWaitingRoom: function (waitingRoomNameReq: WaitingRoomNameReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        alert("방이 삭제되었어요");
      }, 500);
    });
  },
};
//방목록 조회-----------------------------------

interface WaitingRoomListApi {
  receive: () => Promise<Array<WaitingRoomInfoRes>>;
}

const waitingRoomListApi: WaitingRoomListApi = {
  receive: function (): Promise<WaitingRoomInfoRes[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },
};

//대기방 생성------------------------------------------------

interface MakeNewRoomApi {
  makeNewRoom(waitingRoomInfoReq: WaitingRoomInfoReq): Promise<SuccessRes>;
}

const makeNewRoomApi: MakeNewRoomApi = {
  makeNewRoom: function (waitingRoomInfoReq: WaitingRoomInfoReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        alert("미팅방이 만들어졌어요.");
      }, 500);
    });
  },
};

//대기방 입장--------------------------------------------------
interface EnterWaitingRoomApi {
  enterRoom(enterWaitingRoomReq: WaitingRoomEnterReq): Promise<SuccessRes>;
}

const enterWaitingRoomApi: EnterWaitingRoomApi = {
  enterRoom: function (enterWaitingRoomReq: WaitingRoomEnterReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        alert("미팅방에 입장완료!");
      }, 500);
    });
  },
};

export { sidoApi, waitingRoomDeleteApi, makeNewRoomApi, waitingRoomListApi, enterWaitingRoomApi };
