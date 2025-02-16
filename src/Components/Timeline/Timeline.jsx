import React, { useState, useEffect } from 'react';
import Api from '../../Functions/api';
import 'aos/dist/aos.css';
import DayTabs from './DayTabs';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';
import TimelineBody from './TimelineBody';
import './timeline.css';

const Timeline = () => {
  const { fetchApi, isLoading } = Api();
  const [eventsData, setEventsData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi('GET', 'api/timeline', 'timeline');
        if (response?.status == 200) {
          console.log(response?.data);
          setEventsData(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Spinner2 />
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col justify-center items-center timeline-wrapper"
    >
      <div className="text-center">
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mt-4 mb-8 text-white underline font-serif" data-aos="fade-up">Timeline</h1>
      </div>
      <div className='min-h-screen w-full'>
        <div className='w-full m-auto flex items-center justify-center'>
          <DayTabs eventsData={eventsData} activeTab={activeTab} onTabClick={handleTabClick} />
        </div>
        <div className='min-w-full m-auto flex flex-col items-center justify-center'>
          <TimelineBody eventsData={Object.values(eventsData)[activeTab]} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;