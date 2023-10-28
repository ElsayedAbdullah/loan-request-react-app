import { Route, Routes } from "react-router-dom";
import LoanForm from "./components/LoanForm.js";
import TodosList from "./components/TodosList.js";
import { postsContext } from "./contexts/postsContext.js";
import PostsList from "./components/PostsList.js";
import PostDetails from "./components/PostDetails.js";
import NotFound from "./components/NotFound.js";
import NewPost from "./components/NewPost.js";
import Navbar from "./components/Navbar.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Material from "./components/Material.js";
import { Container } from "@mui/material";
import { useState } from "react";
import { todosContext } from "./contexts/todosContext.js";
const postsData = [
  { id: 1, title: "Post one", description: "Post one Description" },
  { id: 2, title: "Post two", description: "Post two Description" },
  { id: 3, title: "Post three", description: "Post three Description" },
];

const initialTodos = [];

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) ?? initialTodos
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
    },
  });

  return (
    <postsContext.Provider value={postsData}>
      <ThemeProvider theme={theme}>
        <Container fixed className="App">
          <Navbar />
          <todosContext.Provider value={{ todos, setTodos }}>
            <Routes>
              <Route path="/" element={<TodosList />} />
              <Route path="/home" element={<TodosList />} />
              <Route path="/form" element={<LoanForm />} />
              <Route path="/material" element={<Material />} />
              <Route path="/posts">
                <Route index element={<PostsList />}></Route>
                <Route path="new" element={<NewPost />}></Route>
                <Route path=":postId" element={<PostDetails />}></Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </todosContext.Provider>
        </Container>
      </ThemeProvider>
    </postsContext.Provider>
  );
}

export default App;
