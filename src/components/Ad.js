import React from 'react';

const Ad = ({item}) => {
    const {title, description, author, images, price, currency, location_city} = item;

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2">{description}</p>
            <p className="mt-2 font-bold">Author: {author}</p>
            <div className="mt-2 flex flex-wrap">
                {(images) && images.map((image, index) => (
                    <img key={index} src={image} className="h-32 mr-2 mb-2"/>
                ))}
            </div>
            <p className="mt-2 font-bold">
                Price: {price} {currency}
            </p>
            <p className="mt-2 font-bold">Location: {location_city}</p>
        </div>
    );
};

export default Ad;