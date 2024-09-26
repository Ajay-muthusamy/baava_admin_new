import React, { useState } from "react";
import axios from "axios";

const Update = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Make handleSubmit async to use await with axios
  const handleSubmit = async () => {
    if (!content) {
      setError("Offer content is required.");
      setSuccess(""); // Clear success message
    } else {
      setError(""); 
      try {
        // Define the data you are sending
        const updatedData = { OfferContent: content };

        // Await the axios PUT request
        const response = await axios.put(
          'http://localhost:1234/user/fetch-update-offer/66ee8fa4f6e9790366a61fed',
          updatedData
        );

        console.log('Successfully updated offer', response.data);
        setSuccess("Offer updated successfully!"); // Show success message
        setContent(""); // Clear the input field after successful update
      } catch (error) {
        console.error('Error updating offer:', error);
        setError("Error updating offer.");
        setSuccess(""); // Clear success message
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-4 font-mono text-center">Update Section</h1>
      <p className="text-center">*Note: Enter the text to Update*</p>

      <div className="flex flex-col w-full md:w-1/2 mx-auto space-y-6">
        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center font-semibold">{success}</p>
        )}

        <div>
          <label htmlFor="offers" className="block text-lg font-semibold mb-2">
            Offers
          </label>
          <input
            type="text"
            id="offers"
            className="w-full px-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter the offer content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          className={`px-6 py-2 mt-4 font-semibold rounded-lg transition duration-300 ${
            content 
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!content}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Update;
