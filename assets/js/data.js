/*
 * Site content lives here — edit this file to update the sidebar and the
 * spotlight grid. Every page loads it, so changes show up everywhere.
 *
 * Paths are relative to the site root (no leading slash), so the site works
 * both at username.github.io and username.github.io/repo-name.
 */
window.SITE = {
  name: "Your Name",
  tagline: "designer · maker · researcher",

  // Right-hand sidebar. `external: true` opens in a new tab.
  links: [
    { label: "Spotlight", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "CV", href: "assets/cv.pdf", external: true },
    { divider: true },
    { label: "GitHub", href: "https://github.com/mr4zvi", external: true },
    { label: "Instagram", href: "https://instagram.com/", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/", external: true },
    { label: "Email", href: "mailto:hello@example.com" },
  ],

  // Square tiles on the spotlight page, shown in this order.
  // `image` is optional; without it the tile uses `color` as a background.
  projects: [
    {
      slug: "project-one",
      title: "Project One",
      year: "2026",
      tags: ["design"],
      image: "",
      color: "#e85d3f",
    },
    {
      slug: "project-two",
      title: "Project Two",
      year: "2025",
      tags: ["code"],
      image: "",
      color: "#3f6be8",
    },
    {
      slug: "project-three",
      title: "Project Three",
      year: "2025",
      tags: ["research"],
      image: "",
      color: "#2f9e6e",
    },
    {
      slug: "project-four",
      title: "Project Four",
      year: "2024",
      tags: ["design", "code"],
      image: "",
      color: "#c9a227",
    },
    {
      slug: "project-five",
      title: "Project Five",
      year: "2024",
      tags: ["photo"],
      image: "",
      color: "#8a4fd1",
    },
    {
      slug: "project-six",
      title: "Project Six",
      year: "2023",
      tags: ["writing"],
      image: "",
      color: "#333333",
    },
  ],
};
