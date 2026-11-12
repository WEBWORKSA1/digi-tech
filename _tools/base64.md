---
title: Base64 Encoder and Decoder
category: Developer
summary: Encode text to Base64 or decode it back, with full Unicode support and a URL-safe option.
---
## How to use it

Paste text and press **Encode to Base64**, or paste Base64 and press **Decode from Base64**. Tick the URL-safe box if the result is going into a web address or a file name.

## What Base64 is for

Base64 rewrites any data using only 64 safe characters: letters, digits, plus and slash. It exists because many older systems, including email, were built to carry plain text and can damage raw binary data. Encoding makes the data about one third larger, which is the price of that safety.

You will meet it in email attachments, in small images embedded directly in web pages, and in the tokens that keep you signed in to websites.

## Questions people ask

### Is Base64 encryption?

No. Anyone can decode it in a moment, as this page shows. Never use it to hide passwords or personal data.

### Why does my result end with equals signs?

They are padding that rounds the length up to a multiple of four characters. The URL-safe option removes them.

### Does it handle emoji and accented letters?

Yes. Text is converted to UTF-8 first, so every character survives the round trip.
