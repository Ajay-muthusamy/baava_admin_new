import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside>
      <div className="flex h-screen">
        <div className="md:hidden p-4">
          <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
            {isOpen ? (
              <RxCrossCircled className="text-3xl text-white" />
            ) : (
              <GiHamburgerMenu className="text-3xl text-[#5D4E8F]" />
            )}
          </button>
        </div>

        <div
          className={`fixed inset-y-0 left-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:w-52 bg-[#5D4E8F] p-4 w-64 transition-transform duration-300 ease-in-out z-50 shadow-lg`}
        >
          <div className="flex flex-col justify-between h-full font-mono text-white">
            <div className="space-y-6">
              <button
                className="w-full text-left p-4 text-xl font-semibold hover:bg-[#7e5fe4] hover:rounded-lg transition-all duration-300"
                aria-label="Navigate to Orders"
                onClick={() => {
                  navigate("/dash-board");
                  setIsOpen(false);
                }}
              >
                Orders
              </button>

              <button
                className="w-full text-left p-4 text-xl font-semibold hover:bg-[#7e5fe4] hover:rounded-lg transition-all duration-300"
                aria-label="Update section"
                onClick={() => {
                  navigate("/dash-board/page-updates  ");
                  setIsOpen(false);
                }}
              >
                Update
              </button>
            </div>
            <div className="block md:hidden text-center ">
              <button className="text-1xl px-5 bg-red-700 py-2 rounded-lg hover:bg-red-500"
              onClick={()=>setIsOpen(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
