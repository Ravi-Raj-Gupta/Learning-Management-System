import React from 'react';

const ContactUs = () => {
  return (
    <div className="md:px-36 px-8 pt-20 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8 text-center">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a question, feedback, or need support? We'd love to hear from you. Fill out the form below 
          or reach out to us through our direct contact channels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="mt-2 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800">Address</h3>
              <p className="text-gray-600 mt-1">123 Learning Ave, Suite 400<br/>Tech City, TC 90210</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800">Email Us</h3>
              <p className="text-gray-600 mt-1">support@learningmanagement.com<br/>info@learningmanagement.com</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Call Us</h3>
              <p className="text-gray-600 mt-1">+1 (555) 123-4567<br/>Mon-Fri, 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
