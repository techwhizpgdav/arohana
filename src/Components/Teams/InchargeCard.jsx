import React from 'react';
import PrincipalImp from '../../assets/Image/principal.jpg';

const InchargeCard = ({ data }) => {
    return (
        <div className="relative rounded-lg p-5 hover:shadow-xl transform hover:scale-105 transition-transform backdrop-filter backdrop-blur-md bg-opacity-30">
            <div className="mx-auto overflow-hidden rounded-full" style={{ width: '150px', height: '150px', filter: 'drop-shadow(0 0 15px rgba(0, 0, 255, 0.5))', clipPath: 'circle(50%)' }}>
                <img
                    src={data.position == "Principal" ? PrincipalImp : data.photo}
                    alt={data.name}
                    className="object-cover hover:scale-105 transition-transform rounded-full"
                    style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }}
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
