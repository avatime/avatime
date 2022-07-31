
import { SuccessRes } from "./response/successRes";

import { WaitingRoomEnterReq, WaitingRoomMakeReq } from "./request/waitingRoomReq ";

import axios from "axios";
import { AgeRes, SidoRes } from "./response/waitingRoomRes";
//나이어린순으로 정렬
//지역 가나다 순으로 정렬
//gender -> req 변경


const BASE_URL: string = "http://localhost:8080/api/v1";

//sido 목록 가져오기 ----------------------------------
interface SidoApi {
  receive: () => Promise<Array<SidoRes>>;
}
const sidoApi: SidoApi = {
  receive: async function (): Promise<SidoRes[]> {
    return  (await axios.get(`${BASE_URL}/waiting/sido`)).data;
  },
}



//age 목록 가져오기 ----------------------------------
interface AgeApi {
  receive: () => Promise<Array<AgeRes>>;
}
const ageApi: AgeApi = {
  receive: async function (): Promise<AgeRes[]> {
    return  (await axios.get(`${BASE_URL}/waiting/age`)).data;
  },
}




//대기방 생성------------------------------------------------

interface MakeNewRoomApi {
  makeNewRoom(waitingRoomMakeReq: WaitingRoomMakeReq): Promise<SuccessRes>;
}

const makeNewRoomApi: MakeNewRoomApi = {
 
  makeNewRoom: async function (waitingRoomMakeReq: WaitingRoomMakeReq): Promise<SuccessRes> {
    return (await axios.post(`${BASE_URL}/waiting/create`, waitingRoomMakeReq)).data;
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
