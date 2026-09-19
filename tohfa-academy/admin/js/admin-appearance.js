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

/* Compress a photo in the browser before it's uploaded: shrinks it to a
   sensible max size for a section background and re-encodes it as a
   JPEG, which keeps uploads fast and the site light without any visible
   loss in quality. Falls back to the original file if compression fails
   for any reason (e.g. an unsupported format). */
const COMPRESS_MAX_DIMENSION = 1920;
const COMPRESS_QUALITY = 0.82;

async function compressImage(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, COMPRESS_MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", COMPRESS_QUALITY)
    );
    if (!blob) return file;

    // Only use the compressed version if it's actually smaller.
    if (blob.size >= file.size) return file;
    return new File([blob], (file.name || "photo").replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch (e) {
    console.warn("Photo compression skipped, uploading original.", e);
    return file;
  }
}

async function guardSession() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "/admin";
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

    uploadLabel.textContent = "Compression...";
    status.textContent = "";
    status.className = "bg-photo-status";

    try {
      const compressed = await compressImage(file);

      uploadLabel.textContent = "Envoi en cours...";

      const ext = (compressed.name.split(".").pop() || "jpg").toLowerCase();
      const path = `backgrounds/${section.key}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, compressed, { cacheControl: "3600", upsert: false, contentType: compressed.type || file.type });
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
  window.location.href = "/admin";
});

/* ---------- Contact page map ---------- */
const mapInput = document.getElementById("map-url-input");
const mapSaveBtn = document.getElementById("map-save-btn");
const mapResetBtn = document.getElementById("map-reset-btn");
const mapStatus = document.getElementById("map-status");

function showMapStatus(text, isError) {
  mapStatus.textContent = text;
  mapStatus.className = "bg-photo-status" + (isError ? " error" : "");
}

async function loadMapValue() {
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact_map")
    .maybeSingle();
  mapInput.value = (data && data.value) || "";
}

mapSaveBtn.addEventListener("click", async () => {
  const value = mapInput.value.trim();
  if (!value) {
    showMapStatus("Merci de coller un lien ou une adresse.", true);
    return;
  }
  mapSaveBtn.disabled = true;
  try {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "contact_map", value }, { onConflict: "key" });
    if (error) throw error;
    showMsg("Carte mise à jour. Elle apparaît déjà sur la page Contact.", false);
    showMapStatus("");
  } catch (err) {
    showMapStatus("Échec de l'enregistrement : " + (err.message || err), true);
  } finally {
    mapSaveBtn.disabled = false;
  }
});

mapResetBtn.addEventListener("click", async () => {
  mapResetBtn.disabled = true;
  try {
    const { error } = await supabase.from("site_settings").delete().eq("key", "contact_map");
    if (error) throw error;
    mapInput.value = "";
    showMsg("Carte réinitialisée. La page Contact a repris sa carte par défaut.", false);
    showMapStatus("");
  } catch (err) {
    showMapStatus("Échec de la réinitialisation : " + (err.message || err), true);
  } finally {
    mapResetBtn.disabled = false;
  }
});

(async function init() {
  const session = await guardSession();
  if (!session) return;
  document.getElementById("admin-email-tag").textContent = session.user.email || "";
  await render();
  await loadMapValue();
})();
