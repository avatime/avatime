import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputBase from "@mui/material/InputBase";
//import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";


interface IProps {}





export const MainSearchBar: FC<IProps> = () => {
  const [status, setStatus] = React.useState("status");
  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    setStatus(newStatus);
  };
  return (
    <div>
      <div>
        <ToggleButtonGroup color="primary" value={status} exclusive onChange={handleChangeStatus}>
          <ToggleButton value="status" style={{position:"absolute", left:"10%", top:"12%"}}>참여가능한 방만 보기</ToggleButton>
        </ToggleButtonGroup>

        <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 , position: "absolute", right: "10%", top: "12%" }}
    >
      <InputBase 
        sx={{ ml: 1, flex: 1 }}
        placeholder="방제목으로 검색해보세요"
        inputProps={{ "aria-label": "search title" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" >
        <SearchIcon />
      </IconButton>
    </Paper>
      </div>
    </div>
  );
};
