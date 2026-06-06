import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="md:px-36 px-8 pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4 text-center">Privacy Policy</h1>
        <p className="text-center text-gray-500 mb-10">Last updated: June 2026</p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our Learning Management System. We respect your privacy and are committed to protecting 
              your personal data. This privacy policy will inform you as to how we look after your personal data 
              when you visit our website (regardless of where you visit it from) and tell you about your privacy 
              rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. The Data We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              We may collect, use, store and transfer different kinds of personal data about you which we have 
              grouped together as follows:
            </p>
            <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-1">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes payment card details (processed securely via Stripe).</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website and courses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. How We Use Your Data</h2>
            <p className="text-gray-600 leading-relaxed">
              We will only use your personal data when the law allows us to. Most commonly, we will use your 
              personal data in the following circumstances: Where we need to perform the contract we are about 
              to enter into or have entered into with you (e.g., providing access to courses). Where it is 
              necessary for our legitimate interests (or those of a third party) and your interests and fundamental 
              rights do not override those interests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally 
              lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to 
              your personal data to those employees, agents, contractors and other third parties who have a business 
              need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Your Legal Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data. 
              These include the right to request access, correction, erasure, restriction, transfer, to object to processing, 
              to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
            </p>
          </section>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-gray-600 italic">
              If you have any questions about this privacy policy, please contact us at privacy@learningmanagement.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
