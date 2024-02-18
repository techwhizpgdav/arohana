import React, { useState } from 'react';
import './Team.css';
import Pentagon from '../../assets/pentagon.png';
import Photo from '../../assets/Image/bg-1.jpg';


const teamMembers  =
[
     {
         name: 'Nishant Kumar Singh',
         photo: 'path/to/john_photo.png',
         description: 'John is a software developer with 5 years of experience.',
         socialMedia: {
             facebook: 'https://www.facebook.com/john.doe',
             twitter: 'https://twitter.com/john_doe',
             linkedin: 'https://www.linkedin.com/in/john-doe/'
         }
     },
     {
         name: 'Jane Smith',
         photo: 'path/to/jane_photo.png',
         description: 'Jane is a project manager with 7 years of experience.',
         socialMedia: {
             facebook: 'https://www.facebook.com/jane.smith',
             twitter: 'https://twitter.com/jane_smith',
             linkedin: 'https://www.linkedin.com/in/jane-smith/'
         }
     },
     {
          name: 'Jane Smith',
          photo: 'path/to/jane_photo.png',
          description: 'Jane is a project manager with 7 years of experience.',
          socialMedia: {
              facebook: 'https://www.facebook.com/jane.smith',
              twitter: 'https://twitter.com/jane_smith',
              linkedin: 'https://www.linkedin.com/in/jane-smith/'
          }
      },
      {
          name: 'Jane Smith',
          photo: 'path/to/jane_photo.png',
          description: 'Jane is a project manager with 7 years of experience.',
          socialMedia: {
              facebook: 'https://www.facebook.com/jane.smith',
              twitter: 'https://twitter.com/jane_smith',
              linkedin: 'https://www.linkedin.com/in/jane-smith/'
          }
      },
     {
           name: 'Jane Smith',
               photo: 'path/to/jane_photo.png',
               description: 'Jane is a project manager with 7 years of experience.',
               socialMedia: {
                       facebook: 'https://www.facebook.com/jane.smith',
                           twitter: 'https://twitter.com/jane_smith',
                               linkedin: 'https://www.linkedin.com/in/jane-smith/'
                                   }
     },
     {

           name: 'Jane Smith',
               photo: 'path/to/jane_photo.png',
               description: 'Jane is a project manager with 7 years of experience.',
               socialMedia: {
                           facebook: 'https://www.facebook.com/jane.smith',
                                   twitter: 'https://twitter.com/jane_smith',
                                           linkedin: 'https://www.linkedin.com/in/jane-smith/' 
               }
     },



 ];



const TeamCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
    };

    return (
     <>
        <div className="main  ">
            {teamMembers.map((member, index) => (
                <div
                    className="team-card"
                    key={index}
                    style={{
                        opacity: index === currentIndex ? 1 : 0.8,
                    }}
                >
                    <img
                        src={Photo}
                        alt={member.name}
                        className="teamPhoto"
                        width={300}
                        style={{
                            mask: `url(${Pentagon}) no-repeat center / contain`,
                            transform: index === currentIndex ? 'scale(1)' : 'scale(0.5)',
                            transition: 'all 0.5s ease',
                        }}
                    />
                    <h2 style={{ opacity: index === currentIndex ? 1 : 0 }}>{member.name}</h2>
                    <p style={{ opacity: index === currentIndex ? 1 : 0 }}>{member.description}</p>
                </div>
            ))}
        </div>
        <div className="flex w-screen items-center justify-center gap-20 h-40">
            <button onClick={prevCard}>Previous</button>
            <button onClick={nextCard}>Next</button>
        </div>
     </>
    );
};

export default TeamCard;
