import axios from "axios";
import { useEffect, useState } from "react";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQ1ZTYwNTQyZGY4ODUyNTExZDU2YiIsImVtYWlsIjoic2hhcm1pbGFAZ21haWwuY29tIiwiaWF0IjoxNjgwODgwNzEzLCJleHAiOjE2ODA5NjcxMTN9.G7knta3JwHNwJdNup_YxECuakRbGraS4VqVWrSV5d3Y";
export default function Home() {
  const [todos, setTodo] = useState([]);
  const [name, setName] = useState("");
  const [refetchData, setRefetchData] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [todoToBeUpdate, setTodoToBeUpdated] = useState();

  const refetchTodo = () => setRefetchData(!refetchData);

  const handleNamechange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/api/todos", {
        headers: {
          token,
        },
      })
      .then((res) => {
        setTodo(res.data.data);
        setIsLoading(false);
        setError();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err?.response?.data?.message ?? "Something Went Wrong");
      });
  }, [refetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoToBeUpdate) {
      axios
        .patch(
          `http://localhost:3001/api/todos/${todoToBeUpdate}`,
          {
            name,
          },
          {
            headers: {
              token,
            },
          }
        )
        .then((res) => {
          refetchTodo();
          setTodoToBeUpdated();
          setName("");
        });
    } else {
      axios
        .post(
          "http://localhost:3001/api/todos",
          {
            name,
          },
          {
            headers: {
              token,
            },
          }
        )
        .then((res) => {
          refetchTodo();
          setName("");
        });
    }
  };

  const handleDelete = (todoId) => {
    axios
      .delete(`http://localhost:3001/api/todos/${todoId}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        refetchTodo();
        console.log(res);
      });
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
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        todos.map((todo) => (
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
    </>
  );
}
