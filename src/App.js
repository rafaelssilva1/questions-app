import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// components
import LoadingScreen from "./components/loading-screen";
import QuestionsListScreen from "./components/questions-list-screen";
import DetailScreen from "./components/detail-screen";
import ConnectivityScreen from "./components/connectivity-screen";

function App() {
  const [connectivity, setConnectivity] = useState(false);

  if(!navigator.onLine) {
    setConnectivity(true);
  }

  return (
    <>
      {connectivity ? <ConnectivityScreen /> : ""}
      <Routes>
        <Route index path="/" element={<LoadingScreen />} />
        <Route path="/questions" element={<QuestionsListScreen />} />
        <Route path="/questions/:id" element={<DetailScreen />} />
      </Routes>
    </>
  );
}

export default App;
