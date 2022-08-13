import { Box, Grid, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { CanvasTools } from "../components/canvas/CanvasTools";
import { MainHeader } from "../components/main/MainHeader";
import { useRef } from "react";
import { AvatarProfile } from "../components/session/modal/AvatarProfile";
import { GetAvatarRes } from "../apis/response/avatarRes";
import { useSelector } from "react-redux";
import { AvatimeApi } from "../apis/avatimeApi";
import { useNavigate } from 'react-router';

// 아바타의 임시 타입
// type TempAvatarRes = {
//   name: string; // 사용자가 정한 이름
//   path: string; // 지나님이 변환해준 이미지 경로
//   base64: string; // 여기 라이브러리에서 쓰는 데이터, 이걸 서버에서 저장 못한다고 하면 이미지 파일을 요 형식으로 변환하는 방법을 찾아봐야할 듯?
// };

interface IProps {}

export const CanvasPage: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const userId: number = useSelector((state: any) => state.user.userId);

  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushRadius, setBrushRadius] = useState<number>(5);
  const [avaid, setAvaid] = useState(0);
  const [path, setPath] = useState("");
  const canvasRef = useRef<any>();

  // 저장할 수 있는 아바타 칸이 4개라서 num이 1 ~ 4로 들어와요.
  // 서버 api도 num 번호에 따라 저장하도록 만들어 달라고 하시면 될 듯?
  const onSave = async (num: number) => {
    const avaname = prompt("아바타 이름을 알려주세요.");
    var flag : boolean = false;
    if (avaname === null) {
      alert("아바타 이름을 입력해주세요.");
      return;
    } else if(avaname.length > 4) {
      alert("4글자 이하로 이름을 지어주세요.");
      return;
    } else {
      await AvatimeApi.getInstance().checkAvatarName(
        {
          name: avaname,
        },
        {
          onSuccess(data) {
            console.log("중복체크");
            if(!data) {
              alert("중복된 아바타 이름입니다.")
              flag = true;
            }
          },
          navigate,
        }
      );
    }

    if(flag) return;

    const dataURL = canvasRef.current.getDataURL();
    console.log(dataURL); // 이게 base64 어쩌구 데이터

    await AvatimeApi.getInstance().saveAvatar(
      {
        user_id: userId,
        name: avaname,
        slot: num,
        base64: dataURL,
      },
      {
        onSuccess(data) {
          console.log("DB 저장 성공");
          console.log("data : "+data);
          setAvaid(data.id);
          setPath(data.path);
        },
        navigate,
      }
    );

    // 여기서 저장하는 API 호출하고, 응답으로 변환된 이미지 data를 받으세요.
    // 여기서 타입은 아래 avatarList의 요소 타입과 같아야 해요!
    const newAvatar: GetAvatarRes = {
      id: avaid,
      name: avaname,
      path: path,
      base64: dataURL,
      slot: num,
    };
    setAvatarList((prev) => [...prev.slice(0, num - 1), newAvatar, ...prev.slice(num - 1)]);
    console.log(avatarList);
  };

  const loadSavedAvatar = (base64: string | undefined) => {
    if (!base64) {
      return;
    }

    if(window.confirm("아바타를 불러오시겠습니까?")) {
      canvasRef.current.loadSaveData(base64, true);
    }
  };

  // 여기에 서버에서 준 아바타 리스트 넣어주세요.
  // 대충 name, image path, 이미지로 변환하기 전의 base64 data가 있다고 가정하고 코드를 짰어요.
  const [avatarList, setAvatarList] = useState<GetAvatarRes[]>([]);

  const test = () => {
    console.log(avatarList);
  }

  useEffect(() => {
    if (!userId) {
      return;
    }
    AvatimeApi.getInstance().getAvatarList(
      { user_id: userId },
      {
        onSuccess(data) {
          setAvatarList(data);
        },
        navigate,
      }
    );
  }, [navigate, userId]);

  return (
    <Box className="mainback" display="flex" flexDirection="column">
      <MainHeader />
      <Button onClick={test}>테스트</Button>
      <Box flex={1} p={5} display="flex" alignItems="stretch">
        <CanvasTools
          onChangeColor={setBrushColor}
          brushRadius={brushRadius}
          onChangeRadius={setBrushRadius}
          onUndo={() => canvasRef.current.undo()}
          onEraseAll={() => canvasRef.current.eraseAll()}
          onSave={onSave}
        />
        <Box p={1} />
        <CanvasDraw
          ref={canvasRef}
          style={{
            flex: 1,
            height: "100%",
            borderRadius: "20px",
          }}
          imgSrc={process.env.PUBLIC_URL + "/canvasBg.png"}
          brushColor={brushColor}
          brushRadius={brushRadius}
          lazyRadius={1}
          hideGrid={true}
        />

        <Box p={1} />
        <Box
          flex={1}
          bgcolor={grey[200]}
          borderRadius="10px"
          p={2}
          display="flex"
          flexDirection="column"
        >
          {[0, 1].map((outerIdx) => (
            <Grid container spacing={2} flex="1">
              {[0, 1].map((innerIdx) => {
                const idx = outerIdx * 2 + innerIdx;
                const avatar = idx < avatarList.length ? null : avatarList[idx];
                console.log(avatar);
                return (
                  <Grid item xs={6}>
                    <AvatarProfile
                      selected={false}
                      onClick={() => loadSavedAvatar(avatar?.base64)}
                      avatarName={avatar ? avatar.name : "비어 있음"}
                      avatarImagePath={avatar ? avatar.path : ""}
                      opacity={0.1}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
