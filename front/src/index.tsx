import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as tf from "@tensorflow/tfjs";
import store from "./stores";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient();

dayjs.extend(customParseFormat);

tf.env().set("WEBGL_CPU_FORWARD", false);

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
