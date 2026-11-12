---
title: How QR codes work, and how to scan them safely
topic: Basics
summary: What the squares mean, how a damaged code still scans, the difference between static and dynamic codes, and the checks to make before you tap.
updated: 2026-11-12
read: 4
---
A QR code is a way of writing a short piece of text, most often a web address, so that a camera can read it in an instant. QR stands for quick response. The format was created in 1994 by the Japanese company Denso Wave to track car parts, and it spread because it is free to use, fast to scan from any angle and remarkably tolerant of damage.

## What the pattern contains

Every QR code is a grid of small squares called modules. Dark means one, light means zero. Most of the grid is your data, but several parts exist only to help the scanner.

- **Three large corner squares** tell the camera where the code is and which way up it is. This is why codes scan at any angle.
- **A smaller square** near the fourth corner helps correct for a tilted or curved surface.
- **Alternating lines** between the corners show the scanner how big one module is.
- **The blank margin** around the outside separates the code from whatever is printed near it.

The data itself is stored along with extra error-correcting information, using the same mathematics that lets a scratched disc still play.

## Why a damaged code still works

There are four levels of error correction. At the lowest, a code survives about 7 percent of its area being unreadable. At the highest, about 30 percent. That is how designers can place a logo in the middle: the logo destroys part of the code, and the error correction fills in the gap.

The trade-off is size. More protection means more modules for the same content, which makes the code denser and harder to scan from a distance.

## Static and dynamic codes

A **static** code holds the final content directly. It works for ever, with no service behind it, and cannot be changed after printing. The [QR code generator](../../tools/qr-code-generator/) on this site makes static codes.

A **dynamic** code holds a short link to a company's server, which redirects to the real destination. The owner can change the destination later and count scans. The cost is dependence: if that company closes or the subscription lapses, every printed code stops working.

## What a code can hold

Anything that fits in a few thousand characters. Common uses are web links, Wi-Fi details that let a phone join a network without typing the password, contact cards, payment requests and plain text.

## Scanning safely

A QR code is not dangerous in itself. It is a link you cannot read before you scan it, and that is the risk. Criminals place stickers over genuine codes on parking machines, restaurant tables and charging points, sending people to a copy of the payment page.

- **Read the preview.** Your phone shows the address before it opens. If the name is not what you expect, do not continue.
- **Look for a sticker.** A code stuck on top of another one is a warning sign.
- **Be wary of codes in unexpected emails and letters.** Putting the link in an image is a way to slip past email filters.
- **Never enter card details or passwords** on a page reached from a code unless you are certain of the address. When in doubt, type the organisation's address yourself or use its app.
- **You do not need a special app.** The built-in camera on current phones reads QR codes. Many scanner apps add nothing but advertising.

The same instincts that protect you from suspicious links apply here. The [phishing guide](../spot-phishing/) covers them in full.

## Making your own

Keep the link short, keep the colours high in contrast, leave the margin intact, and test with more than one phone before printing. For printed material that will be handled, choose a higher error correction level.
