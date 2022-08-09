import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import { TestPage } from "./pages/TestPage";
import { MainPage } from "./pages/MainPage";
import store from "./stores";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionPage } from "./pages/SessionPage";
import { WaitingPage } from "./pages/WaitingPage";
import "./style.css";
import { FinalPickResultPage } from "./pages/FinalPickResultPage";
import { KakaoHandler } from "./components/login/KakaoHandler";
import { NaverHandler } from "./components/login/NaverHandler";
import { LoginPage } from "./pages/LoginPage";
import { MyPage } from "./pages/MyPage";
import { PickAvatarPage } from "./pages/PickAvatarPage";
import { Canvas } from "./pages/Canvas";
import { SubSessionPage } from "./pages/SubSessionPage";
import green from "@mui/material/colors/green";
import { createTheme ,ThemeProvider} from "@mui/material/styles";


export const theme = createTheme({
  palette: {
    secondary: {
      main: green[900],
    },
  },
});

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<TestPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/waiting" element={<WaitingPage />} />
                <Route path="/session" element={<SessionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/finalPickResult" element={<FinalPickResultPage />} />
                <Route path="/pickAvatar" element={<PickAvatarPage />} />
                <Route path="/kakao" element={<KakaoHandler />} />
                <Route path="/naver" element={<NaverHandler />} />
                <Route path="/canvas" element={<Canvas />} />
                <Route path="/subSession" element={<SubSessionPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
