import React, { FC, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { nameCheckApi } from "../../apis/userApi";

interface IProps {}

export const MyPageInfo: FC<IProps> = (props) => {
  const userGender = useSelector((state: any) => state.user.userGender);
  const userName = useSelector((state: any) => state.user.userName);
  const userDesc = useSelector((state: any) => state.user.userDesc);

  const [name, setName] = useState(userName);
  const [desc, setDesc] = useState(userDesc);
  const [check, setCheck] = useState(true);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    nameCheckApi.checkName({ name }).then((res) => {
      setCheck(res.success);
    });
    if (check === true) {
      //
    } else {
      //
    }
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="6vh"
        marginBottom="10vh"
      >
        <TextField
          id="inputName"
          label="닉네임"
          type="string"
          value={name}
          placeholder="닉네임을 입력해주세요."
          autoFocus
          onChange={handleNameChange}
        />
      </Grid>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <TextField
          id="inputDesc"
          label="자기소개"
          type="string"
          value={desc}
          placeholder="자기소개를 입력해주세요."
          minRows={4}
          maxRows={6}
          multiline
          onChange={handleDescChange}
          sx={{
            height: "20vh",
            width: "30vw",
          }}
        />
      </Grid>
    </>
  );
};
