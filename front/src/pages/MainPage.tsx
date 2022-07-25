import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Paper } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../style.css";
import { MainSearchBar } from "../components/main/MainSearchBar";
import { WaitingRoomList } from "../components/main/WaitingRoomList";
import { MainHeader } from "../components/main/MainHeader";

//import { MainHeader } from '../components/main/MainHeader'

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
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

export const MainPage: FC<IProps> = (props) => {
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="mainback">
      <MainHeader />
      <MainSearchBar />
      <WaitingRoomList />
      <Button onClick={handleOpen} style={{ position: "absolute", bottom: "10%", right: "10%" }}>
        새로운 방 만들기
      </Button>
      {/* <IconButton  aria-label="makenewroom" disabled color="primary">
          <AddCircleOutlineIcon onClick={handleOpen} style={{position:"absolute", bottom:0}}/>
        </IconButton> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            새로운 방 만들기
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
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
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
