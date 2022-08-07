import { Box, Typography, Grid } from "@mui/material";
import React, { FC, useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import sessionApi from "../../../apis/sessionApi";
import { AvatarProfile } from "./AvatarProfile";
import { SessionModal } from "./SessionModal";

interface IProps {
  isOpened: boolean;
}

export const FinalPickModal: FC<IProps> = ({ isOpened }) => {
  const totalUserList = useSelector((state: any) => state.meeting.userList);
  const meetingRoomid = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);
  const gender = useSelector((state: any) => state.user.userGender);

  const [targetUserList, setTargetUserList] = useState();
  useEffect(() => {
    if (!totalUserList) {
      return;
    }

    setTargetUserList(
      totalUserList.filter((it: any) => it.gender !== gender)
    )
  }, [totalUserList, gender]);

  const [selectedUserId, setSelectedUserId] = useState(
    totalUserList.find((it: any) => it.gender !== gender)
  );

  const [timer, setTimer] = useState(-1);

  useEffect(() => {
    if (isOpened) {
      setTimer(5);
    }
  }, [isOpened]);

  useEffect(() => {
    if (0 < timer) {
      const id = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  const { isLoading } = useQuery(
    "meeting/pick",
    () =>
      sessionApi.patchFinalPick({
        meetingroom_id: meetingRoomid,
        user_id: userId,
        pick_user_id: selectedUserId,
      }),
    {
      enabled: timer === 0,
      keepPreviousData: false,
    }
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (timer === 0 && !isLoading) {
      navigate("/finalPickResult");
    }
  }, [timer, isLoading, navigate]);

  return (
    <FinalPickModalPresenter
      isOpened={isOpened}
      timer={timer}
      userList={totalUserList.slice(totalUserList.length / 2)}
      selectedUserId={selectedUserId}
      onClickAvatar={(userId) => setSelectedUserId(userId)}
    />
  );
};

interface IPresenterProps {
  isOpened: boolean;
  timer: number;
  userList: any[];
  selectedUserId: number;
  onClickAvatar: (userId: number) => void;
}

const FinalPickModalPresenter: FC<IPresenterProps> = ({
  isOpened,
  timer,
  userList,
  selectedUserId,
  onClickAvatar,
}) => {
  return (
    <SessionModal open={isOpened} justifyContent="stretch">
      <>
        <Typography variant="h4">마음에 드는 상대를 골라주세요! {timer}</Typography>
        <Box p={3} />
        <Grid container width="100%" height="100%" spacing={3}>
          {userList?.map((it, idx) => (
            <Grid item key={idx} xs>
              <AvatarProfile
                selected={selectedUserId === it.userId}
                onClick={() => onClickAvatar(it.userId)}
                avatarName={it.avatarName}
                avatarImagePath={it.avatarImagePath}
              />
            </Grid>
          ))}
        </Grid>
      </>
    </SessionModal>
  );
};
