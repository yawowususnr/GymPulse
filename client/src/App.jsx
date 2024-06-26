import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import axios from "axios";
import "./App.css";
import Header from "./Header";
import Thursday from "./pages/Thursday";
import Testpage from "./pages/Testpage"


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header/>}>
        <Route path="/entries" element={<Testpage />} />
        <Route path="/entries/thursday" element={<Thursday />} />
      </Route>
    </Routes>
  );
}

export default App;
