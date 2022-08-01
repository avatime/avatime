import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector, useDispatch } from "react-redux";
import { registerApi, userModifyApi, nameCheckApi } from "../../apis/userApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const counts = [
  {
    value: "2:2",
    label: "2:2",
  },
  {
    value: "3:3",
    label: "3:3",
  },
  {
    value: "4:4",
    label: "4:4",
  },
];

const ages = [
  {
    value: "20",
    label: "20대",
  },
  {
    value: "30",
    label: "30대",
  },
  {
    value: "40",
    label: "40대",
  },
  {
    value: "50",
    label: "50대이상",
  },
];
const sidos = [
  {
    value: "seoul",
    label: "서울특별시",
  },
  {
    value: "busan",
    label: "부산광역시",
  },
  {
    value: "",
    label: "40대",
  },
  {
    value: "50",
    label: "50대이상",
  },
];

interface IProps {}

/**
 * @author
 * @function @ProfileArea
 **/

export const ProfileArea: FC<IProps> = (props) => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState("");
  const [age, setAge] = React.useState("");
  const [sido, setSido] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(event.target.value);
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };
  const handleSidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSido(event.target.value);
  };

  const socialId = useSelector((state: any) => state.user.socialId);
  const socialType = useSelector((state: any) => state.user.socialType);
  const userGender = useSelector((state: any) => state.user.userGender);
  const userId = useSelector((state: any) => state.user.userId);
  const userName = useSelector((state: any) => state.user.userName);
  const userDesc = useSelector((state: any) => state.user.userDesc);
  const profileImagePath = useSelector((state: any) => state.user.profileImagePath);
  const isLogin = useSelector((state: any) => state.user.isLogin);

  const [name, setName] = useState(userName);
  const [desc, setDesc] = useState(userDesc);
  const [image, setImage] = useState(profileImagePath);
  const [nameCheck, setNameCheck] = useState(true);
  const [nameText, setNameText] = useState("");
  const [overlap, setOverlap] = useState(true);
  const [nameSatis, setNameSatis] = useState(true);
  const [descText, setDescText] = useState("");
  const [overContents, setOverContents] = useState(true);
  const [descSatis, setDescSatis] = useState(true);
  

  useEffect(() => {
    if (nameCheck === true) {
      // 생성가능
      setNameText(" ");
      setOverlap(false);
    } else if (name === userName) {
      setNameText("현재 이름과 같습니다.");
      setOverlap(true);
    } else {
      // 생성불가능
      setNameText("중복된 이름입니다.");
      setOverlap(true);
    }
}, [nameCheck]);

  useEffect(() => {
    if(nameSatis) {
      setNameText(" ");
      setOverlap(false);
    } else {
      setNameText("이름을 2-10자 이내로 지어주세요.");
      setOverlap(true);
    }
  }, [nameSatis]);

  useEffect(() => {
    if(descSatis) {
      setDescText(desc.length+"/255");
      setOverContents(false);
    } else {
      setDescText("자기소개를 255자 이내로 작성해주세요.");
      setOverContents(true);
    }
  }, [descSatis, desc]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value.trim().length < 2 || event.target.value.trim().length > 10) {
      setNameSatis(false);
    } else {
      setNameSatis(true);
      nameCheckApi.checkName({ name: event.target.value }).then((res) => {
        setNameCheck(res);
      });
    }
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 255) {
      setDescSatis(false);
    } else {
      setDescSatis(true);
    }
    setDesc(event.target.value);
  };

  const confirmInfo = () => {
    // 만족했는지 조건 추가
    isLogin
      ? userModifyApi
          .modifyUser({
            user_id: userId,
            profile_image_path: image,
            name: name,
            description: desc,
          })
          .then((res) => {
            console.log(res);
            alert("회원수정 완료!");
          }).catch(function (err) {
            console.log(err);
            alert("오류발생!");
          })
      : registerApi
          .register({
            social_id: socialId,
            social_type: socialType,
            gender: userGender,
            name: name,
            profile_image_path: image,
            description: desc,
          })
          .then((res) => {
            console.log(res);
            alert("회원가입 완료!");
          }).catch(function (err) {
            console.log(err);
            alert("오류발생!");
          });
  };

  const refreshForm = () => {
    setName(userName);
    setDesc(userDesc);
    setNameCheck(true);
    setNameSatis(true);
    setDescSatis(true);
  };

  return (
    <>
      <Stack direction="row" spacing={0} display="flex" justifyContent="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton onClick={handleOpen}>
            <Avatar
              src={profileImagePath}
              sx={{ width: 80, height: 80 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                프로필 사진 바꾸기
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="방 제목"
                multiline
                maxRows={4}
                value={value}
                onChange={handleNameChange}
                style={{ position: "relative", top: 30, right: -30 }}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="인원수"
                value={count}
                onChange={handleCountChange}
                style={{ position: "relative", top: 30, right: -30 }}
              >
                {counts.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="연령대"
                value={age}
                onChange={handleAgeChange}
                style={{ position: "relative", top: 30, right: -30 }}
              >
                {ages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="지역"
                value={sido}
                onChange={handleSidoChange}
                style={{ position: "relative", top: 30, right: -30 }}
              >
                {sidos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button style={{ position: "absolute", right: 55, bottom: 10 }}>취소</Button>
              <Button onClick={handleClose} style={{ position: "absolute", right: 5, bottom: 10 }}>
                확인
              </Button>
            </Box> */}
              </Typography>
            </Box>
          </Modal>
        </Box>
        <Box style={{ display: "absolute" }}>
          <IconButton onClick={confirmInfo}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={refreshForm}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Stack>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="6vh"
        marginBottom="6vh"
      >
        <TextField
          id="inputName"
          label="닉네임"
          type="string"
          value={name}
          placeholder="닉네임을 입력해주세요."
          autoFocus
          onChange={handleNameChange}
          helperText={nameText}
          error={overlap}
          sx={{
            width: "15vw",
          }}
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
          helperText={descText}
          error={overContents}
          sx={{
            height: "20vh",
            width: "30vw",
          }}
        />
      </Grid>
    </>
  );
};
