import React, {useState} from 'react';
import {Disclosure} from '@headlessui/react'

import {ChevronUpIcon, TrashIcon} from "@heroicons/react/24/outline";
import relays, {newRelay, removeRelay} from "../background/relay-management";


const RelayManagement = () => {
    const [relaysArr, setRelaysArr] = useState(relays)

    return (
        <div className={"mt-5 bg-gray-300 rounded-xl"}>
            <Disclosure>
                {({open}) => (
                    <div className="border rounded px-3 py-5">
                        <div>
                            <Disclosure.Button className="w-full flex flex-row justify-between items-center">
                                <div className="flex flex-row">
                                    <span>Relay Management</span>
                                </div>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-900`}
                                />
                            </Disclosure.Button>
                        </div>

                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 text-left">
                            <div className="grid xl:grid-cols-3 sm:grid-cols-2 mb-5 gap-y-2">
                                {relaysArr.map((relay) => (
                                    <Relay url={relay.url} setRelaysArr={setRelaysArr}/>
                                ))}
                            </div>
                            <AddNewRelay setRelaysArr={setRelaysArr}/>
                        </Disclosure.Panel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
};


const Relay = ({url, setRelaysArr}) => {

    function deleteRelay() {
        setRelaysArr(removeRelay(url))
    }

    return (
        <div>
            <div className={"flex flex-row"}>
                <TrashIcon onClick={deleteRelay} className={"h-6 cursor-pointer text-red-600 mr-2"}/>
                {url}
            </div>
        </div>
    );
};



const AddNewRelay = ({setRelaysArr}) => {
    const [url, setUrl] = useState('')

    function addRelay() {
        setRelaysArr(newRelay(url))
    }

    return (
        <div className={"flex flex-col"}>
            <div>
                New Relay
            </div>
            <div className={"flex flex-row gap-4"}>


                <input
                    className={"p-3 rounded w-96"}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={"wss://relay.example.com"}
                />
                <div onClick={addRelay} className={"p-3 cursor-pointer rounded-xl bg-green-600 text-black"}>
                    Add
                </div>
            </div>

        </div>
    );
};


export default RelayManagement;