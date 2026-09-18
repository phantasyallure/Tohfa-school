# École Tohfa Oran — site officiel

Site vitrine bilingue (français / arabe) pour l'École Tohfa Oran, avec un
formulaire d'inscription connecté à Supabase et un espace d'administration
séparé pour consulter et gérer les candidatures.

Plain HTML/CSS/JS — no build step, no framework, deploys as-is on Vercel.

## Structure

```
/                     ← site public
  index.html          Accueil
  about.html          À propos
  classes.html        Catalogue des cours (clic = détail sans changer de page)
  apply.html          Formulaire d'inscription
  contact.html        Coordonnées + carte
  css/style.css        Design system du site public
  js/
    classes-data.js    Catalogue de cours par défaut (secours hors-ligne)
    supabase-config.js Clés Supabase à renseigner
    supabase-client.js Initialise le client Supabase (utilisé par le site public)
    i18n.js            Dictionnaire FR/AR + bascule de langue
    main.js            Nav mobile, rendu des cours, fenêtre de détail
    apply.js           Envoi du formulaire vers Supabase

/admin/               ← espace d'administration, entièrement séparé
  index.html           Connexion (email / mot de passe Supabase Auth)
  dashboard.html        Liste des candidatures, filtres, statuts
  css/admin.css
  js/admin-auth.js
  js/admin-dashboard.js
```

`/admin` n'est jamais lié depuis la navigation du site public — on y accède
uniquement en tapant l'adresse `/admin` directement.

## 1. Créer le projet Supabase

