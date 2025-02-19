"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Timeline = ({ eventsData }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Sort event dates in ascending order
  const sortedDates = Object.keys(eventsData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Bright colors for underline effect
  const brightColors = [
    "red-500",
    "yellow-500",
    "green-500",
    "blue-500",
    "purple-500",
    "pink-500",
    "indigo-500",
    "orange-500", // New bright color (orange)
    "cyan-500", // New bright color (cyan)
    "lime-500", // New bright color (lime green)
    "teal-500", // New bright color (teal)
    "emerald-500", // New bright color (emerald green)
    "rose-500", // New bright color (rose pink)
    "violet-500", // New bright color (violet)
  ];

  const colorMap = {
    "red-500": "#f56565",
    "yellow-500": "#ecc94b",
    "green-500": "#48bb78",
    "blue-500": "#4299e1",
    "purple-500": "#9f7aea",
    "pink-500": "#ed64a6",
    "indigo-500": "#667eea",
    "orange-500": "#ed8936", // Hex for bright orange
    "cyan-500": "#00b5d8", // Hex for bright cyan
    "lime-500": "#84cc16", // Hex for bright lime green
    "teal-500": "#38b2ac", // Hex for bright teal
    "emerald-500": "#34d399", // Hex for bright emerald green
    "rose-500": "#f56565", // Hex for rose pink
    "violet-500": "#9f7aea", // Hex for violet
  };

  return (
    <div className="w-full bg-white font-sans md:px-10" ref={containerRef}>
      {/* Heading */}
      <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black max-w-4xl">
          Arohana Timeline ⌚
        </h2>
        <p className="text-neutral-700 text-sm md:text-base max-w-sm">
          Here’s a timeline of scheduled events in the fest
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {sortedDates.map((date, index) => (
          <div key={date} className="flex flex-col pt-10 md:pt-20">
            {/* Date Header */}
            <h3 className="text-2xl mb-8 md:text-3xl  font-bold pl-24 text-gray-700 dark:text-gray-400">
              {new Date(date).toDateString()}
            </h3>

            {/* Circle Indicator */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full -mt-9">
              <div className="h-10 absolute left-4 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
            </div>

            {eventsData[date].map((event) => {
              // Randomly select color for underline
              const randomColor =
                brightColors[Math.floor(Math.random() * brightColors.length)];

              return (
                <div
                  key={event.id}
                  className="flex justify-start py-4 md:gap-10"
                >
                  {/* Circle Indicator */}
                  <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                    {/* <div className="h-10 absolute left-4 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                    </div> */}
                  </div>
                  {/* Event Details */}
                  <div className="relative pl-20 pr-4 md:pl-4 w-full">
                    <h3 className="text-2xl mb-2 text-left font-bold text-neutral-800">
                      <Link
                        to={`/competition/${event.id}`}
                        className="cursor-pointer hover:text-neutral-800/80"
                      >
                        <span
                          className={`uppercase hover:text-neutral-800/80 underline decoration-4`}
                          style={{ textDecorationColor: colorMap[randomColor] }}
                        >
                          {event.title}
                        </span>
                      </Link>{" "}
                      <span className={`uppercase text-xl text-neutral-700 `}>
                        {event.name}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {event.event_start} - {event.event_end} <br />
                      📍 {event.venue}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Ray Tracing Beams */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 overflow-hidden w-[8px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[8px] bg-gradient-to-t from-fuchsia-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
