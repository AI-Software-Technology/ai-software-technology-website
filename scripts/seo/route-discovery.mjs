import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import { servicesData } from '../../src/mocks/services.ts';
import { portfolioProjectsA } from '../../src/mocks/portfolio.ts';
import { portfolioProjectsB } from '../../src/mocks/portfolioExtended.ts';
import { portfolioProjectsC } from '../../src/mocks/portfolioNew.ts';
import { caseStudies } from '../../src/mocks/caseStudies.ts';
import { blogPosts } from '../../src/mocks/blog.ts';
import { industriesData } from '../../src/mocks/industryDetails.ts';
import {
  STATIC_ROUTE_KEYWORD_MAP,
  SERVICE_SEO_MAP,
  INDUSTRY_SEO_MAP,
} from '../../src/seo/keywordMap.ts';

export const SITE_URL = 'https://aisoftwaretechnology.in';
export const DEFAULT_OG_IMAGE = 'https://i.ibb.co/GvYrMC4M/Chat-GPT-Image-Oct-30-2026-07-57-59-PM.png';
export const MANIFEST_PATH = path.resolve('src/seo/route-lastmod.json');
export const ROUTER_CONFIG_PATH = path.resolve('src/router/config.tsx');

const allPortfolio = [...portfolioProjectsA, ...portfolioProjectsB, ...portfolioProjectsC];

// Private, system, or non-indexable route prefixes excluded automatically
const EXCLUDED_ROUTE_PREFIXES = [
  '/admin',
  '/login',
  '/signin',
  '/sign-in',
  '/signup',
  '/sign-up',
  '/auth',
  '/private',
  '/dashboard',
  '/account',
  '/api',
  '/internal',
  '/preview',
  '/draft',
  '/404',
  '/500',
  '/not-found',
];

// Additional source dependencies that represent significant content for specific static routes
const STATIC_ROUTE_EXTRA_SOURCES = {
  '/': [
    'src/pages/home/components/HeroSection.tsx',
    'src/pages/home/components/ServicesSection.tsx',
    'src/pages/home/components/WhyChooseUs.tsx',
    'src/pages/home/components/ProcessSection.tsx',
    'src/pages/home/components/IndustriesSection.tsx',
    'src/pages/home/components/FAQSection.tsx',
    'src/pages/home/components/CTASection.tsx',
  ],
  '/about': ['src/mocks/team.ts'],
  '/careers': ['src/mocks/company.ts'],
  '/industries': ['src/mocks/industries.ts'],
};

// Default sitemap priority and changefreq hints by route category
const STATIC_ROUTE_SEO_HINTS = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/contact': { priority: '0.9', changefreq: 'monthly' },
  '/services': { priority: '0.9', changefreq: 'weekly' },
  '/portfolio': { priority: '0.9', changefreq: 'weekly' },
  '/case-studies': { priority: '0.9', changefreq: 'weekly' },
  '/blogs': { priority: '0.9', changefreq: 'weekly' },
  '/about': { priority: '0.8', changefreq: 'monthly' },
  '/industries': { priority: '0.8', changefreq: 'monthly' },
  '/calculators': { priority: '0.8', changefreq: 'monthly' },
  '/ai-features': { priority: '0.8', changefreq: 'monthly' },
  '/knowledge-center': { priority: '0.8', changefreq: 'weekly' },
  '/careers': { priority: '0.7', changefreq: 'monthly' },
  '/our-journey': { priority: '0.7', changefreq: 'monthly' },
  '/sitemap': { priority: '0.6', changefreq: 'weekly' },
};

export function getTodayUtcDate() {
  return new Date().toISOString().slice(0, 10);
}

export function isValidIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

export function parseContentDateToIso(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (isValidIsoDate(trimmed)) {
    return trimmed <= getTodayUtcDate() ? trimmed : null;
  }

  // Parse human-readable dates like "Nov 01, 2026", "Mar 15, 2026", "Jul 25, 2025"
  const monthMap = {
    jan: '01',
    january: '01',
    feb: '02',
    february: '02',
    mar: '03',
    march: '03',
    apr: '04',
    april: '04',
    may: '05',
    jun: '06',
    june: '06',
    jul: '07',
    july: '07',
    aug: '08',
    august: '08',
    sep: '09',
    sept: '09',
    september: '09',
    oct: '10',
    october: '10',
    nov: '11',
    november: '11',
    dec: '12',
    december: '12',
  };

  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const monthNum = monthMap[match[1].toLowerCase()];
    if (monthNum) {
      const day = String(Number(match[2])).padStart(2, '0');
      const iso = `${match[3]}-${monthNum}-${day}`;
      if (isValidIsoDate(iso) && iso <= getTodayUtcDate()) {
        return iso;
      }
    }
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    const iso = parsed.toISOString().slice(0, 10);
    if (isValidIsoDate(iso) && iso <= getTodayUtcDate()) {
      return iso;
    }
  }

  return null;
}

