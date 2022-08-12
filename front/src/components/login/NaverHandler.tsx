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
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { AvatimeApi } from "../../apis/avatimeApi";

interface Iprops {}

export const NaverHandler: FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");
  const navigate = useNavigate();

  AvatimeApi.getInstance().naverLogin(
    code as string,
    state as string,
    {
      onSuccess(data) {
        if (data.statusCode === 201) {
          console.log(data);
          dispatch(setUserGender(data.gender));
          console.log(data.social_id);
          dispatch(setSocialId(data.social_id));
          console.log(data.social_type);
          dispatch(setSocialType(data.social_type));
          dispatch(setIsLogin(false));
          navigate("/mypage");
          alert("회원가입이 필요합니다.");
        } else if (data.statusCode === 200) {
          console.log(data);
          dispatch(setUserId(data.user_id));
          dispatch(setUserName(data.name));
          dispatch(setUserGender(data.gender));
          dispatch(setUserDesc(data.description));
          dispatch(setProfileImagePath(data.profile_image_path));
          dispatch(setSocialId(data.social_id));
          dispatch(setSocialType(data.social_type));
          dispatch(setIsLogin(true));
          dispatch(setToken(data.accessToken));
          localStorage.setItem("token", data.accessToken);
          navigate("/main");
          alert("로그인 성공");
        }
      },
      navigate
    }
  )

  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};
