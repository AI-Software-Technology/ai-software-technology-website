import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import ScrollToTop from './ScrollToTop';
import Breadcrumb from './Breadcrumb';
import { usePageSEO } from '@/hooks/usePageSEO';
import { INDUSTRY_SEO_MAP } from '@/seo/keywordMap';
import { servicesData } from '@/mocks/services';
import { caseStudies } from '@/mocks/caseStudies';
import { portfolioProjectsA } from '@/mocks/portfolio';
import { portfolioProjectsB } from '@/mocks/portfolioExtended';
import { portfolioProjectsC } from '@/mocks/portfolioNew';

const allPortfolioProjects = [...portfolioProjectsA, ...portfolioProjectsB, ...portfolioProjectsC];

export interface IndustryData {
  slug: string;
  title: string;
  icon: string;
  heroImage: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
  };
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  modules: string[];
  benefits: { value: string; label: string }[];
  caseStudies: { title: string; desc: string; image: string }[];
}

interface Props {
  data: IndustryData;
}

export default function IndustryDetail({ data }: Props) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const seoSpec = data ? INDUSTRY_SEO_MAP[data.slug] : undefined;

  const relatedServices = (seoSpec?.relatedServiceSlugs || [])
    .map((sSlug) => servicesData.find((s) => s.slug === sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedCaseStudyItems = (seoSpec?.relatedCaseStudySlugs || [])
    .map((cSlug) => caseStudies.find((c) => c.slug === cSlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const relatedPortfolioItems = (seoSpec?.relatedPortfolioSlugs || [])
    .map((pSlug) => allPortfolioProjects.find((p) => p.slug === pSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const resolvedTitle = seoSpec?.seoTitle || (data ? data.meta.title : 'Industry Solutions | AI Software Technology');
  const resolvedDesc =
    seoSpec?.metaDescription ||
    (data
      ? `${data.meta.description} Call +91 9990390519.`
      : 'Industry-specific IT and custom software solutions by AI Software Technology — A Brand of Digi India Solutions.');

  usePageSEO({
    title: resolvedTitle,
    description: resolvedDesc,
    ogTitle: resolvedTitle,
    ogDescription: resolvedDesc,
    ogImage: data?.heroImage,
    ogImageAlt: data ? `${data.title} Software Solutions — AI Software Technology` : undefined,
    canonical: data ? data.meta.canonicalUrl : 'https://aisoftwaretechnology.in/industries',
    noindex: !data,
    jsonLd: data
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: seoSpec?.h1 || `Custom ${data.title} Software Solutions`,
            description: seoSpec?.answerFirstSummary || data.meta.description,
            url: data.meta.canonicalUrl,
            image: data.heroImage,
            serviceType: seoSpec?.primaryKeyword || `${data.title} Software Development`,
            provider: {
              '@type': 'ProfessionalService',
              name: 'AI Software Technology',
              alternateName: 'AI Software Technology — A Brand of Digi India Solutions',
              url: 'https://aisoftwaretechnology.in',
              telephone: '+91-9990390519',
              email: 'aisoftwaretechnology2026@gmail.com',
              parentOrganization: {
                '@type': 'Organization',
                name: 'Digi India Solutions',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'House No. 158-159, Pocket-10, Sector-24, Rohini',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110085',
                addressCountry: 'IN',
              },
            },
            areaServed: [
              { '@type': 'City', name: 'New Delhi' },
              { '@type': 'Country', name: 'India' },
            ],
          },
          ...(seoSpec?.faqs && seoSpec.faqs.length > 0
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: seoSpec.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.a,
                    },
                  })),
                },
              ]
            : []),
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aisoftwaretechnology.in/' },
              { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://aisoftwaretechnology.in/industries' },
              { '@type': 'ListItem', position: 3, name: data.title, item: data.meta.canonicalUrl },
            ],
          },
        ]
      : undefined,
  });

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-500 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Industry Not Found</h2>
          <button onClick={() => navigate('/industries')} className="glass-btn-primary cursor-pointer">
            View All Industries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500 text-white overflow-x-hidden">
      <Navbar />
      <Breadcrumb />

      <main>
        {/* Hero */}
        <section className="relative min-h-[380px] md:min-h-[480px] flex items-center overflow-hidden pt-4">
          <div className="absolute inset-0">
            <img
              src={data.heroImage}
              alt={`${data.title} Software Solutions in Delhi NCR — AI Software Technology`}
              title={data.title}
              loading="eager"
              decoding="async"
              width="1400"
              height="760"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-500 via-dark-500/90 to-dark-500/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-transparent to-dark-500/40"></div>
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full py-12">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-tag mb-4 flex items-center gap-2">
                <i className={data.icon}></i>
                {data.title} Software Solutions — Delhi NCR &amp; India
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {seoSpec?.h1 || `Custom ${data.title} Software Solutions`}
              </h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                {seoSpec?.answerFirstSummary || data.meta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                  className="glass-btn-primary cursor-pointer"
                >
                  Discuss Your {data.title} Project
                  <i className="ri-arrow-right-line ml-2"></i>
                </a>
                <a
                  href="https://wa.me/919990390519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn cursor-pointer"
                >
                  <i className="ri-whatsapp-line mr-2 text-emerald-400"></i>
                  Quick Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits / Stats */}
        <section className="py-10 bg-dark-600 border-y border-white/[0.03]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.benefits.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gradient mb-1">
                    {s.value}
                  </p>
                  <p className="text-white/30 text-xs">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges We Solve */}
        <section className="py-14 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-tag mx-auto">Challenges</div>
              <h2 className="section-title text-white">
                {data.title} <span className="text-gradient">Pain Points</span> We Solve
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.challenges.map((c, i) => (
                <motion.div
                  key={c.title}
                  className="glass-card-hover rounded-2xl p-5 sm:p-6"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-4">
                    <i className="ri-error-warning-line text-red-400"></i>
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm mb-2">{c.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Solutions */}
        <section className="py-14 md:py-24 bg-dark-600">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-tag mx-auto">Solutions</div>
              <h2 className="section-title text-white">
                Our {data.title} <span className="text-gradient">Software Suite</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.solutions.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="glass-card-hover rounded-2xl p-5 sm:p-6"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/10 border border-primary-400/10 flex items-center justify-center mb-4">
                    <i className={`${data.icon} text-accent-400 text-lg`}></i>
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm mb-2">{s.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Modules & Mapped Services */}
        <section className="py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-tag mx-auto">Modules</div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-8">
                Core {data.title} Modules We Deliver
              </h2>
              <div className="flex flex-wrap justify-center gap-2.5 mb-8">
                {data.modules.map((m) => (
                  <span
                    key={m}
                    className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/50 text-xs font-medium hover:border-accent-400/20 hover:text-accent-400 transition-all"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-white/[0.05]">
                {(relatedServices.length > 0
                  ? relatedServices
                  : servicesData.slice(0, 4)
                ).map((srv, idx, arr) => (
                  <span key={srv.slug} className="inline-flex items-center gap-3">
                    <a
                      href={`/services/${srv.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/services/${srv.slug}`);
                      }}
                      className="text-xs text-accent-400 hover:underline font-medium"
                    >
                      {srv.name} →
                    </a>
                    {idx < arr.length - 1 && <span className="text-white/20">•</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Case Studies & Portfolio Implementations */}
        {(relatedCaseStudyItems.length > 0 || relatedPortfolioItems.length > 0) && (
          <section className="py-14 md:py-20 bg-dark-600 border-y border-white/[0.05]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {relatedCaseStudyItems.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-heading text-lg md:text-xl font-bold text-white">
                        {data.title} <span className="text-gradient">Case Studies</span>
                      </h2>
                      <a
                        href="/case-studies"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/case-studies');
                        }}
                        className="text-xs font-semibold text-accent-400 hover:underline"
                      >
                        All Case Studies →
                      </a>
                    </div>
                    <div className="space-y-3">
                      {relatedCaseStudyItems.map((cs) => (
                        <a
                          key={cs.slug}
                          href={`/case-studies/${cs.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/case-studies/${cs.slug}`);
                          }}
                          className="glass-card-hover rounded-xl p-4 flex items-center justify-between gap-4 group block"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-semibold text-accent-400 uppercase tracking-wider block mb-0.5">
                              {cs.industry}
                            </span>
                            <h3 className="font-heading text-sm font-bold text-white group-hover:text-accent-300 transition-colors line-clamp-1">
                              {cs.title}
                            </h3>
                            <p className="text-xs text-white/45 line-clamp-1">{cs.overview}</p>
                          </div>
                          <i className="ri-arrow-right-up-line text-accent-400 flex-shrink-0"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {relatedPortfolioItems.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-heading text-lg md:text-xl font-bold text-white">
                        Delivered <span className="text-gradient">Portfolio Projects</span>
                      </h2>
                      <a
                        href="/portfolio"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/portfolio');
                        }}
                        className="text-xs font-semibold text-accent-400 hover:underline"
                      >
                        All Portfolio Projects →
                      </a>
                    </div>
                    <div className="space-y-3">
                      {relatedPortfolioItems.map((proj) => (
                        <a
                          key={proj.slug}
                          href={`/portfolio/${proj.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/portfolio/${proj.slug}`);
                          }}
                          className="glass-card-hover rounded-xl p-4 flex items-center justify-between gap-4 group block"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-semibold text-primary-300 uppercase tracking-wider block mb-0.5">
                              {proj.category}
                            </span>
                            <h3 className="font-heading text-sm font-bold text-white group-hover:text-accent-300 transition-colors truncate">
                              {proj.name}
                            </h3>
                            <p className="text-xs text-white/45 line-clamp-1">{proj.description}</p>
                          </div>
                          <i className="ri-arrow-right-up-line text-accent-400 flex-shrink-0"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Industry FAQs */}
        {seoSpec?.faqs && seoSpec.faqs.length > 0 && (
          <section className="py-14 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="text-center mb-10">
                <div className="section-tag mx-auto">
                  <i className="ri-question-line"></i> FAQ
                </div>
                <h2 className="section-title text-white">
                  Frequently Asked Questions — <span className="text-gradient">{data.title} Software</span>
                </h2>
              </div>
              <div className="space-y-3">
                {seoSpec.faqs.map((faq, idx) => (
                  <div key={idx} className="glass-card rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <h3 className="font-heading text-sm md:text-base font-semibold text-white pr-4">
                        {faq.q}
                      </h3>
                      <i
                        className={`ri-arrow-down-s-line text-accent-400 text-lg transition-transform duration-300 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      ></i>
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 pt-3 border-t border-white/[0.05] text-xs md:text-sm text-white/55 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-14 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8 md:p-14 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-accent-500/8 blur-[100px]"></div>
              <div className="relative z-10">
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-3">
                  Ready to Build Custom {data.title} Software?
                </h2>
                <p className="text-white/45 text-sm max-w-lg mx-auto mb-8">
                  Get a free architecture consultation with our {data.title.toLowerCase()} software engineers at AI Software Technology (A Brand of Digi India Solutions, Rohini, New Delhi).
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/contact');
                    }}
                    className="glass-btn-primary cursor-pointer"
                  >
                    Get Free {data.title} Consultation <i className="ri-arrow-right-line ml-2"></i>
                  </a>
                  <a href="tel:+919990390519" className="glass-btn cursor-pointer">
                    <i className="ri-phone-line mr-2 text-accent-400"></i> Call +91 9990390519
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
      <ScrollToTop />
    </div>
  );
}