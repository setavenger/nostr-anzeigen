import {getEventHash, signEvent} from "nostr-tools";
import relays from "./relay-management";
import {pk, sk} from "./account";
import relayManagement from "./relay-management";
import relay from "./relay-management";

export function publishNewAd(item) {

    let ad = {
        title: item.title,
        description: item.description,
        author: item.author,
        images: item.images,
        price: item.price,
        currency: item.currency,
        location_city: item.location_city
    }

    let event = {
        kind: 777,
        pubkey: pk,
        created_at: Math.floor(Date.now() / 1000),
        tags: [["e", "f6389df391619512d900f144189e028ee3ac12d846812d4c8f9da869a726d8b0"]],
        content: JSON.stringify(ad)
    }
    event.id = getEventHash(event)
    event.sig = signEvent(event, sk)
    relays.map((relay) => {
        relay.publish(event)
        console.log(`published an event to ${relay.url}`)
    })
}

