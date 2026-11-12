---
title: What is an API? A plain-English explanation
topic: Basics
summary: How apps and websites talk to each other, what requests, responses and API keys are, and why it matters even if you never write code.
updated: 2026-11-12
read: 4
---
When a weather app shows today's forecast, it did not measure the temperature itself. It asked another computer. When you pay on a small shop's website, the shop does not handle your card. It passes the job to a payment company. In both cases one piece of software is using another through an **API**.

API stands for application programming interface. In plain terms, it is a published set of rules for how one program can ask another for something, and what it will get back.

## The restaurant comparison

A restaurant kitchen can cook many things, but customers do not walk in and use the stove. They order from a menu, a waiter carries the order in, and a dish comes back.

- The **menu** is the API documentation. It lists what you can ask for and how.
- The **order** is a request.
- The **dish** is the response.
- The **kitchen** is the other company's system, which you never see.

The menu protects both sides. The customer knows what to expect, and the kitchen can change how it cooks without anyone outside noticing.

## What a request looks like

Most APIs on the internet work over the same technology as web pages. A request has four parts.

1. **An address**, called an endpoint, such as the address for today's forecast.
2. **A method**, which is the kind of action. GET reads something, POST creates something, PUT or PATCH changes it and DELETE removes it.
3. **Details**, such as which city you want.
4. **Proof of who is asking**, usually an API key.

The response comes back with a **status code** and usually some data. You have met one status code already: 404 means the thing asked for was not found. Codes starting with 2 mean success, with 4 mean the request was wrong, and with 5 mean the server failed.

The data is nearly always in a text format called JSON, which is readable by people and programs alike. Paste any JSON into the [JSON formatter](../../tools/json-formatter/) to see its structure.

## API keys

An API key is a long code that identifies whoever is making requests. The service uses it to decide what you are allowed to do, to limit how many requests you can make, and often to bill you.

A key is a password. If one is posted publicly, for instance in code shared online, others can run up charges or read data in your name. Keys should be kept out of shared files and replaced at once if exposed.

## Why it matters if you do not code

- **It is how your tools connect.** When a form adds rows to a spreadsheet, or a calendar creates a video meeting link, that is two APIs talking. Automation services let you build those links yourself without programming.
- **It is what you are granting** when an app asks to connect to your email or your files. Read what access it wants, and remove connections you no longer use in your account's security settings.
- **It explains outages.** When a payment or login service has a fault, thousands of unrelated sites that depend on its API fail together.
- **It is how AI gets into products.** Most apps with an AI feature are sending your text to an AI company's API and showing you what comes back. The [chatbot guide](../how-ai-chatbots-work/) explains what happens at the other end.

## Terms you will meet

- **Endpoint**: one address within an API that does one job.
- **REST**: the most common style for web APIs, built around the methods above.
- **Rate limit**: the maximum number of requests allowed in a period.
- **Webhook**: the reverse of a request. The service contacts you when something happens, so you do not have to keep asking.
- **SDK**: ready-made code that makes an API easier to use from a particular programming language.

The [glossary](../../glossary/) has more.
