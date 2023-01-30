# NOSTR Anzeigen

### Introduction

This project is supposed to be a decentralized extension of the Project "Sats Kleinanzeigen".
Sats Kleinanzeigen is a project created by German plebs that mimics Ebay Classifieds (DE: Ebay Kleinanzeigen). 
As the name Sats already implies payments are made in Satoshis (the smallest unit of Bitcoin).
<br>

Nostr Anzeigen is the whole thing now thought further.
A decentralized solution to a telegram channel where people can post ads and find buyers for their old stuff.
Everyone can host their own nostr relay and host their own ads to make them available to the public.
You just have to follow the standard described below and your ads will be found if someone is connected to your relay.

### Communication Standard

Nostr Anzeigen uses a simple JSON object for each ad. An example would be:

```json
{
  "title": "Selling something",
  "description": "Expand on your product here. Tell people stuff they should know about it.",
  "author": "might be removed as the pubkey of the nostr event should be used",
  "images": [
    "https://photos.example.com/123456789",
    "https://photos.example.com/987654321"
  ],
  "price": "10.88",
  "currency": "US Dollar",
  "location_city": "Berlin, Germany",
  "category": "shoes" // to be added
}
```

The plan is to introduce standard categories so filtering becomes easier.

This ad JSON object is then stringified and becomes the content of a nostr event. 
In the tag we add `f6389df391619512d900f144189e028ee3ac12d846812d4c8f9da869a726d8b0` to identify an ad. 
The value is the hashed value of "Sats Kleinanzeigen".

```json
{
  "id": "a6fc877fe00c9d70e2994af24b114a10ccba126a91d2c9db9b07ff1a230125d9",
  "pubkey": "d7e183bbf7d61d60bdb159ac925f5dcf7d1d489b063717622ea4a02aa36ef9ba",
  "created_at": 1675006997,
  "kind": 777, // todo change to more resonable kind
  "tags": [
    [
      "e",
      "f6389df391619512d900f144189e028ee3ac12d846812d4c8f9da869a726d8b0"
    ]
  ],
  "content": "{\"title\":\"[Test] Great shoes for sale\",\"description\":\"Giving them away for a great price. Price is negotiable. We could meet up in New York to hand over the shoes.\",\"author\":\"\",\"images\":[\"https://images.unsplash.com/photo-1549298916-b41d501d3772\"],\"price\":53,\"currency\":\"dollar\",\"location_city\":\"New York, NY, US\"}",
  "sig": "6791d1557ece411d7a008b9473d87c134a3ee303bcba6addcdf9dade76a02ae1e348e21c0f7e1cb0c660944c652d30c9df55bb24cf9ad4b9a3cabdd109ab0413"
}
```

### Image hosting
(TBD)

### Categories
(TBD)
