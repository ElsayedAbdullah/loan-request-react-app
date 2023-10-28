import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import "./Todo.css";
import { useContext, useEffect, useState } from "react";
import { todosContext } from "../contexts/todosContext.js";

// Dialogue
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Todo({ todo }) {
  const { todos, setTodos } = useContext(todosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  useEffect(() => {
    const todosStorage = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (todosStorage) setTodos(todosStorage);
  }, [todos, setTodos]);

  // function to make todo is completed
  function handleCheck() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // function to make delete todo
  function handleDeleteTodo(todoId) {
    const deletedTodos = todos.filter((t) => t.id !== todoId);
    setTodos(deletedTodos);
    localStorage.setItem("todos", JSON.stringify(deletedTodos));
  }

  // function to update todo
  function handleUpdateTodo(todoId) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
  }

  const handleDeleteOpen = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteDialog(false);
  };

  const handleUpdateOpen = () => {
    setShowUpdateDialog(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#f7f7f7",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Grid
            container
            sx={{
              alignItems: "center",
            }}
          >
            <Grid item xs={8}>
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="p">{todo.details}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
                <IconButton
                  className={`check icon-button ${
                    todo.isCompleted ? "active" : ""
                  }`}
                  aria-label="completed"
                  onClick={() => handleCheck(todo.id)}
                >
                  <CheckOutlinedIcon />
                </IconButton>
                <IconButton
                  className="edit icon-button"
                  aria-label="edit"
                  onClick={() => handleUpdateOpen()}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  className="delete icon-button"
                  aria-label="delete"
                  onClick={handleDeleteOpen}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Delete Dialogue */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete this todo?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you agree you can't return to it again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={() => handleDeleteTodo(todo.id)}>Yes</Button>
        </DialogActions>
      </Dialog>
      {/*==// Delete Dialogue //==*/}

      {/* Update Dialogue */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Todo title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => setUpdatedTodo({ ...todo, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="details"
            label="Todo details"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...todo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Disagree</Button>
          <Button onClick={() => handleUpdateTodo(todo.id)}>Yes</Button>
        </DialogActions>
      </Dialog>
      {/*==// Update Dialogue //==*/}
    </>
  );
}

export default Todo;
