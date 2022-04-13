/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainHeader as Header } from "./components/header/Header.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Create from "./pages/Create.jsx";
import Update from "./pages/Update.jsx";
import NotFound from "./pages/404.jsx";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex justify-center">
          <div className="max-w-desktop px-[4%] py-8 w-full">
            <Header />
            <div className="mt-4 flex justify-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-memory" element={<Create />} />
                <Route path="/update-memory/:id" element={<Update />} />
                <Route path="/memories/:id" element={<Detail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
