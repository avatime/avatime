import React, { FC, useState } from "react";
import Grid from "@mui/material/Grid";
import { MainHeader } from "../components/main/MainHeader";
import { Box, display } from "@mui/system";

import grey from "@mui/material/colors/grey";
import styled from "@emotion/styled/types/base";
import { Button } from "@mui/material";

interface SliderProps {
  total: number;
  current: number;
}

// export const StyledRange = styled('div')((width:number)=>({
//   width: `${width}%`,
//   height: "100%",
//   background: 'linear-gradient(to right, #fd746c, #ff9068)'

// }));

export const PickAvatarPage: FC<SliderProps> = ({ current, total }) => {
  const [selected, setSelected] = useState(false);
  const handleChangeSelect = (event: React.MouseEvent<HTMLElement>) => {
    setSelected((prev) => !prev);
  };

  const width = (current / total) * 100;

  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <MainHeader hideSettings={true} />
      <Box flex={1} borderRadius="10px" bgcolor={grey[200]} m={2} p={2}>
        <Grid container spacing={2} direction="column" sx={{ height: "100%" }}>
          {Array.from(Array(3)).map((_, index) => (
            <Grid container item xs spacing={2}>
              {Array.from(Array(8)).map((_, index) => (
                <Grid item xs>
                  <Box sx={{ bgcolor: "white", height: "100%" }}>a</Box>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        bgcolor={grey[200]}
        borderRadius="10px"
        m={2}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "40px",
          opacity: !selected ? 1 : 0.5,
          textAlign: "center",
        }}
      >
        <Box
          flex={1}
          sx={{
            width: "100%",
            height: "40px",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <Box
            style={{
              width: `${width}%`,
              height: "100%",
              background: "linear-gradient(to right, #fd746c, #ff9068)",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderTopRightRadius: width === 100 ? "10px" : "0px",
              borderBottomRightRadius: width === 100 ? "10px" : "0px",
            }}
          ></Box>
          <Button
            variant="text"
            onClick={handleChangeSelect}
            sx={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "0" }}
          >
            선택하기
          </Button>
        </Box>
      </Box>
    </div>
  );
};
