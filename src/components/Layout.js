import React, {useEffect, useState} from 'react';
import {eventTag} from "../constants";
import Ad from "./Ad";
import relay from "../background/relay-management";
import NewAdForm from "./NewAdForm";
import Account from "./Account";


const Sidebar = () => (
    <aside className="w-64 bg-gray-900 text-white py-10 px-6">
        <nav>
            <ul>
                <li className="mb-6">
                    <a href="#" className="text-white font-medium hover:text-gray-400">Home</a>
                </li>
                <li className="mb-6">
                    <a href="#" className="text-white font-medium hover:text-gray-400">About</a>
                </li>
                <li className="mb-6">
                    <a href="#" className="text-white font-medium hover:text-gray-400">Contact</a>
                </li>
            </ul>
        </nav>
    </aside>
);

const Content = ({ads}) => (
    <main className="flex-1 bg-gray-200 py-10 px-6 min-h-screen">
        <h1 className="text-3xl font-medium mb-6">Welcome to Sats Kleinanzeigen</h1>

        <Account/>
        <NewAdForm/>

        <div className={"grid grid-cols-2 gap-5 mt-10"}>
            {(ads.length > 0) && ads.map((item, index) => (
                (item.hasOwnProperty('title')) ?
                    <div key={item.id + "-div" + index} className={"mb-5"}>
                        <Ad key={item.id + "-" + index} item={item}/>
                    </div> : null
            ))}
        </div>
    </main>
);

const Layout = () => {

    const [ads, setAds] = useState([])


    function checkId(array, ad) {
        return array.find(item => item.id === ad.id)
    }


    function parseAdContent(event) {
        return JSON.parse(event.content)
    }


    useEffect(() => {
        setAds([])

        // let's query for an event that exists
        let sub = relay.sub([
            {
                "#e": [eventTag]
            }
        ])
        sub.on('event', event => {
            // console.log(JSON.stringify(event))
            // console.log(parseAdContent(event))

            const ad = parseAdContent(event)
            ad.id = event.id
            // console.log("Ad with id:", ad)
            if (checkId(ads, ad) === undefined) {
                setAds(prevAds => [...prevAds, ad])
            }
        })
        sub.on('eose', () => {
            sub.unsub()
        })


    }, []);


    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <Content ads={ads}/>
        </div>
    );
}

export default Layout;
