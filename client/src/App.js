import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Headers/Headers";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/userprofile/:id" element={<Profile />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
