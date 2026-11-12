---
title: Regex Tester
category: Developer
summary: Test a regular expression against sample text and see every match and capture group highlighted live.
---
## How to use it

Type a pattern, set any flags, and edit the test text. Matches are highlighted as you type, and the table lists each one with its position and capture groups. The tool uses your browser's own JavaScript engine, so a pattern that works here behaves the same way in your code.

## A short reference

- A dot matches any single character except a line break.
- A backslash followed by `d` matches a digit, by `w` a letter, digit or underscore, and by `s` any white space.
- Square brackets match one character from a set, for example `[aeiou]`.
- A star means zero or more of the previous item, a plus means one or more, a question mark makes it optional.
- A caret and a dollar sign anchor the pattern to the start and end.
- Round brackets capture part of the match so you can reuse it.

## Flags

`g` finds every match instead of the first, `i` ignores capital letters, `m` makes the anchors work on each line, and `s` lets the dot cross line breaks.

## Questions people ask

### Why does my pattern match too much?

Star and plus are greedy. They take as much as they can. Add a question mark after them to make them stop at the first opportunity.

### Can a regular expression validate an email address?

Only roughly. Use a simple pattern to catch typing mistakes, then confirm the address by sending a message to it.
