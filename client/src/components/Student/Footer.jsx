import { assets } from "@/assets/assets";
import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 px-6 md:px-16 lg:px-24 xl:px-32 pt-10">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT SECTION */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <img src={assets.logo_dark} alt="logo" />
          </div>

          <p className="text-sm leading-6 text-left">
            We provide high-quality, accessible, and interactive online courses to help you master new skills and advance your career. Join our community of lifelong learners today.
          </p>
        </div>

        {/* COMPANY LINKS */}
        <div className=" flex flex-col items-start">
          <h3 className="text-white text-lg font-semibold mb-5">Company</h3>

          <ul className="flex flex-col gap-2 text-sm text-left ">
            <li><Link to="/" className="cursor-pointer hover:text-white">Home</Link></li>
            <li><Link to="/about" className="cursor-pointer hover:text-white">About us</Link></li>
            <li><Link to="/contact" className="cursor-pointer hover:text-white">Contact us</Link></li>
            <li><Link to="/privacy-policy" className="cursor-pointer hover:text-white">Privacy policy</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white text-left text-lg font-semibold mb-5">
            Subscribe to our newsletter
          </h3>

          <p className="text-sm mb-4 text-left">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex flex-col gap-2 text-left sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#132445] px-4 py-2 rounded-md outline-none text-sm w-full"
            />

            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-sm sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t border-gray-700 mt-12 py-6 text-center text-sm">
        Copyright 2026 © Ravi Raj. All Right Reserved.
      </div>

    </footer>
  );
};

export default Footer;
