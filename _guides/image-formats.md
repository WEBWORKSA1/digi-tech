---
title: JPEG, PNG, WebP, AVIF, SVG and GIF: which image format to use
topic: Web
summary: What each image format is good at, where it fails, and a simple rule for choosing the right one for photos, graphics and logos.
updated: 2026-11-12
read: 4
---
Choosing the wrong image format makes pages slow or pictures ugly. Choosing the right one is mostly a matter of answering one question: is it a photograph, or a graphic?

## Two ideas to know first

**Lossy and lossless.** Lossy compression throws away detail the eye is unlikely to miss, which makes files far smaller. Push it too hard and you see smudges and blocks. Lossless compression keeps every pixel exactly, at a larger size.

**Raster and vector.** Raster images are grids of coloured dots, and they blur when enlarged. Vector images are instructions for drawing shapes, and they stay sharp at any size.

## The formats

| Format | Kind | Transparency | Animation | Best for |
| --- | --- | --- | --- | --- |
| JPEG | Lossy raster | No | No | Photos, where maximum compatibility matters |
| PNG | Lossless raster | Yes | No | Screenshots, graphics with text, images needing transparency |
| WebP | Lossy or lossless raster | Yes | Yes | Almost everything on the web |
| AVIF | Lossy or lossless raster | Yes | Yes | Photos where the smallest file matters |
| SVG | Vector | Yes | Yes | Logos, icons, charts and illustrations |
| GIF | Lossless raster, 256 colours | Basic | Yes | Very short, simple animations only |

### JPEG

The long-standing standard for photographs, and readable by everything. It handles smooth tones well and sharp edges badly: text and line art saved as JPEG pick up a fuzzy halo. It has no transparency. Each time you edit and save a JPEG again it loses a little more quality, so keep an original.

### PNG

Perfect reproduction, with transparency. Ideal for screenshots, diagrams and anything containing text. Poor for photographs, where the file is often five to ten times the size of a good JPEG.

### WebP

A newer format from Google that does both jobs. Its lossy mode typically produces files a quarter to a third smaller than JPEG at similar quality, and its lossless mode beats PNG. Every current browser displays it. For a website today it is the sensible default.

### AVIF

Newer still, and usually smaller again than WebP for photographs, with better handling of gradients and wide colour ranges. It is supported by all the major current browsers. Encoding is slower, and some older software and devices cannot open it.

### SVG

Not pixels but drawing instructions, written as text. A logo in SVG is often just a few kilobytes and is razor sharp on any screen and at any zoom. It cannot represent a photograph.

### GIF

Limited to 256 colours and inefficient for animation. A short video file, or an animated WebP, gives much better quality at a fraction of the size. Use GIF only where nothing else is accepted.

## The simple rule

1. **Logo, icon or simple illustration?** Use SVG.
2. **Photograph?** Use WebP or AVIF for the web. Use JPEG when you are sending it to someone and do not know what they will open it with.
3. **Screenshot, diagram or image with text?** Use PNG, or lossless WebP.
4. **Needs a transparent background?** Use PNG or WebP, or SVG if it is a graphic.
5. **Animation?** Use a video file, or animated WebP.

## Size matters more than format

The biggest saving usually comes from dimensions, not format. A photo straight from a phone can be 4,000 pixels wide and several megabytes. If the page shows it 800 pixels wide, most of that is wasted. Resize first, then compress.

The [image compressor](../../tools/image-compressor/) does both in your browser and can convert between JPEG, PNG and WebP. For page speed, also give every image a description for screen readers and let images further down the page load only as the reader reaches them.

## For print

Printers want resolution and lossless data. Send the highest quality original you have, as a PNG, a TIFF or a high-quality JPEG, and supply logos as vector files. Colours shift between screen and paper, which the [colour converter](../../tools/color-converter/) page explains.
