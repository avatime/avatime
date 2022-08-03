import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, useState } from "react";


interface SliderProps {
    total: number;
    current: number;
  }

/**
 * @author
 * @function @
 **/

export const GaugeBar: FC<SliderProps> = ({ current, total }) => {
    
  const [selected, setSelected] = useState(false);
  const handleChangeSelect = (event: React.MouseEvent<HTMLElement>) => {
    setSelected((prev: any) => !prev);
  };

  const width = (current / total) * 100;
  return (
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
  );
};


