import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NotificationsContext } from "../context/NotificationsContext";

import { MdDoneOutline, MdDeleteOutline } from "react-icons/md";
import { FaRegHeart, FaRegUser } from "react-icons/fa";

export const Notification = ({ notificationMessage, seen, id, type }) => {
  const { handleMarkAsSeen, handleDeleteNotification } =
    useContext(NotificationsContext);

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gap: "15px",
          gridTemplateColumns: "20px 1fr 20px 20px",
          cursor: "auto",
          backgroundColor: seen ? "white" : "#f7f1cc",
        }}
      >
        <ListItemIcon sx={{ minWidth: "20px" }}>
          {type === "like" && <FaRegHeart style={{ color: "black" }} />}
          {type === "follow" && <FaRegUser style={{ color: "black" }} />}
        </ListItemIcon>
        <ListItemText primary={notificationMessage} sx={{ color: "black" }} />
        {!seen ? (
          <ListItemIcon
            sx={{ minWidth: "20px" }}
            onClick={() => handleMarkAsSeen(id)}
          >
            <MdDoneOutline style={{ color: "green", cursor: "pointer" }} />
          </ListItemIcon>
        ) : (
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <MdDoneOutline style={{ color: "grey" }} />
          </ListItemIcon>
        )}
        <ListItemIcon
          sx={{ minWidth: "20px" }}
          onClick={() => handleDeleteNotification(id)}
        >
          <MdDeleteOutline style={{ color: "red", cursor: "pointer" }} />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};
