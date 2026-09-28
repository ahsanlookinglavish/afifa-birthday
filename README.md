# A Website for Afifa — Editing Guide

This is a plain HTML/CSS/JS website. No installation, no build step.

## Files
- `index.html` — all the text and page structure
- `style.css` — all the colors, fonts, spacing, animations
- `script.js` — the candle, hidden notes, scroll animations, music toggle
- `assets/` — your photos and music go here

Every place you're meant to edit is marked in the code with:
`<!-- ✏️ EDIT HERE ... -->` (in HTML) or `/* ✏️ EDIT HERE ... */` (in CSS/JS).

## Quick edits
- **Her name:** search `index.html` for "Afifa Mehjabin" (appears twice — reveal section and final section) and replace it.
- **Photos:** replace the files in `assets/` (currently `photo-1.svg` … `photo-6.svg`) with your own `.jpg`/`.png` files, then update the `src="assets/..."` path for each `<img>` in the Scrapbook section of `index.html` to match your new file names.
- **Letter:** in `index.html`, find `<div class="letter__body">` and edit the paragraphs inside.
- **Hidden notes:** in `index.html`, find `<section id="hidden-notes">` and edit the text inside each `data-note="..."` attribute.
- **Music:** add your own audio file at `assets/song.mp3` (must be a file you own or have rights to use).

## Preview it on your computer
No installation needed — just open `index.html` by double-clicking it, and it opens in your browser.

(Optional, only if a photo/font doesn't load correctly when opened directly: some browsers restrict local files slightly. If that happens, right-click the `afifa-birthday` folder → "Open with" → your code editor, or use VS Code's free "Live Server" extension → right-click `index.html` → "Open with Live Server.")

## Publish it for free on GitHub Pages
1. Create a free account at github.com if you don't have one.
2. Create a new repository (e.g. `afifa-birthday`) — keep it **Public**.
3. Upload all files (`index.html`, `style.css`, `script.js`, and the `assets` folder) using the "Add file → Upload files" button on the repository page.
4. Go to the repository's **Settings → Pages**.
5. Under "Build and deployment," set **Source** to "Deploy from a branch," branch **main**, folder **/ (root)**, then Save.
6. Wait 1–2 minutes. GitHub will give you a link like `https://yourusername.github.io/afifa-birthday/` — that's the live site.
