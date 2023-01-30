import {getPublicKey} from "nostr-tools";

export let sk = ""
export let pk = ""

export function setKeys(priv) {
    sk = priv
    pk = getPublicKey(sk)
    console.log(pk)
}