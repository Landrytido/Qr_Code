#!/usr/bin/env node

/**
 * 🔍 QR Studio SEO Checker
 * Script de vérification SEO automatique
 * Usage: node seo-checker.js
 */

// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const path = require("path");

console.log(`
🔍 QR Studio SEO Checker
━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Configuration
const publicDir = "./public";
const srcDir = "./src";
const distDir = "./dist";

// Tests SEO
const seoChecks = {
  // Fichiers essentiels
  "sitemap.xml": { path: `${publicDir}/sitemap.xml`, required: true },
  "robots.txt": { path: `${publicDir}/robots.txt`, required: true },
  "manifest.json": { path: `${publicDir}/manifest.json`, required: true },
  ".htaccess": { path: `${publicDir}/.htaccess`, required: false },

  // Images
  "og-image.png": { path: `${publicDir}/og-image.png`, required: true },
  "icon-192.png": { path: `${publicDir}/icon-192.png`, required: true },
  "icon-512.png": { path: `${publicDir}/icon-512.png`, required: true },

  // Composants
  "SEOHead.jsx": { path: `${srcDir}/components/SEOHead.jsx`, required: true },
};

// Vérification des fichiers
function checkFiles() {
  console.log("📁 Vérification des fichiers...\n");

  let passed = 0;
  let failed = 0;

  Object.entries(seoChecks).forEach(([name, config]) => {
    const exists = fs.existsSync(config.path);
    const status = exists ? "✅" : config.required ? "❌" : "⚠️";
    const statusText = exists
      ? "OK"
      : config.required
      ? "MANQUANT"
      : "OPTIONNEL";

    console.log(`${status} ${name.padEnd(20)} ${statusText}`);

    if (exists || !config.required) {
      passed++;
    } else {
      failed++;
    }
  });

  console.log(`\n📊 Résultat : ${passed} ✅ | ${failed} ❌\n`);
  return failed === 0;
}

// Vérification du contenu HTML
function checkHTMLContent() {
  console.log("🔍 Vérification du contenu HTML...\n");

  const htmlPath = "./index.html";
  if (!fs.existsSync(htmlPath)) {
    console.log("❌ index.html non trouvé\n");
    return false;
  }

  const htmlContent = fs.readFileSync(htmlPath, "utf8");

  const htmlChecks = [
    {
      name: "Meta description",
      pattern: /<meta name="description"/,
      required: true,
    },
    { name: "Meta keywords", pattern: /<meta name="keywords"/, required: true },
    {
      name: "Open Graph title",
      pattern: /<meta property="og:title"/,
      required: true,
    },
    {
      name: "Open Graph description",
      pattern: /<meta property="og:description"/,
      required: true,
    },
    {
      name: "Open Graph image",
      pattern: /<meta property="og:image"/,
      required: true,
    },
    {
      name: "Twitter cards",
      pattern: /<meta property="twitter:card"/,
      required: true,
    },
    { name: "Canonical URL", pattern: /<link rel="canonical"/, required: true },
    { name: "Manifest link", pattern: /<link rel="manifest"/, required: true },
    {
      name: "Structured data",
      pattern: /<script type="application\/ld\+json">/,
      required: true,
    },
  ];

  let htmlPassed = 0;
  let htmlFailed = 0;

  htmlChecks.forEach((check) => {
    const found = check.pattern.test(htmlContent);
    const status = found ? "✅" : "❌";
    const statusText = found ? "OK" : "MANQUANT";

    console.log(`${status} ${check.name.padEnd(25)} ${statusText}`);

    if (found) {
      htmlPassed++;
    } else {
      htmlFailed++;
    }
  });

  console.log(`\n📊 HTML SEO : ${htmlPassed} ✅ | ${htmlFailed} ❌\n`);
  return htmlFailed === 0;
}

// Vérification des composants React
function checkReactComponents() {
  console.log("⚛️  Vérification des composants React...\n");

  const pages = [
    `${srcDir}/pages/Home.jsx`,
    `${srcDir}/pages/Generate.jsx`,
    `${srcDir}/components/Pages/Customize.jsx`,
    `${srcDir}/components/Pages/History.jsx`,
  ];

  let reactPassed = 0;
  let reactFailed = 0;

  pages.forEach((pagePath) => {
    const pageName = path.basename(pagePath, ".jsx");

    if (!fs.existsSync(pagePath)) {
      console.log(`❌ ${pageName.padEnd(15)} Fichier non trouvé`);
      reactFailed++;
      return;
    }

    const content = fs.readFileSync(pagePath, "utf8");
    const hasSEOHead = content.includes("SEOHead");

    const status = hasSEOHead ? "✅" : "❌";
    const statusText = hasSEOHead ? "SEOHead présent" : "SEOHead manquant";

    console.log(`${status} ${pageName.padEnd(15)} ${statusText}`);

    if (hasSEOHead) {
      reactPassed++;
    } else {
      reactFailed++;
    }
  });

  console.log(`\n📊 React SEO : ${reactPassed} ✅ | ${reactFailed} ❌\n`);
  return reactFailed === 0;
}

// Vérification du build
function checkBuild() {
  console.log("🔨 Vérification du build...\n");

  if (!fs.existsSync(distDir)) {
    console.log('❌ Dossier dist/ non trouvé. Lance "npm run build"\n');
    return false;
  }

  const distFiles = [
    `${distDir}/index.html`,
    `${distDir}/sitemap.xml`,
    `${distDir}/robots.txt`,
    `${distDir}/manifest.json`,
  ];

  let buildPassed = 0;
  let buildFailed = 0;

  distFiles.forEach((file) => {
    const fileName = path.basename(file);
    const exists = fs.existsSync(file);
    const status = exists ? "✅" : "❌";
    const statusText = exists ? "Copié dans dist" : "Manquant dans dist";

    console.log(`${status} ${fileName.padEnd(15)} ${statusText}`);

    if (exists) {
      buildPassed++;
    } else {
      buildFailed++;
    }
  });

  console.log(`\n📊 Build : ${buildPassed} ✅ | ${buildFailed} ❌\n`);
  return buildFailed === 0;
}

function showRecommendations() {
  console.log(`
🚀 Recommandations SEO
━━━━━━━━━━━━━━━━━━━━━━━━

📈 Prochaines étapes :
1. Génère tes images (og-image.png, icon-192.png, icon-512.png)
2. Configure Google Search Console
3. Soumets ton sitemap.xml
4. Installe Google Analytics
5. Surveille tes performances

🔗 Liens utiles :
• Google Search Console : https://search.google.com/search-console/
• PageSpeed Insights : https://pagespeed.web.dev/
• Mobile-Friendly Test : https://search.google.com/test/mobile-friendly

📊 Mots-clés à cibler :
• QR code gratuit
• générateur QR code
• créer QR code personnalisé
• QR code en ligne français
    `);
}

function main() {
  const filesOK = checkFiles();
  const htmlOK = checkHTMLContent();
  const reactOK = checkReactComponents();
  checkBuild();

  const allOK = filesOK && htmlOK && reactOK;

  console.log(`
🎯 RÉSULTAT FINAL
━━━━━━━━━━━━━━━━━━━━━━━━
${
  allOK
    ? "🎉 Ton SEO est excellent !"
    : "⚠️  Il y a quelques points à améliorer"
}

Score SEO : ${allOK ? "100%" : "À améliorer"}
Prêt pour la production : ${allOK ? "OUI ✅" : "NON ❌"}
    `);

  showRecommendations();

  if (typeof process !== "undefined") {
    process.exit(allOK ? 0 : 1);
  }
}

main();
