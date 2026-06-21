# Derkey Gallery Agent Guide

## Project

This repository contains Derkey's personal monthly sky-photo gallery hosted on
GitHub Pages. Preserve its dreamy, cute, simple, and personal character.

Read `PRODUCT.md` before making visual or interaction changes.

## Important Files

- `index.html`: Main website, styles, and client-side behavior.
- `photos/YYYY-MM/`: Monthly photo folders.
- `photos/YYYY-MM/month.json`: Optional Photo of the Month setting.
- `photos/README.md`: Rules for adding and ordering monthly photos.
- `music/`: Music files used by the player.
- `gallery-data.js`: Generated gallery manifest. Do not edit it manually.
- `scripts/generate-gallery-data.mjs`: Generates `gallery-data.js`.
- `.github/workflows/update-gallery.yml`: Daily 09:00 Asia/Bangkok automation.
- `SECURITY.md`: Security expectations and repository hardening notes.
- `backups/`: Local backups ignored by Git.

## Working Rules

1. Inspect the existing code and Git status before editing.
2. Make a dated backup in `backups/` before large or risky changes.
3. Keep changes narrowly scoped and preserve existing user content.
4. Never delete or replace photos, music, or personal assets without explicit
   permission.
5. Keep the website static and compatible with GitHub Pages.
6. Preserve mobile usability, keyboard focus, readable contrast, and
   `prefers-reduced-motion` behavior.
7. Keep photographs as the main visual focus. Avoid busy, corporate, dark, or
   heavily decorative designs.
8. Do not add API keys, tokens, passwords, private certificates, or `.env`
   files to this repository.

## Monthly Photos

- Store photos in `photos/YYYY-MM/`, such as `photos/2026-06/`.
- Sort order is based on natural filename order.
- Prefer `1.jpg`, `2.jpg`, `3.jpg`, and so on.
- The website displays them as Day 1 through the number of uploaded photos.
- Do not add more photos than the number of calendar days in that month.
- Set `photoOfTheMonthDay` in `month.json`, or use `null`.
- After changing monthly photos, run:

```powershell
node scripts/generate-gallery-data.mjs
```

Commit the generated `gallery-data.js` together with the photo changes.

## Verification

Before publishing:

1. Check JavaScript syntax.
2. Test the current month, previous/next month navigation, empty months, photo
   navigation, slideshow, music, Photo of the Month, and lightbox.
3. Test at mobile and desktop viewport sizes.
4. Verify reduced-motion behavior for new animations.
5. Run `git diff --check`.

## Publishing

- Publish to the `main` branch of `lyounge/derkey-gallery`.
- Use a concise commit message describing the change.
- Push only after verification passes.
- Confirm the GitHub Pages deployment succeeds.
