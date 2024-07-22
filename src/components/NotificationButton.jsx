import Button from "@mui/material/Button";
import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

export const NotificationButton = ({
  notificationName,
  notificationMessage,
  notificationType,
}) => {
  const { handleSendNotification } = useContext(NotificationsContext);

  return (
    <Button
      sx={{ marginTop: "100px" }}
      variant="contained"
      onClick={() =>
        handleSendNotification(notificationMessage, notificationType)
      }
    >
      {notificationName}
    </Button>
  );
};
