import { httpClient } from "@/utils/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [todoToBeUpdate, setTodoToBeUpdated] = useState();

  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await httpClient.get("/todos");
      return res.data.data;
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async () => {
      await httpClient.post("/todos", {
        name,
      });
    },
    onSuccess: () => {
      // todoQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleNamechange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate();
    // if (todoToBeUpdate) {
    //   axios
    //     .patch(
    //       `http://localhost:3001/api/todos/${todoToBeUpdate}`,
    //       {
    //         name,
    //       },
    //       {
    //         headers: {
    //           token,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       refetchTodo();
    //       setTodoToBeUpdated();
    //       setName("");
    //     });
    // } else {
    //   axios
    //     .post(
    //       "http://localhost:3001/api/todos",
    //       {
    //         name,
    //       },
    //       {
    //         headers: {
    //           token,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       refetchTodo();
    //       setName("");
    //     });
  };

  const handleDelete = (todoId) => {
    // axios
    //   .delete(`http://localhost:3001/api/todos/${todoId}`, {
    //     headers: {
    //       token,
    //     },
    //   })
    //   .then((res) => {
    //     refetchTodo();
    //     console.log(res);
    //   });
  };

  const handleUpdate = (todo) => {
    setTodoToBeUpdated(todo._id);
    setName(todo.name);
  };

  const handleReset = () => {
    setTodoToBeUpdated(null);
    setName("");
  };

  return (
    <>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-4"
          type="text"
          name="name"
          value={name}
          onChange={handleNamechange}
        />
        <input
          className="border"
          type="submit"
          value={todoToBeUpdate ? "Update" : "Add"}
        />
        <input
          className="border bg-pink-500"
          type="button"
          value="reset"
          onClick={handleReset}
        />
      </form>
      {/* {error && <p>{error}</p>} */}
      {todoQuery.isLoading ? (
        <p>Loading....</p>
      ) : (
        todoQuery.data.map((todo) => (
          <li key={todo._id}>
            {todo.name}
            <button
              className="border bg-red-500 py-1 px-2"
              onClick={() => handleDelete(todo._id)}
            >
              delete
            </button>
            <button
              className="border bg-blue-500 py-1 px-2"
              onClick={() => handleUpdate(todo)}
            >
              update
            </button>
          </li>
        ))
      )}
      <hr />
      <h2>Users</h2>
    </>
  );
}
