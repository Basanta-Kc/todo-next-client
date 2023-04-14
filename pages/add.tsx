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

export default function AddTodo() {
  return (
    <>
      <AppBar />
      <Box sx={{ width: "800px", mx: "auto", mt: 4 }}></Box>
    </>
  );
}
