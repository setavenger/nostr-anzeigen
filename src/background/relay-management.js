import {relayInit} from "nostr-tools";
import {relayURLS} from "../constants";

let relays = []


relayURLS.map((relayURL) => {
    const relay = relayInit(relayURL)
    relay.connect().then(() => {
    })

    relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
    })

    relays = [...relays, relay]
})


export function removeRelay(url) {

    const findById = urls => relays.find(function (relay) {
        return relay.url !== urls;
    });
    const relay = findById(url)
    relay.close() //todo close connection as well

    const index = relayURLS.indexOf(url);
    if (index > -1) { // only splice array when item is found
        relayURLS.splice(index, 1); // 2nd parameter means remove one item only
    }

    relays = relays.filter(function (obj) {
        return obj.url !== url;
    });


    return relays
}

export function newRelay(url) {
    const relay = relayInit(url)
    relay.connect().then(() => {
    })

    relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
    })

    relays = [...relays, relay]
    return relays
}

export default relays
