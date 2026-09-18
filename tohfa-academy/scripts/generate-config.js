/**
 * Runs during Vercel's build step. Reads SUPABASE_URL and
 * SUPABASE_ANON_KEY from the environment and writes them into
 * js/supabase-config.js, so real values never have to live in the repo.
 *
 * If the env vars aren't set (e.g. running locally without them), the
 * existing file is left untouched — handy for local previews where
 * you've already filled it in by hand.
 */
const fs = require("fs");
const path = require("path");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

const outPath = path.join(__dirname, "..", "js", "supabase-config.js");

if (!url || !key) {
  console.log("SUPABASE_URL / SUPABASE_ANON_KEY not set — leaving js/supabase-config.js unchanged.");
  process.exit(0);
}

const contents = `/**
 * Auto-generated at build time from Vercel environment variables
 * (SUPABASE_URL, SUPABASE_ANON_KEY). Do not edit by hand — edit the
 * environment variables in Vercel instead and redeploy.
 */
window.TOHFA_SUPABASE_URL = ${JSON.stringify(url)};
window.TOHFA_SUPABASE_ANON_KEY = ${JSON.stringify(key)};
`;

fs.writeFileSync(outPath, contents);
console.log("Wrote js/supabase-config.js from environment variables.");
