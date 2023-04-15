import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Error from "./Error";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
