import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const configured =
  window.TOHFA_SUPABASE_URL &&
  window.TOHFA_SUPABASE_ANON_KEY &&
  !window.TOHFA_SUPABASE_URL.includes("YOUR-PROJECT") &&
  !window.TOHFA_SUPABASE_ANON_KEY.includes("YOUR-ANON");

const form = document.getElementById("login-form");
const msg = document.getElementById("login-msg");
const submitBtn = document.getElementById("login-submit");

function showError(text) {
  msg.textContent = text;
  msg.className = "login-msg show error";
}

if (!configured) {
  showError("Configuration Supabase manquante : renseignez /js/supabase-config.js avant de vous connecter.");
  submitBtn.disabled = true;
} else {
  const supabase = createClient(window.TOHFA_SUPABASE_URL, window.TOHFA_SUPABASE_ANON_KEY);
  window.tohfaAdminSupabase = supabase;

  // Already logged in? Skip straight to the dashboard.
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) window.location.href = "dashboard.html";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.className = "login-msg";
    submitBtn.disabled = true;
    submitBtn.textContent = "Connexion...";

    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError("Identifiants incorrects, ou compte inexistant. Vérifiez et réessayez.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Se connecter";
      return;
    }

    window.location.href = "dashboard.html";
  });
}
