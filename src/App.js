import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ModalAPage from "./components/ModalAPage";
import ModalBPage from "./components/ModalBPage";
import Home from "./components/Home";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modal-a" element={<ModalAPage />} />
      <Route path="/modal-b" element={<ModalBPage />} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
