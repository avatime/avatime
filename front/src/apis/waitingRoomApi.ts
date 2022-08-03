
import { SuccessRes } from "./response/successRes";
import { WaitingRoomEnterReq, WaitingRoomMakeReq } from "./request/waitingRoomReq ";
import { AgeRes, SidoRes } from "./response/waitingRoomRes";
import { axiosInstance } from './axiosInstance';
//나이어린순으로 정렬
//지역 가나다 순으로 정렬
//gender -> req 변경


//sido 목록 가져오기 ----------------------------------
interface SidoApi {
  receive: () => Promise<Array<SidoRes>>;
}
const sidoApi: SidoApi = {
  receive: async function (): Promise<SidoRes[]> {
    return  (await axiosInstance.get(`/waiting/sido`)).data;
  },
}



//age 목록 가져오기 ----------------------------------
interface AgeApi {
  receive: () => Promise<Array<AgeRes>>;
}
const ageApi: AgeApi = {
  receive: async function (): Promise<AgeRes[]> {
    return  (await axiosInstance.get(`/waiting/age`)).data;
  },
}




//대기방 생성------------------------------------------------

interface MakeNewRoomApi {
  makeNewRoom(waitingRoomMakeReq: WaitingRoomMakeReq): Promise<SuccessRes>;
}

const makeNewRoomApi: MakeNewRoomApi = {
 
  makeNewRoom: async function (waitingRoomMakeReq: WaitingRoomMakeReq): Promise<SuccessRes> {
    return (await axiosInstance.post(`/waiting/create`, waitingRoomMakeReq)).data;
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



export { sidoApi, ageApi, makeNewRoomApi, enterWaitingRoomApi };
