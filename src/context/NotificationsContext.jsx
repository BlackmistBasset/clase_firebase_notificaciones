import { createContext, useState, useEffect } from "react";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [notificationsCounter, setNotificationsCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getNotifications = () => {
    // axios.get("/notificaciones").then((response) => {
    //   console.log(response);
    //   setNotificationsArray(response.data);
    //   setIsLoading(false);
    // });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    setNotificationsCounter(0);
    notificationsArray?.forEach((notification) => {
      if (!notification.seen) {
        setNotificationsCounter(
          (notificationsCounter) => notificationsCounter + 1
        );
      }
    });
  }, [notificationsArray]);

  const handleSendNotification = (notification, notificationType) => {
    axios
      .post("/notificaciones", {
        notificationMessage: notification,
        seen: false,
        notificationType: notificationType,
      })
      .then(function (response) {
        console.log(response);
      })
      .finally(() => getNotifications());
  };

  const handleMarkAsSeen = (notificationId) => {
    axios
      .put(`/notificaciones/${notificationId}`, { seen: true })
      .finally(() => getNotifications());
  };

  const handleDeleteNotification = (notificationId) => {
    axios
      .delete(`/notificaciones/${notificationId}`)
      .finally(() => getNotifications());
  };

  const handleDeleteNotifications = () => {
    notificationsArray.forEach(({ id }) => {
      fetch(
        `https://666ddd147a3738f7cacd7f85.mockapi.io/notificaciones/${id}`,
        {
          method: "DELETE",
        }
      ).finally(() => getNotifications());
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificationsArray,
        setNotificationsArray,
        handleSendNotification,
        notificationsCounter,
        handleMarkAsSeen,
        handleDeleteNotification,
        handleDeleteNotifications,
        isLoading,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
