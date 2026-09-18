/**
 * Minimal, dependency-free i18n engine.
 *
 * Usage in HTML:
 *   <span data-i18n="hero.title">Fallback French text</span>
 *   <input data-i18n-placeholder="apply.class_placeholder">
 *
 * Keys are dot-paths into the TOHFA_DICT object below. Language choice
 * is persisted in localStorage and applied on every page load.
 */
window.TOHFA_DICT = {
  fr: {
    nav: { home: "Accueil", about: "À propos", classes: "Nos formations", apply: "Postuler", contact: "Contact" },
    brand: { sub: "École Tohfa Oran" },
    hero: {
      eyebrow: "Bienvenue à l'École Tohfa Oran",
      title_line1: "Apprendre, plus",
      title_line2: "qu'un savoir :",
      title_gold: "une place pour chacun",
      lead: "À l'École Tohfa Oran, nous accompagnons les enfants, les adolescents et les adultes dans leur parcours éducatif et artistique, dans un environnement bienveillant et inspirant.",
      cta_classes: "Découvrir nos formations",
      cta_apply: "Postuler maintenant",
    },
    pillars: {
      kicker: "Nos formations",
      title: "Ce que l'on apprend chez nous",
      lead: "Des ouvertures sur plusieurs mondes, avec une offre variée des plus enrichissantes : l'académique, l'expression artistique et la maîtrise des langues.",
      side_note: "Des parcours adaptés à chaque âge et à chaque talent.",
      see_all: "En savoir plus",
      academique: { name: "Académique", desc: "Maternelle, classes préparatoires, cours de soutien et formations continues." },
      artistique: { name: "Artistique", desc: "Musique, dessin et théâtre pour développer votre talent." },
      langues: { name: "Langues", desc: "Apprentissage, conversation et préparation aux examens internationaux." },
    },
    values: {
      kicker: "Notre approche",
      title: "Pourquoi choisir Tohfa ?",
      item1: { title: "Un accompagnement sur mesure", desc: "Un suivi personnalisé pour chaque apprenant." },
      item2: { title: "Un environnement créatif", desc: "Musique, art et culture au cœur de notre pédagogie." },
      item3: { title: "Ouvert à tous les âges", desc: "Des enfants aux adultes, chacun trouve sa place." },
      item4: { title: "Une équipe passionnée", desc: "Des formateurs qualifiés, engagés et bienveillants." },
    },
    cta_banner: {
      kicker: "Rejoignez-nous",
      title: "Votre avenir commence ici",
      lead: "Les inscriptions sont ouvertes. Prenez quelques minutes et équipez-vous pour un contact rapide.",
      button: "Déposer ma candidature",
      script: "Ensemble pour un avenir meilleur",
    },
    footer: {
      quicklinks: "Navigation",
      contact: "Contact",
      follow: "Suivez-nous",
      rights: "Tous droits réservés.",
      tagline: "Apprendre aujourd'hui, bâtir demain",
    },
    about: {
      eyebrow: "À propos de nous",
      title: "L'École Tohfa Oran",
      lead: "À l'École Tohfa Oran, nous accompagnons les enfants, les adolescents et les adultes dans leur apprentissage et le développement de leurs talents, dans un environnement éducatif et artistique.",
      mission_title: "Notre mission",
      mission_text: "Offrir, dans un même lieu, un accompagnement académique solide et un espace d'expression artistique, pour que chaque élève puisse apprendre, créer et progresser avec confiance — quel que soit son âge.",
      approach_title: "Notre approche",
      approach_text: "Nos enseignants adaptent leur pédagogie au rythme de chaque élève. Le soutien scolaire, l'apprentissage des langues et les ateliers artistiques sont pensés comme des parcours complémentaires plutôt que cloisonnés.",
      environment_title: "Un lieu pensé pour apprendre",
      environment_text: "Nos espaces sont conçus pour être à la fois studieux et chaleureux : salles de cours, ateliers artistiques et espaces dédiés à la pratique des langues, situés à Bir El Djir, Oran.",
    },
    classes: {
      eyebrow: "Programmes",
      title: "Nos cours",
      lead: "Cliquez sur un cours pour découvrir son contenu en détail.",
      more: "Voir les détails",
      modal_apply: "Postuler pour ce cours",
      modal_close: "Fermer",
      filter_all: "Tous",
    },
    apply: {
      eyebrow: "Inscription",
      title: "Postuler à l'École Tohfa",
      lead: "Remplissez ce formulaire en quelques minutes, notre équipe vous recontactera pour finaliser votre inscription.",
      first_name: "Prénom",
      last_name: "Nom",
      phone: "Téléphone",
      class: "Classe souhaitée",
      class_placeholder: "Choisissez une classe",
      email: "Email",
      note: "Message (optionnel)",
      note_placeholder: "Précisez ici une information utile : disponibilités, niveau, questions particulières...",
      optional: "optionnel",
      required_note: "Les champs marqués d'un astérisque (*) sont obligatoires.",
      submit: "Envoyer ma candidature",
      submitting: "Envoi en cours...",
      success_title: "Candidature envoyée !",
      success_text: "Merci ! Votre demande a bien été reçue. Notre équipe vous contactera très prochainement au numéro indiqué.",
      success_cta: "Retour à l'accueil",
      error_text: "Une erreur est survenue lors de l'envoi. Vérifiez votre connexion et réessayez, ou contactez-nous directement par téléphone.",
      config_warning: "La configuration Supabase n'est pas encore renseignée : ce formulaire fonctionne en mode démonstration et n'enregistre rien pour l'instant.",
    },
    contact: {
      eyebrow: "Nous contacter",
      title: "Contact",
      lead: "Une question ? Contactez-nous directement, ou passez nous voir à Bir El Djir.",
      address_label: "Adresse",
      phone_label: "Téléphone",
      whatsapp_label: "WhatsApp",
      social_label: "Réseaux sociaux",
      map_title: "Nous trouver sur la carte",
      details_title: "Nos coordonnées",
    },
  },
  ar: {
    nav: { home: "الرئيسية", about: "من نحن", classes: "برامجنا", apply: "التسجيل", contact: "تواصل معنا" },
    brand: { sub: "مدرسة تحفة وهران" },
    hero: {
      eyebrow: "مرحباً بكم في مدرسة تحفة وهران",
      title_line1: "التعلّم أبعد",
      title_line2: "من المعرفة:",
      title_gold: "مكان لكل واحد منكم",
      lead: "في مدرسة تحفة وهران، نرافق الأطفال والمراهقين والكبار في مسارهم التعليمي والفني، في بيئة داعمة وملهمة.",
      cta_classes: "اكتشف برامجنا",
      cta_apply: "سجّل الآن",
    },
    pillars: {
      kicker: "برامجنا",
      title: "ماذا نتعلم عندنا",
      lead: "انفتاح على عوالم متعددة، بعرض متنوع وغني: الجانب الأكاديمي، التعبير الفني، وإتقان اللغات.",
      side_note: "مسارات مصممة حسب كل عمر وكل موهبة.",
      see_all: "اكتشف المزيد",
      academique: { name: "أكاديمي", desc: "التحضيري، التمهيدي، دروس الدعم والدورات التكوينية." },
      artistique: { name: "فنون", desc: "الموسيقى والرسم والمسرح لتطوير موهبتك." },
      langues: { name: "لغات", desc: "تعلم اللغات، حلقات المحادثة والتحضير للامتحانات الدولية." },
    },
    values: {
      kicker: "منهجنا",
      title: "لماذا تختار تحفة؟",
      item1: { title: "مرافقة مخصصة", desc: "متابعة شخصية لكل متعلم." },
      item2: { title: "بيئة إبداعية", desc: "الموسيقى والفن والثقافة في صميم منهجنا." },
      item3: { title: "مفتوحة لجميع الأعمار", desc: "من الأطفال إلى الكبار، لكل شخص مكانه." },
      item4: { title: "فريق شغوف", desc: "مكوّنون مؤهلون، ملتزمون ومتفانون." },
    },
    cta_banner: {
      kicker: "انضموا إلينا",
      title: "مستقبلك يبدأ من هنا",
      lead: "التسجيلات مفتوحة. خذ بضع دقائق لتجهّز نفسك لتواصل سريع.",
      button: "تقديم طلب التسجيل",
      script: "معاً نحو مستقبل أفضل",
    },
    footer: {
      quicklinks: "روابط",
      contact: "تواصل معنا",
      follow: "تابعونا",
      rights: "جميع الحقوق محفوظة.",
      tagline: "نتعلّم اليوم، نبني الغد",
    },
    about: {
      eyebrow: "من نحن",
      title: "مدرسة تحفة وهران",
      lead: "في مدرسة تحفة وهران، نرافق الأطفال والمراهقين والكبار في مسيرتهم التعليمية ونساعدهم على تطوير مواهبهم، في بيئة تعليمية وفنية.",
      mission_title: "رسالتنا",
      mission_text: "أن نقدّم، في مكان واحد، مرافقة أكاديمية متينة وفضاءً للتعبير الفني، ليتمكن كل متعلم من التعلّم والإبداع والتقدّم بثقة، مهما كان سنّه.",
      approach_title: "منهجنا",
      approach_text: "يكيّف أساتذتنا طرق تدريسهم مع وتيرة كل متعلم. الدعم المدرسي وتعلم اللغات والورشات الفنية مصممة كمسارات متكاملة وليست منفصلة.",
      environment_title: "فضاء مُصمَّم للتعلّم",
      environment_text: "فضاءاتنا مصممة لتكون دراسية ودافئة في آن واحد: قاعات دروس، ورشات فنية وفضاءات مخصصة لممارسة اللغات، وتقع بفرناند فيل، بئر الجير، وهران.",
    },
    classes: {
      eyebrow: "البرامج",
      title: "دوراتنا",
      lead: "اضغط على أي دورة لاكتشاف تفاصيلها كاملة.",
      more: "عرض التفاصيل",
      modal_apply: "التسجيل في هذه الدورة",
      modal_close: "إغلاق",
      filter_all: "الكل",
    },
    apply: {
      eyebrow: "التسجيل",
      title: "التسجيل في مدرسة تحفة",
      lead: "املأ هذه الاستمارة في دقائق معدودة، وسيتواصل معك فريقنا لإتمام تسجيلك.",
      first_name: "الاسم",
      last_name: "اللقب",
      phone: "رقم الهاتف",
      class: "الدورة المرغوبة",
      class_placeholder: "اختر دورة",
      email: "البريد الإلكتروني",
      note: "ملاحظة (اختياري)",
      note_placeholder: "أضف هنا أي معلومة مفيدة: التوفر، المستوى، أسئلة خاصة...",
      optional: "اختياري",
      required_note: "الحقول المشار إليها بعلامة (*) إلزامية.",
      submit: "إرسال طلب التسجيل",
      submitting: "جارٍ الإرسال...",
      success_title: "تم إرسال طلبك!",
      success_text: "شكراً لك! تم استلام طلبك بنجاح. سيتواصل معك فريقنا قريباً على الرقم المذكور.",
      success_cta: "العودة إلى الرئيسية",
      error_text: "حدث خطأ أثناء الإرسال. تحقق من اتصالك وحاول مجدداً، أو تواصل معنا مباشرة عبر الهاتف.",
      config_warning: "لم يتم إعداد Supabase بعد: هذه الاستمارة تعمل في وضع تجريبي ولا تسجّل أي بيانات حالياً.",
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "اتصل بنا",
      lead: "لديك سؤال؟ تواصل معنا مباشرة، أو زرنا في بئر الجير.",
      address_label: "العنوان",
      phone_label: "الهاتف",
      whatsapp_label: "واتساب",
      social_label: "شبكات التواصل الاجتماعي",
      map_title: "موقعنا على الخريطة",
      details_title: "معلومات الاتصال",
    },
  },
};

(function () {
  const STORAGE_KEY = "tohfa_lang";

  function getPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function applyLanguage(lang) {
    const dict = window.TOHFA_DICT[lang] || window.TOHFA_DICT.fr;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = getPath(dict, el.getAttribute("data-i18n"));
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = getPath(dict, el.getAttribute("data-i18n-placeholder"));
      if (value !== undefined) el.setAttribute("placeholder", value);
    });
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.dispatchEvent(new CustomEvent("tohfa:lang-changed", { detail: { lang, dict } }));
  }

  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  }

  function initLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const lang = saved === "ar" || saved === "fr" ? saved : "fr";
    applyLanguage(lang);

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
    });
  }

  window.TohfaI18n = { setLanguage, getCurrentLang: () => document.documentElement.lang || "fr" };

  document.addEventListener("DOMContentLoaded", initLanguage);
})();
