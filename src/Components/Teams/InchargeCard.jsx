import React from 'react';

const InchargeCard = ({ data }) => {
    return (
        <div className="relative rounded-lg p-5 hover:shadow-xl transform hover:scale-105 transition-transform backdrop-filter backdrop-blur-md bg-opacity-30">
            <div className="mx-auto overflow-hidden rounded-full w-32 h-32">
                <img
                    // src={data.photo}
                    src="https://www.pgdavcollege.in/assets/front/images/principaldesk.jpg"
                    alt={data.name}
                    className="object-cover rounded-full"
                />
            </div>
            <div className="flex flex-col items-center mt-4">
                <h3 className="text-2xl font-semibold text-white text-center">{data.name}</h3>
                <p className="text-lg font-medium text-orange-200">{data.position}</p>
            </div>
        </div>
    );
}

export default InchargeCard;
