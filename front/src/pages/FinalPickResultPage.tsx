import React, { FC } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

interface IProps {}

export const FinalPickResultPage: FC<IProps> = (props) => {
  const userList = useSelector((state: any) => state.meeting.userList);

  return <FinalPickResultPagePresenter userList={userList} />;
};

interface IPresenterProps {
  userList: any[];
}

const FinalPickResultPagePresenter: FC<IPresenterProps> = ({ userList }) => {
  const UserProfileList = (l: number, r: number) => (
    <Grid container item spacing={2} direction="column" xs={2}>
      {userList.slice(l, r).map((it) => (
        <Grid
          item
          xs
          direction="column"
          key={it.userId}
          position="relative"
          display="flex"
          alignItems="center"
        >
          <Box
            sx={{
              height: "70%",
              aspectRatio: "auto 1 / 1",
              backgroundColor: "white",
              backgroundImage: `url(${it.avatarImagePath})`,
              backgroundSize: "cover",
              backgroundPosition: "center 50%",
              borderRadius: "100%",
              border: "2px solid black",
            }}
          />
          <Typography variant="subtitle1">{it.avatarName}</Typography>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box height="100vh" display="flex" alignItems="stretch" justifyContent="stretch">
      <Grid
        container
        borderRadius="10px"
        m={3}
        p={2}
        bgcolor={grey[200]}
        direction="row"
        spacing={3}
      >
        {UserProfileList(0, userList.length / 2)}
        <Grid item bgcolor="red" xs></Grid>
        {UserProfileList(userList.length / 2, userList.length)}
      </Grid>
    </Box>
  );
};
