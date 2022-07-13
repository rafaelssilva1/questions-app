import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import LoadingScreen from "./components/loading-screen";
import QuestionsListScreen from "./components/questions-list-screen";
import DetailScreen from "./components/detail-screen";
import ConnectivityScreen from "./components/connectivity-screen";

function App() {
  const [connectivity, setConnectivity] = useState(window.navigator.onLine);
  
  const updateNetwork = () => {
    setConnectivity(window.navigator.onLine);
  };
  
  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
        window.removeEventListener("offline", updateNetwork);
        window.removeEventListener("online", updateNetwork);
    };
  });
  

  return (
    <>
      {!connectivity ? <ConnectivityScreen /> : ""}
      <Routes>
        <Route index path="/" element={<LoadingScreen />} />
        <Route path="/questions" element={<QuestionsListScreen />} />
        <Route path="/questions/:id" element={<DetailScreen />} />
      </Routes>
    </>
  );
}

export default App;
