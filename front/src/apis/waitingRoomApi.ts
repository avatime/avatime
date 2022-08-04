
import { SuccessRes } from "./response/successRes";
import { RequestEnterRoomReq, WaitingRoomEnterReq, WaitingRoomMakeReq } from "./request/waitingRoomReq ";
import { AgeRes, RequestEnterRoomRes, SidoRes } from "./response/waitingRoomRes";
import { axiosInstance } from './axiosInstance';
import axios from "axios";
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
  makeNewRoom(waitingRoomMakeReq: WaitingRoomMakeReq): Promise<RequestEnterRoomRes>;
}

const makeNewRoomApi: MakeNewRoomApi = {
 
  makeNewRoom: async function (waitingRoomMakeReq: WaitingRoomMakeReq): Promise<RequestEnterRoomRes> {
    return (await axiosInstance.post(`/waiting/create`, waitingRoomMakeReq)).data;
  },
};

//대기방 입장 신청-------------------------------------------------------------
interface RequestEnterRoomApi {
  requestEnterRoom(requestEnterRoomReq: RequestEnterRoomReq): Promise<RequestEnterRoomRes>;
}

const requestEnterRoomApi : RequestEnterRoomApi = {
  requestEnterRoom: async function  (requestEnterRoomReq: RequestEnterRoomReq): Promise<RequestEnterRoomRes>{
    return (await axiosInstance.post(`/waiting/state`, requestEnterRoomReq)).data;
  },
}


export { requestEnterRoomApi, sidoApi, ageApi, makeNewRoomApi};
