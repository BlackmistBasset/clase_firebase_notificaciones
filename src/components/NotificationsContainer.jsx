import { useContext } from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import { Notification } from "./Notification";
import { NotificationsContext } from "../context/NotificationsContext";

export const NotificationsContainer = ({ isOpen }) => {
  const { notificationsArray, handleDeleteNotifications } =
    useContext(NotificationsContext);
  const reversedArray = [...notificationsArray].reverse();
  console.log(reversedArray);
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          right: "0px",
          top: "64px",
          width: "100%",
          maxWidth: 360,
          border: "1px solid black",
          display: isOpen ? "block" : "none",
        }}
      >
        <nav aria-label="lista de notificacioines">
          <List>
            {notificationsArray.length > 0 && (
              <Typography
                sx={{
                  color: "black",
                  fontSize: "10px",
                  ":hover": { textDecoration: "underline" },
                  padding: "16px",
                  textAlign: "end",
                  cursor: "pointer",
                  display: "inline-block",
                }}
                onClick={handleDeleteNotifications}
              >
                Borrar todas las notificaciones
              </Typography>
            )}
            {notificationsArray.length > 0 ? (
              reversedArray.map(
                ({ id, notificationMessage, seen, notificationType }) => {
                  return (
                    <Notification
                      key={id}
                      notificationMessage={notificationMessage}
                      seen={seen}
                      id={id}
                      type={notificationType}
                    />
                  );
                }
              )
            ) : (
              <ListItem>
                <ListItemText
                  primary="No hay notificaciones para mostrar."
                  sx={{ color: "black", textAlign: "center" }}
                />
              </ListItem>
            )}
          </List>
        </nav>
      </Box>
    </>
  );
};