export function normalizeRoutePath(routePath) {
  if (!routePath || routePath === '/') return '/';
  const cleaned = `/${String(routePath).replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return cleaned === '' ? '/' : cleaned;
}

export function toCanonicalUrl(routePath) {
  const normalized = normalizeRoutePath(routePath);
  return normalized === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}

export function isExcludedRoutePath(routePath) {
  const normalized = normalizeRoutePath(routePath).toLowerCase();
  if (normalized.includes('*') || normalized.includes('?') || normalized.includes('#')) {
    return true;
  }
  return EXCLUDED_ROUTE_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  );
}

function normalizeTextForHash(text) {
  return String(text || '')
    // Remove single-line and multi-line JS/TS comments so comment edits don't bump lastmod
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|\s)\/\/.*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sha256Short(payload) {
  const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return crypto.createHash('sha256').update(serialized, 'utf8').digest('hex').slice(0, 16);
}

function resolveTsFile(baseDir, importSpecifier) {
  if (!importSpecifier) return null;
  let candidateBase;
  if (importSpecifier.startsWith('@/')) {
    candidateBase = path.resolve('src', importSpecifier.slice(2));
  } else if (importSpecifier.startsWith('.')) {
    candidateBase = path.resolve(baseDir, importSpecifier);
  } else {
    return null;
  }

  const candidates = [
    candidateBase,
    `${candidateBase}.tsx`,
    `${candidateBase}.ts`,
    `${candidateBase}.jsx`,
    `${candidateBase}.js`,
    path.join(candidateBase, 'index.tsx'),
    path.join(candidateBase, 'index.ts'),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return file;
    }
  }
  return null;
}

function getPropertyStringValue(objLiteral, propName) {
  for (const prop of objLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name)
      ? prop.name.text
      : ts.isStringLiteral(prop.name)
      ? prop.name.text
      : null;
    if (name !== propName) continue;
    if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
      return prop.initializer.text;
    }
  }
  return null;
}

function getPropertyBooleanValue(objLiteral, propName) {
  for (const prop of objLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name)
      ? prop.name.text
      : ts.isStringLiteral(prop.name)
      ? prop.name.text
      : null;
    if (name !== propName) continue;
    if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) return false;
  }
  return null;
}

function extractPageSeoMetadata(componentFilePath) {
  if (!componentFilePath || !fs.existsSync(componentFilePath)) {
    return { noindex: false, title: null, description: null, canonical: null, ogType: null };
  }

  const sourceText = fs.readFileSync(componentFilePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    componentFilePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  const meta = { noindex: false, title: null, description: null, canonical: null, ogType: null };

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'usePageSEO' &&
      node.arguments.length > 0 &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      const arg = node.arguments[0];
      const noindex = getPropertyBooleanValue(arg, 'noindex');
      if (noindex === true) meta.noindex = true;
      meta.title = getPropertyStringValue(arg, 'title') || meta.title;
      meta.description = getPropertyStringValue(arg, 'description') || meta.description;
      meta.canonical = getPropertyStringValue(arg, 'canonical') || meta.canonical;
      meta.ogType = getPropertyStringValue(arg, 'ogType') || meta.ogType;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return meta;
}

/**
 * Parse src/router/config.tsx via TypeScript AST to automatically discover all
 * declared React Router routes, their component files, redirects, and exclusions.
 */
export function parseRouterConfig(routerConfigPath = ROUTER_CONFIG_PATH) {
  const sourceText = fs.readFileSync(routerConfigPath, 'utf8');
  const sourceDir = path.dirname(routerConfigPath);
  const sourceFile = ts.createSourceFile(
    routerConfigPath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  // Map component identifier -> resolved source file path
  const componentFiles = new Map();

  function collectImports(node) {
    // import Foo from '../pages/foo/page'
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const specifier = node.moduleSpecifier.text;
      const resolved = resolveTsFile(sourceDir, specifier);
      if (resolved && node.importClause?.name) {
        componentFiles.set(node.importClause.name.text, resolved);
      }
    }

    // const Foo = lazy(() => import('../pages/foo/page'))
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const initText = node.initializer.getText(sourceFile);
      const importMatch = initText.match(/import\(\s*['"]([^'"]+)['"]\s*\)/);
      if (importMatch) {
        const resolved = resolveTsFile(sourceDir, importMatch[1]);
        if (resolved) {
          componentFiles.set(node.name.text, resolved);
        }
      }
    }

    ts.forEachChild(node, collectImports);
  }

  collectImports(sourceFile);

  const discoveredEntries = [];

  function extractElementTagName(expr) {
    if (!expr) return null;
    if (ts.isJsxSelfClosingElement(expr)) {
      return expr.tagName.getText(sourceFile);
    }
    if (ts.isJsxElement(expr)) {
      return expr.openingElement.tagName.getText(sourceFile);
    }
    if (ts.isParenthesizedExpression(expr)) {
      return extractElementTagName(expr.expression);
    }
    return null;
  }

  function joinPaths(parentPath, childPath) {
    if (!parentPath) return childPath;
    if (!childPath) return parentPath;
    if (childPath.startsWith('/')) return childPath;
    const base = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
    return `${base}/${childPath}`;
  }

  function extractRoutesFromArray(arrayNode, parentPath = '') {
    for (const elem of arrayNode.elements) {
      if (!ts.isObjectLiteralExpression(elem)) continue;

      let rawPath = null;
      let elementTag = null;
      let childrenArray = null;
      let isIndex = false;

      for (const prop of elem.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const propName = ts.isIdentifier(prop.name)
          ? prop.name.text
          : ts.isStringLiteral(prop.name)
          ? prop.name.text
          : null;

        if (propName === 'path' && (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer))) {
          rawPath = prop.initializer.text;
        } else if (propName === 'index' && prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
          isIndex = true;
        } else if (propName === 'element') {
          elementTag = extractElementTagName(prop.initializer);
        } else if (propName === 'children' && ts.isArrayLiteralExpression(prop.initializer)) {
          childrenArray = prop.initializer;
        }
      }

      const combinedPath = isIndex ? parentPath || '/' : rawPath !== null ? joinPaths(parentPath, rawPath) : parentPath;

      if (combinedPath && elementTag) {
        const isRedirect = elementTag === 'Navigate';
        const isWildcard = combinedPath.includes('*');
        const isDynamic = combinedPath.includes(':');
        const componentFile = componentFiles.get(elementTag) || null;
        const pageMeta = componentFile ? extractPageSeoMetadata(componentFile) : { noindex: false };

        discoveredEntries.push({
          rawPath: combinedPath,
          normalizedPath: isWildcard || isDynamic ? combinedPath : normalizeRoutePath(combinedPath),
          componentName: elementTag,
          componentFile,
          isRedirect,
          isWildcard,
          isDynamic,
          noindex: Boolean(pageMeta.noindex),
          pageMeta,
        });
      }

      if (childrenArray) {
        extractRoutesFromArray(childrenArray, combinedPath);
      }
    }
  }

  function findRoutesDeclaration(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'routes' &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      extractRoutesFromArray(node.initializer);
      return;
    }
    ts.forEachChild(node, findRoutesDeclaration);
  }

  findRoutesDeclaration(sourceFile);
  return discoveredEntries;
}

// Git integration (used only when inside an actual Git repository, e.g. GitHub / VPS)
let cachedIsGitRepo = null;
function isGitRepository() {
  if (cachedIsGitRepo !== null) return cachedIsGitRepo;
  try {
    const out = execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim();
    cachedIsGitRepo = out === 'true';
  } catch {
    cachedIsGitRepo = false;
  }
  return cachedIsGitRepo;
}

function getGitFileLastCommitDate(filePaths) {
  if (!isGitRepository() || !filePaths || filePaths.length === 0) return null;
  const relPaths = filePaths
    .filter((f) => f && fs.existsSync(f))
    .map((f) => path.relative(process.cwd(), f));

  if (relPaths.length === 0) return null;

  try {
    // Check if any of the files have uncommitted local modifications
    const statusOut = execFileSync('git', ['status', '--porcelain', '--', ...relPaths], {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim();

    if (statusOut.length > 0) {
      // Uncommitted edit in working tree: return null so caller handles as live content change
      return null;
    }

    const dateOut = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...relPaths], {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim();

    if (isValidIsoDate(dateOut) && dateOut <= getTodayUtcDate()) {
      return dateOut;
    }
  } catch {
    return null;
  }
  return null;
}

export function loadLastmodManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { schemaVersion: 1, routes: {} };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    if (parsed && typeof parsed === 'object' && parsed.routes && typeof parsed.routes === 'object') {
      return parsed;
    }
  } catch {
    // Fall back to empty manifest if unreadable
  }
  return { schemaVersion: 1, routes: {} };
}

export function saveLastmodManifest(manifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  const sortedRoutes = {};
  for (const key of Object.keys(manifest.routes).sort((a, b) => a.localeCompare(b))) {
    sortedRoutes[key] = manifest.routes[key];
  }
  const output = {
    schemaVersion: 1,
    description:
      'Automated page-level significant content fingerprints and truthful lastmod dates. Updated via `npm run sitemap:sync` or on verified content edits. Never assign a hardcoded global date.',
    routes: sortedRoutes,
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
}

function computeStaticRouteHash(routePath, componentFile) {
  const files = [];
  if (componentFile && fs.existsSync(componentFile)) {
    files.push(componentFile);
  }
  const extras = STATIC_ROUTE_EXTRA_SOURCES[routePath] || [];
  for (const rel of extras) {
    const full = path.resolve(rel);
    if (fs.existsSync(full)) files.push(full);
  }

  const parts = files.map((f) => {
    const rel = path.relative(process.cwd(), f).replace(/\\/g, '/');
    return `${rel}:${normalizeTextForHash(fs.readFileSync(f, 'utf8'))}`;
  });

  const kwSpec = STATIC_ROUTE_KEYWORD_MAP[routePath] || null;
  if (kwSpec) {
    parts.push(`keywordMap:${JSON.stringify(kwSpec)}`);
  }

  return {
    contentHash: sha256Short(parts.join('\n')),
    sourceFiles: files,
  };
}

function computeIndustryHash(ind) {
  return sha256Short({
    slug: ind.slug,
    title: ind.title,
    meta: ind.meta,
    challenges: ind.challenges,
    solutions: ind.solutions,
    modules: ind.modules,
    benefits: ind.benefits,
    caseStudies: ind.caseStudies,
    heroImage: ind.heroImage,
    keywordEnrichment: INDUSTRY_SEO_MAP[ind.slug] || null,
    updatedAt: ind.updatedAt || ind.lastModified || null,
  });
}

function computeServiceHash(srv) {
  return sha256Short({
    slug: srv.slug,
    name: srv.name,
    tagline: srv.tagline,
    heroDesc: srv.heroDesc,
    overview: srv.overview,
    features: srv.features,
    benefits: srv.benefits,
    process: srv.process,
    technologies: srv.technologies,
    industries: srv.industries,
    faqs: srv.faqs,
    bannerImage: srv.bannerImage,
    keywordEnrichment: SERVICE_SEO_MAP[srv.slug] || null,
    updatedAt: srv.updatedAt || srv.lastModified || null,
  });
}

function computePortfolioHash(proj) {
  return sha256Short({
    slug: proj.slug,
    name: proj.name,
    category: proj.category,
    industry: proj.industry,
    description: proj.description,
    challenge: proj.challenge,
    goals: proj.goals,
    features: proj.features,
    businessResults: proj.businessResults,
    technologies: proj.technologies,
    devProcess: proj.devProcess,
    image: proj.image,
    updatedAt: proj.updatedAt || proj.lastModified || null,
  });
}

function computeCaseStudyHash(cs) {
  return sha256Short({
    slug: cs.slug,
    title: cs.title,
    industry: cs.industry,
    overview: cs.overview,
    challenge: cs.challenge,
    approach: cs.approach,
    solution: cs.solution,
    workflow: cs.workflow,
    results: cs.results,
    businessBenefits: cs.businessBenefits,
    techStack: cs.techStack,
    image: cs.image,
    updatedAt: cs.updatedAt || cs.lastModified || null,
  });
}

function computeBlogHash(post) {
  return sha256Short({
    slug: post.slug,
    title: post.title,
    seoTitle: post.seoTitle || null,
    excerpt: post.excerpt,
    metaDescription: post.metaDescription || null,
    content: normalizeTextForHash(post.content),
    faqs: post.faqs || null,
    tags: post.tags,
    image: post.image,
    internalLinks: post.internalLinks || null,
    date: post.date,
    updatedAt: post.updatedAt || post.lastModified || null,
  });
}

function maxIsoDate(dates) {
  const valid = dates.filter((d) => isValidIsoDate(d));
  if (valid.length === 0) return null;
  return valid.sort().at(-1);
}

function resolveRouteLastmod({
  routePath,
  contentHash,
  explicitDate,
  dedicatedSourceFiles,
  manifestEntry,
  isInitialBaseline = false,
}) {
  const todayUtc = getTodayUtcDate();
  const validExplicit = explicitDate && isValidIsoDate(explicitDate) && explicitDate <= todayUtc ? explicitDate : null;

  // 1. If item has an explicit updatedAt/lastModified or blog publish date AND content hash is unchanged (or initializing baseline)
  if (manifestEntry) {
    const manifestDate =
      manifestEntry.lastmod && isValidIsoDate(manifestEntry.lastmod) && manifestEntry.lastmod <= todayUtc
        ? manifestEntry.lastmod
        : null;

    if (manifestEntry.contentHash === contentHash) {
      // Significant content has NOT changed since manifest was recorded
      if (validExplicit && (!manifestDate || validExplicit > manifestDate)) {
        return { lastmod: validExplicit, lastmodSource: 'content-metadata', changed: false };
      }
      return {
        lastmod: manifestDate,
        lastmodSource: manifestDate ? manifestEntry.source || 'manifest' : 'omitted-no-verified-date',
        changed: false,
      };
    }

    // Significant content HAS changed since the stored baseline hash!
    // Prefer explicit newer content date -> real git commit date (for dedicated files) -> current UTC date
    if (validExplicit && (!manifestDate || validExplicit > manifestDate)) {
      return { lastmod: validExplicit, lastmodSource: 'content-metadata', changed: true };
    }

    const gitDate = getGitFileLastCommitDate(dedicatedSourceFiles);
    if (gitDate && (!manifestDate || gitDate >= manifestDate)) {
      return { lastmod: gitDate, lastmodSource: 'git-commit', changed: true };
    }

    return { lastmod: todayUtc, lastmodSource: 'content-hash-change', changed: true };
  }

  // 2. Route is NOT yet in the manifest (brand-new route or first baseline initialization)
  if (validExplicit) {
    return { lastmod: validExplicit, lastmodSource: 'content-metadata', changed: true };
  }

  // If initializing baseline in a non-git environment, omit lastmod rather than inventing a date.
  // If inside a real Git repo with dedicated source files, use the real Git commit date.
  if (!isInitialBaseline) {
    const gitDate = getGitFileLastCommitDate(dedicatedSourceFiles);
    if (gitDate) {
      return { lastmod: gitDate, lastmodSource: 'git-commit', changed: true };
    }
  }

  return { lastmod: null, lastmodSource: 'omitted-no-verified-date', changed: false };
}

/**
 * Automatically discovers all valid, public, canonical, indexable routes from
 * src/router/config.tsx and live content sources, resolves truthful lastmod dates,
 * and returns both discovered routes and excluded routes for audit/validation.
 */
export function discoverPublicRoutes(options = {}) {
  const { syncManifest = false } = options;
  const routerEntries = parseRouterConfig();
  const manifest = loadLastmodManifest();
  const isInitialBaseline = Object.keys(manifest.routes).length === 0;

  const industryBySlug = new Map(Object.values(industriesData).map((ind) => [ind.slug, ind]));
  const discovered = [];
  const excluded = [];
  const seenPaths = new Set();

  function addRoute(entry) {
    const normalized = normalizeRoutePath(entry.routePath);
    if (isExcludedRoutePath(normalized)) {
      excluded.push({ routePath: normalized, reason: 'excluded-prefix' });
      return;
    }
    if (seenPaths.has(normalized)) {
      excluded.push({ routePath: normalized, reason: 'duplicate' });
      return;
    }
    seenPaths.add(normalized);
    discovered.push({
      ...entry,
      routePath: normalized,
      canonicalUrl: toCanonicalUrl(normalized),
    });
  }

  for (const route of routerEntries) {
    if (route.isWildcard) {
      excluded.push({ routePath: route.rawPath, reason: 'wildcard-catch-all' });
      continue;
    }
    if (route.isRedirect) {
      excluded.push({ routePath: route.rawPath, reason: 'redirect-navigate' });
      continue;
    }
    if (route.noindex) {
      excluded.push({ routePath: route.rawPath, reason: 'noindex-page' });
      continue;
    }
    if (isExcludedRoutePath(route.rawPath)) {
      excluded.push({ routePath: route.rawPath, reason: 'excluded-prefix' });
      continue;
    }

    // Dynamic parameterized routes declared in src/router/config.tsx
    if (route.isDynamic) {
      if (route.rawPath === '/services/:slug') {
        for (const srv of servicesData) {
          const routePath = `/services/${srv.slug}`;
          const contentHash = computeServiceHash(srv);
          const explicitDate = parseContentDateToIso(srv.updatedAt || srv.lastModified);
          const resolved = resolveRouteLastmod({
            routePath,
            contentHash,
            explicitDate,
            dedicatedSourceFiles: [],
            manifestEntry: manifest.routes[routePath],
            isInitialBaseline,
          });
          addRoute({
            routePath,
            kind: 'service',
            priority: '0.9',
            changefreq: 'weekly',
            contentHash,
            lastmod: resolved.lastmod,
            lastmodSource: resolved.lastmodSource,
            changed: resolved.changed,
            data: srv,
          });
        }
        continue;
      }

      if (route.rawPath === '/portfolio/:slug') {
        for (const proj of allPortfolio) {
          const routePath = `/portfolio/${proj.slug}`;
          const contentHash = computePortfolioHash(proj);
          const explicitDate = parseContentDateToIso(proj.updatedAt || proj.lastModified);
          const resolved = resolveRouteLastmod({
            routePath,
            contentHash,
            explicitDate,
            dedicatedSourceFiles: [],
            manifestEntry: manifest.routes[routePath],
            isInitialBaseline,
          });
          addRoute({
            routePath,
            kind: 'portfolio',
            priority: '0.7',
            changefreq: 'monthly',
            contentHash,
            lastmod: resolved.lastmod,
            lastmodSource: resolved.lastmodSource,
            changed: resolved.changed,
            data: proj,
          });
        }
        continue;
      }

      if (route.rawPath === '/case-studies/:slug') {
        for (const cs of caseStudies) {
          const routePath = `/case-studies/${cs.slug}`;
          const contentHash = computeCaseStudyHash(cs);
          const explicitDate = parseContentDateToIso(cs.updatedAt || cs.lastModified);
          const resolved = resolveRouteLastmod({
            routePath,
            contentHash,
            explicitDate,
            dedicatedSourceFiles: [],
            manifestEntry: manifest.routes[routePath],
            isInitialBaseline,
          });
          addRoute({
            routePath,
            kind: 'case-study',
            priority: '0.8',
            changefreq: 'monthly',
            contentHash,
            lastmod: resolved.lastmod,
            lastmodSource: resolved.lastmodSource,
            changed: resolved.changed,
            data: cs,
          });
        }
        continue;
      }

      if (route.rawPath === '/blogs/:slug') {
        for (const post of blogPosts) {
          const routePath = `/blogs/${post.slug}`;
          const contentHash = computeBlogHash(post);
          const explicitDate =
            parseContentDateToIso(post.updatedAt || post.lastModified) ||
            parseContentDateToIso(post.date);
          const resolved = resolveRouteLastmod({
            routePath,
            contentHash,
            explicitDate,
            dedicatedSourceFiles: [],
            manifestEntry: manifest.routes[routePath],
            isInitialBaseline,
          });
          addRoute({
            routePath,
            kind: 'blog',
            priority: post.slug.includes('2027') || post.featured ? '0.8' : '0.7',
            changefreq: 'monthly',
            contentHash,
            lastmod: resolved.lastmod,
            lastmodSource: resolved.lastmodSource,
            changed: resolved.changed,
            data: post,
          });
        }
        continue;
      }

      throw new Error(
        `[SEO] Unhandled dynamic route "${route.rawPath}" in src/router/config.tsx. Register its data expander in scripts/seo/route-discovery.mjs.`
      );
    }

    // Industry static routes (/industries/<slug>)
    if (route.normalizedPath.startsWith('/industries/')) {
      const slug = route.normalizedPath.replace('/industries/', '');
      const ind = industryBySlug.get(slug);
      if (ind) {
        const contentHash = computeIndustryHash(ind);
        const explicitDate = parseContentDateToIso(ind.updatedAt || ind.lastModified);
        const resolved = resolveRouteLastmod({
          routePath: route.normalizedPath,
          contentHash,
          explicitDate,
          dedicatedSourceFiles: route.componentFile ? [route.componentFile] : [],
          manifestEntry: manifest.routes[route.normalizedPath],
          isInitialBaseline,
        });
        addRoute({
          routePath: route.normalizedPath,
          kind: 'industry',
          priority: '0.8',
          changefreq: 'monthly',
          contentHash,
          lastmod: resolved.lastmod,
          lastmodSource: resolved.lastmodSource,
          changed: resolved.changed,
          componentFile: route.componentFile,
          pageMeta: route.pageMeta,
          data: ind,
        });
        continue;
      }
    }

    // Standard static or comparison route
    const { contentHash, sourceFiles } = computeStaticRouteHash(route.normalizedPath, route.componentFile);
    const resolved = resolveRouteLastmod({
      routePath: route.normalizedPath,
      contentHash,
      explicitDate: null,
      dedicatedSourceFiles: sourceFiles,
      manifestEntry: manifest.routes[route.normalizedPath],
      isInitialBaseline,
    });

    const isComparison = route.normalizedPath.startsWith('/comparisons/');
    const hints = STATIC_ROUTE_SEO_HINTS[route.normalizedPath] || {
      priority: isComparison ? '0.7' : '0.7',
      changefreq: 'monthly',
    };

    addRoute({
      routePath: route.normalizedPath,
      kind: isComparison ? 'comparison' : 'static',
      priority: hints.priority,
      changefreq: hints.changefreq,
      contentHash,
      lastmod: resolved.lastmod,
      lastmodSource: resolved.lastmodSource,
      changed: resolved.changed,
      componentFile: route.componentFile,
      pageMeta: route.pageMeta,
    });
  }

  // Propagate truthful aggregate dates to listing/hub pages ONLY from real child dates
  const byKind = (kind) => discovered.filter((r) => r.kind === kind);
  const hubChildDateMap = {
    '/blogs': byKind('blog').map((r) => r.lastmod),
    '/knowledge-center': byKind('blog').slice(0, 6).map((r) => r.lastmod),
    '/services': byKind('service').map((r) => r.lastmod),
    '/portfolio': byKind('portfolio').map((r) => r.lastmod),
    '/case-studies': byKind('case-study').map((r) => r.lastmod),
    '/industries': byKind('industry').map((r) => r.lastmod),
    '/sitemap': discovered.filter((r) => r.routePath !== '/sitemap').map((r) => r.lastmod),
  };

  for (const route of discovered) {
    const childDates = hubChildDateMap[route.routePath];
    if (!childDates) continue;
    const derivedMax = maxIsoDate([route.lastmod, ...childDates]);
    if (derivedMax && derivedMax !== route.lastmod) {
      route.lastmod = derivedMax;
      route.lastmodSource = 'derived-from-children';
    }
  }

  // Optional explicit manifest sync (`npm run sitemap:sync`) — NEVER runs implicitly on `npm run build`
  if (syncManifest) {
    const nextManifest = { schemaVersion: 1, routes: {} };
    for (const route of discovered) {
      nextManifest.routes[route.routePath] = {
        contentHash: route.contentHash,
        lastmod: route.lastmod,
        source: route.lastmodSource,
      };
    }
    saveLastmodManifest(nextManifest);
  }

  // Sort deterministically: core static -> comparisons -> industries -> services -> portfolio -> case-studies -> blogs
  const kindOrder = {
    static: 1,
    comparison: 2,
    industry: 3,
    service: 4,
    portfolio: 5,
    'case-study': 6,
    blog: 7,
  };
  discovered.sort((a, b) => {
    const orderDiff = (kindOrder[a.kind] || 99) - (kindOrder[b.kind] || 99);
    if (orderDiff !== 0) return orderDiff;
    if (a.routePath === '/') return -1;
    if (b.routePath === '/') return 1;
    return 0;
  });

  return {
    routes: discovered,
    excluded,
    allPortfolio,
    servicesData,
    caseStudies,
    blogPosts,
    industriesData,
  };
}
