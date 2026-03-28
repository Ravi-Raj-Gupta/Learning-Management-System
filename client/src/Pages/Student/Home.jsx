import Companies from "@/components/Student/Companies";
import Hero from "../../components/Student/Hero";
import React from "react";
import CoursesSection from "@/components/Student/CoursesSection";
import Testimonial from "@/components/Student/Testimonial";
import CallToAction from "@/components/Student/CallToAction";
import Footer from "@/components/Student/Footer";

const Home = () => {
   return (
      <div className="flex flex-col items-center space-y-7 text-center">
         <Hero />
         <Companies />
         <CoursesSection />
         <Testimonial />
         <CallToAction />
         <Footer />
      </div>
   );
};

export default Home;
