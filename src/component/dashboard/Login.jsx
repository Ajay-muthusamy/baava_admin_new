import React, { useState } from "react";
import logo from '../../assets/baava-crackers.png'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = () => {
    if (inputValue === "123") {
      navigate("/dash-board"); 
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
        <img src={logo} alt="" className="w-40"/>
      <label className="text-xl font-semibold mb-2 text-gray-700">
        PASSWORD:
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        maxLength="6"
        className="w-40 p-2 text-center text-xl font-medium border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="000000"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleSubmit}
        className="mt-4 px-20 md:px-4 md:py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;
