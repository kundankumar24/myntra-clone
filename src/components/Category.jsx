import React, { useState, useEffect } from "react";
import shopByCategoryHeading from "../assets/Category/shopByCategoryHeading.png";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://ecomm-backend-latest-syi6.onrender.com/shopbycategory");
        const data = await res.json();
        setCategories(data.content);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Utility: Break array into chunks of 5
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const rows = chunkArray(categories.slice(0, 10), 5);

  return (
    <section className="bg-white px-4 py-10">
      {/* Heading Banner */}
      <div className="mb-10 flex justify-center">
        <img
          src={shopByCategoryHeading}
          alt="Shop by Category"
          className="w-full max-w-7xl rounded-xl shadow-md"
        />
      </div>

      {/* Category Cards */}
      {rows.map((group, index) => (
        <div
          key={index}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8 max-w-6xl mx-auto"
        >
          {group.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow hover:scale-105 transition-transform duration-300 text-center bg-white"
            >
              <img
                src={item.imageUrl}
                alt={item.category}
                className="w-full h-40 object-cover"
              />
              {/* Purple background section with pink text */}
              <div className="bg-purple-300 p-2">
                <h3 className="text-sm font-bold ">{item.category}</h3>
                <p className="text-xs font-bold text-pink-600">{item.heading}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Category;
