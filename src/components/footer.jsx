import React from "react";

import appStore from "../assets/footer/AppStore.png";
import facebook from "../assets/footer/Facebook.png";
import googlePlay from "../assets/footer/GooglePlay.png";
import instagram from "../assets/footer/Instagram.png";
import original from "../assets/footer/Original.png";
import sign from "../assets/footer/Sign_14.png";
import twitter from "../assets/footer/Twitter.png";
import youtube from "../assets/footer/youtube.png";
const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-2 md:grid-cols-5 gap-x-26 gap-y-10">
        <div>
          <h4 className="font-bold mb-4">ONLINE SHOPPING</h4>
          <ul className="space-y-2">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
            <li>Beauty</li>
            <li>Genz</li>
            <li>Gift Cards</li>
            <li>Myntra Insider</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">CUSTOMER POLICIES</h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>T&C</li>
            <li>Terms Of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>Returns</li>
            <li>Privacy policy</li>
            <li>Grievance Redressal</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 whitespace-nowrap">EXPERIENCE MYNTRA APP ON MOBILE</h4>
          <div className="flex space-x-2 mb-6">
            <img src={googlePlay} alt="Google Play" className="w-32" />
            <img src={appStore} alt="App Store" className="w-32" />
          </div>
        
        <h4 className="font-bold mb-4 "> KEEP IN TOUCH</h4>
          <div className="flex space-x-4 mb-6">
            
            <img src={facebook} alt="Facebook" className="w-5 h-5" />
            <img src={twitter} alt="Twitter" className="w-5 h-5" />
            <img src={youtube} alt="Youtube" className="w-6 h-5" />
            <img src={instagram} alt="Instagram" className="w-6 h-5.5" />
          </div>
        </div>


        <div className= "pl-24">
          <div className="flex flex-col space-y-6">
                <div className="flex items-start space-x-3 ">
                  <img src={original} alt="Original" className="w-14" />
                  <p className="text-sm max-w-[180px]">
                    <strong>100% ORIGINAL</strong> guarantee for all products at myntra.com
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <img src={sign} alt="Sign" className="w-14" />
                  <p className="text-sm max-w-[180px]">
                    <strong>Return within 14 days</strong> of receiving your order
                  </p>
                </div>
                </div>
        </div>
              

        <div className="flex flex-col justify-between">

      
          

            
              
            
          
      
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 items-center justify-center"></div>
      </div>

      <div className="text-center py-1 text-xs border-t">
        © 2025 Myntra Clone by Shubhangi
      </div>
    </footer>
  );
};

export default Footer;
