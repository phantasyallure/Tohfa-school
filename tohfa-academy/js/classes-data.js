/**
 * Static fallback catalogue for École Tohfa Oran.
 *
 * This mirrors the `classes` table in Supabase (see /README.md for the
 * schema). The site tries to load classes from Supabase first so the
 * academy can edit/add/hide classes from the Supabase table editor
 * without touching code; if Supabase isn't configured yet or the
 * request fails, it falls back to this local list so the site still
 * works out of the box.
 */
window.TOHFA_CATEGORIES = [
  { id: "academique", name_fr: "Académique", name_ar: "أكاديمي" },
  { id: "artistique", name_fr: "Artistique", name_ar: "فنون" },
  { id: "langues", name_fr: "Langues", name_ar: "لغات" },
];

window.TOHFA_CLASSES = [
  {
    id: "prescolaire",
    category: "academique",
    name_fr: "Préscolaire",
    name_ar: "التحضيري",
    teaser_fr: "Un premier pas en douceur vers l'apprentissage, par le jeu et la découverte.",
    teaser_ar: "خطوة أولى هادئة نحو التعلم، من خلال اللعب والاكتشاف.",
    desc_fr: "Un accueil chaleureux pour les tout-petits, dans un cadre rassurant pensé pour l'éveil sensoriel, le langage et la socialisation. Nos éducatrices accompagnent chaque enfant à son rythme, entre jeux, chants et activités manuelles, pour poser les toutes premières bases de sa scolarité.",
    desc_ar: "استقبال دافئ لأطفالنا الصغار، في جو مطمئن مصمم لتنمية الحواس واللغة والتواصل الاجتماعي. تواكب مربياتنا كل طفل حسب وتيرته الخاصة، بين الألعاب والأناشيد والأنشطة اليدوية، لإرساء اللبنات الأولى لمساره الدراسي.",
  },
  {
    id: "preparatoire",
    category: "academique",
    name_fr: "Classe préparatoire",
    name_ar: "التمهيدي",
    teaser_fr: "Préparer sereinement l'entrée en scolarité primaire.",
    teaser_ar: "التحضير الهادئ لدخول المرحلة الابتدائية.",
    desc_fr: "Une transition en douceur vers l'école primaire : lecture, écriture, chiffres et autonomie sont travaillés à travers des activités ludiques et structurées, afin que chaque enfant aborde sa rentrée avec confiance.",
    desc_ar: "انتقال هادئ نحو المدرسة الابتدائية: يتم العمل على القراءة والكتابة والأرقام والاستقلالية من خلال أنشطة تربوية ممتعة ومنظمة، ليخوض كل طفل دخوله المدرسي بثقة.",
  },
  {
    id: "soutien",
    category: "academique",
    name_fr: "Cours de soutien",
    name_ar: "دروس الدعم",
    teaser_fr: "Un accompagnement scolaire ciblé, matière par matière.",
    teaser_ar: "دعم مدرسي مركّز في كل مادة على حدة.",
    desc_fr: "Des séances de soutien adaptées au niveau et aux besoins de chaque élève, pour consolider les acquis, combler les lacunes et reprendre confiance dans les matières qui posent difficulté, du primaire au secondaire.",
    desc_ar: "حصص دعم مصممة حسب مستوى واحتياجات كل تلميذ، لترسيخ المكتسبات وسد الثغرات واستعادة الثقة في المواد التي تشكل صعوبة، من الابتدائي إلى الثانوي.",
  },
  {
    id: "formations",
    category: "academique",
    name_fr: "Formations",
    name_ar: "دورات تكوينية",
    teaser_fr: "Des formations courtes pour développer de nouvelles compétences.",
    teaser_ar: "دورات تكوينية قصيرة لاكتساب مهارات جديدة.",
    desc_fr: "Des cycles de formation destinés aux adolescents et aux adultes souhaitant acquérir de nouvelles compétences pratiques ou professionnelles, dans un format intensif et accompagné.",
    desc_ar: "دورات تكوينية موجهة للمراهقين والكبار الراغبين في اكتساب مهارات عملية أو مهنية جديدة، في صيغة مكثفة ومرفوقة.",
  },
  {
    id: "instruments",
    category: "artistique",
    name_fr: "Instruments de musique",
    name_ar: "تعلم الآلات الموسيقية",
    teaser_fr: "Piano, violon, guitare... apprendre son instrument de cœur.",
    teaser_ar: "بيانو، كمان، غيتار... تعلم الآلة التي تحبها.",
    desc_fr: "Des cours individuels ou en petit groupe pour apprendre un instrument de A à Z, du solfège aux premiers morceaux, avec des enseignants passionnés qui adaptent le rythme à chaque élève.",
    desc_ar: "حصص فردية أو في مجموعات صغيرة لتعلم آلة موسيقية من الصفر، من النظريات الموسيقية إلى أولى المقطوعات، مع أساتذة شغوفين يراعون وتيرة كل متعلم.",
  },
  {
    id: "andalouse",
    category: "artistique",
    name_fr: "Musique andalouse",
    name_ar: "الموسيقى الأندلسية",
    teaser_fr: "Un héritage musical transmis avec passion.",
    teaser_ar: "إرث موسيقي يُنقل بشغف.",
    desc_fr: "L'apprentissage d'un patrimoine musical riche et raffiné : chant, rythmes et instruments traditionnels de la musique andalouse, transmis dans le respect de ses codes et de son histoire.",
    desc_ar: "تعلم إرث موسيقي غني ورفيع: الغناء والإيقاعات والآلات التقليدية للموسيقى الأندلسية، بنقل يحترم قواعدها وتاريخها العريق.",
  },
  {
    id: "dessin",
    category: "artistique",
    name_fr: "Dessin",
    name_ar: "الرسم",
    teaser_fr: "Observer, esquisser, composer : révéler son trait.",
    teaser_ar: "الملاحظة والرسم والتكوين: اكتشاف موهبتك الفنية.",
    desc_fr: "Des ateliers pour apprendre les fondamentaux du dessin (proportions, ombres, perspective) puis explorer différentes techniques — crayon, fusain, couleur — et développer un style personnel.",
    desc_ar: "ورشات لتعلم أساسيات الرسم (النسب، الظلال، المنظور) ثم استكشاف تقنيات متنوعة — الرصاص، الفحم، الألوان — وتطوير أسلوب فني خاص.",
  },
  {
    id: "theatre",
    category: "artistique",
    name_fr: "Théâtre",
    name_ar: "المسرح",
    teaser_fr: "Prendre la scène, travailler la voix et la confiance en soi.",
    teaser_ar: "اعتلاء الخشبة، والعمل على الصوت والثقة بالنفس.",
    desc_fr: "Des ateliers d'expression scénique où l'on travaille la voix, le corps et l'improvisation, pour développer l'aisance à l'oral, la créativité et la confiance en soi, jusqu'à une mise en scène collective.",
    desc_ar: "ورشات للتعبير المسرحي يُشتغل فيها على الصوت والجسد والارتجال، لتنمية الثقة بالنفس والإبداع والقدرة على التعبير الشفهي، وصولاً إلى عرض جماعي.",
  },
  {
    id: "langues-apprentissage",
    category: "langues",
    name_fr: "Apprentissage des langues",
    name_ar: "تعلم اللغات",
    teaser_fr: "Français, anglais, espagnol et plus, pour petits et grands.",
    teaser_ar: "الفرنسية والإنجليزية والإسبانية وغيرها، للصغار والكبار.",
    desc_fr: "Des cours de langues structurés par niveau, pour enfants, adolescents et adultes, combinant grammaire, vocabulaire et mise en pratique, afin de progresser durablement et avec plaisir.",
    desc_ar: "دروس لغات منظمة حسب المستوى، للأطفال والمراهقين والكبار، تجمع بين القواعد والمفردات والتطبيق العملي، لتحقيق تقدم مستمر وممتع.",
  },
  {
    id: "conversation",
    category: "langues",
    name_fr: "Cours de conversation",
    name_ar: "حلقات المحادثة",
    teaser_fr: "Oser parler, gagner en aisance à l'oral.",
    teaser_ar: "الجرأة على التحدث واكتساب الطلاقة الشفهية.",
    desc_fr: "Des ateliers de conversation en petits groupes pour pratiquer une langue à l'oral dans des situations réelles, gagner en fluidité et surmonter la timidité de la prise de parole.",
    desc_ar: "ورشات محادثة في مجموعات صغيرة لممارسة اللغة شفهياً في مواقف حقيقية، واكتساب الطلاقة وتجاوز الخجل في الحديث.",
  },
  {
    id: "examens",
    category: "langues",
    name_fr: "Préparation aux examens",
    name_ar: "التحضير لامتحانات اللغات",
    extra_fr: "TOEFL, IELTS, DELF, DALF...",
    extra_ar: "TOEFL, IELTS, DELF, DALF...",
    teaser_fr: "Une préparation ciblée pour réussir TOEFL, IELTS, DELF, DALF...",
    teaser_ar: "تحضير مركّز للنجاح في TOEFL وIELTS وDELF وDALF...",
    desc_fr: "Un accompagnement méthodique pour se préparer aux certifications internationales de langues (TOEFL, IELTS, DELF, DALF...) : entraînement aux épreuves, stratégies d'examen et simulations dans les conditions réelles.",
    desc_ar: "مرافقة منهجية للتحضير للشهادات الدولية في اللغات (TOEFL وIELTS وDELF وDALF...): التدرب على الاختبارات واستراتيجيات الامتحان ومحاكاة الظروف الحقيقية.",
  },
];
