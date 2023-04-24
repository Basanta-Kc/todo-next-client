import { httpClient } from "@/utils/httpClient";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NavBar from "./NavBar";
export default function Home() {
  const todoQuery = useQuery({
    queryKey: ["todos"],
    retry: false,
    queryFn: async () => {
      const res = await httpClient.get("/todos");
      return res.data.data;
    },
  });

  const getTodos = () => {
    if (todoQuery.isLoading) {
      return (
        <>
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        </>
      );
    }

    if (todoQuery.isError) {
      console.log(todoQuery.error);
      return (
        <p>
          {todoQuery.error?.response?.data?.message ?? "Something went wrong"}
        </p>
      );
    }

    return (
      <List>
        {todoQuery.data?.map((todo) => (
          <ListItem
            key={todo._id}
            secondaryAction={
              <>
                <IconButton sx={{ mr: 2 }} edge="end" aria-label="delete">
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <EditOutlinedIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={todo.name} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <NavBar />
      {getTodos()}
    </>
  );
}
