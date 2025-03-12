
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-orange-500">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg">Last Updated: June 1, 2023</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Cookies</h2>
            <p>
              We use cookies for several purposes, including:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Authentication: To remember your login status and keep you signed in</li>
              <li>Preferences: To remember your settings and preferences</li>
              <li>Analytics: To understand how visitors use our site and improve our services</li>
              <li>Performance: To ensure the website operates efficiently</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Cookies We Use</h2>
            <p>
              <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off.
            </p>
            <p>
              <strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>
            <p>
              <strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Choices</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can delete existing cookies, allow or block all cookies, or block cookies from particular sites.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at privacy@takamuracomics.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
