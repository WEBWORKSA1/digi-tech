---
title: JSON Formatter and Validator
category: Developer
summary: Format, validate and minify JSON in your browser, with the line and column of any error.
---
## How to use it

Paste JSON into the box and press **Format** to indent it for reading, or **Minify** to strip every unnecessary space for sending. If the text is not valid JSON, the message tells you what went wrong and where.

## What JSON is

JSON is a plain-text format for structured data. It is what most apps and websites use to talk to their servers. It has only a few building blocks: objects in curly braces, lists in square brackets, text in double quotes, numbers, `true`, `false` and `null`.

## The errors people hit most

- A comma after the last item in a list or object.
- Single quotes around text. JSON only accepts double quotes.
- Property names without quotes.
- Comments. JSON has no comment syntax.

## Questions people ask

### Is my data uploaded?

No. Parsing happens on your device, so API responses and configuration files with private values stay private.

### What is the difference between JSON and a JavaScript object?

JSON is stricter. Every key must be in double quotes, and it cannot hold functions, dates or undefined values.

New to the idea of apps exchanging data? Read [what an API is](../../guides/what-is-an-api/).
