import React from "react";
import KnockOutOffers from "../assets/Knockout_Offers/KnockOutOffers.png"; // Update the path and name as per your file

const Knockout_Offers = () => {
  return (
    <section className="bg-white px-4 py-10">
      <div className="flex justify-center">
        <img
          src={KnockOutOffers}
          alt="Knockout Offers"
          className="w-full max-w-7xl rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>
  );
};

export default Knockout_Offers;
