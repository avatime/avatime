import React, { FC, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/avartimeLogo.png";
import { Box, IconButton, Menu, MenuItem, Slider, Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "../../style.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { reset } from "../../stores/slices/userSlice";
import { AvatimeApi } from "../../apis/avatimeApi";
import { AvatimeWs } from "../../apis/avatimeWs";
import { resetMeeting } from "../../stores/slices/meetingSlice";
import { resetWaiting } from "../../stores/slices/waitingSlice";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import { setBgmPlaying, setBgmVolume } from "../../stores/slices/bgmSlice";
import VolumeUp from "@mui/icons-material/VolumeUp";

interface IProps {
  hideSettings?: boolean;
}

/**
 * @author
 * @function @MainHeader
 **/

export const MainHeader: FC<IProps> = ({ hideSettings = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);
  const profileImagePath = useSelector((state: any) => state.user.profileImagePath);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.clear();
    dispatch(reset());
    dispatch(resetWaiting());
    dispatch(resetMeeting());
    AvatimeApi.getInstance().logout();
    AvatimeWs.getInstance().logout();
    alert("로그아웃 완료");
    navigate("/");
  };

  const playing = useSelector((state: any) => state.bgm.playing);
  const onClickPlaying = () => {
    dispatch(setBgmPlaying(!playing));
  };
  const volume = useSelector((state: any) => state.bgm.volume);
  const onChangeVolume = (event: any, value: number | number[]) => {
    dispatch(setBgmVolume(value as number));
    dispatch(setBgmPlaying(!!value));
  };

  const theme = useTheme();

  return (
    <>
      <Box display="flex" justifyContent="right" alignItems="center" marginBottom="2%">
        <Link to="/main">
          <img src={logo} alt="로고" style={{ width: "70%", paddingTop: "2%" }} />
        </Link>

        {!hideSettings && (
          <>
            <Tooltip title="설정">
              <IconButton
                onClick={handleOpenUserMenu}
                style={{ marginLeft: "27%", marginRight: "3%" }}
              >
                <Avatar
                  alt="프로필 사진"
                  src={profileImagePath}
                  sx={{ width: 56, height: 56 }}
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "60px",
                justifyContent: "center",
                flexDirection: "center",
                textAlign: "center",
              }}
              id="profilemenu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleCloseUserMenu}
            >
              <MenuItem sx={{ display: "flex", flexDirection: "center", justifyContent: "center" }}>
                <Link to="/mypage" style={{ textDecoration: "none", color: "black" }}>
                  마이페이지
                </Link>
              </MenuItem>
              <MenuItem sx={{ flexDirection: "center", display: "flex", justifyContent: "center" }}>
                <Link to="/canvas" style={{ textDecoration: "none", color: "black" }}>
                  아바타룸
                </Link>
              </MenuItem>
              <MenuItem
                onClick={onClickPlaying}
                sx={{ flexDirection: "center", display: "flex", justifyContent: "center" }}
              >
                배경음악 {playing ? <MusicNoteIcon /> : <MusicOffIcon />}
              </MenuItem>
              {volume !== undefined && (
                <MenuItem>
                  <Box sx={{ width: 100 }}>
                    <Stack spacing={2} direction="row" alignItems="center">
                      <VolumeUp />
                      <Slider
                        color="secondary"
                        aria-label="Volume"
                        value={volume}
                        onChange={onChangeVolume}
                        min={0}
                        max={100}
                      />
                    </Stack>
                  </Box>
                </MenuItem>
              )}
              <MenuItem
                onClick={logout}
                style={{ color: "black" }}
                sx={{ display: "flex", flexDirection: "center", justifyContent: "center" }}
              >
                <p style={{ color: theme.palette.error.main }}>로그아웃</p>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </>
  );
};
