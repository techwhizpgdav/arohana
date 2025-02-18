import React from 'react';

const InchargeCard = ({ data }) => {
    return (
        <div className="relative rounded-3xl overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform bg-white w-[280px]">
            <div className='p-16 bg-gradient-to-b from-haldi-red/70 to-haldi-red rounded-3xl'></div>
            <div className="mx-auto overflow-hidden -translate-y-16 rounded-full p-1 bg-white" style={{ width: '100px', height: '100px'}}>
                <img
                    src={data.photo}
                    alt={data.name}
                    className="object-cover hover:scale-105 transition-transform rounded-full border-4 border-haldi-red"
                    style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }}
                />
            </div>
            <div className='-mt-8 p-8 pt-0'>
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-center">{data.name}</h3>
                    <p className="font-medium">{data.position}</p>
                    <span className='w-full h-1 bg-haldi-red mt-2 rounded-full'></span>
                </div>
            </div>
        </div>
    );
}

export default InchargeCard;
