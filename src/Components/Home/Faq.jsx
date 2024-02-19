import { Disclosure } from '@headlessui/react';
import { useState } from 'react';

export default function FaqSection({ color }) {
  const [openIndex, setOpenIndex] = useState(null);

  const QuestionAndAnswer = [
    {
      "What is Arohana": 'Arohana is the grand annual cultural festival of P. G. D. A. V. College organised by Hyperion - the cultural society of P. G. D. A. V. College.',
      "When is Arohana": "Arohana is a three day event which is usually held in the month of February, and this year it is scheduled to be held from 27th to 29th February.",
      "How to participate in Arohana": "To participate in Arohana, you can register for the events through the official website of Arohana. Just go to the events section and click on the event you want to participate in. Fill in the required details and you are good to go.",
      "What are the events in Arohana": "Arohana has a variety of events ranging from dance, music, drama, fashion, fine arts, literary and many more. You can check out the events section on the official website for more details.",
      "Does Arohana have any celebrity performances": "Yes, We have had Raftaar, Milind Gaaba, Beat Crush, The Local Train as our previous years' artists.",
    }
  ];

  const styling = !color ? "border-haldi-orange" : "border-white";
  const questionColor = !color ? "text-gray-600" : "text-white";

  return (
    <div className="max-w-xl mx-auto p-4 block">
      <h1 className={`text-3xl font-bold text-center mb-4 ${!color ? "text-black" : "text-white"}`}>Frequently Asked Questions</h1>
      <div className={`rounded-lg border-2 p-4 ${styling} ${color ? " bg-shade-haldi" : ""}`}>
        {Object.keys(QuestionAndAnswer[0]).map((question, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className={`flex justify-between w-full px-4 py-2 text-lg font-semibold text-left rounded-lg focus:outline-none ${questionColor} ${!color? 'hover:bg-haldi-orange hover:text-white':'hover:bg-white hover:text-black'} transition-all duration-200 `}>
                  <span>{question}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className={`px-4 pt-4 pb-2 text-sm font-normal text-left ${color? 'text-white':''}`}>
                  {QuestionAndAnswer[0][question]}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
