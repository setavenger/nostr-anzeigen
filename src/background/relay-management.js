import {relayInit} from "nostr-tools";
import {relayURL} from "../constants";


const relay = relayInit(relayURL)
relay.connect().then(() => {})

relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
})
relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
})

export default relay

