import {
  Container,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Divider,
  CardContent,
  Card,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo.js";
import { useContext, useState } from "react";
import { todosContext } from "../contexts/todosContext.js";

function TodosList() {
  const { todos, setTodos } = useContext(todosContext);
  const [inputTitle, setInputTitle] = useState("");
  const [DisplayedTodo, setDisplayedTodo] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputTitle !== "") {
      const newTodo = {
        id: uuidv4(),
        title: inputTitle,
        details: "",
        isCompleted: false,
      };

      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setInputTitle("");
      // set todos in localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  }

  let todoToBeRendered = todos;

  const completedTodos = todos?.filter((t) => t.isCompleted);
  const notCompletedTodos = todos?.filter((t) => !t.isCompleted);

  if (DisplayedTodo === "completed") {
    todoToBeRendered = completedTodos;
  } else if (DisplayedTodo === "not-completed") {
    todoToBeRendered = notCompletedTodos;
  }

  const todosJsx = todoToBeRendered?.map((t) => <Todo key={t.id} todo={t} />);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h1 style={{ textAlign: "center" }}>Todos</h1>
          <Divider />
          {/* Filters Buttons */}
          <Stack
            style={{
              marginTop: "20px",
            }}
          >
            <ToggleButtonGroup
              style={{ justifyContent: "center" }}
              value={DisplayedTodo}
              onChange={(e) => setDisplayedTodo(e.target.value)}
              exclusive
              color="primary"
            >
              <ToggleButton value={"all"}>All</ToggleButton>
              <ToggleButton value={"completed"}>completed</ToggleButton>
              <ToggleButton value={"not-completed"}>not completed</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          {/*== Filters Buttons ==*/}

          {/* Todos */}
          <div
            style={{ padding: "20px 0", maxHeight: "400px", overflow: "auto" }}
          >
            {todosJsx}
          </div>
          {/*== Todos ==*/}

          {/* Add Todo */}
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1} style={{ marginTop: "20px" }}>
              <TextField
                style={{ width: "70%" }}
                id="outlined-basic"
                label="Add Task"
                variant="outlined"
                value={inputTitle}
                onChange={(event) => setInputTitle(event.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                style={{ padding: "10px 20px", width: "30%" }}
              >
                Submit
              </Button>
            </Stack>
          </form>
          {/*== Add Todo ==*/}
        </CardContent>
      </Card>
    </Container>
  );
}

export default TodosList;
