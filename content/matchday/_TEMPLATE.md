---
title: The headline, written like a person said it
date: 2026-09-07
tags: man-city
excerpt: One or two sentences that make someone click. Shows on the index page and in link previews.
fixture: Man City 2 - 1 Arsenal · Premier League
---

Body goes here as normal Markdown. The first paragraph gets a drop cap, so open
with something that earns it.

## Subheads are h2

Regular paragraphs, **bold**, _italic_, [links](https://example.com), and lists
all work.

## Stat boxes (player card and stat stack)

Paste these as raw HTML between paragraphs, with a blank line above and below.
Every number must come from the match-stats brief. Never invent one.

Player card: one player, your rating, 2 or 3 stats, one-line verdict.
`data-n` is the faint letters in the corner (position: GK, RB, CB, CM, W, ST).
The first stat shows in gold.

<div class="md-player" data-n="CM"><header><div><small>Mateo · Midfield</small><b>Kovačić</b></div><i>61<em>My rating</em></i></header><dl><div><dt>Passes</dt><dd>57/59</dd></div><div><dt>Sofascore</dt><dd>8.0</dd></div><div><dt>Goal</dt><dd>40'</dd></div></dl><p>Best outfield player we had.</p></div>

Stat stack: a short label, a headline, then 2 to 4 rows of number + label.
Add `style="--p:97%"` to a row to show a fill bar (use it for x/y numbers).

<div class="md-tiles"><p>The difference makers<b>Who dragged us through</b></p><div style="--p:97%"><strong>57/59</strong><span>Kovačić passes</span></div><div><strong>20</strong><span>Brighton fouls</span></div></div>

---

Notes on the fields above:

- `title` — quote it if it contains a colon.
- `date` — YYYY-MM-DD. Controls sort order, newest first.
- `tags` — comma separated. Known tags: `man-city`, `other-clubs`, `hit-piece`.
- `excerpt` — optional but recommended; used for SEO and social previews.
- `fixture` — optional, Man City posts only. Omit it for hit pieces.

The filename is the URL. `city-vs-arsenal.md` becomes `/matchday/city-vs-arsenal`.
Files starting with `_` are ignored, which is why this template is not published.
