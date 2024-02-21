import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './timeline.css';

const TimelineBody = ({ eventsData }) => {
    const navigate = useNavigate();

    const handleButtonClick = (eventId) => {
        navigate(`/competition/${eventId}`);
    };

    return (
        <>
            <div className="text-white mt-2 font-semibold text-lg rounded-md">
                {eventsData[0].day}
            </div>
            <VerticalTimeline>
                {eventsData.map((event, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work shadow-md"
                        contentStyle={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                            padding: '15px',
                            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                        }}
                        contentArrowStyle={{ borderRight: '7px solid  rgba(255, 255, 255, 0.2)' }}
                        iconStyle={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                        }}
                    // date={<span className="text-white">{event.date}</span>} // Render date at the top
                    >
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-bold text-white mb-2 text-center">{event.title}</h3>
                            <p className="text-sm text-white mb-4">Venue: {event.venue}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <p className="text-sm text-white mb-2">Organizer: {event.name}</p>
                            <p className="text-sm text-white mb-4">Timings: {event.start_at} - {event.ends_at}</p>
                            <button
                                className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-500 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                onClick={() => handleButtonClick(event.id)}
                            >
                                <span className="sr-only">Go to Competition</span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </>
    );
};

export default TimelineBody;
