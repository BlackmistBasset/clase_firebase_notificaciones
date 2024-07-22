import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";

import { NotificationsProvider } from "./context/NotificationsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationsProvider>
    <CssBaseline />
    <App />
  </NotificationsProvider>
);
