import React, {useEffect, useState} from 'react';
import {eventTag} from "../constants";
import Ad from "./Ad";
import relays from "../background/relay-management";
import NewAdForm from "./NewAdForm";
import Account from "./Account";
import Sidebar from "./Sidebar";
import RelayManagement from "./RelayManagement";


let ids = []

const Content = ({ads}) => (
    <main className="flex-1 bg-gray-200 py-10 px-6 min-h-screen">
        <h1 className="text-3xl font-medium mb-6">Welcome to Nostr Anzeigen</h1>

        <Account/>
        <RelayManagement/>
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
        return array.find(function (item) {
            return item.id !== ad.id
        })
    }

    const findById = id => ads.find(function (ad) {
        console.log(ad.id, "===", id)
        return ad.id === id;
    });


    function parseAdContent(event) {
        return JSON.parse(event.content)
    }


    useEffect(() => {
        setAds([])
        ids = []

        relays.map((relay) => {
            // let's query for an event that exists
            let sub = relay.sub([
                {
                    "#e": [eventTag]
                }
            ])
            sub.on('event', event => {
                // console.log(`Event from ${relay.url}` + event)
                // console.log(parseAdContent(event))

                // console.log(ids)
                // console.log(event.id)

                const ad = parseAdContent(event)

                const isInArray = ids.includes(event.id);

                // console.log("Ad with id:", ad)
                if (!isInArray) {
                    setAds(prevAds => [...prevAds, ad])
                    ids = [...ids, event.id]
                }
            })
            sub.on('eose', () => {
                sub.unsub()
            })
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
