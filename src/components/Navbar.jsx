import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { IoIosNotifications } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

import Badge from "@mui/material/Badge";
import { NotificationsContainer } from "./NotificationsContainer";
import { NotificationsContext } from "../context/NotificationsContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export const Navbar = () => {
  const { notificationsCounter } = useContext(NotificationsContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Se cerró la sesión satisfactoriamente");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "violet" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user && <Typography>Hola, {user?.username}</Typography>}
              <IconButton
                onClick={handleLogOut}
                sx={{ color: "white", width: "52px" }}
              >
                <IoLogOutOutline />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Badge badgeContent={notificationsCounter} color="error">
                  <IoIosNotifications />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
          <NotificationsContainer isOpen={isOpen} />
        </AppBar>
      </Box>
    </>
  );
};
