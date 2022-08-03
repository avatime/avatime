const CLIENT_ID_KAKAO : string = "6300198dbbef93aac1c88f68eeb4525a";
const CLIENT_ID_NAVER : string = "UZzm3q6_v7QsL_RHeEgn";
const REDIRECT_URI_KAKAO : string = "http://localhost:8080/kakao";
const REDIRECT_URI_NAVER : string = "http://localhost:8080/naver";
const RAND_STATE : number = Math.floor(Math.random() * 10000)+1;

export const KAKAO_AUTH_URL : string = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;
export const NAVER_AUTH_URL : string = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID_NAVER}&redirect_uri=${REDIRECT_URI_NAVER}&state=${RAND_STATE}`;