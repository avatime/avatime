import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import { TestPage } from "./pages/TestPage";
import { MainPage } from "./pages/MainPage";
import store from "./stores";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TestPage />} />
              <Route path="/main" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
