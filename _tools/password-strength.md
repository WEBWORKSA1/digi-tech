---
title: Password Strength Checker
category: Security
summary: Test how well a password would hold up against guessing, and get specific advice for making it stronger.
---
## How to use it

Type a password into the box. The meter, the estimated bits of randomness and the time-to-crack figure update as you type, and the list underneath tells you exactly what to change.

## How the estimate works

The checker counts which kinds of characters you used and how long the password is, then lowers the score for habits attackers exploit first: very common passwords, repeated characters, and keyboard runs such as `qwe` or `123`. The crack time assumes an attacker who has stolen a database and can try ten billion guesses every second, which is realistic for fast hashing on modern graphics cards.

Treat the result as a ceiling. A password built from your pet's name and birth year can score well on any meter and still fall quickly to someone who knows you.

## Questions people ask

### Does this page see my password?

No. The check runs in your browser and nothing is transmitted. Even so, it is good practice to test a password with the same shape as your real one instead of the real one itself.

### What score should I aim for?

Aim for **Very strong**, which starts at roughly 80 bits. The easiest way to get there is the [password generator](../password-generator/).

### Is a long phrase better than a short jumble?

Usually. Four or five unrelated words chosen at random are both stronger and easier to type than eight mixed characters.
