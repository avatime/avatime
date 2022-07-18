import React, { FC } from "react";
import { VideoProfile } from "./VideoProfile";
import { Card, Grid, CardContent } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SessionUser } from "../../apis/response/sessionRes";

interface IProps {
  userList: Array<SessionUser>;
}

export const Conference: FC<IProps> = ({ userList }) => {
  return (
    <Card sx={{ background: grey[100] }}>
      <CardContent>
        <Grid container spacing={2}>
          {userList.map((it, idx) => (
            <Grid item xs={3} key={idx}>
              <VideoProfile sessionUser={it} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
