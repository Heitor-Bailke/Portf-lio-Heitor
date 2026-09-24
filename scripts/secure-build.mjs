import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const path = new URL("../dist/heitor-dev-portfolio/browser/index.html", import.meta.url);
let html = await readFile(path, "utf8");
// Rebuild the policy from the final HTML so the theme initializer keeps working.
html = html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*>/gi, "");
const hashes = [];
for (const [, attributes, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (!/\bsrc\s*=/i.test(attributes) && content.trim()) {
    hashes.push(`'sha256-${createHash("sha256").update(content).digest("base64")}'`);
  }
}
// Inline styles are needed by Angular bindings; inline scripts and eval are not.
// frame-ancestors and HSTS require response headers, not a meta element.
const policy = [
  "default-src 'self'",
  `script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ ${hashes.join(" ")}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.emailjs.com https://www.google.com/recaptcha/",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
].join("; ");
if (!/<meta charset="utf-8"\s*\/?>/i.test(html)) throw new Error("Missing charset insertion point");
if (/\son(?:load|error|click)\s*=/i.test(html)) throw new Error("Inline event handler conflicts with CSP");
html = html.replace(/(<meta charset="utf-8"\s*\/?>)/i, `$1\n    <meta http-equiv="Content-Security-Policy" content="${policy}">`);
await writeFile(path, html);
console.log("Production CSP generated; EmailJS endpoint and theme initializer allowed.");
