---
title: URL Encoder and Decoder
category: Developer
summary: Percent-encode text for use in web addresses, decode it back, and split a URL into its parts.
---
## How to use it

Paste text or a full address. **Encode text** converts every reserved character, which is right for a single value such as a search phrase. **Encode whole URL** leaves the structural characters alone so the address still works. **Decode** turns percent codes back into readable text. If the input is a complete URL, a table underneath lists its protocol, host, path and each parameter.

## Why encoding exists

Web addresses may only contain a limited set of characters, and some of those have jobs: a question mark starts the parameters, an ampersand separates them, a hash starts a fragment. To include one of those characters as ordinary data, or to include spaces and non-English letters, it is replaced by a percent sign and its code. A space becomes `%20`.

## Questions people ask

### Why does my link break when it contains an ampersand?

Because the browser reads it as the start of a new parameter. Encode the value on its own before adding it to the address.

### What is the difference between %20 and a plus sign?

Both can mean a space. The plus sign is an older convention used only inside form data. `%20` is safe everywhere.

Building campaign links? The [UTM link builder](../utm-builder/) encodes them for you.
