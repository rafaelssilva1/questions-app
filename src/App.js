import "./App.css";
import { Routes, Route } from "react-router-dom";

// components
import LoadingScreen from "./components/loading-screen";
import QuestionsListScreen from "./components/questions-list-screen";
import Placeholder from "./components/placeholder";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<LoadingScreen />} />
        <Route path="/questions" element={<QuestionsListScreen />} />
        <Route path="/questions/:id" element={<Placeholder />} />
      </Routes>
    </>
  );
}

export default App;
