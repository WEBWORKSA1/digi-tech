---
title: Hash Generator
category: Security
summary: Calculate SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text, instantly and privately.
---
## How to use it

Type or paste text into the box. All four hashes are recalculated on every keystroke using your browser's built-in Web Crypto functions. Press **Copy** beside the one you need.

## What a hash is

A hash function turns input of any size into a fixed-length fingerprint. The same input always gives the same fingerprint, a one-character change gives a completely different one, and you cannot work backwards from the fingerprint to the input. That makes hashes useful for checking that a download arrived intact, for comparing files without reading them, and for signing software.

## Questions people ask

### Which algorithm should I use?

SHA-256 is the sensible default. SHA-1 is included because older systems still publish SHA-1 checksums, but it is no longer considered safe against deliberate tampering.

### Can I use this to store passwords?

Not on its own. Plain SHA hashes are designed to be fast, which is the opposite of what password storage needs. Systems should use a slow, salted algorithm built for the job, such as Argon2 or bcrypt.

### Why is there no MD5?

Browsers do not provide it, because MD5 has been broken for years. If a site only offers an MD5 checksum, it confirms a download was not corrupted but not that it is genuine.
