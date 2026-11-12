# Digi.Tech

Digital tech, decoded: free browser-based tools, plain-English guides, a tech glossary, a live tech pulse, curated video channels and a quiz. Built as a Jekyll site that GitHub Pages builds for free straight from the `main` branch. No build step, no server, no paid plan.

## How it is put together

| Path | What lives there |
| --- | --- |
| `_config.yml` | Site settings: AdSense ID, ad slot IDs, contact link, donation links, navigation |
| `_layouts/`, `_includes/` | Page shell (top contact bar, header, footer, AdSense tag, disclosures) |
| `_tools/` | One Markdown file per tool page (copy and FAQ). The tool itself runs from `assets/js/tools-*.js` |
| `_guides/` | One Markdown file per guide |
| `_data/` | Glossary, quiz questions, video channels, pulse snapshot |
| `assets/` | CSS and JavaScript |
| `scripts/refresh.mjs` + `.github/workflows/refresh.yml` | Daily job that refreshes the pulse snapshot and asks Pages to rebuild |
| `docs/BUILD-PROMPT.md` | The phase-wise prompt this site was built from |

All internal links are relative, so the site works unchanged at `https://webworksa1.github.io/digi-tech/` and at the root of a custom domain.

## Publish on GitHub Pages (free plan)

1. Repository **Settings → Pages**.
2. Source: **Deploy from a branch**. Branch: **main**, folder **/ (root)**. Save.
3. The site appears at `https://webworksa1.github.io/digi-tech/` after the first build (about a minute).

## Point the domain at it

1. In **Settings → Pages → Custom domain**, enter `digi.tech` and save (this creates a `CNAME` file).
2. At the domain registrar, add four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` record for `www` pointing to `webworksa1.github.io`.
3. When the certificate is issued, tick **Enforce HTTPS**.

AdSense reviews the custom domain, not the `github.io` address, so do this before applying.

## AdSense

- The AdSense tag for `ca-pub-6620975821265271` is in the `<head>` of every page, with the `google-adsense-account` meta tag.
- `ads.txt` is served from the site root.
- Auto ads work as soon as the site is approved. To add fixed units, create them in AdSense and paste their slot IDs into `adsense_slots` in `_config.yml`.
- For visitors in the EEA, UK and Switzerland, turn on Google's consent message under **Privacy & messaging** in AdSense.

## Forms

Every form posts to the site inbox through FormSubmit. The address is assembled in the browser at send time and is never written into a page. The first submission triggers a one-time activation email from FormSubmit: click the link in it and all forms go live. FormSubmit then offers a random alias; put it in `form_alias` in `_config.yml` to stop using the address altogether.

## Donations

Add payment links (PayPal, Stripe Payment Link, Buy Me a Coffee, Ko-fi, anything with a URL) under `support_links` in `_config.yml`. Until then the support page collects pledges through the form.

## Add content

- New tool: add `_tools/my-tool.md` with front matter, then register `DT.tools['my-tool']` in one of the `assets/js/tools-*.js` files.
- New guide: add `_guides/my-guide.md`.
- New glossary term: add an entry to `_data/glossary.yml`.

## Trademark notice

Digi.Tech is an independent publication named after its domain, short for "digital technology". It is not affiliated with, endorsed by or connected to any company or product using the names DigiTech or Digitech. See `/disclaimer/` on the site for the full disclosure.
