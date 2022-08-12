import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import { TestPage } from "./pages/TestPage";
import { MainPage } from "./pages/MainPage";
import { SessionPage } from "./pages/SessionPage";
import { WaitingPage } from "./pages/WaitingPage";
import "./style.css";
import { FinalPickResultPage } from "./pages/FinalPickResultPage";
import { KakaoHandler } from "./components/login/KakaoHandler";
import { NaverHandler } from "./components/login/NaverHandler";
import { LoginPage } from "./pages/LoginPage";
import { MyPage } from "./pages/MyPage";
import { PickAvatarPage } from "./pages/PickAvatarPage";
import { CanvasPage } from "./pages/CanvasPage";
import { SubSessionPage } from "./pages/SubSessionPage";
import green from "@mui/material/colors/green";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LandingPage } from "./pages/Landing/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";

export const theme = createTheme({
  palette: {
    secondary: {
      main: green[900],
    },
  },
});

function App() {
  const isLogin = useSelector((state: any) => state.user.isLogin);
  const socialId = useSelector((state: any) => state.user.socialId);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route
              path="/main"
              element={<ProtectedRoute outlet={<MainPage />} isAuthentication={isLogin} />}
            />
            <Route
              path="/waiting"
              element={<ProtectedRoute outlet={<WaitingPage />} isAuthentication={isLogin} />}
            />
            <Route
              path="/session"
              element={<ProtectedRoute outlet={<SessionPage />} isAuthentication={isLogin} />}
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  outlet={<LoginPage />}
                  isAuthentication={!isLogin}
                  redirectPath="/main"
                />
              }
            />
            <Route
              path="/mypage"
              element={<ProtectedRoute outlet={<MyPage />} isAuthentication={socialId} />}
            />
            <Route
              path="/finalPickResult"
              element={
                <ProtectedRoute outlet={<FinalPickResultPage />} isAuthentication={isLogin} />
              }
            />
            <Route
              path="/pickAvatar"
              element={<ProtectedRoute outlet={<PickAvatarPage />} isAuthentication={isLogin} />}
            />
             <Route
              path="/kakao"
              element={
                <ProtectedRoute
                  outlet={<KakaoHandler />}
                  isAuthentication={!isLogin}
                  redirectPath="/main"
                />
              }
            />
             <Route
              path="/naver"
              element={
                <ProtectedRoute
                  outlet={<NaverHandler />}
                  isAuthentication={!isLogin}
                  redirectPath="/main"
                />
              }
            />
            <Route
              path="/canvas"
              element={<ProtectedRoute outlet={<CanvasPage />} isAuthentication={isLogin} />}
            />
            <Route
              path="/subSession"
              element={<ProtectedRoute outlet={<SubSessionPage />} isAuthentication={isLogin} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
