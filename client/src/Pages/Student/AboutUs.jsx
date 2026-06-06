import React from 'react';

const AboutUs = () => {
  return (
    <div className="md:px-36 px-8 pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We are dedicated to providing world-class, accessible education to everyone, everywhere. 
            Our platform connects passionate learners with industry-leading experts to foster growth, 
            skill development, and career advancement. We believe that learning is a lifelong journey, 
            and we're here to support you every step of the way.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            To become the global standard for online learning, creating a world where quality education 
            is not limited by geographical or financial barriers. We strive to innovate continuously, 
            offering an interactive and engaging learning experience that empowers individuals to achieve 
            their fullest potential.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
            <li>Expert instructors with real-world experience</li>
            <li>Flexible learning schedules tailored to your lifestyle</li>
            <li>Comprehensive curriculum covering in-demand skills</li>
            <li>Interactive video lessons and hands-on projects</li>
            <li>A supportive community of learners and mentors</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
