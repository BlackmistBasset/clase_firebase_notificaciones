import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotificationsProvider } from "./context/NotificationsContext.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationsProvider>
      <AuthProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </NotificationsProvider>
  </BrowserRouter>
);
