import React from "react";

// Image imports (adjust file paths/names as needed)
import OffCoupon from "../assets/Top_section/OffCoupon.png";

import Man from "../assets/Top_section/Man.png";
import Woman from "../assets/Top_section/Woman.png";

import Lakme from "../assets/Top_section/Lakme.png";
import Libas from "../assets/Top_section/Libas.png";
import USPolo from "../assets/Top_section/USPolo.png";

import Discounts from "../assets/Top_section/Discounts.png";

const Top_section = () => {
  return (
    <section className="bg-white">
      {/* Top image */}
      <div>
        <img
          src={OffCoupon}
          alt="Top Banner"
          className="w-full"
        />
      </div>

      {/* 2 images side by side */}
      <div className="grid grid-cols-2">
        <img
          src={Man}
          alt="Man"
          className="w-full"
        />
        <img
          src={Woman}
          alt="Woman"
          className="w-full"
        />
      </div>

      {/* 3 images side by side */}
      <div className="grid grid-cols-3">
        <img
          src={Lakme}
          alt="Lakme"
          className="w-full"
        />
        <img
          src={Libas}
          alt="Libas"
          className="w-full"
        />
        <img
          src={USPolo}
          alt="USPolo"
          className="w-full"
        />
      </div>

      {/* Final centered image */}
      <div>
        <img
          src={Discounts}
          alt="Discounts"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default Top_section;
