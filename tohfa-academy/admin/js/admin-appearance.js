import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const configured =
  window.TOHFA_SUPABASE_URL &&
  window.TOHFA_SUPABASE_ANON_KEY &&
  !window.TOHFA_SUPABASE_URL.includes("YOUR-PROJECT") &&
  !window.TOHFA_SUPABASE_ANON_KEY.includes("YOUR-ANON");

const grid = document.getElementById("bg-photo-grid");
const msgBox = document.getElementById("appearance-msg");

if (!configured) {
  grid.innerHTML = `<div class="empty-state">Configuration Supabase manquante. Renseignez /js/supabase-config.js puis rechargez cette page.</div>`;
  throw new Error("Supabase not configured");
}

const supabase = createClient(window.TOHFA_SUPABASE_URL, window.TOHFA_SUPABASE_ANON_KEY);
const BUCKET = "site-images";

// One card per section that supports a background photo.
const SECTIONS = [
  { key: "bg_hero", title: "Bannière d'accueil", desc: "L'image derrière le titre principal, en haut de la page d'accueil." },
  { key: "bg_academique", title: "Catégorie « Académique »", desc: "Fond de la carte Académique dans « Ce que l'on apprend chez nous »." },
  { key: "bg_artistique", title: "Catégorie « Artistique »", desc: "Fond de la carte Artistique dans « Ce que l'on apprend chez nous »." },
  { key: "bg_langues", title: "Catégorie « Langues »", desc: "Fond de la carte Langues dans « Ce que l'on apprend chez nous »." },
  { key: "bg_cta", title: "Section « Votre avenir commence ici »", desc: "Fond de la bannière d'appel à l'inscription, avant le pied de page." },
];

function showMsg(text, isError) {
  msgBox.textContent = text;
  msgBox.className = "appearance-msg show" + (isError ? " error" : " success");
  setTimeout(() => { msgBox.className = "appearance-msg"; }, 4000);
}

async function guardSession() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
    return null;
  }
  return data.session;
}

async function loadCurrentValues() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", SECTIONS.map((s) => s.key));
  if (error) return {};
  return Object.fromEntries((data || []).map((row) => [row.key, row.value]));
}

function buildCard(section, currentUrl) {
  const tpl = document.getElementById("bg-card-template");
  const node = tpl.content.firstElementChild.cloneNode(true);

  const img = node.querySelector("img");
  const empty = node.querySelector(".bg-photo-empty");
  const h3 = node.querySelector("h3");
  const p = node.querySelector("p");
  const fileInput = node.querySelector("input[type=file]");
  const uploadLabel = node.querySelector(".upload-label");
  const removeBtn = node.querySelector(".btn-remove-photo");
  const status = node.querySelector(".bg-photo-status");

  h3.textContent = section.title;
  p.textContent = section.desc;
  node.dataset.key = section.key;

  function setPreview(url) {
    if (url) {
      img.src = url;
      img.hidden = false;
      empty.hidden = true;
      removeBtn.hidden = false;
    } else {
      img.hidden = true;
      img.src = "";
      empty.hidden = false;
      removeBtn.hidden = true;
    }
  }
  setPreview(currentUrl);

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      status.textContent = "Merci de choisir un fichier image.";
      status.className = "bg-photo-status error";
      return;
    }

    uploadLabel.textContent = "Envoi en cours...";
    status.textContent = "";
    status.className = "bg-photo-status";

    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `backgrounds/${section.key}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const publicUrl = publicData.publicUrl;

      const { error: upsertError } = await supabase
        .from("site_settings")
        .upsert({ key: section.key, value: publicUrl }, { onConflict: "key" });
      if (upsertError) throw upsertError;

      setPreview(publicUrl);
      showMsg("Photo mise à jour. Elle apparaît déjà sur le site.", false);
    } catch (err) {
      status.textContent = "Échec de l'envoi : " + (err.message || err);
      status.className = "bg-photo-status error";
    } finally {
      uploadLabel.textContent = "Choisir une photo";
      fileInput.value = "";
    }
  });

  removeBtn.addEventListener("click", async () => {
    removeBtn.disabled = true;
    try {
      const { error } = await supabase.from("site_settings").delete().eq("key", section.key);
      if (error) throw error;
      setPreview(null);
      showMsg("Photo retirée. La section a repris son fond par défaut.", false);
    } catch (err) {
      status.textContent = "Échec de la suppression : " + (err.message || err);
      status.className = "bg-photo-status error";
    } finally {
      removeBtn.disabled = false;
    }
  });

  return node;
}

async function render() {
  const values = await loadCurrentValues();
  grid.innerHTML = "";
  SECTIONS.forEach((section) => {
    grid.appendChild(buildCard(section, values[section.key]));
  });
}

document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
});

(async function init() {
  const session = await guardSession();
  if (!session) return;
  document.getElementById("admin-email-tag").textContent = session.user.email || "";
  await render();
})();
