---
title: How AI chatbots work, without the jargon
topic: AI
summary: What a large language model is, how it produces an answer one word at a time, why it sometimes makes things up, and how to get better results.
updated: 2026-11-12
read: 6
---
AI chatbots can draft an email, explain a tax form or write working code, and a moment later state something false with complete confidence. Both behaviours come from the same simple mechanism. Once you see it, the tools become easier to use well.

## The core idea: predict what comes next

A chatbot is built on a **large language model**. The model has one skill: given some text, it estimates what is likely to come next.

It does not work in whole words. Text is split into **tokens**, which are common words or pieces of words. The model looks at all the tokens so far, calculates a probability for every token that could follow, picks one, adds it to the text, and repeats. An answer of 300 words is that loop run a few hundred times.

That is why answers appear a word at a time. You are watching the loop.

## Where the knowledge comes from

Before release, the model is **trained** on an enormous amount of text. Training is a long process of guessing the next token, checking the real one, and adjusting the model's internal numbers slightly to guess better next time. Those numbers are called **parameters**, and large models have billions of them.

Nobody writes rules into the model. To predict text well across science papers, recipes, legal contracts and code, it has to pick up grammar, facts, styles and patterns of reasoning along the way. What it ends up with is not a database of documents. It is closer to an extremely well-read sense of how text tends to continue.

## Why it makes things up

The model produces what is plausible, and plausible is not the same as true. Ask for a source and it knows exactly what a citation looks like, so it can produce one that is perfectly formatted and entirely invented. This is usually called a **hallucination**.

It is most likely when you ask for precise details, such as figures, dates, quotations and references, about subjects that were thin in the training text, or about anything that happened after training ended.

Many chatbots reduce the problem by searching the web or your documents first and placing what they find in front of the model before it answers. That helps a great deal. It does not make checking optional.

## What it remembers

Within a conversation, the model sees everything in its **context window**, which is the amount of text it can take in at once. That is how it follows up on earlier messages. In a very long chat, the earliest parts may no longer fit.

Between conversations, the model itself does not change or learn from you. Some products add a memory feature that saves notes and feeds them back in later. Check the settings to see what is stored and whether your chats are used to train future versions.

## Getting better answers

- **Give context.** Say who the answer is for, what you already know and what you are trying to achieve.
- **Show an example** of the result you want. One sample beats a paragraph of description.
- **Ask for the format**, such as a table, five bullet points or a formal email.
- **Supply the facts yourself.** Paste the document and ask questions about it, instead of asking from memory.
- **Push back.** Ask what might be wrong with the answer, or what it left out.

## What to keep out of it

Do not paste passwords, full card numbers, medical records or confidential work material into a chatbot unless your organisation has approved that tool. And verify anything that matters, especially on health, legal and financial questions, with a qualified person or an original source.

## The short version

A chatbot is a very capable text predictor. It is fluent, fast and often right. It does not know when it is wrong. Use it as a talented assistant whose work you check.

More terms are explained in the [glossary](../../glossary/).
