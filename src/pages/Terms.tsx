
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-orange-500">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg">Last Updated: June 1, 2023</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Takamura Comics, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Content</h2>
            <p>
              You retain ownership of the content you upload to Takamura Comics. By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display your content for the purpose of operating and improving our services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Prohibited Conduct</h2>
            <p>
              You agree not to engage in any conduct that violates these terms, including but not limited to uploading illegal or infringing content, harassing other users, or attempting to gain unauthorized access to our systems.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. If we make material changes, we will notify you through our website or by email. Your continued use of our services after such notification constitutes your acceptance of the updated terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about these terms, please contact us at terms@takamuracomics.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
