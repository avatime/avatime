import React, { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { WaitingUserListRes } from "../../apis/response/waitingRoomRes";
import { setWaitingUserList } from "../../stores/slices/waitingSlice";


interface IProps {}

export const WaitingUser: FC<IProps> = (props) => {
  return <div>WaitingUser</div>;
};
