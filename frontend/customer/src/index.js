import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { UserProvider } from "./services/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserProvider><App /></UserProvider>);
