---
title: IPv4 Subnet Calculator
category: Network
summary: Enter an IPv4 address in CIDR form to get its network, broadcast address, mask and usable host range.
---
## How to use it

Type an address followed by a slash and a prefix length, for example `192.168.1.10/24`. The table shows the network the address belongs to, its mask, the first and last addresses you can give to devices, and how many devices fit.

## Reading CIDR notation

An IPv4 address is 32 bits, written as four numbers from 0 to 255. The number after the slash says how many of those bits name the network. The rest number the devices inside it. A `/24` leaves 8 bits for devices, which is 256 addresses. Two are reserved, one for the network itself and one for broadcast, leaving 254 for devices.

Each step down in the prefix doubles the size: a `/23` holds 510 devices, a `/22` holds 1,022.

## Questions people ask

### What is a subnet mask?

The same information as the prefix, written as an address. A `/24` is `255.255.255.0`.

### Which addresses are private?

Three ranges are set aside for home and office networks: those starting with 10, those from 172.16 to 172.31, and those starting with 192.168. They never appear on the public internet.

### Does this handle IPv6?

Not yet. This calculator is for IPv4 only.
