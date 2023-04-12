import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { link } from "fs";
import { useEffect, useState } from "react";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQ1ZTYwNTQyZGY4ODUyNTExZDU2YiIsImVtYWlsIjoic2hhcm1pbGFAZ21haWwuY29tIiwiaWF0IjoxNjgxMTM4NDk2LCJleHAiOjE2ODEyMjQ4OTZ9.oCTZ2V3FSbf4UJ05n2rVrIWlJV1A8o3i-Jnb6hrFMIE";

function Users() {
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await httpClient.get("/users");
      return res.data.data;
    },
  });
  return (
    <>
      <h1>Users</h1>
      {error && <p>{error}</p>}

      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
          <button className="border" onClick={refetch}>
            Refetch
          </button>
        </ul>
      )}
    </>
  );
}

function Todos() {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await httpClient.get("/todos");
      return res.data.data;
    },
  });

  return (
    <>
      <h1>Todos</h1>
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li>{todo.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Todos />
      <hr />
      <Users />
    </>
  );
}
