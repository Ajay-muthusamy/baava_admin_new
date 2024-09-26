import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./Order";
import Update from "./Update";
import Login from "./Login";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dash-board" element={<Sidebar />}>
          <Route index element={<Order />} />
          <Route path="/dash-board/page-updates" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
