import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  setUserId,
  setUserName,
  setUserGender,
  setUserDesc,
  setSocialId,
  setSocialType,
  setProfileImagePath,
  setIsLogin,
  setToken,
} from "../../stores/slices/userSlice";
import { useQuery } from "react-query";
import { kakaoLogin } from "../../apis/userApi";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

interface Iprops {}

export const KakaoHandler: FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useQuery("login", kakaoLogin(code as string), {
    onSuccess: (res: any) => {
      const datas = res.data;
      if (datas.statusCode === 201) {
        console.log(datas);
        dispatch(setUserGender(datas.gender));
        console.log(datas.socialId);
        dispatch(setSocialId(datas.social_id));
        console.log(datas.socialType);
        dispatch(setSocialType(datas.social_type));
        dispatch(setIsLogin(false));
        navigate("/mypage");
        alert("회원가입이 필요합니다.");
      } else if (res.data.statusCode === 200) {
        console.log(datas);
        dispatch(setUserId(datas.user_id));
        dispatch(setUserName(datas.name));
        dispatch(setUserGender(datas.gender));
        dispatch(setUserDesc(datas.description));
        dispatch(setProfileImagePath(datas.profile_image_path));
        dispatch(setSocialId(datas.social_id));
        dispatch(setSocialType(datas.social_type));
        dispatch(setIsLogin(true));
        dispatch(setToken(datas.accessToken));
        navigate("/main");
        alert("로그인 성공");
      }
    },
    onError: (err) => console.log(err),
  });

  // 인가코드

  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};
