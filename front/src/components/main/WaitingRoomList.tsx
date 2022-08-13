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
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ava2 from "../../assets/result_waiting_ava2.gif";
import {
  Avatar,
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
import { ResultWaitingModal } from "../waitingRoom/ResultWaitingModal";
import {
  setWaitingRoomId,
  setRoomName,
  setAge,
  setSido,
  setMaster,
  setHeadCount,
  setChatRoomId,
} from "../../stores/slices/waitingSlice";
import { useNavigate } from "react-router";
import { Add } from "@mui/icons-material";
import "../../style.css";
import { useWebSocket } from "../../hooks/useWebSocket";
import { AvatimeApi } from "../../apis/avatimeApi";
import { Loading } from "./Loading";
import { AlertSnackbar } from "../AlertSnackbar";

interface IProps {}

/**
 * @author
 * @function @
 **/

interface Column {
  id: "name" | "cnt_man" | "cnt_woman" | "age" | "sido" | "status";
  label: string;
  maxWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => any;
}

const columns: Column[] = [
  {
    id: "name",
    label: "방제목",
    maxWidth: 100,

    format: (obj) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="masterProfile" src={obj.image_path} />
        {"   "}
        <p style={{ marginLeft: 10 }}>{obj.name}</p>
      </div>
    ),
  },
  {
    id: "cnt_man",
    label: "남자",
    maxWidth: 50,
    align: "center",
    format: (obj) => `${obj.cnt_man} / ${obj.head_count / 2}`,
  },
  {
    id: "cnt_woman",
    label: "여자",
    maxWidth: 50,
    align: "center",
    format: (obj) => `${obj.cnt_woman} / ${obj.head_count / 2}`,
  },
  {
    id: "age",
    label: "나이",
    maxWidth: 40,
    align: "center",
  },
  {
    id: "sido",
    label: "지역",
    maxWidth: 100,
    align: "center",
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


  const [showConfirm, setShowConfirm] = useState(0);
  const [confirmMessage, setConfirmMessage] = useState("");

  const navigate = useNavigate();
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

  const [sidoList, setSidoList] = useState<SidoRes[]>();
  const [ageList, setAgeList] = useState<AgeRes[]>();
  useEffect(() => {
    if (sidoList || ageList) {
      return;
    }

    AvatimeApi.getInstance().getSidoList({
      onSuccess(data) {
        setSidoList(data);
      },
      navigate,
    });

    AvatimeApi.getInstance().getAgeList({
      onSuccess(data) {
        setAgeList(data);
      },
      navigate,
    });
  }, [sidoList, ageList, navigate]);

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

  const searchByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const dispatch = useDispatch();

  const connected = useWebSocket({
    onConnect: (frame, client) => {
      client.subscribe("/topic/getList", function (response) {
        console.log(response.body);
        setOriginData(JSON.parse(response.body));
      });
      client.publish({ destination: "/app/getList" });

      //대기방 입장신청 결과 소켓 통신
      client.subscribe(`/topic/enter/result/${userId}`, function (response) {
        console.log(response.body);
        const res = JSON.parse(response.body);
        if (res.success) {
          navigate("/waiting", { replace: true });
          dispatch(setChatRoomId(res.chatting_room_id));
          //웨이팅방입장!!!!!
        } else {
          setopenWaiting(false);
        }
      });
    },
    beforeDisconnected: (frame, client) => {},
  });

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

          return (userGender === "M" ? room.cnt_man : room.cnt_woman) !== room.head_count / 2;
        })
        .filter((room) => room.name.includes(keyword))
    );
  }, [keyword, originData, selected, userGender]);

  const [roomId, setRoomId] = useState(0);

  const [openWaiting, setopenWaiting] = useState(false);
  const rejectRoom = () => {
    setopenWaiting(false);

    AvatimeApi.getInstance().requestEnterRoom({
      user_id: userId,
      room_id: roomId,
      type: 3,
    }, {
      navigate
    });
    console.log(roomId);
  };

  const enterRoom = async (waitingRoomInfoRes: WaitingRoomInfoRes) => {
    if (waitingRoomInfoRes.status === 1) {
      return;
    }

    setRoomId(waitingRoomInfoRes.id);

    AvatimeApi.getInstance().requestEnterRoom({
      user_id: userId,
      room_id: waitingRoomInfoRes.id,
      type: 2,
    }, {
      onSuccess(data) {
        setopenWaiting(true);
        dispatch(setWaitingRoomId(waitingRoomInfoRes.id));
        dispatch(setRoomName(waitingRoomInfoRes.name));
        dispatch(setAge(waitingRoomInfoRes.age));
        dispatch(setSido(waitingRoomInfoRes.sido));
        dispatch(setMaster(false));
        dispatch(setHeadCount(waitingRoomInfoRes.head_count));
      },
      navigate
    });
  };

  const setRoomData = async () => {
    if (!ageId || !headCounts || !sidoId || !name.length) {
      setShowConfirm(1);
      setConfirmMessage("빈 칸을 모두 채워주십쇼!");
    } else if (name.length >= 30) {
      setShowConfirm(2);
      setConfirmMessage("방 제목은 30자 이하로 부탁드려요");
    } else {

      AvatimeApi.getInstance().makeNewRoom({
        name,
        head_count: headCounts,
        user_id: userId,
        age_id: ageId,
        sido_id: sidoId,
      }, {
        onSuccess(data) {
          console.log(data);

          dispatch(setWaitingRoomId(data.waiting_room_id));
          dispatch(setRoomName(name));
          dispatch(setAge(ageList?.find((i: AgeRes) => i.id === ageId)?.name));
          dispatch(setSido(sidoList?.find((i: SidoRes) => i.id === sidoId)?.name));
          dispatch(setMaster(true));
          dispatch(setHeadCount(headCounts));
          dispatch(setChatRoomId(data.chatting_room_id));
    
          handleClose();
          navigate("/waiting", { replace: true });
        },
        navigate
      });
    }
  };

  //------------------------------------------------------------------------------------------
  return (
    <div>
      <Stack direction="row" style={{ marginLeft: "5%", marginRight: "5%" }}>
        <ToggleButton
          selected={selected}
          color="secondary"
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
      <Paper sx={{ overflow: "hidden", marginLeft: "5%", marginRight: "5%" }}>
        <TableContainer sx={{ maxHeight: "65vh" }}>
          <Table stickyHeader aria-label="sticky table" style={{ borderRadius: "50px" }}>
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
              {data?.map((row, idx) => {
                const availabeRoom =
                  row.status === 0 &&
                  (userGender === "M" ? row.cnt_man : row.cnt_woman) !== row.head_count / 2;
                return (
                  <TableRow
                    className={availabeRoom ? "click" : ""}
                    hover={availabeRoom}
                    onClick={() => enterRoom(row)}
                    key={idx}
                    sx={{
                      bgcolor: availabeRoom ? "white" : "#EFEFEF",
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        <Loading loading={!connected} />
      <Box p={1} />
      <Box sx={{ flex: 1, marginLeft: "5%", marginRight: "5%" }}>
        <Button
          variant="contained"
          aria-label="makenewroom"
          sx={{ float: "right" }}
          onClick={handleOpen}
          startIcon={<Add />}
          color="secondary"
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
                {ageList?.map((option) => (
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
                {sidoList?.map((option) => (
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

      <AlertSnackbar
        open={showConfirm !== 0}
        onClose={() => setShowConfirm(0)}
        message={confirmMessage}
        type="alert"
        alertColor="warning"
        onSuccess={() => setShowConfirm(0)}
      />


    </div>
  );
};
