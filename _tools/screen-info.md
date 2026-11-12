---
title: Screen Resolution and Browser Info
category: Network
summary: See your screen resolution, viewport size, pixel ratio and what your browser reports about your device.
---
## How to use it

Open the page on the device you want to check. The table fills in on its own and updates when you resize the window or rotate a phone. **Copy as text** gives you the lot in a form you can paste into a support ticket or a bug report.

## What the rows mean

- **Screen resolution** is the size of the display in CSS pixels, the unit web pages are laid out in.
- **Viewport** is the part of the browser window that shows the page. Responsive designs react to this, not to the screen.
- **Device pixel ratio** is how many physical pixels sit behind each CSS pixel. Phones and high-density laptops are usually 2 or 3, which is why images need extra resolution to look sharp on them.
- **User agent** is the line of text your browser sends to every site to describe itself.

## Questions people ask

### Can websites see all of this?

Yes. Any page can read these values without asking. Combined, they help sites adapt their layout, and they are also one of the ways advertisers recognise a returning device.

### Why is my phone's resolution so low here?

Because the figure is in CSS pixels. Multiply it by the device pixel ratio to get the physical resolution on the box.
