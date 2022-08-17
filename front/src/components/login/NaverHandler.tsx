import React, { FC, useState } from "react";
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
import { AvatimeWs } from "../../apis/avatimeWs";
import { AlertSnackbar } from '../AlertSnackbar';

interface Iprops {}

export const NaverHandler: FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");
  const navigate = useNavigate();
  const [showLoginSnack, setShowLoginSnack] = useState(false);
  const [showRegisterSnack, setShowRegisterSnack] = useState(false);
  const [tempToken, setTempToken] = useState("");

  const login = () => {
    localStorage.setItem("token", tempToken);
    dispatch(setToken(tempToken));
    navigate("/main", { replace: true });
  }

  const register = () => {
    navigate("/mypage", { replace: true });
  }

  const cancelconfirm = () => {
    setShowRegisterSnack(false);
    navigate("/login", { replace: true });
  }

  AvatimeApi.getInstance().naverLogin(code as string, state as string, {
    onSuccess(data) {
      if (data.statusCode === 201) {
        console.log(data);
        dispatch(setUserGender(data.gender));
        dispatch(setSocialId(data.social_id));
        dispatch(setSocialType(data.social_type));
        dispatch(setIsLogin(false));
        //navigate("/mypage");
        //alert("회원가입이 필요합니다.");
        setShowRegisterSnack(true);
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
        setTempToken(data.accessToken);
        setShowLoginSnack(true);
        AvatimeApi.getInstance().login(data.accessToken);
        AvatimeWs.getInstance().login(data.accessToken);
        //navigate("/main");
        //alert("로그인 성공");
      }
    },
    navigate,
  });

  return (
    <>
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
      <AlertSnackbar
        open={showLoginSnack}
        onClose={() => setShowLoginSnack(false)}
        message="로그인에 성공했어요!"
        alertColor="success"
        type="confirm"
        onSuccess={login}
      />
     <AlertSnackbar
        open={showRegisterSnack}
        onClose={cancelconfirm}
        message="회원가입이 필요해요!!"
        alertColor="warning"
        type="confirm"
        onSuccess={register}
      />
    </>
  );
};
