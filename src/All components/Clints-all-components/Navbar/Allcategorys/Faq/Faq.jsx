import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  { question: "What is AL-IT Shop?", answer: "AL-IT Shop is your online store for electronics, gadgets, and accessories, offering top products and fast delivery." },
  { question: "How can I place an order?", answer: "Browse your favorite products, add them to your cart, and proceed to checkout with your preferred payment method." },
  { question: "What are the payment options?", answer: "We accept credit/debit cards, mobile banking, and cash on delivery for eligible areas." },
  { question: "How can I track my order?", answer: "Go to the 'Track Order' page or your dashboard to see real-time updates on your purchases." },
  { question: "What is the return policy?", answer: "Products can be returned within 7 days in original packaging if unused. Contact support for assistance." },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFaq = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="mt-14 md:mt-20 w-11/12 md:w-10/12 mx-auto my-16 relative">
      <h2 className="text-5xl font-extrabold text-center text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-5">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            layout
            className="rounded-2xl shadow-lg bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
          >
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none transition-colors duration-300 ${
                activeIndex === index ? "bg-indigo-50" : "hover:bg-indigo-100"
              }`}
            >
              <span className="text-gray-800 font-semibold text-lg md:text-xl">{item.question}</span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-indigo-500 text-lg" />
              </motion.span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-5 text-gray-700 text-base md:text-lg bg-white"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
