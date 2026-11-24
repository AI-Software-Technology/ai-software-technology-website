import fs from 'node:fs';
import path from 'node:path';
import {
  SITE_URL,
  discoverPublicRoutes,
  getTodayUtcDate,
  isValidIsoDate,
  isExcludedRoutePath,
} from './route-discovery.mjs';

const VALID_CHANGEFREQ = new Set([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
]);

function parseSitemapUrls(xmlContent) {
  const errors = [];
  const trimmed = xmlContent.trim();

  if (!trimmed.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('Missing or invalid XML declaration header.');
  }
  if (!trimmed.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    errors.push('Missing official sitemaps.org 0.9 <urlset> namespace.');
  }
  if (!trimmed.endsWith('</urlset>')) {
    errors.push('Malformed XML: missing closing </urlset> tag.');
  }

  const urls = [];
  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;
  while ((match = urlBlockRegex.exec(xmlContent)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    const changefreqMatch = block.match(/<changefreq>([^<]+)<\/changefreq>/);
    const priorityMatch = block.match(/<priority>([^<]+)<\/priority>/);

    if (!locMatch) {
      errors.push('Found <url> block missing required <loc> element.');
      continue;
    }

    urls.push({
      loc: locMatch[1].trim(),
      lastmod: lastmodMatch ? lastmodMatch[1].trim() : null,
      changefreq: changefreqMatch ? changefreqMatch[1].trim() : null,
      priority: priorityMatch ? priorityMatch[1].trim() : null,
    });
  }

  return { urls, xmlErrors: errors };
}

function getPrerenderedPaths(distDir, routePath) {
  if (routePath === '/') {
    return [path.join(distDir, 'index.html')];
  }
  const cleanRel = routePath.replace(/^\/+/, '');
  return [
    path.join(distDir, cleanRel, 'index.html'),
    path.join(distDir, `${cleanRel}.html`),
  ];
}

export function validateSitemap(options = {}) {
  const distDir = path.resolve(options.distDir || 'dist');
  const publicDir = path.resolve(options.publicDir || 'public');
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const sitemapIndexPath = path.join(distDir, 'sitemap_index.xml');
  const robotsPath = path.join(distDir, 'robots.txt');
  const notFoundPath = path.join(distDir, '404.html');

  const errors = [];
  const warnings = [];
  const todayUtc = getTodayUtcDate();

  // 1. Guard against stale static public/sitemap.xml overwriting build output
  if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
    errors.push(
      'Static public/sitemap.xml exists! Remove it so Vite cannot overwrite the generated dist/sitemap.xml.'
    );
  }
  if (fs.existsSync(path.join(publicDir, 'sitemap_index.xml'))) {
    errors.push(
      'Static public/sitemap_index.xml exists! Remove it so Vite cannot overwrite the generated dist/sitemap_index.xml.'
    );
  }

  // 2. Ensure dist/sitemap.xml and dist/sitemap_index.xml exist
  if (!fs.existsSync(sitemapPath)) {
    errors.push(`Missing generated sitemap file: ${sitemapPath}`);
  }
  if (!fs.existsSync(sitemapIndexPath)) {
    errors.push(`Missing generated sitemap index file: ${sitemapIndexPath}`);
  }

  if (errors.length > 0) {
    printReportAndExit({ errors, warnings, stats: null });
  }

  // 3. Parse and validate XML structure
  const xmlContent = fs.readFileSync(sitemapPath, 'utf8');
  const { urls, xmlErrors } = parseSitemapUrls(xmlContent);
  errors.push(...xmlErrors);

  if (urls.length === 0) {
    errors.push('dist/sitemap.xml contains 0 URLs.');
  }

  // Validate sitemap_index.xml
  const sitemapIndexXml = fs.readFileSync(sitemapIndexPath, 'utf8');
  if (!sitemapIndexXml.includes(`<loc>${SITE_URL}/sitemap.xml</loc>`)) {
    errors.push('dist/sitemap_index.xml does not point to canonical https://aisoftwaretechnology.in/sitemap.xml.');
  }
  const indexLastmodMatch = sitemapIndexXml.match(/<lastmod>([^<]+)<\/lastmod>/);
  if (indexLastmodMatch) {
    const idxDate = indexLastmodMatch[1].trim();
    if (!isValidIsoDate(idxDate) || idxDate > todayUtc) {
      errors.push(`dist/sitemap_index.xml has invalid or future <lastmod>: ${idxDate}`);
    }
  }

  // 4. Discover expected valid public canonical routes
  const { routes: discoveredRoutes } = discoverPublicRoutes({ syncManifest: false });
  const expectedByCanonical = new Map(discoveredRoutes.map((r) => [r.canonicalUrl, r]));

  // 5. Check duplicates, canonical formatting, route validity, lastmod accuracy, prerendered HTML, and noindex
  const seenUrls = new Set();
  const seenNormalizedPaths = new Set();
  const seenTitles = new Map();
  const seenDescriptions = new Map();
  let duplicateCount = 0;
  let duplicateTitleCount = 0;
  let duplicateDescriptionCount = 0;
  let missingTitleCount = 0;
  let missingDescriptionCount = 0;
  let invalidH1Count = 0;
  let missingImgAltCount = 0;
  let invalidJsonLdCount = 0;
  let missingInternalLinksCount = 0;
  let nonCanonicalCount = 0;
  let invalidRouteCount = 0;
  let invalidLastmodCount = 0;
  let missingHtmlCount = 0;
  let noindexCount = 0;
  let seoIntegrityIssues = 0;

  const presentLastmods = [];

  for (const entry of urls) {
    const { loc, lastmod, changefreq, priority } = entry;

    // Duplicate check
    if (seenUrls.has(loc)) {
      duplicateCount++;
      errors.push(`Duplicate URL in sitemap: ${loc}`);
      continue;
    }
    seenUrls.add(loc);

    // Canonical HTTPS format check
    if (!loc.startsWith(`${SITE_URL}/`)) {
      nonCanonicalCount++;
      errors.push(`Non-canonical origin or protocol: ${loc}`);
      continue;
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(loc);
    } catch {
      nonCanonicalCount++;
      errors.push(`Invalid URL syntax: ${loc}`);
      continue;
    }

    if (parsedUrl.search || parsedUrl.hash) {
      nonCanonicalCount++;
      errors.push(`Non-canonical URL contains query or fragment: ${loc}`);
    }
    if (parsedUrl.pathname !== '/' && parsedUrl.pathname.endsWith('/')) {
      nonCanonicalCount++;
      errors.push(`Non-canonical trailing slash on non-root URL: ${loc}`);
    }
    if (parsedUrl.pathname.includes('//')) {
      nonCanonicalCount++;
      errors.push(`Non-canonical double slash in URL path: ${loc}`);
    }

    const routePath = parsedUrl.pathname === '/' ? '/' : parsedUrl.pathname;
    if (seenNormalizedPaths.has(routePath.toLowerCase())) {
      duplicateCount++;
      errors.push(`Case/path duplicate in sitemap: ${loc}`);
    }
    seenNormalizedPaths.add(routePath.toLowerCase());

    // Excluded / invalid route check
    if (isExcludedRoutePath(routePath) || !expectedByCanonical.has(loc)) {
      invalidRouteCount++;
      errors.push(`Invalid, redirected, or undeclared route in sitemap: ${loc}`);
      continue;
    }

    const expectedRoute = expectedByCanonical.get(loc);

    // Optional protocol tag checks
    if (changefreq && !VALID_CHANGEFREQ.has(changefreq)) {
      errors.push(`Invalid <changefreq> "${changefreq}" on ${loc}`);
    }
    if (priority !== null) {
      const pNum = Number(priority);
      if (Number.isNaN(pNum) || pNum < 0 || pNum > 1) {
        errors.push(`Invalid <priority> "${priority}" on ${loc}`);
      }
    }

    // Lastmod verification
    if (lastmod !== null) {
      if (!isValidIsoDate(lastmod)) {
        invalidLastmodCount++;
        errors.push(`Malformed or impossible calendar <lastmod> "${lastmod}" on ${loc}`);
      } else if (lastmod > todayUtc) {
        invalidLastmodCount++;
        errors.push(`Future <lastmod> "${lastmod}" (today is ${todayUtc}) on ${loc}`);
      } else if (lastmod < '2020-01-01') {
        invalidLastmodCount++;
        errors.push(`Suspiciously old <lastmod> "${lastmod}" on ${loc}`);
      } else if (expectedRoute.lastmod && lastmod !== expectedRoute.lastmod) {
        invalidLastmodCount++;
        errors.push(
          `Mismatched <lastmod> on ${loc}: sitemap has "${lastmod}", expected "${expectedRoute.lastmod}".`
        );
      } else {
        presentLastmods.push(lastmod);
      }
    } else if (expectedRoute.lastmod) {
      invalidLastmodCount++;
      errors.push(`Missing verified <lastmod> "${expectedRoute.lastmod}" on ${loc}`);
    }

    // Prerendered HTML existence + canonical + noindex + SEO/GTM checks
    const htmlPaths = getPrerenderedPaths(distDir, routePath);
    for (const htmlFile of htmlPaths) {
      if (!fs.existsSync(htmlFile)) {
        missingHtmlCount++;
        errors.push(`Missing prerendered HTML file for ${loc}: ${path.relative(process.cwd(), htmlFile)}`);
        continue;
      }
      const html = fs.readFileSync(htmlFile, 'utf8');
      if (html.length < 200) {
        missingHtmlCount++;
        errors.push(`Prerendered HTML file appears empty/truncated: ${path.relative(process.cwd(), htmlFile)}`);
        continue;
      }

      // Check robots / googlebot meta for noindex
      const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
      const googlebotMatch = html.match(/<meta\s+name="googlebot"\s+content="([^"]*)"/i);
      if (
        (robotsMatch && robotsMatch[1].toLowerCase().includes('noindex')) ||
        (googlebotMatch && googlebotMatch[1].toLowerCase().includes('noindex'))
      ) {
        noindexCount++;
        errors.push(`Sitemap URL points to a noindex page: ${loc} (${path.relative(process.cwd(), htmlFile)})`);
      }

      // Check canonical tag matches sitemap <loc>
      const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
      if (!canonicalMatch || canonicalMatch[1] !== loc) {
        nonCanonicalCount++;
        errors.push(
          `Canonical tag mismatch in ${path.relative(process.cwd(), htmlFile)}: expected "${loc}", found "${canonicalMatch?.[1] || 'MISSING'}".`
        );
      }

      // Check SEO basics, uniqueness, H1, img alt, JSON-LD parse, internal links, and GTM on primary HTML
      if (htmlFile === htmlPaths[0]) {
        const relFile = path.relative(process.cwd(), htmlFile);

        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (!titleMatch || !titleMatch[1].trim()) {
          missingTitleCount++;
          seoIntegrityIssues++;
          errors.push(`Missing <title> in ${relFile}`);
        } else {
          const normalizedTitle = titleMatch[1].trim();
          if (seenTitles.has(normalizedTitle)) {
            duplicateTitleCount++;
            seoIntegrityIssues++;
            errors.push(
              `Duplicate <title> "${normalizedTitle}" on ${loc} (already used by ${seenTitles.get(normalizedTitle)})`
            );
          } else {
            seenTitles.set(normalizedTitle, loc);
          }
        }

        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
        if (!descMatch || !descMatch[1].trim()) {
          missingDescriptionCount++;
          seoIntegrityIssues++;
          errors.push(`Missing meta description in ${relFile}`);
        } else {
          const normalizedDesc = descMatch[1].trim();
          if (seenDescriptions.has(normalizedDesc)) {
            duplicateDescriptionCount++;
            seoIntegrityIssues++;
            errors.push(
              `Duplicate meta description on ${loc} (already used by ${seenDescriptions.get(normalizedDesc)})`
            );
          } else {
            seenDescriptions.set(normalizedDesc, loc);
          }
        }

        // Single H1 check
        const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
        if (h1Matches.length !== 1) {
          invalidH1Count++;
          seoIntegrityIssues++;
          errors.push(`Expected exactly 1 <h1> tag in ${relFile}, found ${h1Matches.length}`);
        }

        // Image alt attribute check
        const imgTags = html.match(/<img\b[^>]*>/gi) || [];
        for (const imgTag of imgTags) {
          const altMatch = imgTag.match(/\balt="([^"]*)"/i);
          if (!altMatch || !altMatch[1].trim()) {
            missingImgAltCount++;
            seoIntegrityIssues++;
            errors.push(`Missing or empty alt attribute on <img> in ${relFile}`);
          }
        }

        // JSON-LD presence and strict JSON.parse validation
        const jsonLdBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
        if (jsonLdBlocks.length === 0) {
          invalidJsonLdCount++;
          seoIntegrityIssues++;
          errors.push(`Missing JSON-LD structured data in ${relFile}`);
        } else {
          for (const block of jsonLdBlocks) {
            try {
              JSON.parse(block[1]);
            } catch (err) {
              invalidJsonLdCount++;
              seoIntegrityIssues++;
              errors.push(`Invalid JSON-LD syntax in ${relFile}: ${err.message}`);
            }
          }
        }

        // Internal crawlable link presence check
        const internalLinkMatches = html.match(/<a\s+[^>]*href="\/[^"]*"/gi) || [];
        if (internalLinkMatches.length < 3) {
          missingInternalLinksCount++;
          seoIntegrityIssues++;
          errors.push(`Insufficient internal <a href="/..."> links in ${relFile} (found ${internalLinkMatches.length})`);
        }

        if (!html.includes('GTM-PRGHVB96')) {
          seoIntegrityIssues++;
          errors.push(`Missing Google Tag Manager (GTM-PRGHVB96) in ${relFile}`);
        }
      }
    }
  }

  // 6. Check for missing valid public routes that were omitted from dist/sitemap.xml
  let missingRouteCount = 0;
  for (const [canonicalUrl] of expectedByCanonical) {
    if (!seenUrls.has(canonicalUrl)) {
      missingRouteCount++;
      errors.push(`Valid public indexable route missing from dist/sitemap.xml: ${canonicalUrl}`);
    }
  }

  // 7. Anti-regression guard: reject global hardcoded lastmod or global build-day stamping
  const distinctLastmods = [...new Set(presentLastmods)].sort();
  if (urls.length > 10 && presentLastmods.length === urls.length && distinctLastmods.length === 1) {
    invalidLastmodCount++;
    errors.push(
      `All ${urls.length} sitemap URLs share a single identical <lastmod> (${distinctLastmods[0]}). Global hardcoded or build-date stamping is forbidden.`
    );
  }
  if (presentLastmods.includes('2025-03-01') && distinctLastmods.length === 1) {
    invalidLastmodCount++;
    errors.push('Outdated hardcoded 2025-03-01 <lastmod> detected across sitemap.');
  }

  // 8. Verify robots.txt sitemap declaration & 404.html noindex
  if (!fs.existsSync(robotsPath)) {
    errors.push('Missing dist/robots.txt');
  } else {
    const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
    if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
      errors.push(`dist/robots.txt missing "Sitemap: ${SITE_URL}/sitemap.xml" declaration.`);
    }
  }

  if (!fs.existsSync(notFoundPath)) {
    errors.push('Missing prerendered dist/404.html.');
  } else {
    const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
    if (!notFoundHtml.toLowerCase().includes('noindex')) {
      errors.push('dist/404.html is missing noindex robots directive.');
    }
  }

  const stats = {
    totalUrls: urls.length,
    expectedRoutes: expectedByCanonical.size,
    withLastmod: presentLastmods.length,
    omittedLastmod: urls.length - presentLastmods.length,
    distinctLastmodCount: distinctLastmods.length,
    earliestLastmod: distinctLastmods[0] || null,
    latestLastmod: distinctLastmods.at(-1) || null,
    duplicateCount,
    duplicateTitleCount,
    duplicateDescriptionCount,
    missingTitleCount,
    missingDescriptionCount,
    invalidH1Count,
    missingImgAltCount,
    invalidJsonLdCount,
    missingInternalLinksCount,
    invalidRouteCount,
    missingRouteCount,
    nonCanonicalCount,
    invalidLastmodCount,
    missingHtmlCount,
    noindexCount,
    seoIntegrityIssues,
  };

  printReportAndExit({ errors, warnings, stats });
  return stats;
}

