import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

import { db } from "../../firebase";
export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [notificationsCounter, setNotificationsCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const collectionReference = collection(db, "notificaciones");
    console.log("no-bucle");
    onSnapshot(collectionReference, (data) => {
      const newNotificationsArray = data?.docs?.map((notification) => {
        return { ...notification.data(), id: notification.id };
      });
      setNotificationsArray(newNotificationsArray);
    });
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

  const handleSendNotification = async (notification, notificationType) => {
    // axios
    //   .post("/notificaciones", {
    //     notificationMessage: notification,
    //     seen: false,
    //     notificationType: notificationType,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    // .finally(() => getNotifications());
    const collectionRef = collection(db, "notificaciones");
    await addDoc(collectionRef, {
      notificationMessage: notification,
      seen: false,
      notificationType: notificationType,
    });
  };

  const handleMarkAsSeen = async (notificationId) => {
    // axios
    //   .put(`/notificaciones/${notificationId}`, { seen: true })
    //   .finally(() => getNotifications());
    const notificationRef = doc(db, "notificaciones", notificationId);
    const notificationFound = await getDoc(notificationRef);
    console.log(notificationFound.data(), notificationId, notificationFound.id);
    await updateDoc(notificationRef, { seen: true });
  };

  const handleDeleteNotification = async (notificationId) => {
    // axios
    //   .delete(`/notificaciones/${notificationId}`)
    //   .finally(() => getNotifications());
    const notificationRef = doc(db, "notificaciones", notificationId);
    await deleteDoc(notificationRef);
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
