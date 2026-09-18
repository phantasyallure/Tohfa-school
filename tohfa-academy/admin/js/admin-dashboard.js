import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const configured =
  window.TOHFA_SUPABASE_URL &&
  window.TOHFA_SUPABASE_ANON_KEY &&
  !window.TOHFA_SUPABASE_URL.includes("YOUR-PROJECT") &&
  !window.TOHFA_SUPABASE_ANON_KEY.includes("YOUR-ANON");

const tableSlot = document.getElementById("table-slot");

if (!configured) {
  tableSlot.innerHTML = `<div class="empty-state">Configuration Supabase manquante. Renseignez /js/supabase-config.js puis rechargez cette page.</div>`;
  throw new Error("Supabase not configured");
}

const supabase = createClient(window.TOHFA_SUPABASE_URL, window.TOHFA_SUPABASE_ANON_KEY);

let applications = [];
let classesById = {};
let currentUserEmail = "";

const STATUS_LABELS = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  inscrit: "Inscrit",
  refuse: "Refusé",
};

async function guardSession() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "/admin";
    return null;
  }
  return data.session;
}

async function loadClasses() {
  const { data, error } = await supabase.from("classes").select("id, name_fr");
  if (!error && data) {
    classesById = Object.fromEntries(data.map((c) => [c.id, c.name_fr]));
  }
}

async function loadApplications() {
  tableSlot.innerHTML = `<div class="loading-state">Chargement des candidatures...</div>`;
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    tableSlot.innerHTML = `<div class="empty-state">Erreur de chargement : ${escapeHtml(error.message)}</div>`;
    return;
  }
  applications = data || [];
  renderStats();
  renderTable();
}

function renderStats() {
  const total = applications.length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = applications.filter((a) => new Date(a.created_at).getTime() >= weekAgo).length;
  const nouveau = applications.filter((a) => a.status === "nouveau").length;
  const inscrit = applications.filter((a) => a.status === "inscrit").length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-new").textContent = recent;
  document.getElementById("stat-nouveau").textContent = nouveau;
  document.getElementById("stat-inscrit").textContent = inscrit;
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) +
    " · " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getFiltered() {
  const q = document.getElementById("search-input").value.trim().toLowerCase();
  const statusFilter = document.getElementById("status-filter").value;

  return applications.filter((a) => {
    if (statusFilter && a.status !== statusFilter) return false;
    if (!q) return true;
    const haystack = [a.first_name, a.last_name, a.phone, a.email, a.note]
      .filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

function renderTable() {
  const rows = getFiltered();

  if (!rows.length) {
    if (!applications.length) {
      tableSlot.innerHTML = `<div class="empty-state">
        <span class="empty-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
        <strong>Pas encore de candidature</strong>
        <span>Les demandes envoyées depuis le formulaire "Postuler" du site apparaîtront ici automatiquement.</span>
      </div>`;
    } else {
      tableSlot.innerHTML = `<div class="empty-state">
        <span class="empty-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
        <strong>Aucun résultat</strong>
        <span>Aucune candidature ne correspond à votre recherche ou au filtre sélectionné.</span>
      </div>`;
    }
    return;
  }

  const table = document.createElement("table");
  table.className = "apps-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Date</th>
        <th>Candidat</th>
        <th>Téléphone</th>
        <th>Classe</th>
        <th>Email</th>
        <th>Note</th>
        <th>Statut</th>
        <th></th>
      </tr>
    </thead>
    <tbody></tbody>`;
  const tbody = table.querySelector("tbody");

  rows.forEach((a) => {
    const tr = document.createElement("tr");
    const className = classesById[a.class_id] || a.class_id || "—";
    tr.innerHTML = `
      <td data-label="Date">${formatDate(a.created_at)}</td>
      <td data-label="Candidat">${escapeHtml(a.first_name)} ${escapeHtml(a.last_name)}</td>
      <td data-label="Téléphone"><a href="tel:${escapeHtml(a.phone)}">${escapeHtml(a.phone)}</a></td>
      <td data-label="Classe">${escapeHtml(className)}</td>
      <td data-label="Email">${a.email ? `<a href="mailto:${escapeHtml(a.email)}">${escapeHtml(a.email)}</a>` : "—"}</td>
      <td class="note-cell" data-label="Note">${a.note ? escapeHtml(a.note) : "—"}</td>
      <td data-label="Statut">
        <select class="status-select is-status-${a.status}" data-id="${a.id}" data-prev-status="${a.status}">
          ${Object.entries(STATUS_LABELS).map(([val, label]) =>
            `<option value="${val}" ${a.status === val ? "selected" : ""}>${label}</option>`
          ).join("")}
        </select>
      </td>
      <td data-label="Actions">
        <div class="row-actions">
          <button type="button" class="icon-btn delete-btn" data-id="${a.id}" aria-label="Supprimer">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0 1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });

  tableSlot.innerHTML = "";
  tableSlot.appendChild(table);

  tbody.querySelectorAll(".status-select").forEach((sel) => {
    sel.addEventListener("change", async () => {
      const id = sel.getAttribute("data-id");
      const newStatus = sel.value;
      const prevStatus = sel.dataset.prevStatus || newStatus;
      sel.disabled = true;
      const { error } = await supabase.from("applications").update({ status: newStatus }).eq("id", id);
      sel.disabled = false;
      if (error) {
        alert("Impossible de mettre à jour le statut : " + error.message);
        return;
      }
      sel.classList.remove(`is-status-${prevStatus}`);
      sel.classList.add(`is-status-${newStatus}`);
      sel.dataset.prevStatus = newStatus;
      const app = applications.find((a) => a.id === id);
      if (app) app.status = newStatus;
      renderStats();
    });
  });

  tbody.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (!confirm("Supprimer définitivement cette candidature ?")) return;
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) {
        alert("Impossible de supprimer : " + error.message);
        return;
      }
      applications = applications.filter((a) => a.id !== id);
      renderStats();
      renderTable();
    });
  });
}

document.getElementById("search-input").addEventListener("input", renderTable);
document.getElementById("status-filter").addEventListener("change", renderTable);
document.getElementById("refresh-btn").addEventListener("click", loadApplications);
document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/admin";
});

(async function init() {
  const session = await guardSession();
  if (!session) return;
  currentUserEmail = session.user.email || "";
  document.getElementById("admin-email-tag").textContent = currentUserEmail;
  await loadClasses();
  await loadApplications();
})();
