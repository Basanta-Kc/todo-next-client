import { httpClient } from "@/utils/httpClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const router = useRouter();

  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await httpClient.get("/auth/user");
      return res.data.data;
    },
  });

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await httpClient.post("/auth/sign-in", {
        email,
        password,
      });
      return res;
    },
    onSuccess(res) {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      refetchUser();
      router.push("/");
    },
  });

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, signInMutation, isAuthenticated: Boolean(user), logOut }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
