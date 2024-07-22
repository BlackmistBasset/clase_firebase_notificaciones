import { useContext } from "react";

import { NotificationButton } from "./components/NotificationButton";
import { Navbar } from "./components/Navbar";
import { NotificationsContext } from "./context/NotificationsContext";

import { Box, CircularProgress } from "@mui/material";
function App() {
  const { isLoading } = useContext(NotificationsContext);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: "grid", justifyContent: "center" }}>
          <NotificationButton
            notificationName="Enviar Like"
            notificationMessage="Has recibido un like"
            notificationType="like"
          />
          <NotificationButton
            notificationName="Seguir Usuario"
            notificationMessage="Pepito te está siguiendo"
            notificationType="follow"
          />
        </Box>
      )}
    </>
  );
}

export default App;
