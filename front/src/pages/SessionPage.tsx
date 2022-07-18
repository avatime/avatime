import React, { FC } from "react";
import { useQuery } from "react-query";
import { Conference } from "../components/session/Conference";
import sessionApi from "../apis/sessionApi";
import { SessionUserListRes } from "../apis/response/sessionRes";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const { status, data } = useQuery<any, SessionUserListRes>("session/getUserList", () =>
    sessionApi.requestSessionUserList(8)
  );

  if (status === "loading") {
    return <h1>로딩중</h1>;
  }

  return (
    <div>
      <Conference userList={data.userList}></Conference>
    </div>
  );
};
