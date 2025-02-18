import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openedIndexes, setOpenedIndexes] = useState(new Set());

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    setOpenedIndexes((prevIndexes) => {
      const newIndexes = new Set(prevIndexes);
      if (prevIndexes.has(index)) {
        newIndexes.delete(index);
      } else {
        newIndexes.add(index);
      }
      return newIndexes;
    });
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
              Frequently<br />asked questions
            </h2>
            <p className="mt-1 hidden md:block text-gray-600">
              Answers to the most frequently asked questions.
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="divide-y divide-gray-200">
            {faqContent.map((faq, index) => (
              <div
                key={index}
                className={`pt-6 pb-3 text-black`}
              >
                <button
                  className={`group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start 
                    text-black rounded-lg transition hover:text-gray-500 focus:outline-none`}
                  aria-expanded={activeIndex === index}
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <svg
                    className={`${
                      activeIndex === index ? "hidden" : "block"
                    } shrink-0 size-5 text-gray-600 group-hover:text-gray-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className={`${
                      activeIndex === index ? "block" : "hidden"
                    } shrink-0 size-5 text-gray-600 group-hover:text-gray-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  className={`w-full overflow-hidden transition-[height] duration-300 ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const faqContent = [
  {
    question: "What’s the buzz about Arohana?",
    answer: "Arohana is the ultimate cultural fiesta of P.G.D.A.V. College, powered by Hyperion – the college’s cultural powerhouse. Think insane performances, mind-blowing art, and three days of non-stop energy!"
  },
  {
    question: "When is Arohana lighting up the stage?",
    answer: "Block your dates! Arohana is a three-day spectacle held every February. This year, we’re bringing the madness from 27th to 29th February – don’t miss out!"
  },
  {
    question: "How do I get in on the action at Arohana?",
    answer: "Easy-peasy! Hop onto Arohana’s official website, navigate to the events section, choose your battlefield (ahem, event), register, and boom – you’re in!"
  },
  {
    question: "What jaw-dropping events can we expect?",
    answer: "From electrifying dance battles and soul-stirring music to gripping drama, high-fashion runways, fine arts, literary showdowns, and so much more – Arohana is where legends are made!"
  },
  {
    question: "Any star-studded performances to look forward to?",
    answer: "Absolutely! We’ve hosted icons like Raftaar, Milind Gaaba, Beat Crush, and The Local Train in the past. Who’s next? Stay tuned for the big reveal!"
  }
];

export default FAQSection;