import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../../stores/slices/userSlice";
import { useQuery } from "react-query";
import kakaoLogin from "./user";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

interface Iprops {}

export const KakaoHandler: FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const navigate = useNavigate();

  const response = useQuery('tokentoken', kakaoLogin(code as string), {
    onSuccess: (res:any) => {
      console.log("res1 succuess : "+res.data);
      localStorage.setItem("socialId", res.data.socialId);
      //dispatch(setUserId(res));
      navigate("/login");
    },
    onError: (err) => console.log(err),
  });

  console.log(response);

  // 인가코드

  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};
