import React, { useState, useEffect } from "react";
import axios from "axios";
import OMG_Deals_Heading from "../assets/OMG_Deals/OMG_Deals_Heading.png";

const OMG_Deals = () => {
  const [dealsSlides, setDealsSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchAllDeals = async () => {
      try {
        const size = 5;
        let page = 0;
        let allDeals = [];

        while (true) {
          const res = await axios.get(`https://ecomm-backend-latest-syi6.onrender.com/deals?size=${size}&page=${page}`);
          const data = res.data;

          if (data?.content?.length > 0) {
            allDeals = [...allDeals, ...data.content];
            page++;
            if (data.last) break;
          } else {
            break;
          }
        }

        const slides = [];
        for (let i = 0; i < allDeals.length; i += 5) {
          slides.push(allDeals.slice(i, i + 5));
        }

        setDealsSlides(slides);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchAllDeals();
  }, []);

  useEffect(() => {
    if (dealsSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dealsSlides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [dealsSlides]);

  if (dealsSlides.length === 0) return null;

  return (
    <section className="bg-white py-10 px-4">
      {/* Heading Image */}
      <div className="mb-8 flex justify-center">
        <img
          src={OMG_Deals_Heading}
          alt="OMG Deals Banner"
          className="w-full max-w-7xl rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {dealsSlides[currentSlide].map((deal, index) => (
          <div
            key={deal.dealId || index}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
          >
            {/* Product Image */}
            <div className="w-full h-[180px] flex items-center justify-center p-4 bg-white">
              <img
                src={deal.imageUrl}
                alt={deal.dealName || `OMG Deal ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Yellow Description Box */}
            <div className="w-full bg-purple-300 p-3 border-t border-yellow-200">
              <h3 className="text-xs font-bold text-gray-700 mb-1">{deal.heading}</h3>
              <h3 className="text-sm font-bold text-pink-600 mb-1">{deal.dealName}</h3>
              <h3 className="text-xs text-gray-600">{deal.subHeading}</h3>
              
              {/* Discount Badge - Add if your data has discount information */}
              {/* {deal.discount && (
                <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {deal.discount}% OFF
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OMG_Deals;