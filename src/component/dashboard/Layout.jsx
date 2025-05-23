import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./Order";
import Update from "./Update";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Analystic from "./Analystic";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dash-board" element={<Sidebar />}>
          <Route index element={<Order />} />
          <Route path="/dash-board/page-updates" element={<Update />} />
          <Route path="/dash-board/analystic" element={<Analystic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
