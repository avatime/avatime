import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { CanvasTools } from "../components/canvas/CanvasTools";
import { MainHeader } from "../components/main/MainHeader";
import { useRef } from "react";
import { AvatarProfile } from "../components/session/modal/AvatarProfile";
import { GetAvatarRes } from '../apis/response/avatarRes';
import { SaveAvatarReq } from '../apis/request/avatarReq';
import { avatarNameCheckApi, getAvatarApi } from '../apis/avatarApis';
import { useSelector } from 'react-redux';

// 아바타의 임시 타입
// type TempAvatarRes = {
//   name: string; // 사용자가 정한 이름
//   path: string; // 지나님이 변환해준 이미지 경로
//   base64: string; // 여기 라이브러리에서 쓰는 데이터, 이걸 서버에서 저장 못한다고 하면 이미지 파일을 요 형식으로 변환하는 방법을 찾아봐야할 듯?
// };

interface IProps {}

export const CanvasPage: FC<IProps> = (props) => {
  const userId: number = useSelector((state: any) => state.user.userId);

  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushRadius, setBrushRadius] = useState<number>(5);
  const canvasRef = useRef<any>();

  // 저장할 수 있는 아바타 칸이 4개라서 num이 1 ~ 4로 들어와요.
  // 서버 api도 num 번호에 따라 저장하도록 만들어 달라고 하시면 될 듯?
  const onSave = (num: number) => {
    const avaname = prompt("아바타 이름을 알려주세요.");
    if(avaname === null) {
      alert("아바타 이름을 입력해주세요.");
      return ;
    }

    const dataURL = canvasRef.current.getDataURL();
    console.log(dataURL); // 이게 base64 어쩌구 데이터

    // 여기서 저장하는 API 호출하고, 응답으로 변환된 이미지 data를 받으세요.
    // 여기서 타입은 아래 avatarList의 요소 타입과 같아야 해요!
    const newAvatar: GetAvatarRes = {
      id: 0,
      name: avaname,
      path: "",
      base64: dataURL,
      slot: num,
    };
    setAvatarList((prev) => [...prev.slice(0, num - 1), newAvatar, ...prev.slice(num - 1)]);
  };

  const loadSavedAvatar = (base64: string | undefined) => {
    if (!base64) {
      return;
    }

    canvasRef.current.loadSaveData(base64, true);
  };

  // 여기에 서버에서 준 아바타 리스트 넣어주세요.
  // 대충 name, image path, 이미지로 변환하기 전의 base64 data가 있다고 가정하고 코드를 짰어요.
  const [avatarList, setAvatarList] = useState<GetAvatarRes[]>([]);

  useEffect(() => {
    getAvatarApi.receive({user_id : userId}).then((res) => {
      setAvatarList(res);
    });
  }, [userId]);

  return (
    <Box className="mainback" display="flex" flexDirection="column">
      <MainHeader />
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
