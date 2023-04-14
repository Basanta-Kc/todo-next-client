import AppBar from "@/layouts/NavBar";
import { httpClient } from "@/utils/httpClient";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await httpClient.get("/todos");
      return res.data.data;
    },
  });

  return (
    <>
      <AppBar />
      <Box sx={{ width: "800px", mx: "auto", mt: 4 }}>
        <List sx={{ mt: 4 }}>
          {todoQuery.isLoading ? (
            <>
              <Skeleton variant="text" sx={{ fontSize: "4rem", mt: 4 }} />
              <Skeleton variant="text" sx={{ fontSize: "4rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "4rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "4rem" }} />
            </>
          ) : todoQuery.data.length > 0 ? (
            todoQuery.data.map((todo) => (
              <ListItem
                key={todo._id}
                secondaryAction={
                  <>
                    <IconButton sx={{ mr: 1 }} edge="end" aria-label="delete">
                      <DeleteIcon color="error" />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon color="secondary" />
                    </IconButton>
                  </>
                }
              >
                <ListItemText>
                  Test{" "}
                  <Chip sx={{ ml: 2 }} label="In Progress" color="primary" />
                </ListItemText>
              </ListItem>
            ))
          ) : (
            <Alert severity="info">No Todo Please Add New todo.</Alert>
          )}
        </List>
      </Box>
    </>
  );
}
