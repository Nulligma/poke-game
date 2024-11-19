import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { About } from "./About";
import ProtectedRoute from "./auth/protectedRoute";
import { Battle } from "./Battle";
import { Gym } from "./Gym";
import { Pokemon } from "./Pokemon";
import { Shop } from "./Shop";
import Login from "./auth/Login";
import Footer from "../../components/Footer";

const Router = () => {
  return (
    <div className="main-container">
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <Battle />
                </ProtectedRoute>
              }
              path="/battle"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
              path="/shop"
            />

            <Route element={<Login />} path="/login" />
            <Route element={<About />} path="/about" />
            <Route element={<Gym />} path="/gym" />
            <Route element={<Pokemon />} path="/pokemon" />
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
