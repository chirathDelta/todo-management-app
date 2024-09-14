import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/todos" element={<TodoPage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
