/* =========================================================
   TOHFA — Custom select enhancer
   Turns any <select data-tsel> into a styled trigger + panel
   (supports <optgroup>), while the original <select> stays in
   the DOM (hidden) so existing code that reads its .value or
   listens for its "change" event keeps working unchanged.
   ========================================================= */
(function () {
  const OPEN_CLASS = "is-open";

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function makeOptionBtn(opt) {
    if (opt.disabled) return null; // disabled options (true placeholders) never appear as choices
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tsel-option";
    btn.setAttribute("role", "option");
    btn.dataset.value = opt.value;
    if (opt.selected) {
      btn.classList.add("is-selected");
      btn.setAttribute("aria-selected", "true");
    }
    btn.innerHTML =
      `<span>${escapeHtml(opt.textContent)}</span>` +
      `<svg class="tsel-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">` +
      `<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    return btn;
  }

  function buildPanelContent(select) {
    const frag = document.createDocumentFragment();
    let count = 0;
    Array.from(select.children).forEach((el) => {
      if (el.tagName === "OPTGROUP") {
        const group = document.createElement("div");
        group.className = "tsel-group";
        const label = document.createElement("p");
        label.className = "tsel-group-label";
        label.textContent = el.label;
        group.appendChild(label);
        let groupCount = 0;
        Array.from(el.children).forEach((opt) => {
          const btn = makeOptionBtn(opt);
          if (btn) { group.appendChild(btn); groupCount++; count++; }
        });
        if (groupCount) frag.appendChild(group);
      } else if (el.tagName === "OPTION") {
        const btn = makeOptionBtn(el); // real, non-disabled options are always selectable — even value=""
        if (btn) { frag.appendChild(btn); count++; }
      }
    });
    if (!count) {
      const empty = document.createElement("p");
      empty.className = "tsel-empty";
      empty.textContent = "…";
      frag.appendChild(empty);
    }
    return frag;
  }

  function enhance(select) {
    if (select.dataset.tselReady) return;
    select.dataset.tselReady = "1";

    const wrap = document.createElement("div");
    wrap.className = "tsel";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "tsel-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML =
      `<span class="tsel-value"></span>` +
      `<svg class="tsel-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">` +
      `<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const panel = document.createElement("div");
    panel.className = "tsel-panel";
    panel.setAttribute("role", "listbox");

    wrap.appendChild(trigger);
    wrap.appendChild(panel);
    select.insertAdjacentElement("afterend", wrap);
    select.style.display = "none";
    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;

    if (select.id) {
      const label = document.querySelector(`label[for="${select.id}"]`);
      if (label) {
        trigger.setAttribute("aria-label", label.textContent.trim());
        label.addEventListener("click", (e) => {
          e.preventDefault();
          trigger.click();
        });
      }
    }

    function syncTrigger() {
      const valueEl = trigger.querySelector(".tsel-value");
      const opt = select.options[select.selectedIndex];
      valueEl.textContent = opt ? opt.textContent : "";
      valueEl.classList.toggle("is-placeholder", !!(opt && opt.disabled));
    }

    function rebuildPanel() {
      const wasOpen = wrap.classList.contains(OPEN_CLASS);
      panel.innerHTML = "";
      panel.appendChild(buildPanelContent(select));
      panel.querySelectorAll(".tsel-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          select.value = btn.dataset.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          syncTrigger();
          closePanel();
          trigger.focus();
        });
      });
      syncTrigger();
      if (wasOpen) positionPanel();
    }

    function positionPanel() {
      panel.classList.remove("tsel-panel-up");
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const needed = Math.min(panel.scrollHeight || 280, 320);
      if (spaceBelow < needed && rect.top > needed) {
        panel.classList.add("tsel-panel-up");
      }
    }

    function openPanel() {
      wrap.classList.add(OPEN_CLASS);
      trigger.setAttribute("aria-expanded", "true");
      positionPanel();
      const selected = panel.querySelector(".is-selected") || panel.querySelector(".tsel-option");
      if (selected) selected.focus();
      document.addEventListener("click", onOutsideClick, true);
      document.addEventListener("keydown", onKeydown, true);
    }

    function closePanel() {
      wrap.classList.remove(OPEN_CLASS);
      trigger.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", onOutsideClick, true);
      document.removeEventListener("keydown", onKeydown, true);
    }

    function onOutsideClick(e) {
      if (!wrap.contains(e.target)) closePanel();
    }

    function onKeydown(e) {
      const opts = Array.from(panel.querySelectorAll(".tsel-option"));
      const idx = opts.indexOf(document.activeElement);
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
        trigger.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = opts[idx + 1] || opts[0];
        if (next) next.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = opts[idx - 1] || opts[opts.length - 1];
        if (prev) prev.focus();
      } else if (e.key === "Tab") {
        closePanel();
      }
    }

    trigger.addEventListener("click", () => {
      if (wrap.classList.contains(OPEN_CLASS)) closePanel();
      else openPanel();
    });

    rebuildPanel();

    const observer = new MutationObserver(rebuildPanel);
    observer.observe(select, { childList: true, subtree: true });
  }

  function init() {
    document.querySelectorAll("select[data-tsel]").forEach(enhance);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.TohfaSelect = { enhance };
})();
