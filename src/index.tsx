import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import './helpers/i18n';
import '@fontsource/inter';
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Suspense fallback={""}>
        <App />
      </Suspense>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
