// {
//     "firstName":"bibek",
//     "lastName": "dhungana",
//     "email": "bibekdhungana@gmail.com",
//     "password": "password"
// }

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
      .post("http://localhost:3001/api/auth/sign-up", {
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
      })
      .then((res) => {
        router.push("/login");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
