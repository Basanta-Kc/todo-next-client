import { httpClient } from "@/utils/httpClient";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { createContext } from "react";

export type AuthContextType = {
  user: any;
  signInMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
  handleLogOut: () => void;
  signUpMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    SignUp,
    unknown
  >;
};
export const AuthContext = createContext<AuthContextType | null>(null);

type SignUp = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export function AuthProvider({ children }) {
  const router = useRouter();

  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ["auth-user"],
    enabled: !(router.pathname == "/login" || router.pathname == "/signup"),
    queryFn: async () => {
      const res = await httpClient.get("/auth/user");
      return res.data.data;
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUp) => {
      const res = await httpClient.post("/auth/sign-up", data);
      return res;
    },
    onSuccess(res) {
      router.push("/login");
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
      localStorage.setItem("token", res.data.token);
      refetchUser();
      router.push("/");
    },
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, signInMutation, handleLogOut, signUpMutation }}
    >
      {children}
    </AuthContext.Provider>
  );
}
