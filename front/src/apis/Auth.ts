const CLIENT_ID : string = "6300198dbbef93aac1c88f68eeb4525a";
const REDIRECT_URI : string = "http://localhost:8080/api/v1/auth/kakao";

export const KAKAO_AUTH_URL : string = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL : string = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;