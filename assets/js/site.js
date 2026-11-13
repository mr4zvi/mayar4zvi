/*
 * Renders the shared sidebar on every page and the project grid on the
 * spotlight page. Each page sets <body data-root="..."> to the relative path
 * back to the site root ("" for top-level pages, "../" inside /projects).
 */
(function () {
  const site = window.SITE;
  const root = document.body.dataset.root || "";
  const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href);
  const resolve = (href) => (isExternal(href) ? href : root + href);

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") node.textContent = v;
      else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v);
    }
    children.forEach((c) => c && node.append(c));
    return node;
  };

  // Which page are we on? Compare file names so "/" counts as index.html.
  const currentFile = location.pathname.split("/").pop() || "index.html";

  function renderSidebar() {
    const mount = document.getElementById("sidebar");
    if (!mount) return;

    const nav = el("nav", { class: "sidebar-nav", "aria-label": "Main" });
    const list = el("ul");
    site.links.forEach((link) => {
      if (link.divider) {
        list.append(el("li", { class: "divider", role: "separator" }));
        return;
      }
      const isCurrent =
        !isExternal(link.href) && link.href.split("/").pop() === currentFile &&
        !location.pathname.includes("/projects/");
      list.append(
        el("li", {}, [
          el("a", {
            href: resolve(link.href),
            text: link.label,
            target: link.external ? "_blank" : null,
            rel: link.external ? "noopener" : null,
            "aria-current": isCurrent ? "page" : null,
          }),
        ])
      );
    });
    nav.append(list);

    const header = el("div", { class: "sidebar-header" }, [
      el("a", { class: "site-name", href: resolve("index.html"), text: site.name }),
      el("button", {
        class: "menu-toggle",
        type: "button",
        "aria-expanded": "false",
        "aria-controls": "sidebar-body",
        text: "Menu",
      }),
    ]);

    const body = el("div", { class: "sidebar-body", id: "sidebar-body" }, [
      el("p", { class: "tagline", text: site.tagline }),
      nav,
      el("p", { class: "copyright", text: `© ${new Date().getFullYear()} ${site.name}` }),
    ]);

    mount.append(header, body);

    const toggle = header.querySelector(".menu-toggle");
    toggle.addEventListener("click", () => {
      const open = mount.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  function renderGrid() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    site.projects.forEach((p) => {
      const thumb = el("div", { class: "tile-thumb" });
      thumb.style.backgroundColor = p.color || "var(--tile-fallback)";
      if (p.image) thumb.style.backgroundImage = `url("${resolve(p.image)}")`;

      const meta = el("div", { class: "tile-meta" }, [
        el("span", { class: "tile-title", text: p.title }),
        el("span", { class: "tile-year", text: p.year || "" }),
      ]);

      grid.append(
        el("li", {}, [
          el("a", { class: "tile", href: resolve(`projects/${p.slug}.html`) }, [thumb, meta]),
        ])
      );
    });
  }

  // On project pages, fill in title/year and prev/next links from data.js.
  function renderProjectChrome() {
    const slug = document.body.dataset.project;
    if (!slug) return;
    const i = site.projects.findIndex((p) => p.slug === slug);
    if (i === -1) return;
    const p = site.projects[i];

    document.querySelectorAll("[data-fill=title]").forEach((n) => (n.textContent = p.title));
    document.querySelectorAll("[data-fill=year]").forEach((n) => (n.textContent = p.year || ""));
    document.querySelectorAll("[data-fill=tags]").forEach((n) => (n.textContent = (p.tags || []).join(" · ")));

    const pager = document.getElementById("project-pager");
    if (pager) {
      const prev = site.projects[(i - 1 + site.projects.length) % site.projects.length];
      const next = site.projects[(i + 1) % site.projects.length];
      pager.append(
        el("a", { href: `${prev.slug}.html`, text: `← ${prev.title}` }),
        el("a", { href: resolve("index.html"), text: "All projects" }),
        el("a", { href: `${next.slug}.html`, text: `${next.title} →` })
      );
    }
  }

  renderSidebar();
  renderGrid();
  renderProjectChrome();
})();
