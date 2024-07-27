import { Button, Typography, Container, TextField, Alert } from "@mui/material";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginError, setLoginError] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    console.log(auth);

    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  return (
    <Container sx={{ mt: "100px" }}>
      <Typography variant="h4" textAlign="center" mb="20px">
        Login
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
          Log in
        </Button>
      </Container>

      {loginError && (
        <Alert
          severity="error"
          sx={{ marginTop: "30px", maxWidth: "500px", marginX: "auto" }}
        >
          {loginError}
        </Alert>
      )}
    </Container>
  );
};
