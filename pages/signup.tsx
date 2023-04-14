import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios
      .post("http://localhost:3001/api/auth/sign-up", {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        router.push("/");
      });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 10 }} textAlign={"center"}>
        Sign Up
      </Typography>
      <Box
        component="form"
        sx={{
          maxWidth: "500px",
          mx: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="First Name"
          name="firstName"
          type="text"
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Last Name"
          name="lastName"
          type="text"
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Email"
          name="email"
          type="email"
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Password"
          name="password"
          type="password"
        />
        <Button sx={{ my: 2 }} variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </Box>
      <Typography textAlign="center">
        Already have an Account? <Link href="/login">Sign In</Link>
      </Typography>
    </>
  );
}
