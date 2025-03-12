
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-orange-500">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg">Last Updated: June 1, 2023</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>
              Takamura Comics ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and share information about you when you use our website and services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, upload content, make purchases, or communicate with us. This may include your name, email address, username, password, profile information, and payment details.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and comply with legal obligations.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
            <p>
              We may share your information with service providers who perform services on our behalf, such as payment processing and data analytics, or as required by law.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Choices</h2>
            <p>
              You can access, update, or delete your account information at any time by logging into your account settings. You may also opt out of receiving promotional communications from us.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at privacy@takamuracomics.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
