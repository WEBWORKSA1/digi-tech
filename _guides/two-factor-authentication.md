---
title: Two-factor authentication explained, and which kind to use
topic: Security
summary: How a second step stops most account takeovers, the differences between text codes, apps and keys, and how to set it up safely.
updated: 2026-11-12
read: 5
---
Two-factor authentication, often shortened to 2FA, means proving who you are in two different ways before an account opens. Usually that is something you know, your password, plus something you have, such as your phone.

The point is simple. Passwords get stolen in bulk, from breached websites and fake login pages. A thief on another continent can have your password. It is much harder for them to also have your phone.

## The main kinds, from weakest to strongest

### Codes by text message

The site texts you a six digit code. This is far better than nothing and works on any phone. Its weakness is that phone numbers can be hijacked: a criminal persuades your mobile network to move your number to their SIM card, and your codes go to them. It is rare, but it is how many high-value accounts have been taken.

### Authenticator apps

An app on your phone shows a code that changes every 30 seconds. The code is calculated on the phone from a secret shared when you scanned the setup QR code, so it works without signal and cannot be redirected by your network. Authenticator apps from Google and Microsoft are free, and many password managers include one.

### Push prompts

The service sends a notification asking whether it is you signing in. Convenient, with one trap: attackers who have your password sometimes send prompt after prompt, hoping you approve one to make it stop. Never approve a prompt you did not cause.

### Security keys and passkeys

A security key is a small device you plug in or tap. A [passkey](../passkeys-explained/) does the same job using your phone or computer. Both check the real address of the website before responding, so a fake site gets nothing. This is the only kind that fully resists phishing.

## Where to turn it on first

1. **Your main email.** It can reset the password of nearly everything else you own.
2. **Your password manager.**
3. **Banking and payment services.**
4. **Social accounts**, which are often hijacked to defraud your contacts.

Look for it in the account's security settings. It may be called two-step verification or multi-factor authentication.

## Do not lock yourself out

The commonest problem with 2FA is not hackers. It is losing the phone.

- **Save the backup codes.** Most services offer a set of one-time codes when you switch 2FA on. Print them or store them in your password manager.
- **Add a second method**, such as a second security key or an authenticator on another device.
- **Move your authenticator before you wipe an old phone.** Many apps can sync or export their accounts. Check the new phone works first.

## Does it make me unhackable?

No. Codes can still be typed into a convincing fake page that passes them on instantly, which is why it remains worth learning [how to spot phishing](../spot-phishing/). But it blocks the mass, automated attacks that account for most takeovers, and it costs a few seconds per login.

Combine it with a unique password for each account, as described in the [strong passwords guide](../strong-passwords/), and you are ahead of most people online.
