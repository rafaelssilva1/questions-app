import './App.css';
import { Routes, Route } from "react-router-dom";

// components
import LoadingScreen from './components/loading-screen';

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<LoadingScreen />}></Route>
      </Routes>
    </>
  );
}

export default App;