1. Allez sur [supabase.com](https://supabase.com) → **New project**.
2. Une fois le projet créé, ouvrez **SQL Editor** et exécutez le script
   ci-dessous. Il crée les deux tables (`classes`, `applications`), active
   la sécurité au niveau des lignes (RLS) et pré-remplit le catalogue de
   cours à partir du flyer de l'école.

```sql
create extension if not exists pgcrypto;

create table if not exists classes (
  id text primary key,
  category text not null check (category in ('academique','artistique','langues')),
  name_fr text not null,
  name_ar text not null,
  teaser_fr text,
  teaser_ar text,
  description_fr text not null,
  description_ar text not null,
  extra_fr text,
  extra_ar text,
  sort_order int default 0
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  class_id text references classes(id),
  email text,
  note text,
  status text not null default 'nouveau'
    check (status in ('nouveau','contacte','inscrit','refuse'))
);

alter table classes enable row level security;
alter table applications enable row level security;

-- Anyone visiting the site can read the class catalogue...
create policy "public can read classes" on classes
  for select to anon using (true);

-- ...and submit an application...
create policy "public can insert applications" on applications
  for insert to anon with check (true);

-- ...but only logged-in admins can read, update or delete applications.
create policy "admins can read applications" on applications
  for select to authenticated using (true);
create policy "admins can update applications" on applications
  for update to authenticated using (true);
create policy "admins can delete applications" on applications
  for delete to authenticated using (true);

-- Seed the catalogue from the school's flyer
insert into classes (id, category, name_fr, name_ar, teaser_fr, teaser_ar, description_fr, description_ar, extra_fr, extra_ar, sort_order) values
('prescolaire','academique','Préscolaire','التحضيري','Un premier pas en douceur vers l''apprentissage.','خطوة أولى هادئة نحو التعلم.','Un accueil chaleureux pour les tout-petits, dans un cadre rassurant pensé pour l''éveil sensoriel, le langage et la socialisation.','استقبال دافئ لأطفالنا الصغار، في جو مطمئن مصمم لتنمية الحواس واللغة والتواصل الاجتماعي.',null,null,1),
('preparatoire','academique','Classe préparatoire','التمهيدي','Préparer sereinement l''entrée en primaire.','التحضير الهادئ لدخول المرحلة الابتدائية.','Une transition en douceur vers l''école primaire : lecture, écriture, chiffres et autonomie.','انتقال هادئ نحو المدرسة الابتدائية: القراءة والكتابة والأرقام والاستقلالية.',null,null,2),
('soutien','academique','Cours de soutien','دروس الدعم','Un accompagnement scolaire ciblé.','دعم مدرسي مركّز.','Des séances de soutien adaptées au niveau de chaque élève, du primaire au secondaire.','حصص دعم مصممة حسب مستوى كل تلميذ، من الابتدائي إلى الثانوي.',null,null,3),
('formations','academique','Formations','دورات تكوينية','Des formations courtes pour développer de nouvelles compétences.','دورات تكوينية قصيرة لاكتساب مهارات جديدة.','Des cycles de formation pour adolescents et adultes souhaitant acquérir de nouvelles compétences.','دورات تكوينية للمراهقين والكبار الراغبين في اكتساب مهارات جديدة.',null,null,4),
('instruments','artistique','Instruments de musique','تعلم الآلات الموسيقية','Piano, violon, guitare...','بيانو، كمان، غيتار...','Des cours individuels ou en petit groupe pour apprendre un instrument de A à Z.','حصص فردية أو جماعية لتعلم آلة موسيقية من الصفر.',null,null,5),
('andalouse','artistique','Musique andalouse','الموسيقى الأندلسية','Un héritage musical transmis avec passion.','إرث موسيقي يُنقل بشغف.','L''apprentissage d''un patrimoine musical riche : chant, rythmes et instruments traditionnels.','تعلم إرث موسيقي غني: الغناء والإيقاعات والآلات التقليدية.',null,null,6),
('dessin','artistique','Dessin','الرسم','Observer, esquisser, composer.','الملاحظة والرسم والتكوين.','Des ateliers pour apprendre les fondamentaux du dessin puis développer un style personnel.','ورشات لتعلم أساسيات الرسم وتطوير أسلوب فني خاص.',null,null,7),
('theatre','artistique','Théâtre','المسرح','Prendre la scène, gagner en confiance.','اعتلاء الخشبة، وبناء الثقة بالنفس.','Des ateliers d''expression scénique : voix, corps et improvisation.','ورشات للتعبير المسرحي: الصوت والجسد والارتجال.',null,null,8),
('langues-apprentissage','langues','Apprentissage des langues','تعلم اللغات','Français, anglais, espagnol et plus.','الفرنسية والإنجليزية والإسبانية وغيرها.','Des cours de langues structurés par niveau, pour enfants, adolescents et adultes.','دروس لغات منظمة حسب المستوى، للأطفال والمراهقين والكبار.',null,null,9),
('conversation','langues','Cours de conversation','حلقات المحادثة','Oser parler, gagner en aisance à l''oral.','الجرأة على التحدث واكتساب الطلاقة.','Des ateliers de conversation en petits groupes pour pratiquer une langue à l''oral.','ورشات محادثة في مجموعات صغيرة لممارسة اللغة شفهياً.',null,null,10),
('examens','langues','Préparation aux examens','التحضير لامتحانات اللغات','Réussir TOEFL, IELTS, DELF, DALF...','النجاح في TOEFL وIELTS وDELF وDALF...','Un accompagnement méthodique pour se préparer aux certifications internationales de langues.','مرافقة منهجية للتحضير للشهادات الدولية في اللغات.','TOEFL, IELTS, DELF, DALF...','TOEFL, IELTS, DELF, DALF...',11);
```

### Adding / editing classes later

You can add, hide, or edit classes any time straight from **Table editor →
classes** in Supabase — no code changes needed. The public site and the
apply-form dropdown both read from this table automatically.

## 2. Create an admin account

There is no public sign-up — that's what keeps `/admin` separate and
locked down. To create your own admin login:

1. In Supabase, go to **Authentication → Users → Add user**.
2. Enter the admin's email and a password, and confirm the user (or send
   an invite, depending on your Supabase settings).
3. That's it — this person can now sign in at `yoursite.com/admin`.

Repeat for every staff member who needs dashboard access.

## 3. Configure the site

Open `js/supabase-config.js` and fill in your project's values (found in
**Project Settings → API** in Supabase):

```js
window.TOHFA_SUPABASE_URL = "https://xxxxx.supabase.co";
window.TOHFA_SUPABASE_ANON_KEY = "eyJ....";
```

Only ever use the **anon / public** key here — never the `service_role`
key, which must stay private.

## 4. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **New Project** → import that repository.
3. Framework preset: **Other** (it's a static site, no build command
   needed). Leave the build command and output directory empty/default.
4. Deploy. Your site will be live at `your-project.vercel.app`, with the
   admin panel at `your-project.vercel.app/admin`.
5. (Optional) Add your own domain under **Settings → Domains**.

`vercel.json` already enables clean URLs, so `/classes` works instead of
`/classes.html`, and `/admin` instead of `/admin/index.html`.

## Notes

- The apply form and class dropdown work in a harmless "demo" mode (with a
  small warning message) until `supabase-config.js` is filled in, so you
  can preview the site before wiring up Supabase.
- All application data lives only in your Supabase project — nothing is
  stored by this codebase itself.
- Update the placeholder social links (Facebook/Instagram/TikTok) and the
  contact email in the HTML files with your real profile URLs when ready.
