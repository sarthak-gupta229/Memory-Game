
import MemoryGames from "./component/MemoryGames";
import Homepage from "./component/Homepage";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/game" element={<MemoryGames />} />
    </Routes>

  );
}

export default App;
