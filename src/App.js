import "./App.css";
import { Routes, Route } from "react-router-dom";

// components
import LoadingScreen from "./components/loading-screen";
import QuestionsListScreen from "./components/questions-list-screen";
import DetailScreen from "./components/detail-screen";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<LoadingScreen />} />
        <Route path="/questions" element={<QuestionsListScreen />} />
        <Route path="/questions/:id" element={<DetailScreen />} />
      </Routes>
    </>
  );
}

export default App;
