import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [menuData, setMenuData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveCategory("");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get("https://ecomm-backend-latest-syi6.onrender.com/navitems");
        const transformedData = {};
        response.data.forEach(section => {
          transformedData[section.heading] = [
            {
              title: section.heading,
              items: Object.keys(section.items),
            },
          ];
        });
        setMenuData(transformedData);
      } catch (error) {
        console.error("Failed to fetch menu data", error);
      }
    };
    fetchMenuData();
  }, []);

  useEffect(() => {
    axios
      .get("https://ecomm-backend-latest-syi6.onrender.com/product?page=0&size=100")
      .then((response) => {
        setProducts(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    if (keyword.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = products.filter((product) =>
      product.productName.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword) ||
      product.productDescription?.toLowerCase().includes(keyword)
    );

    setFilteredResults(results);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const renderMobileCategory = (title, sections) => (
    <div key={title} className="border-b pb-2">
      <div
        className="flex justify-between items-center py-3 font-semibold cursor-pointer"
        onClick={() => setActiveCategory(activeCategory === title ? "" : title)}
      >
        {title}
        <span>{activeCategory === title ? "▲" : "▼"}</span>
      </div>

      {activeCategory === title && (
        <div className="pl-4 text-sm text-gray-700 space-y-3">
          {sections.map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold">{section.title}</h4>
              <ul className="ml-4 list-disc">
                {section.items.map((item, idx) => (
                  <li key={idx} className="hover:text-pink-600">
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDesktopDropdown = (title, data) => (
    <div className="relative group" key={title}>
      <a href="#" className="hover:text-pink-600">{title}</a>
      <div className="absolute top-full left-0 bg-white shadow-xl rounded-md mt-2 hidden group-hover:flex p-6 w-[720px] justify-between z-50">
        {data.map((section, i) => (
          <div key={i} className="space-y-2">
            <h4 className="font-semibold mb-1">{section.title}</h4>
            {section.items.map((item, idx) => (
              <a key={idx} href="#" className="block hover:text-pink-600">{item}</a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <header className="shadow-md z-50 sticky top-0 left-0 w-full bg-white">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-16 h-16 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-bold text-sm uppercase tracking-wide text-black-700 relative">
          {Object.entries(menuData).map(([title, items]) => renderDesktopDropdown(title, items))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-col w-1/3 relative">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchTerm}
              onChange={handleSearch}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {searchTerm && filteredResults.length > 0 && (
            <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto z-50">
              {filteredResults.map((product) => (
                <div key={product.productId} className="px-4 py-2 hover:bg-pink-50 cursor-pointer">
                  <div className="font-semibold text-sm">{product.productName}</div>
                  <div className="text-xs text-gray-500">{product.brand}</div>
                </div>
              ))}
            </div>
          )}

          {searchTerm && filteredResults.length === 0 && (
            <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-md p-4 text-sm text-gray-600">
              No products found.
            </div>
          )}
        </div>

        {/* Icons + Auth */}
        <div className="flex items-center space-x-4 text-gray-700 text-sm font-medium">
          {/* Hello Username First */}
          {user && (
            <div className="flex flex-col items-center">
              <FaUser className="text-lg" />
              <span className="hidden sm:block text-xs text-pink-600">Hello, {user.name}</span>
            </div>
          )}

          {/* Wishlist */}
          <div className="flex flex-col items-center">
            <FaHeart className="text-lg" />
            <span className="hidden sm:block">Wishlist</span>
          </div>

          {/* Bag */}
          <div className="flex flex-col items-center">
            <FaShoppingBag className="text-lg" />
            <span className="hidden sm:block">Bag</span>
          </div>

          {/* Auth Actions */}
          {user ? (
            <div className="bg-pink-600 rounded-full px-4 py-1.5 hover:bg-pink-300 transition cursor-pointer">
              <button onClick={handleLogout} className="text-xs text-black">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/SignUp" className="text-sm bg-pink-200 text-black px-4 py-1.5 rounded-full hover:bg-pink-300 transition">
                Sign Up
              </Link>
              <Link to="/login" className="text-sm bg-pink-200 text-black px-4 py-1.5 rounded-full hover:bg-pink-300 transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
