---
title: Passkeys explained: signing in without a password
topic: Security
summary: What a passkey is, how it works with your fingerprint or face, why it cannot be phished, and what happens if you lose your phone.
updated: 2026-11-12
read: 5
---
A passkey lets you sign in to a website or app the way you unlock your phone: with your fingerprint, your face or your device PIN. There is no password to create, remember or type, and nothing a criminal can trick you into handing over.

Passkeys are supported by Apple, Google and Microsoft devices and by a growing list of services, including the major email providers, shops and banks.

## How a passkey works

When you create a passkey, your device makes a matched pair of keys.

- The **private key** stays on your device, protected by its secure hardware. It never leaves.
- The **public key** is sent to the website. As the name says, it is not secret.

When you sign in, the website sends your device a random challenge. Your device asks you to unlock it, then uses the private key to sign the challenge. The website checks the signature with the public key. A correct signature proves you hold the private key, without the key itself ever being sent.

Your fingerprint or face is used only to unlock the key on your own device. It is not sent to the website.

## Why this is safer than a password

- **Nothing to steal from the website.** A breach exposes only public keys, which are useless to an attacker.
- **Nothing to phish.** A passkey is tied to the real address of the site it was created for. On a fake copy of the site, your device simply has no passkey to offer.
- **Nothing to reuse.** Every passkey is unique by design.
- **Nothing to guess.** There is no short secret for software to try billions of times.

It also replaces two steps with one. Unlocking your device already proves something you have and something you are or know.

## Where passkeys are kept

Most people keep them in the password manager built into their phone or computer, or in an independent password manager. These sync passkeys, encrypted, between your devices, so one created on your phone is there on your laptop.

You can also keep a passkey on a hardware security key, which does not sync anywhere. That suits high-security accounts, but you should register two keys in case one is lost.

## Common worries

### What if I lose my phone?

Synced passkeys are restored when you sign in to your account on a new device, in the same way as your photos and contacts. This makes the security of that main account important: give it a strong password and [two-factor authentication](../two-factor-authentication/), and keep its recovery details up to date.

### Can I sign in on a computer that is not mine?

Yes. The site shows a QR code, you scan it with your phone, and the phone confirms over Bluetooth that it is physically nearby before approving.

### Can I mix Apple, Android and Windows?

Yes, with a little planning. An independent password manager carries the same passkeys across all of them, or you can create a separate passkey on each device.

### Do I delete my password?

Most sites keep the password as a fallback for now. Keep it long and unique, stored in your manager, as set out in the [strong passwords guide](../strong-passwords/).

## How to start

Pick one important account, open its security settings and look for **Passkeys** or **Sign in with a passkey**. Creating one takes under a minute. Use it for a week, then add more as sites offer them.
