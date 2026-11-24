import fs from 'node:fs';
import path from 'node:path';
import {
  SITE_URL,
  discoverPublicRoutes,
  isValidIsoDate,
  toCanonicalUrl,
} from './route-discovery.mjs';

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getPrerenderedHtmlPath(distDir, routePath) {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }
  const cleanRel = routePath.replace(/^\/+/, '');
  return path.join(distDir, cleanRel, 'index.html');
}

function inspectPrerenderedHtml(htmlPath) {
  if (!fs.existsSync(htmlPath)) {
    return { exists: false, noindex: false, canonical: null };
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  const googlebotMatch = html.match(/<meta\s+name="googlebot"\s+content="([^"]*)"/i);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);

  const robotsContent = `${robotsMatch?.[1] || ''} ${googlebotMatch?.[1] || ''}`.toLowerCase();
  return {
    exists: true,
    noindex: robotsContent.includes('noindex'),
    canonical: canonicalMatch?.[1] || null,
  };
}

function buildSitemapXml(entries) {
  const urlNodes = entries
    .map((entry) => {
      const lines = [
        '  <url>',
        `    <loc>${escapeXml(entry.canonicalUrl)}</loc>`,
      ];
      if (entry.lastmod && isValidIsoDate(entry.lastmod)) {
        lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      }
      if (entry.changefreq) {
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }
      if (entry.priority) {
        lines.push(`    <priority>${entry.priority}</priority>`);
      }
      lines.push('  </url>');
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>
`;
}

function buildSitemapIndexXml(entries) {
  const dated = entries
    .map((e) => e.lastmod)
    .filter((d) => isValidIsoDate(d))
    .sort();
  const latestLastmod = dated.length > 0 ? dated.at(-1) : null;

  const lastmodLine = latestLastmod ? `\n    <lastmod>${latestLastmod}</lastmod>` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(`${SITE_URL}/sitemap.xml`)}</loc>${lastmodLine}
  </sitemap>
</sitemapindex>
`;
}

export function generateSitemap(options = {}) {
  const syncManifest = Boolean(options.syncManifest || process.argv.includes('--sync-manifest'));
  const distDir = path.resolve(options.distDir || 'dist');

  const { routes, excluded } = discoverPublicRoutes({ syncManifest });

  const indexableEntries = [];
  const runtimeExcluded = [...excluded];
  const seenCanonicals = new Set();

  for (const route of routes) {
    const htmlPath = getPrerenderedHtmlPath(distDir, route.routePath);
    const inspection = inspectPrerenderedHtml(htmlPath);

    if (inspection.exists && inspection.noindex) {
      runtimeExcluded.push({ routePath: route.routePath, reason: 'prerendered-noindex' });
      continue;
    }

    // Ensure canonical URL strictly aligns with prerendered HTML canonical if present
    const canonicalUrl = toCanonicalUrl(route.routePath);
    if (inspection.exists && inspection.canonical && inspection.canonical !== canonicalUrl) {
      throw new Error(
        `[SEO] Canonical mismatch for ${route.routePath}: expected "${canonicalUrl}" but prerendered HTML has "${inspection.canonical}".`
      );
    }

    if (seenCanonicals.has(canonicalUrl)) {
      runtimeExcluded.push({ routePath: route.routePath, reason: 'duplicate-canonical' });
      continue;
    }
    seenCanonicals.add(canonicalUrl);

    indexableEntries.push({
      routePath: route.routePath,
      canonicalUrl,
      lastmod: route.lastmod || null,
      lastmodSource: route.lastmodSource,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  const sitemapXml = buildSitemapXml(indexableEntries);
  const sitemapIndexXml = buildSitemapIndexXml(indexableEntries);

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
    fs.writeFileSync(path.join(distDir, 'sitemap_index.xml'), sitemapIndexXml, 'utf8');
  } else if (!syncManifest) {
    throw new Error(
      `[SEO] Build output directory "${distDir}" does not exist. Run "vite build" before generating dist/sitemap.xml.`
    );
  }

  const withLastmod = indexableEntries.filter((e) => Boolean(e.lastmod)).length;
  const withoutLastmod = indexableEntries.length - withLastmod;
  const distinctDates = [...new Set(indexableEntries.map((e) => e.lastmod).filter(Boolean))].sort();

  console.log(
    `[SEO] Generated dist/sitemap.xml (${indexableEntries.length} canonical URLs; ${withLastmod} with verified <lastmod> across ${distinctDates.length} distinct dates, ${withoutLastmod} omitted without invented dates) and dist/sitemap_index.xml.`
  );
  if (syncManifest) {
    console.log(`[SEO] Synchronized page-level content fingerprints to src/seo/route-lastmod.json.`);
  }
  console.log(
    `[SEO] Excluded ${runtimeExcluded.length} non-indexable/redirect/wildcard routes: ${runtimeExcluded
      .map((e) => `${e.routePath} (${e.reason})`)
      .join(', ')}`
  );

  return {
    entries: indexableEntries,
    excluded: runtimeExcluded,
    distinctDates,
  };
}

// Run when invoked directly via run-jiti.mjs or node
if (process.argv[1] && path.resolve(process.argv[1]).endsWith('generate-sitemap.mjs')) {
  generateSitemap();
}
