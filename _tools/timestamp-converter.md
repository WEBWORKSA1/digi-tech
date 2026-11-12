---
title: Unix Timestamp Converter
category: Developer
summary: Convert Unix timestamps to readable dates and back, in your local time zone and in UTC.
---
## How to use it

The left side turns a timestamp into a date. Paste a number in seconds or milliseconds and the tool works out which it is. The right side goes the other way: pick a date and time and read off the timestamp. The current Unix time ticks at the top if you need a value for right now.

## What Unix time is

Unix time counts the seconds since midnight UTC on 1 January 1970. Computers like it because a single number has no time zones, no daylight saving and no date formats to argue about. Two timestamps can be compared or subtracted directly. Many systems, including JavaScript, count in milliseconds instead, which gives a number a thousand times larger.

## Questions people ask

### How do I tell seconds from milliseconds?

Current timestamps in seconds have 10 digits. In milliseconds they have 13.

### What is the year 2038 problem?

Older systems store the count in a signed 32-bit number, which runs out on 19 January 2038. Modern systems use 64 bits and are not affected.

### Why is my converted time a few hours off?

Almost always a time zone mix-up. The timestamp itself is always UTC. Compare the UTC row with your local row to see the offset.
