import React, { useEffect, useState } from "react";
import axios from "axios";
import couponCentral from "../assets/Coupon/CouponCentral.png";
import { FaRegCopy } from "react-icons/fa";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "https://ecomm-backend-latest-syi6.onrender.com/couponcentral?size=2&page=0"
        );
        setCoupons(response.data.content);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-700">
        Loading coupons...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 px-6 py-16">
      <div className="flex justify-center mb-12">
        <img
          src={couponCentral}
          alt="Coupon Central"
          className="max-w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {coupons.map((coupon) => (
          <div
            key={coupon.couponId}
            className="relative bg-gradient-to-br from-yellow-200 to-yellow-300 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Zig-Zag Border */}
            <div className="absolute -top-2 left-0 right-0 h-4 overflow-hidden">
              <div className="relative h-full">
                <div className="absolute w-full h-full bg-yellow-300 zigzag-pattern"></div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-0 right-0 h-4 overflow-hidden">
              <div className="relative h-full">
                <div className="absolute w-full h-full bg-yellow-300 zigzag-pattern"></div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md z-10">
              {coupon.category}
            </div>

            {/* Coupon Content */}
            <div className="relative z-0">
              {/* Heading */}
              <div className="text-2xl font-bold text-purple-800 mb-3 text-center font-serif">
                {coupon.heading}
              </div>

              {/* Description */}
              <p className="text-gray-800 text-sm font-medium mb-6 text-center">
                {coupon.description}
              </p>

              {/* Coupon Code + Copy Button (Top-right) */}
              <div className="relative bg-white px-4 py-3 rounded-lg border-2 border-dashed border-yellow-400 shadow-inner mb-2">
                <span className="text-yellow-600 font-mono font-bold tracking-wider text-xl block text-center">
                  {coupon.couponCode}
                </span>
                <button
                  className="absolute top-2 right-2 text-xs font-semibold text-pink-600 bg-blue-300 border border-pink-500 px-3 py-1 rounded hover:bg-pink-100 transition duration-200 flex items-center gap-1"
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.couponCode);
                    setCopiedId(coupon.couponId);
                    setTimeout(() => setCopiedId(null), 1500);
                  }}
                >
                  <FaRegCopy className="inline" />
                  {copiedId === coupon.couponId ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Validity */}
              <div className="text-xs text-center text-gray-600 mt-2">
                Valid until: {new Date(coupon.expiryDate).toLocaleDateString()}
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-pink-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pink-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-pink-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pink-400 rounded-br-lg"></div>
          </div>
        ))}
      </div>

      {/* Zigzag Pattern */}
      <style jsx>{`
        .zigzag-pattern {
          background: linear-gradient(
              45deg,
              transparent 33.333%,
              #f59e0b 33.333%,
              #f59e0b 66.667%,
              transparent 66.667%
            ),
            linear-gradient(
              -45deg,
              transparent 33.333%,
              #f59e0b 33.333%,
              #f59e0b 66.667%,
              transparent 66.667%
            );
          background-size: 20px 40px;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default Coupon;
