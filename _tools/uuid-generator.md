---
title: UUID Generator
category: Security
summary: Generate up to 100 random version 4 UUIDs at once, with or without hyphens, ready to paste.
---
## How to use it

Choose how many identifiers you need, pick uppercase or hyphen-free output if your system wants it, and copy the list.

## What a UUID is

A UUID, also called a GUID, is a 128-bit identifier written as 32 hexadecimal digits. Version 4 UUIDs are made almost entirely from random numbers, so any device can create one without asking a central server, and the chance of two ever matching is too small to matter in practice. Databases, file systems and APIs use them as record keys for exactly that reason.

This tool uses your browser's cryptographic random source, so the values are suitable for real projects and are never repeated from a list.

## Questions people ask

### Can two UUIDs collide?

In theory. In practice you would need to generate billions every second for decades before a duplicate became likely.

### Are UUIDs secret?

No. They are unique, not confidential. Do not use a UUID in place of a password or an access token unless the system was designed that way.

### What is the difference between a UUID and a GUID?

Nothing meaningful. GUID is the name Microsoft uses for the same format.
