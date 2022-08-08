const DEV = false;

const PORT_WEB = ":3000";
const PORT_SERVER = ":8080";
const PORT_OPENVIDU = ":4443";

const URL_LOCAL = "http://localhost";
const URL_RELEASE = "http://i7a309.p.ssafy.io";

export const REDIRECT_URI_KAKAO: string =
  (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + "/kakao"; // 8080
export const REDIRECT_URI_NAVER: string =
  (DEV ? `${URL_LOCAL}${PORT_WEB}` : URL_RELEASE) + "/naver"; // 3000
export const WS_BASE_URL = (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + "/ws/ava";
export const API_BASE_URL = (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + "/api/v1";

export const OPENVIDU_SERVER_URL = (DEV ? "https://localhost" : "https://i7a309.p.ssafy.io") + PORT_OPENVIDU;
