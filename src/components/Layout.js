import React, {useEffect, useState} from 'react';
import {eventTag, relayURL} from "../constants";
import Ad from "./Ad";
import {relayInit} from 'nostr-tools'

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
        <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus auctor sapien at ex molestie, a blandit ligula pellentesque.
        </p>

        <div className={"grid grid-cols-2 gap-5"}>
            {(ads.length > 0) && ads.map(item => (
                (item["Title"] !== "") ? <div className={"mb-5"}><Ad item={item}/></div> : null
            ))}
        </div>
    </main>
);

const Layout = () => {

    const [ads, setAds] = useState([])
    const [socket, setSocket] = useState(null);

    function parseAdContent(event) {
        return JSON.parse(event.content)
    }

    useEffect(() => {
        setAds([])

        const relay = relayInit(relayURL)
        relay.connect().then(() => {})

        relay.on('connect', () => {
            console.log(`connected to ${relay.url}`)
        })
        relay.on('error', () => {
            console.log(`failed to connect to ${relay.url}`)
        })

        // let's query for an event that exists
        let sub = relay.sub([
            {
                "#e": [eventTag]
            }
        ])
        sub.on('event', event => {
            // console.log('we got the event we wanted:', event)
            console.log(parseAdContent(event))
            setAds(prevAds =>[...prevAds, parseAdContent(event)])
        })
        sub.on('eose', () => {
            sub.unsub()
        })
        setSocket(relay)

    }, []);


    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <Content ads={ads}/>
        </div>
    );
}

export default Layout;