function printReportAndExit({ errors, warnings, stats }) {
  console.log('\n================ SITEMAP & SEO VALIDATION REPORT ================');
  if (stats) {
    console.log(`Total sitemap URLs        : ${stats.totalUrls} (expected: ${stats.expectedRoutes})`);
    console.log(`URLs with verified lastmod: ${stats.withLastmod} (${stats.distinctLastmodCount} distinct dates: ${stats.earliestLastmod || 'N/A'} .. ${stats.latestLastmod || 'N/A'})`);
    console.log(`URLs omitting lastmod     : ${stats.omittedLastmod} (no invented dates)`);
    console.log(`Duplicate URLs            : ${stats.duplicateCount}`);
    console.log(`Duplicate <title> tags    : ${stats.duplicateTitleCount} (missing: ${stats.missingTitleCount})`);
    console.log(`Duplicate meta descriptions: ${stats.duplicateDescriptionCount} (missing: ${stats.missingDescriptionCount})`);
    console.log(`Invalid <h1> count pages  : ${stats.invalidH1Count}`);
    console.log(`Missing <img alt> tags    : ${stats.missingImgAltCount}`);
    console.log(`Invalid JSON-LD blocks    : ${stats.invalidJsonLdCount}`);
    console.log(`Low internal-link pages   : ${stats.missingInternalLinksCount}`);
    console.log(`Invalid/excluded routes   : ${stats.invalidRouteCount}`);
    console.log(`Missing public routes     : ${stats.missingRouteCount}`);
    console.log(`Non-canonical URLs        : ${stats.nonCanonicalCount}`);
    console.log(`Invalid lastmod entries   : ${stats.invalidLastmodCount}`);
    console.log(`Missing prerendered HTML  : ${stats.missingHtmlCount}`);
    console.log(`Noindex URLs in sitemap   : ${stats.noindexCount}`);
    console.log(`SEO/GTM integrity issues  : ${stats.seoIntegrityIssues}`);
  }

  if (warnings.length > 0) {
    console.warn(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.warn(`  [WARN] ${w}`);
  }

  if (errors.length > 0) {
    console.error(`\nCRITICAL VALIDATION ERRORS (${errors.length}):`);
    for (const e of errors.slice(0, 50)) {
      console.error(`  [ERROR] ${e}`);
    }
    if (errors.length > 50) {
      console.error(`  ... and ${errors.length - 50} more errors.`);
    }
    console.error('===============================================================\n');
    process.exit(1);
  }

  console.log('Status                    : PASSED (all checks verified)');
  console.log('===============================================================\n');
}

if (process.argv[1] && path.resolve(process.argv[1]).endsWith('validate-sitemap.mjs')) {
  validateSitemap();
}
