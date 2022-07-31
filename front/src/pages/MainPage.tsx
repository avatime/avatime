import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../style.css";
import { WaitingRoomList } from "../components/main/WaitingRoomList";
import { MainHeader } from "../components/main/MainHeader";
import { Add } from "@mui/icons-material";
import { useQuery } from "react-query";

import { ageApi, makeNewRoomApi, sidoApi } from "../apis/waitingRoomApi";

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
  display: "flex",
  flexDirection: "column",
};

const counts = [
  {
    value: "2",
    label: "2:2",
  },
  {
    value: "3",
    label: "3:3",
  },
  {
    value: "4",
    label: "4:4",
  },
];

interface IProps {}

export const MainPage: FC<IProps> = (props) => {
  const [ageId, setAgeId] = useState(0);
  const [sidoId, setSidoId] = useState(0);
  const [name, setName] = useState("");
  const [headCounts, setHeadCounts] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName("");
    setHeadCounts(0);
    setAgeId(0);
    setSidoId(0);
    setOpen(false);
  };

  const { data: age } = useQuery("waiting/getAge", () => ageApi.receive());
  const { data: sido } = useQuery("waiting/getSido", () => sidoApi.receive());

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeadCounts(Number(event.target.value));
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeId(Number(event.target.value));
  };
  const handleSidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSidoId(Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const setRoomData = () => {
    if (!ageId || !headCounts || !sidoId || !name.length) {
      alert("빈칸을 모두 채워주세요!");
    } else {
      makeNewRoomApi.makeNewRoom({
        name,
        head_count: headCounts,
        user_id: 0,
        age_id: ageId,
        sido_id: sidoId,
      });

      handleClose();
    }
  };

  return (
    <div className="mainback">
      <MainHeader />
      <Box px={3}>
        <Box p={1} />
        <WaitingRoomList />
        <Box p={1} />

        <Button
          variant="contained"
          aria-label="makenewroom"
          sx={{ float: "right" }}
          onClick={handleOpen}
          startIcon={<Add />}
        >
          새로운 방 만들기
        </Button>
      </Box>

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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="방 제목"
                multiline
                maxRows={4}
                value={name}
                onChange={handleNameChange}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="인원수"
                value={headCounts}
                onChange={handleCountChange}
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
                value={ageId}
                onChange={handleAgeChange}
              >
                {age?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="지역"
                value={sidoId}
                onChange={handleSidoChange}
              >
                {sido?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <Box>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={setRoomData}>확인</Button>
              </Box>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
