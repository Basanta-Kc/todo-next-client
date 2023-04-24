import { useAuth } from "@/hooks/useAuth";
import { httpClient } from "@/utils/httpClient";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { signInMutation } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    signInMutation.mutate({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };
  return (
    <>
      <Typography variant="h4" textAlign="center">
        Sign In
      </Typography>
      <Box
        component="form"
        sx={{
          width: "500px",
          mx: "auto",
        }}
        onSubmit={handleSubmit}
      >
        {signInMutation.isError && (
          <Alert severity="error">{signInMutation.error.message}</Alert>
        )}
        <TextField
          sx={{ my: 2 }}
          label="Email"
          name="email"
          type="email"
          fullWidth
        />
        <TextField
          sx={{ my: 1 }}
          label="Password"
          name="password"
          type="password"
          fullWidth
        />

        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </Box>
      <Typography sx={{ my: 1 }} textAlign="center">
        Doesn't have Account? <Link href="/signup">Sign Up</Link>{" "}
      </Typography>
    </>
  );
}
