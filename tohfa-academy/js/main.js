(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
    document.querySelectorAll(".main-nav a").forEach((a) => {
      a.addEventListener("click", () => document.body.classList.remove("nav-open"));
    });
  }

  /* ---------- Background photos set from the admin panel ----------
     Reads the `site_settings` table (key/value) and, for whichever
     keys exist, applies the photo as a background on the matching
     section — layered under a dark gradient so the section's own text
     stays readable no matter what the photo looks like. Silently does
     nothing if Supabase isn't configured yet or no photo was set. */
  const BG_SECTIONS = {
    bg_hero: "hero-section",
    bg_academique: "pillar-academique",
    bg_artistique: "pillar-artistique",
    bg_langues: "pillar-langues",
    bg_cta: "cta-banner-section",
  };

  function applyBackgroundPhoto(elId, url) {
    const el = document.getElementById(elId);
    if (!el || !url) return;
    el.classList.add("has-bg-photo");
    el.style.backgroundImage =
      `linear-gradient(rgba(20,8,14,0.58), rgba(20,8,14,0.58)), url("${url}")`;
  }

  async function loadSiteBackgrounds() {
    if (!window.tohfaSupabase) return;
    try {
      const { data, error } = await window.tohfaSupabase
        .from("site_settings")
        .select("key, value")
        .in("key", Object.keys(BG_SECTIONS));
      if (error || !data) return;
      data.forEach((row) => {
        const elId = BG_SECTIONS[row.key];
        if (elId && row.value) applyBackgroundPhoto(elId, row.value);
      });
    } catch (e) {
      console.warn("Site background photos fetch failed.", e);
    }
  }

  if (window.tohfaSupabaseConfigured) {
    loadSiteBackgrounds();
  } else {
    window.addEventListener("tohfa:supabase-ready", (e) => {
      if (e.detail && e.detail.configured) loadSiteBackgrounds();
    }, { once: true });
  }

  /* ---------- Contact map, controlled from the admin panel ----------
     The admin can paste a full Google Maps embed link, a share link,
     or simply an address. Whatever they paste is turned into a safe
     iframe src here. Does nothing if no map has been set or the
     contact page has no map frame. */
  function resolveMapEmbedSrc(raw) {
    if (!raw) return null;
    const value = raw.trim();
    if (!value) return null;

    // A pasted <iframe ...> embed snippet: pull the src out of it.
    const iframeMatch = value.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) return iframeMatch[1];

    // Already a URL.
    if (/^https?:\/\//i.test(value)) {
      if (value.includes("output=embed") || value.includes("/maps/embed")) return value;
      return value + (value.includes("?") ? "&" : "?") + "output=embed";
    }

    // A plain address or place name.
    return "https://www.google.com/maps?q=" + encodeURIComponent(value) + "&output=embed";
  }

  async function loadContactMap() {
    const frame = document.getElementById("contact-map-frame");
    if (!frame || !window.tohfaSupabase) return;
    try {
      const { data, error } = await window.tohfaSupabase
        .from("site_settings")
        .select("value")
        .eq("key", "contact_map")
        .maybeSingle();
      if (error || !data || !data.value) return;
      const src = resolveMapEmbedSrc(data.value);
      if (src) frame.src = src;
    } catch (e) {
      console.warn("Contact map fetch failed.", e);
    }
  }

  if (window.tohfaSupabaseConfigured) {
    loadContactMap();
  } else {
    window.addEventListener("tohfa:supabase-ready", (e) => {
      if (e.detail && e.detail.configured) loadContactMap();
    }, { once: true });
  }

  /* ---------- Fetch classes: Supabase first, static fallback ---------- */
  async function loadClasses() {
    if (window.tohfaSupabase) {
      try {
        const { data, error } = await window.tohfaSupabase
          .from("classes")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data && data.length) return data;
      } catch (e) {
        console.warn("Supabase classes fetch failed, using local data.", e);
      }
    }
    return window.TOHFA_CLASSES;
  }

  async function getClasses() {
    if (!window._tohfaClassesPromise) {
      window._tohfaClassesPromise = window.tohfaSupabaseConfigured
        ? loadClasses()
        : new Promise((resolve) => {
            // wait briefly for the supabase module script to announce readiness
            let done = false;
            const finish = async () => {
              if (done) return;
              done = true;
              resolve(await loadClasses());
            };
            window.addEventListener("tohfa:supabase-ready", finish, { once: true });
            setTimeout(finish, 500);
          });
    }
    return window._tohfaClassesPromise;
  }
  window.TohfaGetClasses = getClasses;

  /* ---------- Class detail modal (shared by classes.html) ---------- */
  function buildModal() {
    if (document.getElementById("class-modal")) return;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "class-modal";
    overlay.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button type="button" class="modal-close" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <p class="modal-category" id="modal-category"></p>
        <h3 id="modal-title"></h3>
        <p class="modal-desc" id="modal-desc"></p>
        <div class="modal-actions">
          <a href="apply.html" class="btn btn-maroon" id="modal-apply-link">
            <span data-i18n="classes.modal_apply">Postuler pour ce cours</span>
          </a>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.closest(".modal-close")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  function openModal(cls) {
    buildModal();
    const lang = window.TohfaI18n ? window.TohfaI18n.getCurrentLang() : "fr";
    const isAr = lang === "ar";
    const overlay = document.getElementById("class-modal");
    const cat = window.TOHFA_CATEGORIES.find((c) => c.id === cls.category);

    document.getElementById("modal-category").textContent = isAr
      ? (cat ? cat.name_ar : "")
      : (cat ? cat.name_fr : "");
    document.getElementById("modal-title").textContent = isAr ? cls.name_ar : cls.name_fr;
    let desc = isAr ? cls.desc_ar : cls.desc_fr;
    const extra = isAr ? cls.extra_ar : cls.extra_fr;
    if (extra) desc += ` (${extra})`;
    document.getElementById("modal-desc").textContent = desc;
    document.getElementById("modal-apply-link").href = `apply.html?class=${encodeURIComponent(cls.id)}`;

    overlay.classList.add("open");
  }

  function closeModal() {
    const overlay = document.getElementById("class-modal");
    if (overlay) overlay.classList.remove("open");
  }

  window.TohfaOpenClassModal = openModal;

  /* ---------- Render classes grid grouped by category (classes.html) ---------- */
  async function renderClassesPage() {
    const root = document.getElementById("classes-root");
    if (!root) return;

    const classes = await getClasses();
    const lang = () => (window.TohfaI18n ? window.TohfaI18n.getCurrentLang() : "fr");

    function render() {
      const isAr = lang() === "ar";
      root.innerHTML = "";
      window.TOHFA_CATEGORIES.forEach((cat) => {
        const items = classes.filter((c) => (c.category || c.category_id) === cat.id);
        if (!items.length) return;

        const block = document.createElement("div");
        block.className = "category-block";
        block.id = `cat-${cat.id}`;
        block.innerHTML = `
          <h3 class="category-title"><span class="dot"></span>${isAr ? cat.name_ar : cat.name_fr}</h3>
          <div class="class-grid"></div>`;
        const grid = block.querySelector(".class-grid");

        items.forEach((cls) => {
          const card = document.createElement("button");
          card.type = "button";
          card.className = "class-card";
          const name = isAr ? (cls.name_ar || cls.name_fr) : (cls.name_fr || cls.name_ar);
          const teaser = isAr ? (cls.teaser_ar || "") : (cls.teaser_fr || "");
          const moreLabel = (window.TOHFA_DICT[lang()] || {}).classes?.more || "Voir les détails";
          card.innerHTML = `
            <h4>${name}</h4>
            <p class="teaser">${teaser}</p>
            <span class="more">${moreLabel}
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>`;
          card.addEventListener("click", () => openModal(normalizeClass(cls)));
          grid.appendChild(card);
        });

        root.appendChild(block);
      });
    }

    render();
    document.addEventListener("tohfa:lang-changed", render);
  }

  function normalizeClass(c) {
    // Supports both the local static shape and a Supabase row shape.
    return {
      id: c.id,
      category: c.category || c.category_id,
      name_fr: c.name_fr,
      name_ar: c.name_ar,
      teaser_fr: c.teaser_fr,
      teaser_ar: c.teaser_ar,
      desc_fr: c.desc_fr || c.description_fr,
      desc_ar: c.desc_ar || c.description_ar,
      extra_fr: c.extra_fr,
      extra_ar: c.extra_ar,
    };
  }

  /* ---------- Populate the apply.html class <select> ---------- */
  async function populateApplySelect() {
    const select = document.getElementById("class-select");
    if (!select) return;
    const classes = await getClasses();

    function render() {
      const isAr = window.TohfaI18n && window.TohfaI18n.getCurrentLang() === "ar";
      const placeholder = (window.TOHFA_DICT[isAr ? "ar" : "fr"]).apply.class_placeholder;
      select.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;

      window.TOHFA_CATEGORIES.forEach((cat) => {
        const items = classes.filter((c) => (c.category || c.category_id) === cat.id);
        if (!items.length) return;
        const group = document.createElement("optgroup");
        group.label = isAr ? cat.name_ar : cat.name_fr;
        items.forEach((c) => {
          const opt = document.createElement("option");
          opt.value = c.id;
          opt.textContent = isAr ? (c.name_ar || c.name_fr) : (c.name_fr || c.name_ar);
          group.appendChild(opt);
        });
        select.appendChild(group);
      });

      // Pre-select class from ?class= query param, if present
      const params = new URLSearchParams(window.location.search);
      const preselect = params.get("class");
      if (preselect && [...select.options].some((o) => o.value === preselect)) {
        select.value = preselect;
      }
    }

    render();
    document.addEventListener("tohfa:lang-changed", render);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderClassesPage();
    populateApplySelect();
  });
})();
