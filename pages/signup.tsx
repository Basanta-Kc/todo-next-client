import { httpClient } from "@/utils/httpClient";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const signUpMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await httpClient.post("/auth/sign-up", data);
      return res;
    },
    onSuccess(res) {
      router.push("/login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    signUpMutation.mutate({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
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
          mt: 2,
        }}
        onSubmit={handleSubmit}
      >
        {signUpMutation.isError && (
          <Alert severity="error">{signUpMutation.error.message}</Alert>
        )}
        <TextField
          sx={{ my: 1 }}
          label="First Name"
          name="firstName"
          type="text"
          fullWidth
        />
        <TextField
          sx={{ my: 1 }}
          label="Last Name"
          name="lastName"
          type="text"
          fullWidth
        />
        <TextField
          sx={{ my: 1 }}
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
          Sign Up
        </Button>
      </Box>
      <Typography sx={{ my: 1 }} textAlign="center">
        Already have an account? <Link href="/login">Sign In</Link>{" "}
      </Typography>
    </>
  );
}
