# Digi.Tech: concept and phase-wise build prompt

## The concept

**Digi.Tech = "Digital tech, decoded": a free browser-tool hub with plain-English explainers.**

Why this beats a tech news site for this domain:

| Factor | Tech news / reviews | Tool hub + explainers (chosen) |
| --- | --- | --- |
| Content cost | New articles every day, for ever | Build once, evergreen |
| Search intent | Informational, low return rate | Task intent ("qr code generator", "json formatter"), high repeat use |
| Competition | Funded newsrooms with staff | Long tail of single-purpose queries a solo site can win |
| AdSense fit | Needs volume and freshness | Original utility plus original text on every page |
| Automation | Hard without thin, scraped content | Tools need no upkeep; live feeds and video players update themselves |
| Lead generation | Newsletter only | Kit download, sponsorship, tool requests, hiring, contests |

Patterns taken from 40 reviewed sites: card-based tool directories with category filters and search (TinyWow, 10015.io, SmallSEOTools, RapidTables, Calculator.net, Omni Calculator, UnitConverters), explanatory copy beside every tool (Omni Calculator, Calculator.net), an A to Z dictionary (Techopedia), learning paths and reference pages (web.dev, MDN, W3Schools, GeeksforGeeks, Codecademy Docs, CSS-Tricks, Smashing Magazine, SitePoint), ranked live feeds (Hacker News, Product Hunt, DEV, Slashdot, HackerNoon, AlternativeTo, FutureTools, There's An AI For That), newsletter capture with a free download (Smashing Magazine, FutureTools), donation and membership prompts (freeCodeCamp, 10015.io, Smashing Magazine), dark mode and skip links (9to5Mac, HackerNoon, freeCodeCamp), advertise and partner pages, quizzes and daily-return hooks (TechRadar, Tom's Guide), plus the section structures of TechCrunch, Engadget, How-To Geek, MakeUseOf, Digital Trends, Gizmodo, VentureBeat, The Next Web, XDA, Android Authority, MIT Technology Review, Computerworld and TechTarget.

## The prompt

Use each phase as one instruction. Finish and verify a phase before starting the next.

### Phase 0: ground rules

Build a static website for the domain Digi.Tech ("digital technology") that GitHub Pages can build and host free from the `main` branch of `webworksa1/digi-tech`, using Jekyll with no custom plugins. All internal links must be relative so the site works both at `/digi-tech/` and at the root of the custom domain. Brand it "Digi.Tech", never "DigiTech". Use one inbox for every form and never print the address anywhere in a page or script in readable form. Put this bar at the top of every page, linked to `https://web.works/contact`: "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership".

### Phase 1: design system and shell

Create a distinctive, responsive design: cool lilac paper, deep indigo ink, ultramarine brand colour, signal-yellow accent, with a square "pixel" as the dot in the logo. Light and dark themes. One base layout containing the contact bar, sticky header with site search, main content, an email sign-up band, a footer with full navigation and the trademark and copyright disclosure, and a cookie notice. Accessible: skip link, visible focus, labelled controls, reduced-motion support, WCAG AA contrast.

### Phase 2: monetisation plumbing

Add the AdSense script for `ca-pub-6620975821265271` and the `google-adsense-account` meta tag to the head of every page. Serve `ads.txt` from the root. Add an ad include that renders fixed units only when slot IDs are set in the config, so Auto ads work alone until then. Never place ads inside tool controls, never ask for clicks, and keep ads visually separate from content.

### Phase 3: the tools

Build 24 tools as dependency-free JavaScript that runs entirely in the browser, each on its own page with a summary, how-to text, background explanation and questions people ask: password generator, password strength checker, hash generator, UUID generator, word counter, case converter, lorem ipsum generator, typing speed test, JSON formatter, Base64, URL encoder, regex tester, Unix timestamp converter, number base converter, data size converter, download time calculator, IPv4 subnet calculator, screen and browser info, QR code generator, UTM link builder, meta tag generator, colour converter, contrast checker and image compressor. Add a tools index with category chips, a text filter and device-saved favourites.

### Phase 4: original content

Write 12 original guides of 600 to 900 words (digital technology basics, strong passwords, two-factor authentication, passkeys, how AI chatbots work, internet speed, phishing, QR codes, slow Wi-Fi, backups, APIs, image formats), cross-linked to the tools. Add an 80-term glossary with search and A to Z navigation, and a 12-question quiz with explanations.

### Phase 5: self-updating sections

Add a tech pulse page that fetches live headlines in the visitor's browser from the public Hacker News, DEV and GitHub APIs, showing titles and links only, with a daily snapshot job as a fallback. Add a videos page that embeds each chosen YouTube channel's uploads playlist in privacy-enhanced mode, loaded on click, so it always shows the newest videos with no maintenance.

### Phase 6: lead generation

Create a dedicated lead page offering a free 25-point Digital Tune-Up checklist. The form asks for name, email, role and interest, requires consent, and unlocks the checklist on success. Repeat a compact version on the home page. Add a short email sign-up on every page.

### Phase 7: support, contests, hiring, advertising

Add a support page with a transparent allocation of funds (new tools, running costs, hiring, promotion, contest prizes), suggested amounts, configurable payment links and a pledge form. Add a contests page with two skill-based contests, clear rules and an entry form. Add a careers page with freelance roles and an application form. Add an advertise and partner page with sponsorship options and an inquiry form.

### Phase 8: trust and compliance pages

Write About, Contact, Editorial policy, Privacy policy (including the Google advertising cookie disclosures and opt-out links), Cookie policy, Terms of use, and a Disclaimer with the trademark and copyright disclosure stating that the site has no connection to any DigiTech or Digitech business. Add `robots.txt`, `sitemap.xml`, an RSS feed, a web manifest, a site map page and a 404 page.

### Phase 9: verify and publish

Check every page for the AdSense tag, the contact bar and working links. Test every tool against known answers. Confirm the inbox address appears nowhere in the built pages. Push to `main`, enable GitHub Pages from `main` / root, then point the custom domain at GitHub Pages and apply for AdSense on the custom domain.
