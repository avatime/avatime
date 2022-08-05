import React, { FC, useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { AgeRes, SidoRes, WaitingRoomInfoRes } from "../../apis/response/waitingRoomRes";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ava2 from "../../assets/result_waiting_ava2.gif";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { WS_BASE_URL } from "../../apis/axiosInstance";
import { ageApi, makeNewRoomApi, requestEnterRoomApi, sidoApi } from "../../apis/waitingRoomApi";
import { ResultWaitingModal } from "../waitingRoom/ResultWaitingModal";
import {
  setWaitingRoomId,
  setRoomName,
  setAge,
  setRegion,
  setMaster,
  setHeadCount,
} from "../../stores/slices/waitingSlice";
import { useNavigate } from "react-router";
import { Add } from "@mui/icons-material";
import { useQuery } from "react-query";

interface IProps {}

/**
 * @author
 * @function @
 **/

interface Column {
  id: "name" | "cnt_man" | "cnt_woman" | "age" | "sido" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
}

const columns: Column[] = [
  { id: "name", label: "방제목", minWidth: 170 },
  {
    id: "cnt_man",
    label: "남자",
    minWidth: 50,
    align: "right",
    format: (obj) => `${obj.cnt_man} / ${obj.head_count / 2}`,
  },
  {
    id: "cnt_woman",
    label: "여자",
    minWidth: 50,
    align: "right",
    format: (obj) => `${obj.cnt_woman} / ${obj.head_count / 2}`,
  },
  {
    id: "age",
    label: "나이",
    minWidth: 40,
    align: "right",
  },
  {
    id: "sido",
    label: "지역",
    minWidth: 170,
    align: "right",
  },

  {
    id: "status",
    label: "활성화상태",
    minWidth: 170,
    align: "right",
  },
];

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
    value: "4",
    label: "2:2",
  },
  {
    value: "6",
    label: "3:3",
  },
  {
    value: "8",
    label: "4:4",
  },
];

export const WaitingRoomList: FC<IProps> = (props) => {
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

  const userId = useSelector((state: any) => state.user.userId);

  //소켓 통신----------------------------------------------
  const [originData, setOriginData] = useState<WaitingRoomInfoRes[]>([]);
  const [data, setData] = useState<WaitingRoomInfoRes[]>([]);
  const [stompClient, setStompClient] = useState<any>();

  //방제목으로 검색 & 필터-----------------------------------------------------------------
  const userGender = useSelector((state: any) => state.user.userGender);
  const [selected, setSelected] = useState(false);
  const handleChangeStatus = (
    event: React.MouseEvent<HTMLElement>,
    newRoom: WaitingRoomInfoRes[]
  ) => {
    setSelected((prev) => !prev);
  };

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (stompClient) {
      return;
    }
    const socket = new SockJS(WS_BASE_URL);
    const client = Stomp.over(socket);
    client.connect({}, function (frame) {
      console.log("소켓 연결 성공", frame);

      client.subscribe("/topic/getList", function (response) {
        console.log(response.body);
        setOriginData(JSON.parse(response.body));
      });
      client.send("/app/getList", {}, "aaa");

      //대기방 입장신청 결과 소켓 통신
      client.subscribe(`/enter/result/${userId}`, function (response: { body: string }) {
        console.log(response.body);
        if (JSON.parse(response.body).success) {
          navigate("/waiting");
          //웨이팅방입장!!!!!
        } else {
          setopenWaiting(false);
        }
      });
    });

    setStompClient(client);
  }, [navigate, stompClient, userId]);

  useEffect(() => {
    setData(
      originData
        .filter((room) => {
          if (!selected) {
            return true;
          }

          if (room.status !== 0) {
            return false;
          }

          return (userGender === "M" ? room.cnt_max : room.cnt_woman) !== room.head_count / 2;
        })
        .filter((room) => room.name.includes(keyword))
    );
  }, [keyword, originData, selected, userGender]);

  const [roomId, setRoomId] = useState(0);

  const [openWaiting, setopenWaiting] = useState(false);
  const rejectRoom = () => {
    setopenWaiting(false);

    requestEnterRoomApi.requestEnterRoom({
      user_id: userId,
      room_id: roomId,
      type: 3,
    });
    console.log(roomId);
  };

  const dispatch = useDispatch();
  const enterRoom = (waitingRoomInfoRes: WaitingRoomInfoRes) => {
    setRoomId(waitingRoomInfoRes.id);

    requestEnterRoomApi.requestEnterRoom({
      user_id: userId,
      room_id: waitingRoomInfoRes.id,
      type: 2,
    });

    setopenWaiting(true);
    dispatch(setWaitingRoomId(waitingRoomInfoRes.id));
    dispatch(setRoomName(waitingRoomInfoRes.name));
    dispatch(setAge(waitingRoomInfoRes.age));
    dispatch(setRegion(waitingRoomInfoRes.sido));
    dispatch(setMaster(false));
    dispatch(setHeadCount(waitingRoomInfoRes.head_count));
  };

  const setRoomData = async () => {
    if (!ageId || !headCounts || !sidoId || !name.length) {
      alert("빈칸을 모두 채워주세요!");
    } else {
      const res = await makeNewRoomApi.makeNewRoom({
        name,
        head_count: headCounts,
        user_id: userId,
        age_id: ageId,
        sido_id: sidoId,
      });
      console.log(res);

      dispatch(setWaitingRoomId(res.waiting_room_id));
      dispatch(setRoomName(name));
      dispatch(setAge(age?.find((i: AgeRes) => i.id === ageId)?.name));
      dispatch(setRegion(sido?.find((i: SidoRes) => i.id === sidoId)?.name));
      dispatch(setMaster(true));
      dispatch(setHeadCount(headCounts));

      handleClose();
      navigate("/waiting");
    }
  };

  //------------------------------------------------------------------------------------------
  return (
    <div>
      <Stack direction="row">
        <ToggleButton
          selected={selected}
          color="primary"
          onClick={handleChangeStatus}
          sx={{ marginRight: "auto", padding: "0", marginBottom: "1%" }}
          value="status"
        >
          참여가능한 방만 보기
        </ToggleButton>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            right: "10%",
            top: "12%",
            marginLeft: "auto",
            marginBottom: "1%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="방제목으로 검색해보세요"
            value={keyword}
            onChange={searchByName}
          />

          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Stack>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{maxHeight:"65vh"}}>
          <Table stickyHeader aria-label="sticky table" style={{ border: "5px ridge" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, idx) => (
                <TableRow hover onClick={() => enterRoom(row)} key={idx}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
        <Box p={1} />
        <Box sx={{ flex: 1 }}>
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
        
      

      <ResultWaitingModal open={openWaiting} justifyContent={"center"}>
        <>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            mb={4}
            sx={{ marginTop: "10%" }}
          >
            <img src={ava2} alt="ava2" />
            <Typography variant="h4">방장이 입장 심사 중 ~</Typography>
          </Box>

          <Button size="large" color="error" onClick={rejectRoom}>
            <CloseIcon /> 입장 대기 취소
          </Button>
        </>
      </ResultWaitingModal>
    </div>
  );
};
