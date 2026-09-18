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
    nav: { home: "Accueil", about: "À propos", classes: "Nos cours", apply: "Postuler", contact: "Contact" },
    brand: { sub: "École Tohfa Oran" },
    hero: {
      eyebrow: "Bienvenue à l'École Tohfa Oran",
      title: "Apprendre, créer et grandir dans un même lieu",
      lead: "À l'École Tohfa Oran, nous accompagnons les enfants, les adolescents et les adultes dans leur apprentissage et le développement de leurs talents, dans un environnement éducatif et artistique.",
      cta_classes: "Découvrir nos cours",
      cta_apply: "Postuler maintenant",
    },
    pillars: {
      kicker: "Trois univers, un même accompagnement",
      title: "Ce que l'on apprend chez nous",
      lead: "Trois portes ouvertes sur l'apprentissage : le savoir académique, l'expression artistique et la maîtrise des langues.",
      see_all: "Voir tous les cours",
      academique: { name: "Académique", desc: "Préscolaire, classe préparatoire, cours de soutien et formations." },
      artistique: { name: "Artistique", desc: "Musique, dessin et théâtre pour révéler chaque talent." },
      langues: { name: "Langues", desc: "Apprentissage, conversation et préparation aux examens internationaux." },
    },
    values: {
      kicker: "Notre approche",
      title: "Pourquoi choisir Tohfa",
      item1: { title: "Un accompagnement sur mesure", desc: "Chaque élève progresse à son propre rythme, avec un suivi attentif de nos enseignants." },
      item2: { title: "Un environnement artistique", desc: "L'académique se nourrit de la créativité : musique, dessin et théâtre font pleinement partie du parcours." },
      item3: { title: "Ouvert à tous les âges", desc: "Des tout-petits aux adultes, chacun trouve sa place et son rythme d'apprentissage." },
    },
    cta_banner: {
      title: "Rejoignez-nous !",
      lead: "Les inscriptions sont ouvertes toute l'année. Postulez en quelques minutes et notre équipe vous recontacte rapidement.",
      button: "Déposer ma candidature",
    },
    footer: {
      quicklinks: "Navigation",
      contact: "Contact",
      follow: "Suivez-nous",
      rights: "Tous droits réservés.",
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
    nav: { home: "الرئيسية", about: "من نحن", classes: "دوراتنا", apply: "التسجيل", contact: "تواصل معنا" },
    brand: { sub: "مدرسة تحفة وهران" },
    hero: {
      eyebrow: "مرحباً بكم في مدرسة تحفة وهران",
      title: "التعلّم والإبداع والنمو في مكان واحد",
      lead: "في مدرسة تحفة وهران، نرافق الأطفال والمراهقين والكبار في مسيرتهم التعليمية ونساعدهم على تطوير مواهبهم، في بيئة تعليمية وفنية.",
      cta_classes: "اكتشف دوراتنا",
      cta_apply: "سجّل الآن",
    },
    pillars: {
      kicker: "ثلاثة عوالم، مرافقة واحدة",
      title: "ماذا نتعلم عندنا",
      lead: "ثلاثة أبواب مفتوحة على التعلم: المعرفة الأكاديمية، التعبير الفني، وإتقان اللغات.",
      see_all: "مشاهدة جميع الدورات",
      academique: { name: "أكاديمي", desc: "التحضيري، التمهيدي، دروس الدعم والدورات التكوينية." },
      artistique: { name: "فنون", desc: "الموسيقى والرسم والمسرح للكشف عن موهبة كل طفل." },
      langues: { name: "لغات", desc: "تعلم اللغات، حلقات المحادثة والتحضير للامتحانات الدولية." },
    },
    values: {
      kicker: "منهجنا",
      title: "لماذا تختار تحفة",
      item1: { title: "مرافقة مخصصة", desc: "كل متعلم يتقدم حسب وتيرته الخاصة، بمتابعة دقيقة من أساتذتنا." },
      item2: { title: "بيئة فنية", desc: "الجانب الأكاديمي يتغذى من الإبداع: الموسيقى والرسم والمسرح جزء أساسي من المسار." },
      item3: { title: "مفتوحة لجميع الأعمار", desc: "من الصغار إلى الكبار، يجد كل شخص مكانه ووتيرة تعلمه الخاصة." },
    },
    cta_banner: {
      title: "انضموا إلينا!",
      lead: "التسجيلات مفتوحة طوال العام. قدّم طلبك في دقائق معدودة وسيتواصل معك فريقنا سريعاً.",
      button: "تقديم طلب التسجيل",
    },
    footer: {
      quicklinks: "روابط",
      contact: "تواصل معنا",
      follow: "تابعونا",
      rights: "جميع الحقوق محفوظة.",
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
