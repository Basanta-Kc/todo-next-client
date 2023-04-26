import { useAuth } from "@/hooks/useAuth";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";
// form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
  const router = useRouter();
  const { signUpMutation } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
  } = methods;

  const onSubmit = async (data) => {
    signUpMutation.mutate(data);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        {signUpMutation.isError && (
          <Alert severity="error">{signUpMutation.error.message}</Alert>
        )}
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              sx={{ my: 1 }}
              label="First Name"
              type="text"
              error={Boolean(error)}
              helperText={error?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              sx={{ my: 1 }}
              label="Last Name"
              type="text"
              error={Boolean(error)}
              helperText={error?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              sx={{ my: 1 }}
              label="Email"
              type="email"
              error={Boolean(error)}
              helperText={error?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              sx={{ my: 1 }}
              label="Password"
              type="password"
              error={Boolean(error)}
              helperText={error?.message}
              fullWidth
              {...field}
            />
          )}
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
