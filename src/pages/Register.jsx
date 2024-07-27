import { Button, Typography, Container, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const Register = () => {
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    console.log(
      "nombre: ",
      e.target.username.value,
      "email: ",
      e.target.email.value,
      "contraseña: ",
      e.target.password.value
    );

    const registerNewUser = async (newUser) => {
      try {
        await setDoc(doc(db, "users", newUser.id), newUser);
        console.log("¿funciona?");
      } catch (err) {
        console.log(err);
      }
    };

    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = {
          username: e.target.username.value,
          mail: e.target.email.value,
          orders: [],
          cart: [],
          id: userCredential.user.uid,
        };
        registerNewUser(user);
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <Container sx={{ mt: "100px" }}>
      <Typography variant="h4" textAlign="center" mb="20px">
        Register
      </Typography>

      <Container
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "300px",
          border: "1px solid black",
          borderRadius: "15px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField label="Username" placeholder="Username" name="username" />
        <TextField
          label="email"
          placeholder="Email"
          type="email"
          name="email"
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Container>
    </Container>
  );
};
