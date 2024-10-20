import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Loginpage from "./component/Loginpage";
import Nav from "./component/Nav";
import Register from "./component/Register";
import Welcomepage from "./component/Welcomepage";
import Adminpage from "./component/Adminpage";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import Index from "./component/user/Index";
import Detailrent from "./component/user/Detailrent";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/welcome" element={<Welcomepage />}></Route>
        {/* Adminroute */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Adminpage />
            </AdminRoute>
          }
        />
        {/* user */}
        <Route
          path="/user"
          element={
            <UserRoute>
              <Welcomepage />
            </UserRoute>
          }
        ></Route>
        <Route path="/index" element={<Index />}></Route>
        <Route path="/detailrent/:room_id" element={<Detailrent />}></Route>
      </Routes>
    </>
  );
}

export default App;
