import axios from "axios";
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
    axios
      .post("http://localhost:3001/api/auth/sign-in", {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        router.push("/");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="login" />
      </form>
    </>
  );
}
