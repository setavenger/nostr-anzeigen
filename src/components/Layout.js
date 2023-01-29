import React, {useEffect, useState} from 'react';
import {relayURL} from "../constants";
import Ad from "./Ad";

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
    }

    useEffect(() => {
        setAds([])
        const socket = new WebSocket(relayURL);

        socket.onopen = () => {
            // console.log(`WebSocket connection opened to ${relayURL}`);
            socket.send(JSON.stringify(["REQ", "anzeigen", {"#e": ["f6389df391619512d900f144189e028ee3ac12d846812d4c8f9da869a726d8b0"]}]));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.length === 2) {
                //    todo do something or just ignore
            } else {
                // todo add additional checks to guarantee that it's actual event data
                console.log("Value:", data)
                setAds(prevAds => [...prevAds, JSON.parse(data[2].content)]);
                console.log(ads)
            }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(socket)

    }, []);


    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <Content ads={ads}/>
        </div>
    );
}

export default Layout;
