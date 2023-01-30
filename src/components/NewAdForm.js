import React, {useState} from 'react';
import {publishNewAd} from "../background/publish";
import {sk} from "../background/account";

const NewAdForm = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [images, setImages] = useState([])
    const [price, setPrice] = useState('')
    const [currency, setCurrency] = useState('')
    const [locationCity, setLocationCity] = useState('')

    function submitAd() {
        publishNewAd({
            title: title,
            description: description,
            author: author,
            images: images,
            price: price,
            currency: currency,
            locationCity: locationCity
        })
    }

    return (
        <div className={"mt-5"}>
            <h2 className={"mb-3 text-2xl"}>New Ad</h2>
            <div className={`grid grid-cols-2 gap-3 `}>
                <input
                    className={"p-3"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={"title"}
                />
                <textarea
                    className="flex-1 p-3 rounded-lg overflow-y-scroll"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder={"description"}
                />
                <input
                    className={"p-3"}
                    value={images}
                    onChange={(e) => setImages([e.target.value])}
                    placeholder={"image url: https://example.com/image.png"}
                />
                <input
                    className={"p-3"}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={"price"}
                />
                <input
                    className={"p-3"}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder={"price currency unit"}

                />
                <input
                    className={"p-3"}
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    placeholder={"location/city"}
                />
                <div className={""}>
                    <div className={"cursor-pointer rounded bg-blue-500 p-3 w-fit hover:bg-blue-700"} onClick={submitAd}>
                        Submit
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NewAdForm;

