import React, { useState } from 'react';
import { AceternityCard, FloatingPattern } from '../components/AceternityCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically send data to backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message
    setShowSuccessPopup(true);
    // Hide popup after 5 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);
  };

  // Success Popup Component
  const SuccessPopup = () => {
    if (!showSuccessPopup) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 px-2 sm:px-0">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowSuccessPopup(false)}></div>
        <div className="relative bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md mx-auto transform transition-all animate-fadeIn">
          <div className="bg-green-100 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-2">Thank You!</h3>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Your message has been sent successfully. Our team will get back to you soon.
          </p>
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium rounded-lg hover:from-violet-600 hover:to-blue-600 transition-all duration-300 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white py-16 lg:py-16 overflow-x-hidden">
      <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-grey-800 sm:text-5xl lg:text-6xl font-pj">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-500 max-w-2xl mx-auto">
            Have questions or feedback about Genimeds? We're here to help! Reach out to our team using any of the methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form Card */}
          <AceternityCard
            cardType="gradient"
            containerClassName="col-span-1 lg:col-span-2 min-h-[500px]"
            className="p-8"
          >
            <div className="w-full">
              <h2 className="text-left text-xl md:text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Please provide details about your inquiry..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium rounded-lg hover:from-violet-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </AceternityCard>

          {/* Contact Info Card */}
          <div className="space-y-6">
            <AceternityCard
              cardType="border"
              containerClassName="col-span-1 min-h-[200px]"
              className="p-6"
            >
              <div>
                <h2 className="text-left text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <p className="flex items-start text-gray-700">
                    <svg className="w-6 h-6 mr-3 mt-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1.5C8.31 1.5 5.25 4.19 5.25 7.5C5.25 11.84 12 22.5 12 22.5C12 22.5 18.75 11.84 18.75 7.5C18.75 4.19 15.69 1.5 12 1.5ZM12 10.5C10.34 10.5 9 9.16 9 7.5C9 5.84 10.34 4.5 12 4.5C13.66 4.5 15 5.84 15 7.5C15 9.16 13.66 10.5 12 10.5Z" />
                    </svg>
                    <span>
                      123 Medical Plaza<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" />
                    </svg>
                    <span>support@genimeds.com</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.1 14.8 15.7 14.9 15.5 15.1L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.9 8.5C9.1 8.3 9.2 7.9 9.1 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM19 12H21C21 7 17 3 12 3V5C15.9 5 19 8.1 19 12ZM15 12H17C17 9.2 14.8 7 12 7V9C13.7 9 15 10.3 15 12Z" />
                    </svg>
                    <span>+91 80 4567 8901</span>
                  </p>
                </div>
              </div>
            </AceternityCard>

            <AceternityCard
              cardType="border"
              containerClassName="col-span-1 min-h-[150px]"
              className="p-6"
            >
              <div>
                <h2 className="text-left text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
                  Office Hours
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </AceternityCard>

            <AceternityCard
              cardType="border"
              containerClassName="col-span-1 min-h-[120px]"
              className="p-6"
            >
              <div>
                <h2 className="text-left text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
                  Connect With Us
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10 2.38 10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-pink-600 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.61 4 4 5.61 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C18.39 20 20 18.39 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75C18.5 7.44 17.94 8 17.25 8C16.56 8 16 7.44 16 6.75C16 6.06 16.56 5.5 17.25 5.5ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H6.5V10H9V17ZM7.75 8.75C6.8 8.75 6 7.95 6 7C6 6.05 6.8 5.25 7.75 5.25C8.7 5.25 9.5 6.05 9.5 7C9.5 7.95 8.7 8.75 7.75 8.75ZM18 17H15.5V13.25C15.5 12.45 14.85 11.8 14.05 11.8C13.25 11.8 12.6 12.45 12.6 13.25V17H10.1V10H12.6V11.13C13.05 10.45 14 10 15.1 10C16.7 10 18 11.3 18 12.9V17Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </AceternityCard>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <FloatingPattern>
            <AceternityCard
              cardType="glass"
              containerClassName="col-span-1 min-h-[300px]"
              className="p-8"
            >
            <div className="w-full">
              <h2 className="text-left text-xl md:text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-medium text-gray-800">How do I upload a prescription?</h3>
                    <p className="text-gray-600 mt-2">
                      You can upload a prescription by navigating to the "Prescription Upload" section, then clicking the upload button to select your image or PDF file.
                    </p>
                  </div>
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-medium text-gray-800">Is my medical data secure?</h3>
                    <p className="text-gray-600 mt-2">
                      Yes, we use industry-standard encryption and security practices to protect all your medical data. Your privacy is our top priority.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-medium text-gray-800">How accurate is the AI analysis?</h3>
                    <p className="text-gray-600 mt-2">
                      Our AI system is trained on millions of medical documents and is constantly improving. However, always consult with a healthcare professional for medical advice.
                    </p>
                  </div>
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-medium text-gray-800">How can I delete my account?</h3>
                    <p className="text-gray-600 mt-2">
                      You can request account deletion from your profile settings. If you need assistance, please contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </AceternityCard>
          </FloatingPattern>
        </div>
      </div>
      {/* Success Popup */}
      <SuccessPopup />
    </section>
  );
};

// Add fade-in animation
const fadeInAnimation = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
`;

// Append the animation styles to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = fadeInAnimation;
  document.head.appendChild(style);
}

export default Contact;
