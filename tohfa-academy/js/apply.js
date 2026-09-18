(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("apply-form");
    if (!form) return;

    const msg = document.getElementById("form-msg");
    const submitBtn = document.getElementById("apply-submit");
    const cardBody = document.getElementById("apply-card-body");
    const successState = document.getElementById("apply-success");

    function showMessage(type, text) {
      msg.textContent = text;
      msg.className = `form-msg show ${type}`;
    }

    function currentDict() {
      const lang = window.TohfaI18n ? window.TohfaI18n.getCurrentLang() : "fr";
      return window.TOHFA_DICT[lang].apply;
    }

    if (!window.tohfaSupabaseConfigured) {
      window.addEventListener("tohfa:supabase-ready", (e) => {
        if (!e.detail.configured) showMessage("error", currentDict().config_warning);
      });
      setTimeout(() => {
        if (!window.tohfaSupabaseConfigured) showMessage("error", currentDict().config_warning);
      }, 600);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.className = "form-msg";

      const payload = {
        first_name: form.first_name.value.trim(),
        last_name: form.last_name.value.trim(),
        phone: form.phone.value.trim(),
        class_id: form.class_id.value,
        email: form.email.value.trim() || null,
        note: form.note.value.trim() || null,
      };

      if (!payload.first_name || !payload.last_name || !payload.phone || !payload.class_id) {
        showMessage("error", currentDict().required_note);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = currentDict().submitting;

      try {
        if (!window.tohfaSupabase) throw new Error("Supabase not configured");

        const { error } = await window.tohfaSupabase.from("applications").insert([payload]);
        if (error) throw error;

        const dict = currentDict();
        cardBody.style.display = "none";
        successState.style.display = "block";
        successState.querySelector("h3").textContent = dict.success_title;
        successState.querySelector("p").textContent = dict.success_text;
        successState.querySelector("a").textContent = dict.success_cta;
      } catch (err) {
        console.error(err);
        showMessage("error", currentDict().error_text);
        submitBtn.disabled = false;
        submitBtn.textContent = currentDict().submit;
      }
    });
  });
})();
