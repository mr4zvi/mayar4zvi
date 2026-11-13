# mayar4zvi
personal website

## Structure

- `index.html` — the Spotlight page (home): a grid of square project tiles
- `about.html` — a plain text page
- `projects/<slug>.html` — one page per project
- `projects/_template.html` — copy this to start a new project page (not published)
- `assets/js/data.js` — **edit this**: your name, sidebar links, and the project list
- `assets/js/site.js` — renders the sidebar, grid, and project prev/next links
- `assets/css/style.css` — all styles; colors and sizes are variables at the top

## Adding a project

1. Add an entry to `projects` in `assets/js/data.js` (set `slug`, `title`, `year`, and an `image` path or a `color`).
2. Copy `projects/_template.html` to `projects/<slug>.html`, replace `__SLUG__` and `__TITLE__`, and write the content.
3. Put images in `assets/img/<slug>/`.
