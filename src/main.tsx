import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Normalize } from "styled-normalize";

import App from "./App";
import store from "./redux/store";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <Provider store={store}>
            <Normalize />
            <App />
        </Provider>
    </StrictMode>,
);
