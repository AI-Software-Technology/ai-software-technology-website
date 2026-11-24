export interface RouteKeywordSpec {
  routePath: string;
  pageName: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: 'Commercial / Transactional' | 'Informational / Commercial' | 'Navigational / Brand' | 'Informational / AEO';
  metricsStatus: 'Unverified — Requires Google Search Console & Keyword Planner Research';
  seoTitle: string;
  metaDescription: string;
  h1: string;
  answerFirstSummary: string;
}

export interface ServiceEnrichmentSpec extends RouteKeywordSpec {
  slug: string;
  problemsSolved: { title: string; desc: string }[];
  integrationCapabilities: { title: string; desc: string }[];
  relatedPortfolioSlugs: string[];
  relatedBlogSlugs: string[];
  relatedIndustrySlugs: string[];
}

export interface IndustryEnrichmentSpec extends RouteKeywordSpec {
  slug: string;
  relatedServiceSlugs: string[];
  relatedCaseStudySlugs: string[];
  relatedPortfolioSlugs: string[];
  faqs: { q: string; a: string }[];
}

const UNVERIFIED_STATUS = 'Unverified — Requires Google Search Console & Keyword Planner Research' as const;

export const STATIC_ROUTE_KEYWORD_MAP: Record<string, RouteKeywordSpec> = {
  '/': {
    routePath: '/',
    pageName: 'Homepage',
    primaryKeyword: 'Software Development Company in Delhi',
    supportingKeywords: [
      'Custom Software Development Company in Delhi NCR',
      'Software Development Services in India',
      'ERP CRM HRMS Software Development New Delhi',
      'B2B Business Software Engineering Company Rohini Delhi',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Software Development Company in Delhi | Custom Software Development in Delhi NCR — AI Software Technology',
    metaDescription:
      'AI Software Technology (A Brand of Digi India Solutions) is a custom software development company in Delhi NCR offering ERP, CRM, HRMS, SaaS, mobile apps & AI automation services in India. Call +91 9990390519.',
    h1: 'Custom Software Development Company in Delhi NCR for ERP, CRM, HRMS, SaaS & AI Automation',
    answerFirstSummary:
      'AI Software Technology — A Brand of Digi India Solutions headquartered in Rohini, New Delhi — is a full-cycle software development company in Delhi NCR delivering custom business software, ERP systems, CRM platforms, HRMS & payroll software, multi-tenant SaaS products, Android/iOS mobile apps, and AI workflow automation for growing enterprises across India.',
  },
  '/about': {
    routePath: '/about',
    pageName: 'About Us',
    primaryKeyword: 'About AI Software Technology Digi India Solutions',
    supportingKeywords: [
      'Custom Software Engineering Brand in New Delhi',
      'B2B Software Development Team Rohini Delhi NCR',
      'Enterprise ERP CRM HRMS Software Architects India',
    ],
    searchIntent: 'Navigational / Brand',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'About AI Software Technology | Custom Software Development Brand of Digi India Solutions in Delhi NCR',
    metaDescription:
      'Learn how AI Software Technology, a specialized software development brand of Digi India Solutions in Rohini, New Delhi, builds custom ERP, CRM, HRMS, SaaS, mobile apps, and AI automation systems.',
    h1: 'About AI Software Technology — A Brand of Digi India Solutions',
    answerFirstSummary:
      'AI Software Technology operates as the dedicated custom software engineering brand of Digi India Solutions in Rohini Sector-24, New Delhi, helping organizations replace fragmented spreadsheets with secure, role-based ERP, CRM, HRMS, SaaS, and mobile software.',
  },
  '/services': {
    routePath: '/services',
    pageName: 'Services Hub',
    primaryKeyword: 'Custom Software Development Services in India',
    supportingKeywords: [
      'B2B Business Software Development Services Delhi NCR',
      'Enterprise ERP CRM HRMS SaaS Development Services',
      'End-to-End Application Development & Cloud Integration',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom Software Development Services in India | ERP, CRM, HRMS, SaaS & AI — AI Software Technology',
    metaDescription:
      'Explore 25 custom software development services in India by AI Software Technology (Digi India Solutions, Delhi NCR): Custom Software, ERP, CRM, HRMS, SaaS, Mobile Apps, GST Billing & AI Automation.',
    h1: 'Custom Software & Business Technology Development Services',
    answerFirstSummary:
      'AI Software Technology provides 25 specialized B2B software engineering services—spanning custom enterprise applications, ERP, CRM, HRMS, SaaS product development, Android/iOS apps, industry management systems, cloud DevOps, and AI business automation.',
  },
  '/portfolio': {
    routePath: '/portfolio',
    pageName: 'Portfolio Hub',
    primaryKeyword: 'Custom Software Development Portfolio India',
    supportingKeywords: [
      'Delivered ERP CRM HRMS Web & Mobile Projects',
      'Enterprise Software & Portal Implementations Delhi NCR',
      'B2B Web Application & Automation Project Showcase',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom Software & Web Development Portfolio | 42+ Delivered B2B Projects — AI Software Technology',
    metaDescription:
      'Explore 42+ software and web development projects delivered by AI Software Technology (A Brand of Digi India Solutions, New Delhi) across ERP, CRM, HRMS, order management, portals & mobile apps.',
    h1: 'Custom Software, ERP, CRM & Web Application Portfolio',
    answerFirstSummary:
      'Our software portfolio showcases 42+ production systems engineered by AI Software Technology across custom ERP suites, dealer order management portals, factory biometric attendance platforms, healthcare systems, and B2B web applications.',
  },
  '/case-studies': {
    routePath: '/case-studies',
    pageName: 'Case Studies Hub',
    primaryKeyword: 'Enterprise Software Implementation Case Studies',
    supportingKeywords: [
      'Custom ERP CRM HRMS Architecture Case Studies India',
      'Business Workflow Automation Success Stories',
      'Software Engineering Problem & Solution Case Studies',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Software Implementation Case Studies | ERP, CRM, HRMS & AI Workflows — AI Software Technology',
    metaDescription:
      'Read 9 in-depth software implementation case studies by AI Software Technology (Digi India Solutions) detailing business challenges, architecture, modules, and operational workflows.',
    h1: 'Practical Software Engineering Case Studies for Real Business Workflows',
    answerFirstSummary:
      'These 9 engineering case studies document how AI Software Technology diagnoses operational bottlenecks and deploys custom ERP, CRM, HRMS, order booking, factory attendance, healthcare, education, and AI automation systems.',
  },
  '/industries': {
    routePath: '/industries',
    pageName: 'Industries Hub',
    primaryKeyword: 'Industry Specific Software Development Solutions',
    supportingKeywords: [
      'Custom Vertical ERP & Management Software India',
      'Healthcare Manufacturing Retail Education Real Estate Software',
      'Domain-Specific Business Software Company Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Industry-Specific Software Solutions | Healthcare, Manufacturing, Retail & Real Estate — AI Software Technology',
    metaDescription:
      'AI Software Technology (A Brand of Digi India Solutions, Delhi NCR) develops domain-specific software across 8 industries: Healthcare, Manufacturing, Education, Retail, Real Estate, Finance, Hospitality & Construction.',
    h1: 'Industry-Specific Custom Software & ERP Solutions',
    answerFirstSummary:
      'We engineer domain-specific operational software tailored to the regulatory, billing, inventory, and workforce requirements of 8 core industries across Delhi NCR and India.',
  },
  '/blogs': {
    routePath: '/blogs',
    pageName: 'Blogs & Insights Hub',
    primaryKeyword: 'B2B Software Development and Cloud Computing Blog',
    supportingKeywords: [
      'ERP CRM HRMS & SaaS Implementation Guides India',
      'Custom Software vs SaaS & Web Architecture Insights',
      'AI Business Automation & Cloud Migration Articles',
    ],
    searchIntent: 'Informational / AEO',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'B2B Software Engineering, ERP, CRM, Cloud & AI Automation Blog — AI Software Technology',
    metaDescription:
      'Explore 63+ technical guides and B2B decision frameworks on Custom Software, ERP, CRM, HRMS, Cloud Computing, Web Development, and AI Automation from AI Software Technology.',
    h1: 'B2B Software Engineering, ERP, Cloud & AI Automation Insights',
    answerFirstSummary:
      'Our knowledge publication features 63+ practical guides written for founders, CTOs, and operations leaders evaluating custom software, ERP/CRM/HRMS implementation, cloud architecture, and AI automation in India.',
  },
  '/calculators': {
    routePath: '/calculators',
    pageName: 'Project Cost Calculator',
    primaryKeyword: 'Software Development Cost Calculator India',
    supportingKeywords: [
      'ERP CRM HRMS Project Budget Estimator',
      'Mobile App & Custom Web Application Cost Estimator',
      'B2B Software Scope & Timeline Calculator',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Software Development Cost Calculator India | Estimate ERP, CRM, App & Web Scope — AI Software Technology',
    metaDescription:
      'Estimate scope, modules, and budget for Custom Software, ERP, CRM, HRMS, Mobile Apps, Web Portals, and AI Automation with AI Software Technology interactive cost calculator.',
    h1: 'Interactive Software, ERP, CRM & Mobile App Cost Calculator',
    answerFirstSummary:
      'Use our interactive project cost estimator to configure modules, user roles, integrations, and deployment preferences for custom software, ERP, CRM, HRMS, mobile apps, or web applications before requesting a formal engineering proposal.',
  },
  '/ai-features': {
    routePath: '/ai-features',
    pageName: 'AI Capabilities Showcase',
    primaryKeyword: 'Enterprise AI Automation and Business Intelligence Solutions',
    supportingKeywords: [
      'AI Lead Qualification & Support Triage Tools',
      'Document OCR & Requirement Analysis AI Workflows',
      'Custom AI Assistant Integration for ERP & CRM',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Enterprise AI Automation & Intelligent Business Workflows | AI Software Technology Delhi NCR',
    metaDescription:
      'Explore practical AI business tools engineered by AI Software Technology (Digi India Solutions): conversational AI chatbots, automated lead scoring, support triage, and document extraction.',
    h1: 'Enterprise AI Automation & Intelligent Business Workflows',
    answerFirstSummary:
      'AI Software Technology integrates practical artificial intelligence capabilities—including RAG knowledge chatbots, automated lead qualification, document data extraction, and intelligent ticket routing—directly into your ERP, CRM, and web systems.',
  },
  '/knowledge-center': {
    routePath: '/knowledge-center',
    pageName: 'Knowledge Center',
    primaryKeyword: 'Software Architecture Guides and Enterprise Tech Resources',
    supportingKeywords: [
      'ERP CRM HRMS Buyer & Implementation Playbooks',
      'Cloud Security & SaaS Architecture Documentation',
      'Digital Transformation Resource Hub India',
    ],
    searchIntent: 'Informational / AEO',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Software Architecture Knowledge Center | ERP, CRM, SaaS Playbooks & Case Studies — AI Software Technology',
    metaDescription:
      'Access software architecture playbooks, ERP/CRM/HRMS implementation checklists, case studies, and cloud engineering documentation from AI Software Technology.',
    h1: 'Software Architecture Knowledge Center & Implementation Playbooks',
    answerFirstSummary:
      'The AI Software Technology Knowledge Center consolidates architecture guides, build-vs-buy comparisons, implementation case studies, and technical FAQs for B2B technology buyers.',
  },
  '/our-journey': {
    routePath: '/our-journey',
    pageName: 'Our Journey',
    primaryKeyword: 'Digi India Solutions to AI Software Technology Journey',
    supportingKeywords: [
      'Software Engineering Milestones Rohini New Delhi',
      'Evolution of AI Software Technology Brand',
    ],
    searchIntent: 'Navigational / Brand',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Our Journey (2022–2026+) | From Digi India Solutions to AI Software Technology in New Delhi',
    metaDescription:
      'Explore the milestones of Digi India Solutions (founded in Rohini, New Delhi) and the growth of AI Software Technology as our dedicated custom software, ERP, CRM, HRMS & AI engineering brand.',
    h1: 'Our Journey — From Digi India Solutions to AI Software Technology',
    answerFirstSummary:
      'Founded in Rohini, New Delhi, Digi India Solutions established AI Software Technology to focus exclusively on custom business software, enterprise ERP/CRM/HRMS suites, cloud SaaS, and AI automation.',
  },
  '/careers': {
    routePath: '/careers',
    pageName: 'Careers',
    primaryKeyword: 'Software Engineering Careers in New Delhi',
    supportingKeywords: [
      'Full Stack React Node.js Developer Jobs Rohini Delhi',
      'Flutter Mobile App & AI Automation Jobs Delhi NCR',
    ],
    searchIntent: 'Navigational / Brand',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Careers at AI Software Technology | Software Engineering, Mobile & AI Jobs in New Delhi',
    metaDescription:
      'Join AI Software Technology (A Brand of Digi India Solutions) in Rohini, New Delhi. Explore career opportunities in Full-Stack Engineering, Flutter/React Native, UI/UX Design, and AI Automation.',
    h1: 'Software Engineering & Product Careers at AI Software Technology',
    answerFirstSummary:
      'AI Software Technology offers software engineering, mobile app development, UI/UX design, and business analysis career opportunities at our Rohini Sector-24, New Delhi engineering center and remote roles across India.',
  },
  '/contact': {
    routePath: '/contact',
    pageName: 'Contact Us',
    primaryKeyword: 'Contact Software Development Company in Rohini New Delhi',
    supportingKeywords: [
      'Book Free ERP CRM HRMS Software Consultation Delhi NCR',
      'AI Software Technology Digi India Solutions Contact Address Phone',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Contact AI Software Technology in Rohini, New Delhi | Free Software Consultation | +91 9990390519',
    metaDescription:
      'Contact AI Software Technology (A Brand of Digi India Solutions) at House No. 158-159, Pocket-10, Sector-24, Rohini, New Delhi – 110085. Call/WhatsApp +91 9990390519 for ERP, CRM, HRMS & Custom Software.',
    h1: 'Contact AI Software Technology — Request a Free Software Consultation in Delhi NCR',
    answerFirstSummary:
      'Reach AI Software Technology (A Brand of Digi India Solutions) at House No. 158-159, Pocket-10, Sector-24, Rohini, New Delhi – 110085, by phone/WhatsApp at +91 9990390519, or email at aisoftwaretechnology2026@gmail.com.',
  },
  '/sitemap': {
    routePath: '/sitemap',
    pageName: 'HTML Sitemap',
    primaryKeyword: 'AI Software Technology Complete Website Directory',
    supportingKeywords: [
      'All Software Services Portfolio Case Studies & Blogs Index',
    ],
    searchIntent: 'Navigational / Brand',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'HTML Sitemap | Complete Directory of 164 Pages — AI Software Technology',
    metaDescription:
      'Browse the complete HTML sitemap of AI Software Technology (A Brand of Digi India Solutions): 25 software services, 42 portfolio projects, 9 case studies, 8 industries & 63 B2B guides.',
    h1: 'Website Sitemap — Complete Directory of 164 Public Pages',
    answerFirstSummary:
      'This HTML sitemap indexes all 164 canonical public pages on aisoftwaretechnology.in, organized across core pages, 25 software development services, 8 industry verticals, 3 technical comparisons, 9 case studies, 42 portfolio implementations, and 63 blog articles.',
  },
  '/comparisons/react-vs-angular': {
    routePath: '/comparisons/react-vs-angular',
    pageName: 'React vs Angular Comparison',
    primaryKeyword: 'React vs Angular for Enterprise Web Applications',
    supportingKeywords: [
      'React vs Angular ERP Dashboard Architecture Comparison',
      'Best Frontend Framework for B2B SaaS Applications',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'React vs Angular for Enterprise Web Apps & ERP Dashboards | Technical Comparison — AI Software Technology',
    metaDescription:
      'Compare React vs Angular for custom web applications, ERP dashboards, and SaaS platforms. Evaluate performance, TypeScript architecture, ecosystem flexibility, and scalability.',
    h1: 'React vs Angular: Frontend Framework Comparison for Enterprise Web Applications',
    answerFirstSummary:
      'React offers flexible component composition and SSR/Next.js ecosystem velocity ideal for SaaS platforms and customer portals, while Angular provides an opinionated full-framework structure suited for large single-convention enterprise teams.',
  },
  '/comparisons/flutter-vs-react-native': {
    routePath: '/comparisons/flutter-vs-react-native',
    pageName: 'Flutter vs React Native Comparison',
    primaryKeyword: 'Flutter vs React Native for Business Mobile Apps',
    supportingKeywords: [
      'Cross-Platform Android and iOS Framework Comparison',
      'Flutter vs React Native Performance and Maintenance Cost',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Flutter vs React Native for Android & iOS Business Apps | Technical Comparison — AI Software Technology',
    metaDescription:
      'Compare Flutter vs React Native for Android and iOS mobile app development. Evaluate rendering speed, native GPS/hardware access, code reuse, and long-term maintenance.',
    h1: 'Flutter vs React Native: Cross-Platform Mobile App Framework Comparison',
    answerFirstSummary:
      'Flutter compiles to native ARM code with its own rendering engine for consistent 60/120fps UI across Android and iOS, whereas React Native leverages JavaScript/TypeScript and native OEM widgets for tight web-team code sharing.',
  },
  '/comparisons/custom-software-vs-saas': {
    routePath: '/comparisons/custom-software-vs-saas',
    pageName: 'Custom Software vs SaaS Comparison',
    primaryKeyword: 'Custom Software vs Ready-Made SaaS Comparison',
    supportingKeywords: [
      'Build vs Buy Enterprise Software Decision Guide India',
      'Custom ERP CRM Ownership vs SaaS Subscription Cost',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom Software vs SaaS (Build vs Buy Guide) | 5-Year TCO & Workflow Comparison — AI Software Technology',
    metaDescription:
      'Compare Custom Software Development vs Ready-Made SaaS for ERP, CRM, and HRMS. Analyze 5-year ownership cost, per-user license fees, custom workflows, and IP control.',
    h1: 'Custom Software vs SaaS: Complete Build vs Buy Comparison for Growing Businesses',
    answerFirstSummary:
      'Off-the-shelf SaaS offers rapid initial sign-up for generic workflows but charges recurring per-user fees, whereas custom software engineered around your exact processes eliminates per-seat licensing and delivers full source-code and data ownership.',
  },
};

export const SERVICE_SEO_MAP: Record<string, ServiceEnrichmentSpec> = {
  'custom-software': {
    routePath: '/services/custom-software',
    slug: 'custom-software',
    pageName: 'Custom Software Development',
    primaryKeyword: 'Custom Software Development Company',
    supportingKeywords: [
      'Custom Business Software Development',
      'Custom Software Solutions for Businesses',
      'Bespoke Enterprise Application Development Delhi NCR',
      'Custom Workflow & Operations Management Software India',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom Software Development Company | Custom Business Software Solutions — AI Software Technology',
    metaDescription:
      'AI Software Technology (A Brand of Digi India Solutions, Delhi NCR) is a custom software development company building custom business software solutions, internal workflows & admin portals. Call +91 9990390519.',
    h1: 'Custom Software Development Company for Scalable Business Operations',
    answerFirstSummary:
      'Custom software development is the engineering of tailor-made web, cloud, and mobile applications designed around a company’s exact operational workflows, approval hierarchies, and data integration requirements. AI Software Technology (A Brand of Digi India Solutions in New Delhi) builds custom software solutions for businesses that have outgrown spreadsheets and rigid off-the-shelf tools.',
    problemsSolved: [
      {
        title: 'Disconnected Spreadsheets & Departmental Silos',
        desc: 'Replaces scattered Excel sheets and manual WhatsApp follow-ups with a centralized database where sales, operations, accounts, and management share real-time data.',
      },
      {
        title: 'Rigid Off-the-Shelf Software Limitations',
        desc: 'Eliminates the need to force your business rules into inflexible packaged templates that lack your custom approval stages, pricing formulas, or branch hierarchy.',
      },
      {
        title: 'Escalating Per-User SaaS License Costs',
        desc: 'Removes recurring per-seat subscription penalties as your staff, dealers, or branch locations expand across Delhi NCR and India.',
      },
      {
        title: 'Lack of Role-Based Audit & Data Security',
        desc: 'Enforces granular user permissions, action logs, and branch-level data isolation so employees only view or edit records authorized for their role.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Accounting, Tally & GST E-Invoicing Sync',
        desc: 'Bi-directional voucher, ledger, and GST invoice synchronization with Tally Prime, Zoho Books, and NIC e-Invoicing / e-Way Bill APIs.',
      },
      {
        title: 'WhatsApp Business API, SMS & Email Gateways',
        desc: 'Automated event-driven alerts for order confirmations, quotation PDFs, approval requests, and payment reminders via official WhatsApp Cloud API and SMTP.',
      },
      {
        title: 'Payment Gateways & Banking Reconciliation',
        desc: 'Direct integration with Razorpay, PayU, Cashfree, Stripe, and UPI QR webhooks for automated payment capture and ledger reconciliation.',
      },
      {
        title: 'Biometric Hardware, Barcodes & Third-Party REST APIs',
        desc: 'Seamless connectivity with biometric attendance machines, barcode/QR scanners, thermal printers, CRM lead sources, and logistics courier APIs.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'astrology-matrimonial-platform', 'factory-attendance-management-software'],
    relatedBlogSlugs: [
      'custom-software-vs-ready-made-software-for-indian-businesses',
      'how-select-software-development-company-india-2026',
      'custom-software-improves-business-productivity-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'healthcare'],
  },
  'erp-solutions': {
    routePath: '/services/erp-solutions',
    slug: 'erp-solutions',
    pageName: 'ERP Software Development',
    primaryKeyword: 'ERP Software Development Company',
    supportingKeywords: [
      'Custom ERP Software Development',
      'ERP Software for Manufacturing Businesses',
      'Multi-Branch Enterprise Resource Planning Software India',
      'Inventory Purchase Sales & GST ERP Development Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'ERP Software Development Company | Custom ERP Software for Manufacturing & Business — AI Software Technology',
    metaDescription:
      'Looking for an ERP software development company? AI Software Technology builds custom ERP software for manufacturing businesses, trading & multi-branch enterprises in Delhi NCR & India. Call +91 9990390519.',
    h1: 'ERP Software Development Company — Custom ERP for Manufacturing & Growing Businesses',
    answerFirstSummary:
      'An ERP (Enterprise Resource Planning) system unifies procurement, inventory, production/BOM, sales order processing, GST billing, finance, and HR into a single database. AI Software Technology engineers custom ERP software for manufacturing businesses, wholesale distributors, and multi-branch enterprises in Delhi NCR and across India.',
    problemsSolved: [
      {
        title: 'Inventory Mismatches Across Warehouses & Godowns',
        desc: 'Provides real-time stock ledger tracking across raw materials, WIP, and finished goods with batch numbers, rack locations, and automated reorder alerts.',
      },
      {
        title: 'Uncontrolled Procurement & Purchase Leakage',
        desc: 'Standardizes Purchase Requisitions (PR), supplier quotations, multi-level Purchase Order (PO) approvals, Gate Entry, and Quality Checked GRN matching.',
      },
      {
        title: 'Delayed Financial & Branch MIS Consolidation',
        desc: 'Consolidates multi-branch sales, receivables, payables, cost centers, and P&L statements automatically without month-end manual spreadsheet merging.',
      },
      {
        title: 'Lack of Production & BOM Cost Visibility',
        desc: 'Tracks multi-level Bills of Materials (BOM), shop-floor job cards, scrap/wastage norms, and actual vs estimated per-unit manufacturing cost.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Tally Prime & Financial Accounting Bridges',
        desc: 'Automated synchronization of sales invoices, purchase bills, credit/debit notes, and payment receipts with Tally or built-in double-entry accounting.',
      },
      {
        title: 'GST E-Invoice, E-Way Bill & HSN Compliance',
        desc: 'One-click IRN & QR code generation for B2B e-Invoicing, automated e-Way bill preparation, and GSTR-1 / GSTR-3B export utilities.',
      },
      {
        title: 'Barcode, RFID & Weighbridge Hardware Connectivity',
        desc: 'Supports barcode label printing, handheld warehouse scanners, electronic weighing scales, and biometric workforce attendance terminals.',
      },
      {
        title: 'Dealer Portals, CRM & E-Commerce Order Sync',
        desc: 'Connects field sales apps, B2B distributor portals, and WhatsApp notification engines directly to central ERP inventory and dispatch queues.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'hartner', 'sartech-india'],
    relatedBlogSlugs: [
      'how-erp-software-improves-inventory-billing-and-operations',
      'benefits-erp-manufacturing-companies-india-2026',
      'complete-erp-implementation-guide-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'construction'],
  },
  'crm-solutions': {
    routePath: '/services/crm-solutions',
    slug: 'crm-solutions',
    pageName: 'CRM Software Development',
    primaryKeyword: 'CRM Software Development Company',
    supportingKeywords: [
      'Custom CRM Software',
      'Sales and Lead Management Software',
      'WhatsApp Integrated CRM Software India',
      'B2B Sales Pipeline & Follow-Up Automation Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'CRM Software Development Company | Custom CRM, Sales & Lead Management Software — AI Software Technology',
    metaDescription:
      'AI Software Technology is a CRM software development company in Delhi NCR building custom CRM software and sales and lead management software with WhatsApp, Facebook & quotation sync. Call +91 9990390519.',
    h1: 'CRM Software Development Company — Custom CRM, Sales & Lead Management Software',
    answerFirstSummary:
      'Custom CRM (Customer Relationship Management) software centralizes multi-channel lead capture, automated sales distribution, follow-up reminders, WhatsApp/email communication, and quotation-to-order conversion. AI Software Technology builds custom CRM and sales and lead management software tailored to your sales stages and team hierarchy.',
    problemsSolved: [
      {
        title: 'Lead Leakage from Ad Campaigns & Marketplaces',
        desc: 'Automatically captures every enquiry from website forms, Meta/Facebook Ads, Google Ads, IndiaMART, and WhatsApp into one unified lead inbox.',
      },
      {
        title: 'Missed Sales Follow-Ups & Delayed Quotations',
        desc: 'Enforces SLA timers, daily follow-up queues, automated WhatsApp reminders, and 1-click PDF quotation generation so prospects never go cold.',
      },
      {
        title: 'Zero Visibility into Sales Executive Productivity',
        desc: 'Provides sales managers with live funnel conversion metrics, call/visit logs, deal-stage aging reports, and target-vs-achievement dashboards.',
      },
      {
        title: 'Client Data Loss During Sales Staff Turnover',
        desc: 'Protects complete customer interaction timelines, call notes, proposals, and renewal dates inside a secure role-restricted company database.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Meta (Facebook/Instagram), Google Ads & Portal Webhooks',
        desc: 'Real-time lead ingestion from Facebook Lead Ads, Google Search campaigns, landing pages, IndiaMART, TradeIndia, and property portals.',
      },
      {
        title: 'WhatsApp Business Cloud API & Two-Way Chat',
        desc: 'Send automated welcome templates, brochures, quotation PDFs, and payment reminders while logging customer replies on the lead timeline.',
      },
      {
        title: 'Cloud Telephony, IVR & Click-to-Call Systems',
        desc: 'Integrates with Exotel, Knowlarity, MyOperator, and SIP dialers for click-to-call dialing, call duration logging, and recording playback.',
      },
      {
        title: 'ERP, Billing & Customer Support Helpdesk Sync',
        desc: 'Converts won CRM deals directly into ERP sales orders, tax invoices, or AMC support contracts without duplicate data entry.',
      },
    ],
    relatedPortfolioSlugs: ['biziffy', 'hks-consulting', 'ssp-infra'],
    relatedBlogSlugs: [
      'complete-guide-to-crm-software-for-sales-and-lead-management',
      'benefits-crm-small-businesses-india-2026',
      'crm-implementation-guide-india-2026',
    ],
    relatedIndustrySlugs: ['real-estate', 'finance'],
  },
  'hrms-software': {
    routePath: '/services/hrms-software',
    slug: 'hrms-software',
    pageName: 'HRMS & Payroll Software',
    primaryKeyword: 'HRMS Software Development Company',
    supportingKeywords: [
      'HR and Payroll Management Software',
      'Employee Attendance Management Software',
      'Biometric Payroll PF ESI Software Development India',
      'Custom Employee Self-Service HRMS Portal Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'HRMS Software Development Company | HR, Payroll & Employee Attendance Software — AI Software Technology',
    metaDescription:
      'AI Software Technology is an HRMS software development company in Delhi NCR building custom HR and payroll management software and employee attendance management software with biometric sync. Call +91 9990390519.',
    h1: 'HRMS Software Development Company — Custom HR, Payroll & Employee Attendance Management Software',
    answerFirstSummary:
      'HRMS and Payroll software automates the complete employee lifecycle—from onboarding, biometric/geo-fenced attendance, shift rostering, and leave approvals to statutory PF/ESI/TDS payroll computation and salary slip generation. AI Software Technology develops custom HR and payroll management software for offices, factories, and multi-branch teams.',
    problemsSolved: [
      {
        title: 'Manual Month-End Salary & Overtime Calculation Errors',
        desc: 'Automates attendance-linked salary computation, late-mark deductions, shift allowances, overtime multipliers, loan EMIs, and arrears in one click.',
      },
      {
        title: 'Indian Statutory Compliance Complexity (PF, ESI, PT, TDS)',
        desc: 'Generates accurate EPF ECR files, ESIC contribution sheets, state-wise Professional Tax deductions, and income tax TDS declarations.',
      },
      {
        title: 'Disputed Attendance, Shift & Leave Records',
        desc: 'Links directly with biometric fingerprint/face terminals and GPS mobile check-ins with transparent employee self-service regularization workflows.',
      },
      {
        title: 'Paper-Heavy Onboarding, Reimbursements & Exit Clearances',
        desc: 'Digitizes employee KYC document vaults, offer/appointment letters, travel expense claims, asset handover tracking, and full-and-final settlement.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Biometric Attendance Hardware (eSSL, ZKTeco, Matrix)',
        desc: 'Real-time push/pull synchronization with fingerprint, RFID card, and AI facial recognition attendance devices across multiple office or factory gates.',
      },
      {
        title: 'Bank Payout Files & Accounting Journal Sync',
        desc: 'Exports bulk NEFT/RTGS salary disbursement files for major Indian banks and posts monthly payroll journal vouchers into ERP/Tally.',
      },
      {
        title: 'WhatsApp & Email Payslip / Leave Notifications',
        desc: 'Automatically delivers encrypted PDF salary slips, leave approval updates, and birthday/anniversary alerts via WhatsApp and email.',
      },
      {
        title: 'GPS Mobile ESS App & Field Workforce Sync',
        desc: 'Connects with Android/iOS Employee Self-Service apps for geo-tagged field attendance, leave requests, and tax declaration uploads.',
      },
    ],
    relatedPortfolioSlugs: ['factory-attendance-management-software', 'hks-consulting', 'aggar-security-services'],
    relatedBlogSlugs: [
      'hrms-software-features-every-growing-company-needs',
      'why-growing-businesses-need-custom-software-instead-of-spreadsheets',
      'custom-software-improves-business-productivity-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'healthcare'],
  },
  'ai-automation': {
    routePath: '/services/ai-automation',
    slug: 'ai-automation',
    pageName: 'AI & Business Automation',
    primaryKeyword: 'AI Automation Company in Delhi',
    supportingKeywords: [
      'AI Business Automation Solutions',
      'Custom AI Chatbot Development',
      'Intelligent Workflow & Document OCR Automation Delhi NCR',
      'Enterprise LLM & RAG Knowledge Assistant Development India',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'AI Automation Company in Delhi | AI Business Automation & Custom AI Chatbot Development — AI Software Technology',
    metaDescription:
      'AI Software Technology is an AI automation company in Delhi NCR delivering AI business automation solutions, custom AI chatbot development, document OCR & CRM/ERP workflow automation. Call +91 9990390519.',
    h1: 'AI Automation Company in Delhi — AI Business Automation Solutions & Custom AI Chatbot Development',
    answerFirstSummary:
      'AI business automation combines conversational AI chatbots, Retrieval-Augmented Generation (RAG) knowledge assistants, intelligent document OCR, and event-driven workflow pipelines to eliminate repetitive manual work. AI Software Technology is an AI automation company in Delhi NCR engineering custom AI solutions integrated with your ERP, CRM, and WhatsApp channels.',
    problemsSolved: [
      {
        title: 'Slow 24/7 Customer Response & Unqualified Enquiries',
        desc: 'Deploys custom AI chatbots trained on your product catalog and policies to answer buyer questions instantly, qualify budget/intent, and book demos round the clock.',
      },
      {
        title: 'Manual Data Entry from Invoices, POs & KYC Documents',
        desc: 'Uses intelligent OCR and LLM extraction pipelines to parse PDF purchase orders, vendor bills, and ID documents directly into structured ERP/CRM records.',
      },
      {
        title: 'Repetitive Cross-System Copy-Pasting by Staff',
        desc: 'Automates multi-step workflows across email, WhatsApp, CRM, inventory, and billing systems with human-in-the-loop approval guardrails.',
      },
      {
        title: 'Scattered Internal SOPs & Slow Support Triage',
        desc: 'Provides internal staff with an AI knowledge assistant that retrieves accurate answers from company manuals, pricing sheets, and ticket history.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'OpenAI, Gemini & Private RAG Vector Databases',
        desc: 'Secure API orchestration with leading LLM providers and vector stores grounded strictly on your verified business documents and database schemas.',
      },
      {
        title: 'WhatsApp Business API, Website Widget & Social Inbox',
        desc: 'Unified omnichannel AI agent deployment across your website chat widget, official WhatsApp Business number, Instagram DM, and customer portal.',
      },
      {
        title: 'Custom ERP, CRM & Helpdesk Webhook Pipelines',
        desc: 'Real-time function calling to check live order status, fetch inventory availability, create CRM leads, or escalate priority support tickets.',
      },
      {
        title: 'Document OCR, Email Parsers & Cloud Storage',
        desc: 'Automated ingestion of attachments from corporate email inboxes, Google Drive, or S3 buckets for structured validation and database entry.',
      },
    ],
    relatedPortfolioSlugs: ['digi-india-solutions', 'robotic-wet-labs', 'biziffy'],
    relatedBlogSlugs: [
      'how-ai-automation-reduces-manual-business-work',
      'best-ai-automation-solutions-growing-companies-2026',
      'ai-chatbots-vs-human-support-complete-comparison-2026',
    ],
    relatedIndustrySlugs: ['finance', 'retail'],
  },
  'mobile-app-development': {
    routePath: '/services/mobile-app-development',
    slug: 'mobile-app-development',
    pageName: 'Android & iOS App Development',
    primaryKeyword: 'Mobile App Development Company in Delhi',
    supportingKeywords: [
      'Android and iOS App Development',
      'Custom Mobile Application Development',
      'Flutter & React Native App Development Delhi NCR',
      'B2B Enterprise & Customer Mobile App Developers India',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Mobile App Development Company in Delhi | Android, iOS & Custom Mobile Application Development — AI Software Technology',
    metaDescription:
      'AI Software Technology is a mobile app development company in Delhi NCR offering Android and iOS app development, Flutter/React Native apps & custom mobile application development. Call +91 9990390519.',
    h1: 'Mobile App Development Company in Delhi — Android, iOS & Custom Mobile Application Development',
    answerFirstSummary:
      'AI Software Technology is a mobile app development company in Delhi NCR engineering native Android, iOS, and cross-platform Flutter and React Native mobile applications. We deliver high-performance customer apps, B2B dealer ordering apps, field sales GPS trackers, and workforce attendance apps synchronized with cloud backends.',
    problemsSolved: [
      {
        title: 'Lack of On-the-Go Access for Field Teams & Customers',
        desc: 'Puts real-time order booking, service requests, live shipment tracking, and executive approval dashboards directly in the pocket of customers and field staff.',
      },
      {
        title: 'High Cost of Maintaining Separate Android & iOS Codebases',
        desc: 'Uses modern Flutter and React Native architectures to deliver 60fps native-grade Android and iOS apps from a shared, maintainable engineering codebase.',
      },
      {
        title: 'Data Loss in Low-Connectivity Field Environments',
        desc: 'Implements local SQLite/Room offline-first storage so field executives, site engineers, and delivery staff can capture data offline and auto-sync when online.',
      },
      {
        title: 'Low Customer Retention & Missed Repeat Orders',
        desc: 'Engages users with targeted push notifications, 1-tap UPI checkout, loyalty wallets, and seamless biometric login experiences.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'GPS Maps, Geo-Fencing & Live Route Tracking',
        desc: 'Google Maps SDK, background location tracking, geo-fenced attendance check-ins, and turn-by-turn delivery route optimization.',
      },
      {
        title: 'UPI, Razorpay, PayU & In-App Payment Gateways',
        desc: 'Secure mobile payment flows supporting UPI intent (GPay, PhonePe, Paytm), credit/debit cards, net banking, and digital wallets.',
      },
      {
        title: 'Firebase Push Notifications, Deep Links & Analytics',
        desc: 'Real-time FCM push alerts, WhatsApp/SMS OTP authentication, deep linking to specific screens, and crash/performance telemetry.',
      },
      {
        title: 'Camera, Barcode/QR Scanner, Bluetooth Printer & ERP APIs',
        desc: 'Native hardware integration for QR code scanning, document camera capture, portable Bluetooth thermal receipt printers, and REST/GraphQL ERP backends.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'factory-attendance-management-software', 'emi-plus-care'],
    relatedBlogSlugs: [
      'mobile-app-development-cost-india-2026',
      'flutter-vs-react-native-comparison-2026',
      'android-vs-ios-development-comparison-2026',
    ],
    relatedIndustrySlugs: ['retail', 'healthcare'],
  },
  'saas-development': {
    routePath: '/services/saas-development',
    slug: 'saas-development',
    pageName: 'SaaS Application Development',
    primaryKeyword: 'SaaS Application Development Company',
    supportingKeywords: [
      'Multi-Tenant SaaS Platform Development',
      'Custom Cloud SaaS Product Engineering India',
      'B2B Subscription Software Development Company Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'SaaS Application Development Company | Multi-Tenant Cloud SaaS Development — AI Software Technology',
    metaDescription:
      'AI Software Technology is a SaaS application development company in Delhi NCR building multi-tenant cloud SaaS platforms with subscription billing, RBAC, APIs & auto-scaling. Call +91 9990390519.',
    h1: 'SaaS Application Development Company — Multi-Tenant Cloud SaaS Product Engineering',
    answerFirstSummary:
      'SaaS (Software as a Service) application development involves architecting secure, multi-tenant cloud platforms with automated tenant onboarding, tiered subscription billing, role-based access control, and scalable APIs. AI Software Technology helps startups and enterprises design, build, and scale commercial B2B SaaS products.',
    problemsSolved: [
      {
        title: 'Single-Tenant Architecture Bottlenecks',
        desc: 'Replaces manual per-client server deployments with a unified multi-tenant architecture that isolates tenant data while sharing elastic cloud infrastructure.',
      },
      {
        title: 'Manual Subscription Invoicing & Feature Gating',
        desc: 'Automates free trials, monthly/annual plan upgrades, usage-based metering, dunning retries, and feature entitlements per subscription tier.',
      },
      {
        title: 'Slow Tenant Onboarding & White-Label Setup',
        desc: 'Enables self-service workspace creation, custom subdomain/domain mapping, organization branding, and team invite flows in minutes.',
      },
      {
        title: 'Performance Degradation Under Growing Tenant Load',
        desc: 'Engineers indexed PostgreSQL schemas, Redis caching layers, background job queues, and containerized auto-scaling for high availability.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Stripe, Razorpay Subscriptions & GST Tax Invoicing',
        desc: 'Recurring billing webhooks, proration handling, automated GST tax invoice PDF generation, and multi-currency checkout.',
      },
      {
        title: 'SSO, OAuth 2.0, RBAC & Audit Logging',
        desc: 'Google/Microsoft Workspace SSO, JWT/session security, organization-level role permissions, and compliance audit logs.',
      },
      {
        title: 'Customer-Facing REST APIs & Webhook Dispatchers',
        desc: 'Rate-limited API key management, Swagger/OpenAPI documentation, and outgoing event webhooks for enterprise SaaS customers.',
      },
      {
        title: 'AWS / Azure / GCP Container & CI/CD Pipelines',
        desc: 'Zero-downtime Docker deployments, automated database backups, tenant usage telemetry, and health monitoring.',
      },
    ],
    relatedPortfolioSlugs: ['hotel-management-software', 'astrology-matrimonial-platform', 'biziffy'],
    relatedBlogSlugs: [
      'cloud-computing-guide-for-businesses',
      'benefits-of-custom-web-applications',
      'aws-vs-azure-vs-google-cloud',
    ],
    relatedIndustrySlugs: ['finance', 'education'],
  },
  'website-development': {
    routePath: '/services/website-development',
    slug: 'website-development',
    pageName: 'Website & Web Application Development',
    primaryKeyword: 'Custom Web Application Development Company',
    supportingKeywords: [
      'Website Development Company in Delhi NCR',
      'Enterprise Web Portal Development Services India',
      'React Next.js Business Website & Web App Developers',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom Web Application Development Company | Website & Web Portal Development in Delhi NCR — AI Software Technology',
    metaDescription:
      'AI Software Technology is a custom web application development company in Delhi NCR building high-speed corporate websites, B2B web portals & React/Next.js applications. Call +91 9990390519.',
    h1: 'Custom Web Application & Corporate Website Development Company in Delhi NCR',
    answerFirstSummary:
      'AI Software Technology engineers SEO-architected corporate websites, multi-role B2B web portals, booking platforms, and progressive web applications using React, Next.js, TypeScript, and Node.js—optimized for Core Web Vitals, security, and lead conversion.',
    problemsSolved: [
      {
        title: 'Slow, Outdated Websites That Fail to Convert B2B Leads',
        desc: 'Replaces sluggish template sites with sub-second, mobile-responsive web architectures designed around clear B2B buyer journeys and conversion CTAs.',
      },
      {
        title: 'Poor Search Engine Visibility & Missing Technical SEO',
        desc: 'Implements prerendered semantic HTML, clean canonical URLs, JSON-LD structured data, and Core Web Vitals optimization from day one.',
      },
      {
        title: 'Lack of Self-Service Customer, Vendor or Partner Portals',
        desc: 'Builds secure login portals where clients, dealers, or students can track orders, download invoices, upload documents, and raise tickets online.',
      },
      {
        title: 'Content Management & Security Vulnerabilities',
        desc: 'Provides easy-to-use admin CMS dashboards with role permissions, HTTPS/CSP security headers, and automated form-to-CRM lead routing.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'CRM, WhatsApp & Marketing Lead Capture Sync',
        desc: 'Instant webhook routing from website enquiry forms and cost calculators directly to your CRM, WhatsApp sales alerts, and email autoresponders.',
      },
      {
        title: 'Google Analytics 4, Tag Manager & Search Console',
        desc: 'Complete conversion event tracking, GTM dataLayer instrumentation, dynamic XML sitemaps, and Schema.org rich-result markup.',
      },
      {
        title: 'Payment Gateways, Booking Calendars & Document Vaults',
        desc: 'Seamless integration with Razorpay/Stripe payments, appointment scheduling engines, and secure cloud file storage.',
      },
      {
        title: 'ERP, Inventory & Custom Backend API Connectivity',
        desc: 'Connects public web portals directly to internal ERP product catalogs, live pricing engines, and customer account ledgers.',
      },
    ],
    relatedPortfolioSlugs: ['astrology-matrimonial-platform', 'sddipl', 'legal-sources'],
    relatedBlogSlugs: [
      'website-development-cost-india-2027',
      'benefits-of-custom-web-applications',
      'react-vs-nextjs-business-website',
    ],
    relatedIndustrySlugs: ['education', 'real-estate'],
  },
  'whatsapp-automation': {
    routePath: '/services/whatsapp-automation',
    slug: 'whatsapp-automation',
    pageName: 'WhatsApp Business API & Chatbot Integration',
    primaryKeyword: 'WhatsApp Business API Integration Company',
    supportingKeywords: [
      'WhatsApp Chatbot Development for Business',
      'Automated WhatsApp CRM & Order Notification System',
      'WhatsApp Lead Capture & Follow-Up Automation India',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'WhatsApp Business API Integration Company | WhatsApp Chatbot & CRM Automation — AI Software Technology',
    metaDescription:
      'Automate lead capture, interactive chatbots, quotation/invoice PDF delivery & payment reminders with our WhatsApp Business API integration services in Delhi NCR & India. Call +91 9990390519.',
    h1: 'WhatsApp Business API Integration & Custom WhatsApp Chatbot Development',
    answerFirstSummary:
      'WhatsApp Business API integration connects your official verified business WhatsApp number directly to your CRM, ERP, billing, and customer support systems. AI Software Technology builds interactive WhatsApp chatbots, automated order/invoice PDF triggers, payment reminder workflows, and multi-agent team inboxes.',
    problemsSolved: [
      {
        title: 'Delayed Manual Replies to Incoming Customer Enquiries',
        desc: 'Responds instantly 24/7 with interactive list messages, reply buttons, product catalogs, and automated lead qualification questions.',
      },
      {
        title: 'Manual Sending of Invoices, Quotations & Dispatch Alerts',
        desc: 'Automatically triggers approved WhatsApp template messages with attached PDF bills, LR bilty copies, or booking confirmations from your ERP/CRM.',
      },
      {
        title: 'Fragmented Customer Chats on Personal Sales Phones',
        desc: 'Centralizes all customer WhatsApp conversations into a shared multi-agent web inbox with lead assignment and complete chat audit history.',
      },
      {
        title: 'Overdue Receivables & Missed Appointment Turnouts',
        desc: 'Schedules automated WhatsApp payment due reminders with UPI payment links and appointment/demo confirmation prompts.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Official Meta WhatsApp Cloud API & BSP Providers',
        desc: 'Direct integration with Meta Cloud API, Interakt, Wati, Gupshup, or AiSensy with template approval and webhook management.',
      },
      {
        title: 'CRM Lead Pipelines & Automated Follow-Up Drip Flows',
        desc: 'Two-way synchronization of incoming WhatsApp leads, chat transcripts, and status tags with custom CRM software.',
      },
      {
        title: 'ERP, GST Billing & E-Commerce Order Events',
        desc: 'Event-driven triggers for order placement, invoice generation, dispatch tracking links, and delivery OTP verification.',
      },
      {
        title: 'AI Knowledge Chatbot & Human Agent Handover',
        desc: 'Combines structured button flows with AI natural-language responses and seamless escalation to live sales or support agents.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'mansha-clinic', 'biziffy'],
    relatedBlogSlugs: [
      'how-ai-automation-reduces-manual-business-work',
      'ai-chatbots-vs-human-support-complete-comparison-2026',
      'complete-guide-to-crm-software-for-sales-and-lead-management',
    ],
    relatedIndustrySlugs: ['retail', 'healthcare'],
  },
  'inventory-management-software': {
    routePath: '/services/inventory-management-software',
    slug: 'inventory-management-software',
    pageName: 'Inventory Management Software',
    primaryKeyword: 'Inventory Management Software Development',
    supportingKeywords: [
      'Custom Warehouse and Stock Management Software India',
      'Multi-Godown Barcode Inventory Control System',
      'Batch Expiry & Reorder Alert Inventory Software Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Inventory Management Software Development | Multi-Warehouse & Barcode Stock Control — AI Software Technology',
    metaDescription:
      'AI Software Technology develops custom inventory management software in Delhi NCR & India with multi-godown stock tracking, barcode/QR scanning, batch expiry & reorder alerts. Call +91 9990390519.',
    h1: 'Custom Inventory Management & Multi-Warehouse Stock Control Software Development',
    answerFirstSummary:
      'Custom inventory management software provides real-time SKU visibility across multiple warehouses, godowns, and retail outlets—tracking inward GRNs, barcode/QR movements, batch and expiry dates, stock transfers, and automated minimum-stock reorder alerts.',
    problemsSolved: [
      {
        title: 'Frequent Stockouts of Fast-Moving Items & Dead Stock Pileup',
        desc: 'Monitors SKU velocity and minimum/maximum reorder thresholds to trigger timely purchase requisitions and highlight slow-moving inventory.',
      },
      {
        title: 'Discrepancies Between Physical Stock & Book Stock',
        desc: 'Enforces barcode-scanned inward GRN, rack/bin allocation, inter-godown challans, and cycle-count stock audit workflows.',
      },
      {
        title: 'Batch, Serial Number & Expiry Loss in Regulated Goods',
        desc: 'Implements FIFO/FEFO dispatch rules with lot number, serial warranty tracking, and advance expiry warnings for pharma, FMCG, and electronics.',
      },
      {
        title: 'Lack of Multi-Branch & In-Transit Stock Visibility',
        desc: 'Tracks stock available, reserved for open sales orders, damaged/quarantined, and in-transit across every warehouse and branch.',
      },
    ],
    integrationCapabilities: [
      {
        title: '1D/2D Barcode Printers & Wireless Handheld Scanners',
        desc: 'Generates custom barcode/QR labels and integrates with USB, Bluetooth, and Android PDA warehouse barcode terminals.',
      },
      {
        title: 'ERP Procurement, Sales Order & GST Billing Modules',
        desc: 'Automatically reserves inventory on sales order confirmation and deducts stock upon delivery challan or GST invoice generation.',
      },
      {
        title: 'E-Commerce Marketplaces & POS Counter Sync',
        desc: 'Synchronizes real-time available stock quantities across retail POS counters, B2B dealer portals, and online stores.',
      },
      {
        title: 'Tally Accounting & Valuation Reports (FIFO / Weighted Avg)',
        desc: 'Exports accurate closing stock valuation, COGS journals, and item-wise profitability statements for financial audits.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'adr-oil-seals', 'goyat-trading'],
    relatedBlogSlugs: [
      'how-erp-software-improves-inventory-billing-and-operations',
      'benefits-erp-manufacturing-companies-india-2026',
      'custom-software-vs-ready-made-software-for-indian-businesses',
    ],
    relatedIndustrySlugs: ['manufacturing', 'retail'],
  },
  'billing-gst-software': {
    routePath: '/services/billing-gst-software',
    slug: 'billing-gst-software',
    pageName: 'Billing & GST Software',
    primaryKeyword: 'Custom GST Billing Software Development',
    supportingKeywords: [
      'GST Invoicing and Accounting Software for Business India',
      'E-Invoicing & E-Way Bill Automation Software Delhi NCR',
      'Multi-Branch B2B & Retail GST Billing System',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom GST Billing Software Development | E-Invoicing, Ledger & Invoicing Software — AI Software Technology',
    metaDescription:
      'Build custom GST billing software tailored to your pricing rules, HSN/SAC tax slabs, e-Invoicing, e-Way bills, customer ledgers & payment reminders with AI Software Technology. Call +91 9990390519.',
    h1: 'Custom GST Billing, E-Invoicing & Business Accounting Software Development',
    answerFirstSummary:
      'Custom GST billing software automates compliant tax invoicing (CGST, SGST, IGST), HSN/SAC code summaries, proforma estimates, delivery challans, credit/debit notes, party ledger reconciliation, and direct e-Invoice/e-Way Bill generation tailored to your business pricing rules.',
    problemsSolved: [
      {
        title: 'Slow Manual Billing & Tax Calculation Mistakes',
        desc: 'Automates customer-specific price lists, tiered volume discounts, state-wise IGST vs CGST/SGST calculation, and HSN tax summaries.',
      },
      {
        title: 'Uncollected Receivables & Ageing Outstanding Balances',
        desc: 'Tracks bill-by-bill party ledgers, credit limits, due-date ageing (30/60/90 days), and sends automated WhatsApp/email payment reminders.',
      },
      {
        title: 'Cumbersome E-Invoicing, E-Way Bill & GST Return Prep',
        desc: 'Generates IRN/QR e-Invoices and e-Way bills directly and exports clean GSTR-1, GSTR-3B, and HSN summary reports for your CA.',
      },
      {
        title: 'Disconnected Quotations, Challans & Final Tax Invoices',
        desc: 'Converts estimates/proforma invoices and multiple delivery challans into a consolidated GST tax invoice in one click.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'NIC GST E-Invoice & E-Way Bill API Integration',
        desc: 'Direct GSP/API connectivity for instant IRN generation, QR code printing on invoices, and automated e-Way bill part-A/part-B updates.',
      },
      {
        title: 'Tally Prime Export & Double-Entry Accounting Sync',
        desc: 'One-click XML/Excel voucher export to Tally Prime covering sales, purchase, receipt, payment, and journal entries.',
      },
      {
        title: 'UPI Dynamic QR, Razorpay Payment Links & Bank Reconciliation',
        desc: 'Prints dynamic UPI QR codes on invoices and embeds payment links in WhatsApp invoice messages for instant settlement.',
      },
      {
        title: 'Thermal POS Printers, A4/A5 Custom Invoice Templates & Barcode',
        desc: 'Supports branded A4/A5 laser invoices, transport bilty formats, and 2-inch/3-inch thermal receipt printers.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'sunita-enterprises', 'goel-mewe-wale'],
    relatedBlogSlugs: [
      'how-erp-software-improves-inventory-billing-and-operations',
      'custom-software-vs-ready-made-software-for-indian-businesses',
      'benefits-crm-small-businesses-india-2026',
    ],
    relatedIndustrySlugs: ['finance', 'retail'],
  },
  'order-management-software': {
    routePath: '/services/order-management-software',
    slug: 'order-management-software',
    pageName: 'Order Management Software',
    primaryKeyword: 'Order Management Software Development',
    supportingKeywords: [
      'Custom B2B Dealer Order Booking Portal India',
      'Sales Order to Dispatch & Fulfillment Tracking Software',
      'Multi-Channel Order Management System Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Order Management Software Development | B2B Order Booking to Dispatch System — AI Software Technology',
    metaDescription:
      'Streamline order capture, credit approval, inventory allocation, packing, dispatch & invoicing with custom Order Management Software by AI Software Technology (Delhi NCR). Call +91 9990390519.',
    h1: 'Custom Order Management Software — From B2B Order Booking to Dispatch & Invoicing',
    answerFirstSummary:
      'Custom order management software centralizes orders from field sales teams, B2B distributors, WhatsApp, and web portals into a structured fulfillment pipeline covering credit limit checks, stock allocation, pick-pack-ship workflows, dispatch challans, and GST invoicing.',
    problemsSolved: [
      {
        title: 'Orders Lost or Miscommunicated Over Phone & WhatsApp',
        desc: 'Replaces verbal and unstructured chat orders with a standardized order booking portal and mobile app displaying live SKU catalogues and pricing.',
      },
      {
        title: 'Fulfillment Delays Between Sales, Warehouse & Dispatch',
        desc: 'Routes approved orders immediately to warehouse picking queues with partial-dispatch tracking, backorder management, and packing slips.',
      },
      {
        title: 'Unchecked Dispatch to Dealers Exceeding Credit Limits',
        desc: 'Automatically validates customer credit limits and overdue invoice ageing before releasing orders for warehouse dispatch.',
      },
      {
        title: 'Customers Calling Repeatedly for Order & Dispatch Status',
        desc: 'Sends automated WhatsApp and portal notifications at every milestone: Order Confirmed, Packed, Dispatched (with LR/courier details), and Delivered.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Warehouse Inventory & Production Planning Sync',
        desc: 'Real-time stock reservation on order approval and automated work-order triggers for make-to-order manufacturing items.',
      },
      {
        title: 'GST Billing, E-Way Bill & Tally Accounting Sync',
        desc: 'Converts dispatched pick-lists directly into GST invoices, delivery challans, and e-Way bills without re-entering line items.',
      },
      {
        title: 'Courier Aggregators & Transport LR Tracking',
        desc: 'Integrates with Shiprocket, Delhivery, BlueDart, and B2B transport LR/bilty workflows for live shipment status updates.',
      },
      {
        title: 'Field Sales Mobile App & Dealer Self-Service Portal',
        desc: 'Empowers field executives and B2B distributors to place repeat orders, view scheme discounts, and download ledger statements 24/7.',
      },
    ],
    relatedPortfolioSlugs: ['lubricant-order-management-software', 'goyat-trading', 'delhi-book-store'],
    relatedBlogSlugs: [
      'how-erp-software-improves-inventory-billing-and-operations',
      'benefits-workflow-automation-2026',
      'business-benefits-mobile-apps-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'retail'],
  },
  'manufacturing-software': {
    routePath: '/services/manufacturing-software',
    slug: 'manufacturing-software',
    pageName: 'Manufacturing Management Software',
    primaryKeyword: 'Manufacturing Management Software Development',
    supportingKeywords: [
      'Production Planning and BOM Software India',
      'Custom Shop-Floor & Work Order Tracking Software',
      'Factory ERP & Material Requirement Planning (MRP) Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Manufacturing Management Software Development | BOM, MRP & Shop-Floor ERP — AI Software Technology',
    metaDescription:
      'AI Software Technology builds custom manufacturing management software in Delhi NCR & India: multi-level BOM, MRP, production planning, job cards, QC & wastage control. Call +91 9990390519.',
    h1: 'Custom Manufacturing Management Software — BOM, Production Planning & Shop-Floor Control',
    answerFirstSummary:
      'Manufacturing management software digitizes factory operations from multi-level Bill of Materials (BOM) and Material Requirement Planning (MRP) to shop-floor work orders, subcontractor job-work tracking, quality inspection (QC), and finished-goods costing.',
    problemsSolved: [
      {
        title: 'Raw Material Shortages Halting Production Schedules',
        desc: 'Calculates exact raw material requirements against open sales orders and BOM formulas, triggering timely procurement before shop-floor shortages occur.',
      },
      {
        title: 'Unmeasured Shop-Floor Scrap, Wastage & Rework',
        desc: 'Tracks stage-wise material issue vs output yield across cutting, molding, assembly, and packaging to pinpoint abnormal wastage.',
      },
      {
        title: 'Zero Visibility into Outside Job-Work & Subcontractors',
        desc: 'Manages outward job-work challans, vendor material balances, processing charges, and inward quality verification.',
      },
      {
        title: 'Inaccurate Finished Goods Costing & Margin Erosion',
        desc: 'Computes true unit production cost combining raw material consumption, machine hours, direct labor shifts, and factory overheads.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Multi-Godown Inventory, Barcode & Weighbridge Sync',
        desc: 'Tracks raw material lots, WIP bins, and finished goods cartoons with barcode/QR labels and digital weighing scale integration.',
      },
      {
        title: 'Factory Biometric Attendance & Shift Roster Integration',
        desc: 'Connects with shop-floor biometric/face terminals to track multi-shift worker attendance, overtime, and piece-rate productivity.',
      },
      {
        title: 'Quality Control (IQC, IPQC, FQC) & Lab Test Certificates',
        desc: 'Embeds mandatory quality parameter checks at inward GRN, in-process production stages, and pre-dispatch batch release.',
      },
      {
        title: 'GST E-Invoicing, E-Way Bill & Tally Accounting Bridge',
        desc: 'Synchronizes purchase bills, job-work challans, and B2B sales dispatches with GST compliance and financial accounting.',
      },
    ],
    relatedPortfolioSlugs: ['hartner', 'sonic-tool-ultrasonic', 'adr-oil-seals'],
    relatedBlogSlugs: [
      'benefits-erp-manufacturing-companies-india-2026',
      'how-erp-software-improves-inventory-billing-and-operations',
      'cloud-erp-vs-traditional-erp-comparison-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'construction'],
  },
  'hospital-management-software': {
    routePath: '/services/hospital-management-software',
    slug: 'hospital-management-software',
    pageName: 'Hospital & Clinic Management Software',
    primaryKeyword: 'Hospital Management Software Development',
    supportingKeywords: [
      'Custom HMS and Clinic Management Software India',
      'OPD IPD EMR Pharmacy & Pathology Lab Software',
      'Healthcare Management System Development Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Hospital Management Software Development | Custom HMS, OPD/IPD, EMR & Pharmacy — AI Software Technology',
    metaDescription:
      'AI Software Technology develops custom Hospital Management Software (HMS) & clinic software in Delhi NCR & India: OPD/IPD, EMR, pharmacy, lab reports & TPA billing. Call +91 9990390519.',
    h1: 'Custom Hospital & Clinic Management Software (HMS) Development',
    answerFirstSummary:
      'Hospital Management Software (HMS) connects patient registration, OPD appointment queues, doctor EMR prescriptions, IPD bed/ward management, pathology lab reporting, pharmacy stock, and insurance/TPA billing into a unified healthcare platform.',
    problemsSolved: [
      {
        title: 'Long OPD Queues & Fragmented Patient Medical History',
        desc: 'Assigns unique UHID patient profiles with instant access to past visits, vitals, allergies, digital prescriptions, and diagnostic reports.',
      },
      {
        title: 'Revenue Leakage in IPD Ward, OT & Consumable Billing',
        desc: 'Automatically posts room charges, nursing care, doctor rounds, surgery consumables, and diagnostic tests directly to the patient’s IPD running bill.',
      },
      {
        title: 'Pharmacy Expiry Losses & Unreconciled Drug Stock',
        desc: 'Links doctor e-prescriptions directly to the pharmacy counter with batch-wise FEFO dispensing, Schedule-H tracking, and expiry alerts.',
      },
      {
        title: 'Delayed Lab & Radiology Report Delivery',
        desc: 'Automates barcode sample collection, reference-range validation, pathologist sign-off, and instant WhatsApp PDF report delivery to patients.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Pathology Lab Analyzers & PACS/DICOM Imaging',
        desc: 'Interfaces with diagnostic laboratory workflows, barcode sample tubes, and digital radiology report attachments.',
      },
      {
        title: 'WhatsApp Patient Notifications & Telemedicine Video',
        desc: 'Sends automated appointment confirmations, queue token alerts, prescription PDFs, and lab reports via official WhatsApp Business API.',
      },
      {
        title: 'TPA / Corporate Insurance Billing & Package Tariffs',
        desc: 'Supports customizable rate lists across cash, CGHS, ECHS, TPA insurance panels, and surgical package billing.',
      },
      {
        title: 'Multi-Clinic Cloud Sync, Biometric Staff HRMS & Tally',
        desc: 'Centralizes financial MIS, doctor payout share calculations, staff shift attendance, and accounting across multiple clinic branches.',
      },
    ],
    relatedPortfolioSlugs: ['mansha-clinic', 'mental-health-clinic', 'manovaidya'],
    relatedBlogSlugs: [
      'best-software-solutions-for-schools-hospitals-and-service-businesses',
      'custom-software-vs-ready-made-software-for-indian-businesses',
      'benefits-of-custom-web-applications',
    ],
    relatedIndustrySlugs: ['healthcare', 'finance'],
  },
  'hotel-management-software': {
    routePath: '/services/hotel-management-software',
    slug: 'hotel-management-software',
    pageName: 'Hotel Management Software',
    primaryKeyword: 'Hotel Management Software Development',
    supportingKeywords: [
      'Custom Hotel PMS and Room Reservation Software India',
      'Front Desk Housekeeping Banquet & Restaurant KOT POS Software',
      'Hospitality Property Management System Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Hotel Management Software Development | Custom Hotel PMS, Booking & Restaurant POS — AI Software Technology',
    metaDescription:
      'Build custom Hotel Management Software (PMS) with front-desk room calendar, direct booking engine, housekeeping, banquet billing & restaurant KOT POS by AI Software Technology. Call +91 9990390519.',
    h1: 'Custom Hotel Management Software (PMS), Reservation & Restaurant POS Development',
    answerFirstSummary:
      'Hotel Management Software (Property Management System / PMS) unifies front-desk reservations, digital guest KYC check-in, housekeeping room status, restaurant KOT & room-service POS, banquet event billing, and consolidated night-audit GST folios.',
    problemsSolved: [
      {
        title: 'Double Bookings & Out-of-Sync Room Availability',
        desc: 'Provides a real-time visual room rack calendar showing vacant, occupied, reserved, dirty, and under-maintenance rooms across all categories.',
      },
      {
        title: 'Unbilled Room Service, Laundry & Mini-Bar Charges at Checkout',
        desc: 'Automatically posts restaurant KOT bills, laundry, spa, and extra-bed charges directly to the guest’s master room folio in real time.',
      },
      {
        title: 'Slow Front-Desk Check-In & Housekeeping Turnaround',
        desc: 'Speeds up arrival with digital ID card capture and instantly notifies housekeeping staff on mobile when a room checks out for cleaning.',
      },
      {
        title: 'Complex Banquet, Corporate Tariff & Split-Folio GST Billing',
        desc: 'Handles corporate BTC accounts, travel agent commissions, banquet hall packages, and split room-vs-food GST tax invoices effortlessly.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Website Direct Booking Engine & OTA Channel Manager APIs',
        desc: 'Connects your hotel website booking engine and channel manager feeds for synchronized room inventory and tariff plans.',
      },
      {
        title: 'Restaurant Touch POS, Kitchen KOT Printers & Bar Inventory',
        desc: 'Routes table and room-service orders instantly to kitchen/bar thermal KOT printers while deducting recipe-level F&B stock.',
      },
      {
        title: 'WhatsApp Guest Concierge, Digital Check-In & Feedback',
        desc: 'Sends automated booking vouchers, Google Maps location pins, digital menu links, and checkout invoice PDFs over WhatsApp.',
      },
      {
        title: 'RFID Keycard Locks, Tally Accounting & Multi-Property MIS',
        desc: 'Supports night-audit revenue reports (ADR, RevPAR, occupancy %) and exports daily sales journals to Tally Prime.',
      },
    ],
    relatedPortfolioSlugs: ['hotel-management-software', 'hotel-highway-rasoi', 'astrology-matrimonial-platform'],
    relatedBlogSlugs: [
      'best-software-solutions-for-schools-hospitals-and-service-businesses',
      'custom-software-improves-business-productivity-2026',
      'benefits-of-custom-web-applications',
    ],
    relatedIndustrySlugs: ['hospitality', 'retail'],
  },
  'logistics-software': {
    routePath: '/services/logistics-software',
    slug: 'logistics-software',
    pageName: 'Logistics & Shipment Tracking Software',
    primaryKeyword: 'Logistics and Shipment Tracking Software Development',
    supportingKeywords: [
      'Custom Transport Management System (TMS) India',
      'Fleet Dispatch LR Bilty & Consignment Tracking Software',
      'Courier & Cargo Operations Management Software Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Logistics & Shipment Tracking Software Development | Custom TMS, LR Bilty & Fleet ERP — AI Software Technology',
    metaDescription:
      'AI Software Technology develops custom logistics & shipment tracking software in Delhi NCR & India: LR/bilty booking, hub manifest, fleet GPS, POD & freight billing. Call +91 9990390519.',
    h1: 'Custom Logistics, Transport Management (TMS) & Shipment Tracking Software Development',
    answerFirstSummary:
      'Logistics and Transport Management Software (TMS) digitizes consignment booking (LR/Bilty), hub-to-hub manifest loading, vehicle & driver trip sheets, live GPS shipment tracking, digital Proof of Delivery (e-POD), and corporate freight GST billing.',
    problemsSolved: [
      {
        title: 'Manual Paper LR / Bilty Preparation & Branch Delays',
        desc: 'Generates standardized digital LRs/bilties with barcode docket numbers, automatic freight rate calculation, and instant consignor/consignee copies.',
      },
      {
        title: 'Blind Spots in Hub Transit, Unloading & Last-Mile Delivery',
        desc: 'Tracks every consignment scan across booking branch, origin hub, transit manifest, destination hub unloading, and out-for-delivery run sheets.',
      },
      {
        title: 'Delayed POD Collection Blocking Customer Freight Billing',
        desc: 'Enables drivers and delivery boys to capture customer signature, photo POD, or OTP confirmation via mobile app for immediate invoice release.',
      },
      {
        title: 'Uncontrolled Fleet Fuel, Toll, Driver Advance & Maintenance Costs',
        desc: 'Monitors vehicle-wise trip profitability, diesel mileage, FASTag/toll expenses, driver bhatta advances, and tyre/service reminders.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'NIC E-Way Bill API, Vahan & FASTag Data Sync',
        desc: 'Automates e-Way bill verification, vehicle number updates, consolidated e-Way bill generation, and expiry alerts.',
      },
      {
        title: 'Vehicle GPS Telematics & Driver Mobile App',
        desc: 'Integrates with onboard AIS-140 GPS hardware and Android driver apps for live map tracking and digital POD uploads.',
      },
      {
        title: 'Public AWB/LR Tracking Portal & WhatsApp Alerts',
        desc: 'Provides shippers and consignees with a live tracking widget on your website plus automated WhatsApp dispatch and delivery alerts.',
      },
      {
        title: 'ERP Order Sync, Tally Freight Accounting & COD Reconciliation',
        desc: 'Reconciles Cash-on-Delivery (COD) collections, transporter vendor payouts, and corporate monthly freight contracts with Tally.',
      },
    ],
    relatedPortfolioSlugs: ['tci-india', 'lubricant-order-management-software', 'surjeet-india'],
    relatedBlogSlugs: [
      'how-erp-software-improves-inventory-billing-and-operations',
      'business-benefits-mobile-apps-2026',
      'benefits-workflow-automation-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'retail'],
  },
  'field-sales-tracking-software': {
    routePath: '/services/field-sales-tracking-software',
    slug: 'field-sales-tracking-software',
    pageName: 'Field Sales & GPS Tracking Software',
    primaryKeyword: 'Field Sales Tracking Software Development',
    supportingKeywords: [
      'GPS Field Force & Sales Executive Tracking App India',
      'Geo-Verified Client Visit & Mobile Order Booking Software',
      'Field Service & Beat Plan Management System Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Field Sales Tracking Software Development | GPS Sales Force & Beat Order Booking App — AI Software Technology',
    metaDescription:
      'Track field sales visits, GPS attendance, daily beat plans, mobile order booking & travel expense claims with custom Field Sales Tracking Software by AI Software Technology. Call +91 9990390519.',
    h1: 'Custom Field Sales & GPS Workforce Tracking Software Development',
    answerFirstSummary:
      'Field sales tracking software pairs an offline-capable Android/iOS mobile app for field executives with a live manager web dashboard—verifying GPS attendance, daily beat routes, geo-tagged dealer visits, on-spot mobile order booking, payment collection, and kilometer-based travel expense claims.',
    problemsSolved: [
      {
        title: 'Unverified Field Visits & Fake Daily Call Reports (DCR)',
        desc: 'Validates every customer or dealer visit with geo-fenced GPS check-in/check-out timestamps, live selfie/store photo capture, and visit outcome notes.',
      },
      {
        title: 'Delayed Order Transmission from Field to Head Office',
        desc: 'Allows sales reps to book dealer orders, check live stock/credit limits, and record cheque/UPI collections directly from the store counter.',
      },
      {
        title: 'Inflated Travel Allowance (TA/DA) & Kilometer Claims',
        desc: 'Calculates actual distance traveled via GPS route breadcrumbs and attaches digital fuel/hotel receipts for transparent expense approval.',
      },
      {
        title: 'Poor Territory Coverage & Missed Dealer Follow-Ups',
        desc: 'Structures weekly/monthly beat plans so managers can see planned vs visited outlets, productive calls, and zero-order retailers.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Google Maps Route Breadcrumbs & Offline GPS Caching',
        desc: 'Captures accurate location points even in low-network zones and syncs route timelines automatically when connectivity returns.',
      },
      {
        title: 'ERP Order Management, Inventory & Party Ledger Sync',
        desc: 'Pushes field orders directly into central ERP dispatch queues and displays real-time dealer outstanding balances on the rep’s app.',
      },
      {
        title: 'CRM Lead Pipeline & WhatsApp Order Confirmation',
        desc: 'Sends instant WhatsApp order summary receipts to the retailer/dealer as soon as the field executive submits an order.',
      },
      {
        title: 'HRMS Attendance & Payroll Expense Reimbursement',
        desc: 'Feeds field punch-in/punch-out logs and approved TA/DA expense claims directly into monthly HRMS payroll processing.',
      },
    ],
    relatedPortfolioSlugs: ['factory-attendance-management-software', 'lubricant-order-management-software', 'aryan-air-conditioner'],
    relatedBlogSlugs: [
      'complete-guide-to-crm-software-for-sales-and-lead-management',
      'business-benefits-mobile-apps-2026',
      'mobile-app-development-cost-india-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'retail'],
  },
  'attendance-workforce-software': {
    routePath: '/services/attendance-workforce-software',
    slug: 'attendance-workforce-software',
    pageName: 'Attendance & Workforce Management Software',
    primaryKeyword: 'Attendance and Workforce Management Software',
    supportingKeywords: [
      'Factory Shift & Biometric Attendance Software India',
      'Contractor Labor & Overtime Management System Delhi NCR',
      'Geo-Fenced Mobile & Facial Recognition Attendance Software',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Attendance & Workforce Management Software | Biometric, Shift & Factory Attendance — AI Software Technology',
    metaDescription:
      'AI Software Technology develops custom Attendance & Workforce Management Software in Delhi NCR & India: biometric/face sync, rotational shifts, overtime & contractor labor logs. Call +91 9990390519.',
    h1: 'Custom Attendance & Workforce Management Software for Offices, Factories & Field Teams',
    answerFirstSummary:
      'Attendance and workforce management software automates real-time punch capture from biometric/facial hardware and geo-fenced mobile apps, handling complex rotational shift rosters, grace-time rules, overtime approvals, gate-pass tracking, and contractor labor compliance.',
    problemsSolved: [
      {
        title: 'Buddy Punching, Proxy Attendance & Manual Register Errors',
        desc: 'Eliminates attendance manipulation using AI facial recognition terminals, fingerprint devices, and geo-fenced selfie check-ins with liveness checks.',
      },
      {
        title: 'Complex Multi-Shift, Night-Shift & Rotational Roster Chaos',
        desc: 'Automates A/B/C rotational shift scheduling, cross-midnight shift pairing, weekly-off swaps, and department-wise manpower strength alerts.',
      },
      {
        title: 'Uncontrolled Overtime (OT) & Unrecorded Gate Passes',
        desc: 'Enforces supervisor pre-approval for overtime hours, tracks short-leave gate passes, and calculates exact payable working hours.',
      },
      {
        title: 'Lack of Visibility Across Multi-Site & Contractor Labor',
        desc: 'Consolidates daily muster rolls across head office, factory plants, warehouses, and contract labor vendors in one live dashboard.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'eSSL, ZKTeco, Matrix & Hikvision Biometric/Face Terminals',
        desc: 'Direct ADMS/push-protocol and SDK integration for real-time punch ingestion from multi-location attendance hardware.',
      },
      {
        title: 'HRMS Payroll, PF/ESI & Contractor Billing Sync',
        desc: 'Converts locked monthly attendance sheets directly into payable days, OT hours, and contractor vendor invoice verification.',
      },
      {
        title: 'Turnstile Access Control & Visitor/Gate-Pass Systems',
        desc: 'Links employee shift validity with physical flap-barrier/door access and security gate in/out verification.',
      },
      {
        title: 'WhatsApp / SMS Absenteeism & Shift Alerts',
        desc: 'Notifies department heads of morning shift shortages and sends automated late-coming or missed-punch alerts to employees.',
      },
    ],
    relatedPortfolioSlugs: ['factory-attendance-management-software', 'aggar-security-services', 'kvs-total-care'],
    relatedBlogSlugs: [
      'hrms-software-features-every-growing-company-needs',
      'benefits-erp-manufacturing-companies-india-2026',
      'custom-software-improves-business-productivity-2026',
    ],
    relatedIndustrySlugs: ['manufacturing', 'construction'],
  },
  'retail-pos-software': {
    routePath: '/services/retail-pos-software',
    slug: 'retail-pos-software',
    pageName: 'Retail & POS Software',
    primaryKeyword: 'Retail POS Software Development Company',
    supportingKeywords: [
      'Custom Point of Sale and Supermarket Billing Software India',
      'Multi-Store Barcode POS & Loyalty Management System',
      'Omnichannel Retail Billing & Inventory Software Delhi NCR',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Retail POS Software Development Company | Custom Barcode POS, Billing & Multi-Store Sync — AI Software Technology',
    metaDescription:
      'Build custom Retail & POS Software with high-speed barcode billing, UPI/card terminal integration, loyalty points & multi-store inventory sync by AI Software Technology. Call +91 9990390519.',
    h1: 'Custom Retail & Point of Sale (POS) Software Development for Single & Multi-Store Chains',
    answerFirstSummary:
      'Custom Retail and Point of Sale (POS) software delivers keyboard-and-barcode optimized counter billing, split UPI/card/cash tenders, promotional scheme engines, customer loyalty points, and real-time multi-store inventory synchronization.',
    problemsSolved: [
      {
        title: 'Slow Checkout Queues During Peak Store Hours',
        desc: 'Provides lightning-fast barcode scanning, hotkey billing, hold/recall bills, and instant thermal receipt printing to clear counter queues rapidly.',
      },
      {
        title: 'Cashier Pilferage, Unauthorized Discounts & Cash Mismatches',
        desc: 'Enforces cashier shift opening/closing cash drawer reconciliation, role-restricted discount approvals, and strict void/return audit logs.',
      },
      {
        title: 'Out-of-Sync Pricing, Offers & Stock Across Multiple Outlets',
        desc: 'Pushes centralized MRP updates, Buy-X-Get-Y combo offers, and inter-store stock transfers from head office to all retail branches.',
      },
      {
        title: 'Low Repeat Footfall & Paper Bill Waste',
        desc: 'Builds a customer mobile-number CRM with automated loyalty point accrual, tier rewards, and digital WhatsApp invoice receipts.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Barcode Scanners, Label Printers, Cash Drawers & Pole Displays',
        desc: 'Plug-and-play compatibility with 1D/2D laser scanners, TSC/Zebra barcode printers, thermal receipt printers, and weighing scales.',
      },
      {
        title: 'Pine Labs, Paytm, Razorpay EDC Terminals & Dynamic UPI QR',
        desc: 'Pushes exact bill amounts directly to card swipe/UPI EDC machines and displays dynamic UPI QR codes on customer-facing screens.',
      },
      {
        title: 'E-Commerce Storefront & Central Warehouse ERP Sync',
        desc: 'Unifies physical store inventory with your online D2C website and central distribution warehouse in real time.',
      },
      {
        title: 'WhatsApp Digital Receipts, Loyalty Campaigns & Tally Export',
        desc: 'Sends paperless WhatsApp bills with feedback links and exports daily register-wise GST sales summaries to Tally Prime.',
      },
    ],
    relatedPortfolioSlugs: ['goel-mewe-wale', 'goyat-trading', 'delhi-book-store'],
    relatedBlogSlugs: [
      'custom-software-vs-ready-made-software-for-indian-businesses',
      'how-erp-software-improves-inventory-billing-and-operations',
      'benefits-crm-small-businesses-india-2026',
    ],
    relatedIndustrySlugs: ['retail', 'hospitality'],
  },
  'ecommerce-development': {
    routePath: '/services/ecommerce-development',
    slug: 'ecommerce-development',
    pageName: 'E-commerce Development',
    primaryKeyword: 'Custom E-Commerce Development Company',
    supportingKeywords: [
      'B2B and B2C E-Commerce Website & App Development India',
      'Multi-Vendor Marketplace Software Development Delhi NCR',
      'Custom Online Store with ERP Inventory & Payment Gateway Sync',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom E-Commerce Development Company | B2B, D2C & Multi-Vendor Marketplace Development — AI Software Technology',
    metaDescription:
      'AI Software Technology is a custom e-commerce development company in Delhi NCR building B2C/D2C stores, B2B wholesale portals & multi-vendor marketplaces with ERP & shipping sync. Call +91 9990390519.',
    h1: 'Custom E-Commerce & Multi-Vendor Marketplace Development Company',
    answerFirstSummary:
      'AI Software Technology engineers high-converting B2C/D2C online stores, B2B wholesale ordering portals, and multi-vendor marketplaces with custom catalog filtering, tiered pricing, UPI/card checkout, courier aggregation, and real-time ERP inventory integration.',
    problemsSolved: [
      {
        title: 'Cart Abandonment & Slow Mobile Checkout Experiences',
        desc: 'Engineers fast-loading product pages, elastic search/filtering, 1-click coupon validation, and frictionless UPI/wallet/card checkout flows.',
      },
      {
        title: 'Complex B2B Wholesale Pricing, MOQs & Credit Terms',
        desc: 'Supports customer-specific B2B price tiers, minimum order quantities (MOQ), bulk case-pack ordering, GST input verification, and credit limits.',
      },
      {
        title: 'Manual Vendor Payouts & Commission Splits in Marketplaces',
        desc: 'Automates multi-vendor seller onboarding, catalog approval, order splitting, platform commission deduction, and vendor settlement cycles.',
      },
      {
        title: 'Overselling Due to Disconnected Warehouse & Store Stock',
        desc: 'Synchronizes live inventory, GST invoicing, and return/RTO stock updates directly with your central warehouse or retail POS.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Razorpay, Cashfree, PayU, Stripe & COD Verification',
        desc: 'Complete domestic and international payment gateway integration with automated refund processing and COD OTP verification.',
      },
      {
        title: 'Shiprocket, Delhivery, BlueDart & Hyperlocal Delivery APIs',
        desc: 'Automated pincode serviceability checks, shipping label/manifest generation, AWB tracking, and NDR/RTO management.',
      },
      {
        title: 'ERP, Inventory, POS & Tally GST Accounting Sync',
        desc: 'Bi-directional sync of product SKUs, stock levels, GST tax invoices, and marketplace settlement reconciliation.',
      },
      {
        title: 'WhatsApp Abandoned Cart Recovery & Meta/Google Catalog Feeds',
        desc: 'Triggers automated WhatsApp cart recovery reminders, order tracking alerts, and dynamic XML product feeds for Google/Meta Shopping ads.',
      },
    ],
    relatedPortfolioSlugs: ['toy-boy-india', 'goel-mewe-wale', 'delhi-book-store'],
    relatedBlogSlugs: [
      'website-development-cost-india-2027',
      'complete-digital-marketing-guide-2026',
      'mobile-app-development-cost-india-2026',
    ],
    relatedIndustrySlugs: ['retail', 'manufacturing'],
  },
  'api-development-integration': {
    routePath: '/services/api-development-integration',
    slug: 'api-development-integration',
    pageName: 'API Development & Integration',
    primaryKeyword: 'API Development and System Integration Services',
    supportingKeywords: [
      'Custom REST & GraphQL API Development Company India',
      'Tally ERP CRM Payment Gateway & Webhook Integration Delhi NCR',
      'Enterprise Middleware & Third-Party Software Connectivity',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'API Development & System Integration Services | REST APIs, Tally, ERP & Payment Sync — AI Software Technology',
    metaDescription:
      'Connect your ERP, CRM, Tally, payment gateways, WhatsApp, courier & biometric hardware with secure API development & system integration services by AI Software Technology. Call +91 9990390519.',
    h1: 'Custom API Development & Enterprise System Integration Services',
    answerFirstSummary:
      'API development and system integration services connect disparate software applications—such as ERP, CRM, Tally Prime, payment gateways, courier aggregators, WhatsApp Business API, and biometric devices—through secure REST/GraphQL endpoints, webhooks, and resilient middleware queues.',
    problemsSolved: [
      {
        title: 'Duplicate Manual Data Entry Across Disconnected Tools',
        desc: 'Eliminates CSV exports and manual re-typing by synchronizing leads, orders, inventory, and accounting vouchers automatically in real time.',
      },
      {
        title: 'Brittle Integrations That Fail Silently Under Load',
        desc: 'Implements idempotent webhook handlers, dead-letter retry queues, payload schema validation, and real-time sync failure alerting.',
      },
      {
        title: 'Inability to Expose Data to Mobile Apps or Partner Portals',
        desc: 'Builds clean, versioned, OAuth/JWT-secured REST and GraphQL APIs with Swagger/OpenAPI documentation for web, mobile, and B2B partners.',
      },
      {
        title: 'Legacy On-Premise Software Cut Off from Cloud Platforms',
        desc: 'Engineers secure connector agents that bridge local desktop/LAN databases (like Tally or legacy SQL servers) with modern cloud portals.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Tally Prime, Zoho, SAP, Odoo & Custom ERP Connectors',
        desc: 'Bi-directional master and transaction synchronization for ledgers, items, sales orders, GST invoices, and receipts.',
      },
      {
        title: 'Payment Gateways, Banking APIs & NIC GST E-Invoicing',
        desc: 'Razorpay, PayU, Cashfree, Stripe, virtual account reconciliation webhooks, and official GSP e-Invoice / e-Way Bill APIs.',
      },
      {
        title: 'WhatsApp Cloud API, Cloud Telephony (IVR) & Ad Platforms',
        desc: 'Meta Lead Ads, Google Ads, IndiaMART, Exotel/Knowlarity call webhooks, and official WhatsApp template dispatchers.',
      },
      {
        title: 'Biometric Attendance, Barcode, IoT & Courier Aggregator APIs',
        desc: 'eSSL/ZKTeco attendance push servers, Shiprocket/Delhivery logistics webhooks, and industrial sensor/weighbridge data ingestion.',
      },
    ],
    relatedPortfolioSlugs: ['astrology-matrimonial-platform', 'lubricant-order-management-software', 'emi-plus-care'],
    relatedBlogSlugs: [
      'benefits-workflow-automation-2026',
      'best-automation-tools-business-2026',
      'business-cyber-security-guide-2026',
    ],
    relatedIndustrySlugs: ['finance', 'manufacturing'],
  },
  'software-maintenance-support': {
    routePath: '/services/software-maintenance-support',
    slug: 'software-maintenance-support',
    pageName: 'Software Maintenance & Support',
    primaryKeyword: 'Software Maintenance and AMC Support Services',
    supportingKeywords: [
      'Enterprise Application Support & Bug Fixing Company India',
      'Legacy Software Modernization & Database Optimization Delhi NCR',
      'Dedicated SLA Software Maintenance & Server Care',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Software Maintenance & AMC Support Services | SLA Bug Fixing, Security & Upgrades — AI Software Technology',
    metaDescription:
      'Keep your business software fast, secure & reliable with Software Maintenance & AMC Support Services by AI Software Technology (Delhi NCR): bug fixes, DB tuning & upgrades. Call +91 9990390519.',
    h1: 'Software Maintenance, AMC Support & Legacy Application Modernization Services',
    answerFirstSummary:
      'Software maintenance and Annual Maintenance Contract (AMC) support services provide guaranteed SLA response times, proactive bug resolution, database query optimization, OS/dependency security patching, automated backup verification, and iterative feature enhancements for existing web, ERP, CRM, and mobile applications.',
    problemsSolved: [
      {
        title: 'Abandoned or Unresponsive Previous Development Vendors',
        desc: 'Conducts a structured codebase, database, and server audit to take over ongoing maintenance and documentation of your existing software safely.',
      },
      {
        title: 'Slow Database Queries & Frequent Production Downtime',
        desc: 'Optimizes slow SQL/NoSQL queries, adds proper indexing, fixes memory leaks, and configures 24/7 uptime health checks with instant alerts.',
      },
      {
        title: 'Unpatched Security Vulnerabilities & Outdated Frameworks',
        desc: 'Upgrades vulnerable npm/composer/pip packages, renews SSL certificates, hardens API authentication, and verifies disaster-recovery backups.',
      },
      {
        title: 'Stagnant Software That No Longer Matches New Business Rules',
        desc: 'Delivers continuous new modules, report formats, GST compliance updates, and third-party API integrations under a predictable monthly/annual plan.',
      },
    ],
    integrationCapabilities: [
      {
        title: '24/7 Uptime, APM & Error Telemetry Monitoring',
        desc: 'Integrates automated health endpoints, server resource monitoring, error tracking, and slow-query logging.',
      },
      {
        title: 'Automated 3-2-1 Database Backups & Restore Drills',
        desc: 'Configures encrypted daily database snapshots to off-site cloud storage with periodic restoration verification.',
      },
      {
        title: 'CI/CD Staging Pipelines & Zero-Downtime Releases',
        desc: 'Establishes Git version control, staging test environments, and automated deployment scripts so updates never disrupt live users.',
      },
      {
        title: 'React, Node.js, PHP/Laravel, Python, .NET & Flutter Support',
        desc: 'Full-stack maintenance coverage across modern JavaScript/TypeScript stacks, relational/NoSQL databases, Linux VPS, and cloud environments.',
      },
    ],
    relatedPortfolioSlugs: ['digi-india-solutions', 'sddipl', 'pitpro'],
    relatedBlogSlugs: [
      'business-cyber-security-guide-2026',
      'cloud-security-best-practices',
      'how-select-software-development-company-india-2026',
    ],
    relatedIndustrySlugs: ['healthcare', 'finance'],
  },
  'cloud-solutions': {
    routePath: '/services/cloud-solutions',
    slug: 'cloud-solutions',
    pageName: 'Cloud Deployment & Server Setup',
    primaryKeyword: 'Cloud Deployment and Server Setup Services',
    supportingKeywords: [
      'AWS Azure Google Cloud Infrastructure Management India',
      'Linux VPS Security Hardening & CI/CD DevOps Delhi NCR',
      'Cloud Migration & Automated Database Backup Services',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Cloud Deployment & Server Setup Services | AWS, Azure, GCP, VPS & DevOps — AI Software Technology',
    metaDescription:
      'AI Software Technology provides cloud deployment and server setup services in Delhi NCR & India: AWS, Azure, GCP, Ubuntu VPS hardening, Nginx, Docker, CI/CD & 3-2-1 backups. Call +91 9990390519.',
    h1: 'Cloud Deployment, Linux VPS Hardening & DevOps Server Setup Services',
    answerFirstSummary:
      'Cloud deployment and server setup services cover architecting, provisioning, securing, and monitoring production infrastructure across AWS, Microsoft Azure, Google Cloud, and dedicated Linux VPS servers—including Nginx reverse proxies, SSL/TLS, Cloudflare WAF, Docker containers, CI/CD pipelines, and automated 3-2-1 backups.',
    problemsSolved: [
      {
        title: 'Unsecured Servers Vulnerable to Brute-Force & Malware Attacks',
        desc: 'Hardens Ubuntu/Linux servers with SSH key-only access, UFW/Cloudflare firewall lockdown, Fail2Ban intrusion blocking, and strict HTTP security headers.',
      },
      {
        title: 'Risk of Catastrophic Data Loss from Unverified Backups',
        desc: 'Implements automated daily 3-2-1 encrypted database and file backups to off-site object storage with scheduled restore verification.',
      },
      {
        title: 'Risky Manual FTP/SSH Code Deployments Causing Outages',
        desc: 'Builds automated GitHub Actions / GitLab CI/CD pipelines with PM2/Docker process clustering for repeatable, zero-downtime production releases.',
      },
      {
        title: 'Overspending on Unoptimized Cloud Instances',
        desc: 'Right-sizes compute, database, CDN caching, and storage tiers across AWS, Azure, GCP, or high-performance NVMe VPS servers.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'AWS, Microsoft Azure, Google Cloud & NVMe VPS Providers',
        desc: 'Production deployment across EC2, RDS, S3, CloudFront, Azure App Services, GCP Compute, DigitalOcean, Linode, and Hetzner.',
      },
      {
        title: 'Cloudflare WAF, DNS, CDN & Let’s Encrypt TLS/SSL',
        desc: 'Edge DDoS protection, origin IP lockdown, automated TLS certificate renewal, and HTTP/2 & HTTP/3 caching.',
      },
      {
        title: 'Docker, Nginx, PM2 & GitHub Actions CI/CD',
        desc: 'Containerized microservices, reverse-proxy load balancing, process auto-restart, and automated build/prerender deployment pipelines.',
      },
      {
        title: 'PostgreSQL, MySQL, MongoDB & Redis High-Availability Setup',
        desc: 'Tuned database configurations, connection pooling, point-in-time recovery (PITR), and off-site S3/R2 backup sync.',
      },
    ],
    relatedPortfolioSlugs: ['digi-india-solutions', 'hotel-management-software', 'astrology-matrimonial-platform'],
    relatedBlogSlugs: [
      'cloud-computing-guide-for-businesses',
      'cloud-migration-strategy-guide',
      'cloud-security-best-practices',
    ],
    relatedIndustrySlugs: ['finance', 'healthcare'],
  },
  'ui-ux-design': {
    routePath: '/services/ui-ux-design',
    slug: 'ui-ux-design',
    pageName: 'UI/UX Design',
    primaryKeyword: 'Enterprise UI/UX Design Services',
    supportingKeywords: [
      'SaaS Dashboard and ERP Interface Design Company India',
      'Interactive Figma Prototyping & Design Systems Delhi NCR',
      'B2B Web and Mobile Application UX Research & Wireframing',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Enterprise UI/UX Design Services | SaaS Dashboard, ERP & Mobile App UI/UX in Delhi NCR — AI Software Technology',
    metaDescription:
      'Design intuitive ERP dashboards, SaaS platforms & mobile apps with Enterprise UI/UX Design Services by AI Software Technology (Delhi NCR): workflow research, wireframes & Figma systems. Call +91 9990390519.',
    h1: 'Enterprise UI/UX Design Services for ERP Dashboards, SaaS & Mobile Applications',
    answerFirstSummary:
      'Enterprise UI/UX design transforms complex multi-role business workflows into clear, low-friction digital interfaces through user role mapping, wireframing, interactive Figma prototyping, and reusable component design systems before full-stack engineering begins.',
    problemsSolved: [
      {
        title: 'Cluttered ERP & Admin Screens That Confuse Daily Staff',
        desc: 'Simplifies dense data tables, billing counters, and approval queues into intuitive, task-focused layouts that reduce staff training time.',
      },
      {
        title: 'Costly Engineering Rework Due to Unclear Requirements',
        desc: 'Validates every screen, user role flow, and edge case in an interactive clickable Figma prototype before writing production code.',
      },
      {
        title: 'Inconsistent Visuals Across Web Portals & Mobile Apps',
        desc: 'Establishes a unified design system with standardized typography, color tokens, form controls, and responsive grid rules.',
      },
      {
        title: 'High User Drop-Off on Onboarding & Enquiry Flows',
        desc: 'Optimizes information hierarchy, progressive disclosure, and mobile touch targets to maximize task completion and lead conversion.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Figma Component Libraries & Interactive Prototypes',
        desc: 'Auto-layout component tokens, dark/light mode variants, and clickable user-journey flows ready for stakeholder usability testing.',
      },
      {
        title: 'Developer-Ready React, Tailwind CSS & Flutter Handoff',
        desc: 'Design tokens mapped directly to Tailwind CSS utility scales and modular React/Flutter component specifications.',
      },
      {
        title: 'Data Visualization, MIS Charting & High-Density Tables',
        desc: 'Purpose-built UX patterns for financial ledgers, kanban sales pipelines, Gantt schedules, and real-time analytics dashboards.',
      },
      {
        title: 'WCAG Accessibility & Multi-Device Responsive Standards',
        desc: 'Contrast-checked palettes, keyboard navigation support, and adaptive layouts for desktop monitors, tablets, and smartphones.',
      },
    ],
    relatedPortfolioSlugs: ['motion-design-course', 'driven-filmmaking-agency', 'gaming-character'],
    relatedBlogSlugs: [
      'web-development-trends-2027',
      'benefits-of-custom-web-applications',
      'website-development-cost-india-2027',
    ],
    relatedIndustrySlugs: ['healthcare', 'education'],
  },
  'digital-marketing': {
    routePath: '/services/digital-marketing',
    slug: 'digital-marketing',
    pageName: 'SEO & Digital Marketing Support',
    primaryKeyword: 'B2B Technical SEO and Digital Marketing Services',
    supportingKeywords: [
      'Search Engine Optimization for Software & B2B Companies India',
      'Local SEO AEO & GEO Optimization Services Delhi NCR',
      'B2B Lead Generation & Google Ads Management',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'B2B Technical SEO & Digital Marketing Services in Delhi NCR | AEO, GEO & Lead Gen — AI Software Technology',
    metaDescription:
      'Grow qualified B2B enquiries with Technical SEO, AEO/GEO structured data, Local SEO in Delhi NCR & conversion-focused digital marketing by AI Software Technology. Call +91 9990390519.',
    h1: 'B2B Technical SEO, AEO/GEO Optimization & Digital Lead Generation Services',
    answerFirstSummary:
      'AI Software Technology provides technical SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), local Delhi NCR search positioning, and high-intent B2B lead generation integrated directly with your website, CRM, and WhatsApp conversion funnels.',
    problemsSolved: [
      {
        title: 'Websites Built Without Crawlability or Prerendered Metadata',
        desc: 'Fixes SPA indexing barriers with static prerendering, clean canonical URLs, automated XML sitemaps, and Schema.org JSON-LD graphs.',
      },
      {
        title: 'Targeting Generic Keywords That Bring Zero B2B Buyers',
        desc: 'Maps distinct commercial-intent keywords to dedicated service, industry, comparison, and solution pages without internal cannibalization.',
      },
      {
        title: 'Invisibility in AI Answer Engines & Local Delhi NCR Searches',
        desc: 'Structures answer-first page copy, verified FAQ schemas, and consistent NAP entity signals for Google Search and AI answer surfaces.',
      },
      {
        title: 'Ad Spend Wasted Without CRM Attribution or Instant Follow-Up',
        desc: 'Connects landing pages and ad campaigns directly to CRM lead scoring and instant WhatsApp automation so every marketing lead is tracked.',
      },
    ],
    integrationCapabilities: [
      {
        title: 'Google Search Console, GA4 & Google Tag Manager',
        desc: 'End-to-end indexing diagnostics, Core Web Vitals tracking, custom conversion events, and UTM lead attribution.',
      },
      {
        title: 'Schema.org JSON-LD (Organization, Service, FAQPage, BlogPosting)',
        desc: 'Validated structured data graphs for rich search results, AEO answer extraction, and entity disambiguation.',
      },
      {
        title: 'CRM Lead Capture & WhatsApp Instant Follow-Up Funnels',
        desc: 'Routes organic and paid enquiries directly into your sales CRM with automated WhatsApp welcome brochures.',
      },
      {
        title: 'Automated Build-Time Prerendering & Sitemap Validation',
        desc: 'Ensures every new service, case study, or blog route is prerendered and validated before production deployment.',
      },
    ],
    relatedPortfolioSlugs: ['biziffy', 'digi-india-solutions', 'lawspective'],
    relatedBlogSlugs: [
      'complete-seo-guide-2026',
      'complete-digital-marketing-guide-2026',
      'digital-marketing-trends-india-2026',
    ],
    relatedIndustrySlugs: ['real-estate', 'education'],
  },
};

export const INDUSTRY_SEO_MAP: Record<string, IndustryEnrichmentSpec> = {
  healthcare: {
    routePath: '/industries/healthcare',
    slug: 'healthcare',
    pageName: 'Healthcare Software Solutions',
    primaryKeyword: 'Healthcare Software Development Company in Delhi NCR',
    supportingKeywords: [
      'Custom Hospital Management System (HMS) & EMR Software India',
      'Clinic OPD IPD Pharmacy & Lab Management Software',
      'Telemedicine & Patient Portal Development New Delhi',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Healthcare Software Development in Delhi NCR | Custom HMS, EMR, OPD/IPD & Clinic Software — AI Software Technology',
    metaDescription:
      'AI Software Technology (A Brand of Digi India Solutions, New Delhi) develops custom healthcare software: Hospital Management (HMS), EMR, OPD/IPD billing, pharmacy & lab portals across India. Call +91 9990390519.',
    h1: 'Custom Healthcare, Hospital (HMS) & Clinic Management Software Solutions',
    answerFirstSummary:
      'AI Software Technology engineers custom healthcare software for hospitals, multi-specialty clinics, and diagnostic centers in Delhi NCR and India—unifying UHID patient registration, OPD/IPD workflows, electronic medical records (EMR), pharmacy FEFO inventory, pathology lab reporting, and TPA insurance billing.',
    relatedServiceSlugs: [
      'hospital-management-software',
      'custom-software',
      'hrms-software',
      'whatsapp-automation',
    ],
    relatedCaseStudySlugs: ['medicare-patient-platform', 'factory-attendance-management-software'],
    relatedPortfolioSlugs: ['mansha-clinic', 'mental-health-clinic', 'manovaidya'],
    faqs: [
      {
        q: 'What modules are included in your custom healthcare and hospital management software?',
        a: 'Our healthcare software covers UHID patient registration, OPD appointment scheduling, doctor EMR & e-prescriptions, IPD bed/ward management, pharmacy stock with batch-expiry tracking, pathology & radiology reporting, TPA/corporate billing, and staff shift HRMS.',
      },
      {
        q: 'Can the software send automated lab reports and appointment reminders via WhatsApp?',
        a: 'Yes. We integrate official WhatsApp Business API workflows to deliver booking tokens, follow-up reminders, digital prescriptions, and signed PDF diagnostic reports directly to patients.',
      },
      {
        q: 'Do you support multi-clinic or multi-branch hospital chains in Delhi NCR and across India?',
        a: 'Yes. Our cloud architecture supports centralized patient EMR records, branch-wise pharmacy/billing ledgers, and consolidated management dashboards across multiple clinic locations.',
      },
    ],
  },
  manufacturing: {
    routePath: '/industries/manufacturing',
    slug: 'manufacturing',
    pageName: 'Manufacturing ERP & Factory Software',
    primaryKeyword: 'Manufacturing ERP Software Development in Delhi NCR',
    supportingKeywords: [
      'Custom Factory Production Planning & BOM Software India',
      'Shop-Floor Work Order, Subcontracting & Inventory ERP',
      'Industrial Biometric Attendance & Dealer Order Software',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Manufacturing ERP Software Development in Delhi NCR | BOM, Production, Inventory & Factory HRMS — AI Software Technology',
    metaDescription:
      'Custom Manufacturing ERP & factory software by AI Software Technology (Digi India Solutions, Delhi NCR): multi-level BOM, MRP, shop-floor job cards, inventory, GST billing & shift attendance. Call +91 9990390519.',
    h1: 'Custom Manufacturing ERP, Production Planning & Factory Management Software',
    answerFirstSummary:
      'AI Software Technology develops custom manufacturing ERP and factory management software for industrial units across Delhi NCR and India—connecting multi-level BOM, material requirement planning (MRP), procurement GRN, shop-floor job cards, quality control, biometric shift attendance, and B2B dealer order dispatch.',
    relatedServiceSlugs: [
      'manufacturing-software',
      'erp-solutions',
      'inventory-management-software',
      'attendance-workforce-software',
      'order-management-software',
    ],
    relatedCaseStudySlugs: [
      'logichain-erp-transformation',
      'lubricant-order-management-software',
      'factory-attendance-management-software',
    ],
    relatedPortfolioSlugs: ['hartner', 'sonic-tool-ultrasonic', 'lubricant-order-management-software'],
    faqs: [
      {
        q: 'How does your manufacturing ERP handle multi-level Bill of Materials (BOM) and wastage?',
        a: 'Our manufacturing ERP supports multi-stage BOM definitions, raw-material reservation against work orders, stage-wise WIP tracking, subcontracting job-work challans, and actual vs standard scrap/wastage variance analysis.',
      },
      {
        q: 'Can we integrate factory biometric attendance machines and Tally Prime with the manufacturing ERP?',
        a: 'Yes. We integrate eSSL/ZKTeco biometric and facial attendance terminals for A/B/C rotational shifts as well as bi-directional voucher and GST e-Invoicing synchronization with Tally Prime.',
      },
      {
        q: 'Does the platform include a B2B dealer order booking and dispatch portal?',
        a: 'Yes. Distributors and field sales executives can book orders, check credit limits, view live dispatch status, and download GST invoices and LR bilty documents.',
      },
    ],
  },
  education: {
    routePath: '/industries/education',
    slug: 'education',
    pageName: 'Education, School ERP & EdTech Software',
    primaryKeyword: 'Education and School ERP Software Development Delhi NCR',
    supportingKeywords: [
      'Custom LMS & Coaching Institute Management Software India',
      'Student Admission Fee Collection & Attendance Portal',
      'Parent Teacher Mobile App & Online Exam Software',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Education & School ERP Software Development in Delhi NCR | Custom LMS, Fee & Exam Portals — AI Software Technology',
    metaDescription:
      'AI Software Technology builds custom Education ERP, School/College Management Software & LMS platforms in Delhi NCR & India: admissions, online fee payment, attendance & exams. Call +91 9990390519.',
    h1: 'Custom Education ERP, School Management & LMS Software Solutions',
    answerFirstSummary:
      'AI Software Technology builds custom Education ERP and Learning Management Systems (LMS) for schools, colleges, universities, and coaching institutes—automating admissions, installment fee collection, biometric/RFID attendance, online examinations, report cards, and parent-student mobile apps.',
    relatedServiceSlugs: [
      'custom-software',
      'website-development',
      'mobile-app-development',
      'attendance-workforce-software',
    ],
    relatedCaseStudySlugs: ['edulearn-gamified-platform', 'astrology-matrimonial-platform'],
    relatedPortfolioSlugs: ['neet-physics', 'irodov-classes', 'motion-design-course'],
    faqs: [
      {
        q: 'What features are included in your School and Coaching Institute ERP?',
        a: 'Our education platform includes online admission enquiries, student lifecycle profiles, automated fee installment billing with UPI/payment gateway receipts, attendance tracking, timetable scheduling, exam grading, and parent/student mobile apps.',
      },
      {
        q: 'Can you build a custom LMS with video classes, mock tests, and piracy protection?',
        a: 'Yes. We engineer custom web and mobile LMS platforms featuring structured course modules, live/recorded video streaming, objective & subjective test engines, automated rank analytics, and certificate generation.',
      },
      {
        q: 'Does the system send automated fee reminders and attendance alerts to parents?',
        a: 'Yes. Parents receive instant WhatsApp, SMS, and app push notifications for daily attendance, fee due dates, digital payment receipts, homework, and exam report cards.',
      },
    ],
  },
  retail: {
    routePath: '/industries/retail',
    slug: 'retail',
    pageName: 'Retail, POS & Omnichannel Commerce Software',
    primaryKeyword: 'Retail POS and Inventory Software Development Delhi NCR',
    supportingKeywords: [
      'Custom Multi-Store Supermarket Billing & POS Software India',
      'Omnichannel Retail ERP & E-Commerce Inventory Sync',
      'Barcode Billing Loyalty CRM & Distributor Order Software',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Retail POS & Omnichannel Software Development in Delhi NCR | Inventory, GST Billing & E-Commerce — AI Software Technology',
    metaDescription:
      'Unify counter POS billing, multi-store inventory, loyalty CRM & online e-commerce with custom Retail Software Solutions by AI Software Technology (Delhi NCR & India). Call +91 9990390519.',
    h1: 'Custom Retail POS, Multi-Store Inventory & Omnichannel Commerce Software',
    answerFirstSummary:
      'AI Software Technology develops custom retail technology platforms that synchronize high-speed barcode POS counter billing, multi-store warehouse inventory, customer loyalty programs, GST e-invoicing, and B2C/B2B e-commerce storefronts in real time.',
    relatedServiceSlugs: [
      'retail-pos-software',
      'inventory-management-software',
      'billing-gst-software',
      'ecommerce-development',
      'whatsapp-automation',
    ],
    relatedCaseStudySlugs: [
      'lubricant-order-management-software',
      'shopnow-ecommerce-scale',
    ],
    relatedPortfolioSlugs: ['goel-mewe-wale', 'toy-boy-india', 'delhi-book-store'],
    faqs: [
      {
        q: 'Can your retail software synchronize inventory across physical POS counters and an online store?',
        a: 'Yes. Every sale, return, or stock transfer at a physical POS counter updates central warehouse and e-commerce storefront availability in real time to prevent overselling.',
      },
      {
        q: 'Does the retail POS support barcode label printing, UPI QR codes, and WhatsApp digital bills?',
        a: 'Yes. Our POS integrates with barcode scanners, thermal receipt printers, weighing scales, dynamic UPI QR displays, and automated WhatsApp invoice receipts with loyalty points.',
      },
      {
        q: 'Is the billing software fully GST-compliant with Tally Prime export?',
        a: 'Yes. It supports HSN-wise tax slabs, B2B/B2C GST invoicing, credit notes, and 1-click voucher export to Tally Prime.',
      },
    ],
  },
  'real-estate': {
    routePath: '/industries/real-estate',
    slug: 'real-estate',
    pageName: 'Real Estate CRM & Property Management Software',
    primaryKeyword: 'Real Estate CRM Software Development in Delhi NCR',
    supportingKeywords: [
      'Custom Property Management & Builder ERP Software India',
      'Channel Partner Broker Portal & Site-Visit Tracking CRM',
      'Real Estate Lead Capture WhatsApp & Payment Schedule Software',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Real Estate CRM & Property Management Software Development in Delhi NCR — AI Software Technology',
    metaDescription:
      'AI Software Technology builds custom Real Estate CRM, builder inventory portals, site-visit tracking & channel partner software for developers & brokers in Delhi NCR & India. Call +91 9990390519.',
    h1: 'Custom Real Estate CRM, Site-Visit Tracking & Property Management Software',
    answerFirstSummary:
      'AI Software Technology engineers custom Real Estate CRM and property management platforms for builders, developers, and channel partners in Delhi NCR and India—automating Facebook/portal lead capture, telecaller follow-ups, GPS site-visit scheduling, tower/unit inventory blocking, and milestone payment schedules.',
    relatedServiceSlugs: [
      'crm-solutions',
      'field-sales-tracking-software',
      'whatsapp-automation',
      'website-development',
    ],
    relatedCaseStudySlugs: [
      'shopnow-ecommerce-scale',
      'astrology-matrimonial-platform',
    ],
    relatedPortfolioSlugs: ['ssp-infra', 'biziffy', 'sunita-enterprises'],
    faqs: [
      {
        q: 'How does your Real Estate CRM capture and distribute leads from property portals and Meta ads?',
        a: 'Our Real Estate CRM integrates via webhooks with Meta/Facebook Lead Ads, Google Ads, 99acres, MagicBricks, Housing.com, and website landing pages to assign leads automatically to sales teams by project or budget.',
      },
      {
        q: 'Can we track site visits, channel partner (broker) commissions, and unit availability?',
        a: 'Yes. The platform includes GPS-verified site-visit logs, a dedicated channel partner lead-registration portal with conflict protection, live tower/floor unit availability grids, and booking payment demand schedules.',
      },
      {
        q: 'Does it include automated WhatsApp brochure sharing and follow-up reminders?',
        a: 'Yes. As soon as a property enquiry arrives, the system sends project brochures, floor plans, and location pins via official WhatsApp Business API while scheduling telecaller follow-up tasks.',
      },
    ],
  },
  finance: {
    routePath: '/industries/finance',
    slug: 'finance',
    pageName: 'Finance, Billing & FinTech Software Solutions',
    primaryKeyword: 'Custom Financial and Billing Software Development India',
    supportingKeywords: [
      'NBFC Loan Management & Accounting Software Delhi NCR',
      'Automated GST Invoicing Ledger & Payment Reconciliation System',
      'Role-Based Financial MIS & Audit Compliance Software',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Finance, GST Billing & FinTech Software Development in Delhi NCR | Ledgers & MIS — AI Software Technology',
    metaDescription:
      'AI Software Technology develops custom financial software, GST billing engines, payment reconciliation & audit-ready MIS dashboards for enterprises in Delhi NCR & India. Call +91 9990390519.',
    h1: 'Custom Finance, Automated GST Billing & Financial MIS Software Solutions',
    answerFirstSummary:
      'AI Software Technology develops secure, audit-ready financial management, multi-branch GST billing, receivables reconciliation, and executive MIS software engineered with role-based approvals, encrypted data storage, and seamless accounting integration.',
    relatedServiceSlugs: [
      'billing-gst-software',
      'erp-solutions',
      'api-development-integration',
      'cloud-solutions',
    ],
    relatedCaseStudySlugs: [
      'finsecure-payment-platform',
      'logichain-erp-transformation',
    ],
    relatedPortfolioSlugs: ['emi-plus-care', 'lubricant-order-management-software', 'legal-sources'],
    faqs: [
      {
        q: 'How do you ensure data security and audit compliance in financial software?',
        a: 'We implement role-based access control (RBAC), immutable transaction audit trails, maker-checker approval workflows, encrypted database connections, and automated 3-2-1 backup policies.',
      },
      {
        q: 'Can your financial and billing systems integrate with Tally Prime, payment gateways, and GST e-Invoicing?',
        a: 'Yes. We provide seamless integration with Razorpay, PayU, Cashfree, bank payout files, NIC e-Invoicing/e-Way Bill APIs, and Tally Prime voucher synchronization.',
      },
      {
        q: 'Do you build custom MIS and receivables ageing dashboards for multi-branch companies?',
        a: 'Yes. CFOs and business owners get live dashboards covering branch-wise revenue, 30/60/90-day receivables ageing, credit-limit alerts, and cost-center profitability.',
      },
    ],
  },
  hospitality: {
    routePath: '/industries/hospitality',
    slug: 'hospitality',
    pageName: 'Hospitality, Hotel PMS & Restaurant POS Software',
    primaryKeyword: 'Hospitality and Hotel PMS Software Development Delhi NCR',
    supportingKeywords: [
      'Custom Hotel Property Management & Booking Engine India',
      'Restaurant KOT POS Banquet & Room Service Billing Software',
      'Multi-Property Guest CRM & Housekeeping Automation',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Hospitality & Hotel PMS Software Development in Delhi NCR | Booking, Banquet & POS — AI Software Technology',
    metaDescription:
      'Custom Hospitality Software, Hotel PMS, Direct Booking Engines, Banquet Billing & Restaurant KOT POS developed by AI Software Technology (Delhi NCR & India). Call +91 9990390519.',
    h1: 'Custom Hospitality Software, Hotel PMS & Restaurant KOT POS Solutions',
    answerFirstSummary:
      'AI Software Technology engineers custom hospitality management software for hotels, resorts, banquets, and restaurant chains—connecting front-desk reservation calendars, contactless guest check-in, housekeeping status, kitchen KOT POS billing, and consolidated GST folios.',
    relatedServiceSlugs: [
      'hotel-management-software',
      'retail-pos-software',
      'whatsapp-automation',
      'website-development',
    ],
    relatedCaseStudySlugs: [
      'astrology-matrimonial-platform',
      'brandvista-ai-marketing',
    ],
    relatedPortfolioSlugs: ['hotel-management-software', 'hotel-highway-rasoi', 'goel-mewe-wale'],
    faqs: [
      {
        q: 'Does your Hotel PMS connect front-desk room folios with restaurant KOT and banquet billing?',
        a: 'Yes. Room service, restaurant table dining, laundry, and minibar charges post automatically to the guest’s room folio for a single consolidated checkout bill.',
      },
      {
        q: 'Can guests receive booking vouchers and check-in details on WhatsApp?',
        a: 'Yes. Our WhatsApp Business API integration sends automated reservation confirmations, location pins, digital menus, and checkout GST invoices.',
      },
      {
        q: 'Do you support multi-property hotel groups and chain restaurants?',
        a: 'Yes. Owners can monitor occupancy, ADR, RevPAR, F&B recipe consumption, and daily collection summaries across multiple properties from one central dashboard.',
      },
    ],
  },
  construction: {
    routePath: '/industries/construction',
    slug: 'construction',
    pageName: 'Construction ERP & Site Management Software',
    primaryKeyword: 'Construction ERP and Site Management Software India',
    supportingKeywords: [
      'Custom Civil Project BOQ Material & Contractor Billing Software',
      'Construction Site Labor Attendance & DPR Reporting App Delhi NCR',
      'Real Estate & Infrastructure Project Management ERP',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Construction ERP & Project Management Software in Delhi NCR | BOQ, Site Material & Labor — AI Software Technology',
    metaDescription:
      'Manage BOQ budgets, site material indents, subcontractor RA bills, Daily Progress Reports (DPR) & site labor attendance with custom Construction ERP by AI Software Technology. Call +91 9990390519.',
    h1: 'Custom Construction ERP, Site Material & Contractor Billing Software Solutions',
    answerFirstSummary:
      'AI Software Technology develops custom construction ERP and site management software for EPC contractors, civil builders, and infrastructure firms—tracking BOQ budgets, site material requisitions, store GRNs, subcontractor Running Account (RA) bills, Daily Progress Reports (DPR), and geo-fenced site workforce attendance.',
    relatedServiceSlugs: [
      'erp-solutions',
      'inventory-management-software',
      'attendance-workforce-software',
      'mobile-app-development',
    ],
    relatedCaseStudySlugs: [
      'logichain-erp-transformation',
      'factory-attendance-management-software',
    ],
    relatedPortfolioSlugs: ['ssp-infra', 'sddipl', 'factory-attendance-management-software'],
    faqs: [
      {
        q: 'How does your construction software prevent site material pilferage and budget overruns?',
        a: 'Every material purchase and issue is linked to project BOQ limits. Site engineers raise mobile material indents, central procurement approves POs, and storekeepers record weighbridge/photo-verified GRNs and daily consumption.',
      },
      {
        q: 'Can site engineers submit Daily Progress Reports (DPR) and contractor attendance from a mobile app?',
        a: 'Yes. Our offline-ready Android/iOS app allows site engineers to log work-stage completion photos, machinery hours, and geo-verified labor muster rolls directly from the project site.',
      },
      {
        q: 'Does the software handle subcontractor Running Account (RA) bills and retention deductions?',
        a: 'Yes. It tracks work orders, measured work quantities, previous RA bill deductions, mobilization advances, security retention percentages, and TDS/GST compliance.',
      },
    ],
  },
};

export interface DynamicRouteSeoSpec {
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: RouteKeywordSpec['searchIntent'];
  metricsStatus: RouteKeywordSpec['metricsStatus'];
  seoTitle: string;
  metaDescription: string;
}

/**
 * 9 Case Study SEO Specs — Positioned around Engineering Architecture, Operational Bottleneck Analysis
 * & Workflow Implementation (explicitly differentiated from Portfolio UI Showcases and Service Landing Pages).
 */
export const CASE_STUDY_SEO_MAP: Record<string, DynamicRouteSeoSpec> = {
  'lubricant-order-management-software': {
    primaryKeyword: 'B2B Lubricant Dealer Order & Dispatch Architecture Case Study',
    supportingKeywords: [
      'Lubricant Manufacturing Order Workflow Automation',
      'Viscosity Grade & Pack-Size SKU Order Validation System',
      'Dealer Order to Warehouse Dispatch Engineering Case Study',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Lubricant Dealer Order & Dispatch System Architecture | Case Study — AI Software Technology',
    metaDescription:
      'Engineering case study: how AI Software Technology architected a B2B lubricant order management workflow to solve viscosity-grade SKU confusion, dealer booking & warehouse dispatch.',
  },
  'astrology-matrimonial-platform': {
    primaryKeyword: 'Multi-Portal Astrology & Matrimonial Web Architecture Case Study',
    supportingKeywords: [
      'Role-Based User Astrologer Admin Portal Engineering',
      'Kundali Matchmaking & Consultation Booking Workflow Case Study',
      'Multi-Role React TypeScript Platform Architecture',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Multi-Portal Astrology & Matrimonial Platform Architecture | Case Study — AI Software Technology',
    metaDescription:
      'Case study on architecting a 3-portal astrology consultation and matrimonial matchmaking platform with role-isolated User, Astrologer, and Admin workflows.',
  },
  'factory-attendance-management-software': {
    primaryKeyword: 'Factory Shift Attendance & Digital Gate-Pass System Case Study',
    supportingKeywords: [
      'Industrial Multi-Shift Workforce Monitoring Architecture',
      'Digital Gate-Pass & Plant Security Movement Log Workflow',
      'Shop-Floor Attendance to Payroll Reconciliation Case Study',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Factory Shift Attendance & Digital Gate-Pass Architecture | Case Study — AI Software Technology',
    metaDescription:
      'Industrial workforce case study: replacing manual factory gate registers with a real-time multi-shift attendance dashboard, digital gate-pass system & payroll export workflow.',
  },
  'medicare-patient-platform': {
    primaryKeyword: 'Multi-Clinic HMS & Patient Workflow Implementation Case Study',
    supportingKeywords: [
      'OPD Token Queue to Pathology & Pharmacy Billing Architecture',
      'Centralized UHID Electronic Medical Record Case Study',
      'Multi-Branch Clinic Operations & WhatsApp Recall System',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Multi-Clinic HMS, OPD Queue & Pharmacy Workflow | Case Study — AI Software Technology',
    metaDescription:
      'Healthcare implementation case study: unifying multi-clinic patient UHID registration, doctor e-prescriptions, pathology lab reporting & pharmacy stock billing.',
  },
  'shopnow-ecommerce-scale': {
    primaryKeyword: 'Multi-Channel Sales CRM & Lead Assignment Architecture Case Study',
    supportingKeywords: [
      'Automated Telecaller Round-Robin Lead Routing Case Study',
      'Kanban Sales Pipeline & WhatsApp Follow-Up Workflow',
      'High-Volume Enquiry Capture to Quotation System',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'High-Volume Sales CRM & Lead Pipeline Automation | Case Study — AI Software Technology',
    metaDescription:
      'Sales engineering case study: eliminating spreadsheet lead leakage with automated multi-channel enquiry capture, round-robin telecaller routing & quotation workflows.',
  },
  'logichain-erp-transformation': {
    primaryKeyword: 'Multi-Warehouse ERP, BOM & Procurement Implementation Case Study',
    supportingKeywords: [
      'Purchase Order Approval to GRN & Barcode Stock Architecture',
      'Production BOM & Inter-Godown Stock Transfer Case Study',
      'Unified Manufacturing & Distribution ERP Workflow',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Multi-Warehouse ERP, Procurement & BOM Implementation | Case Study — AI Software Technology',
    metaDescription:
      'Supply chain ERP case study: connecting multi-level PO approvals, barcode warehouse GRNs, production BOM consumption & GST dispatch invoicing in one database.',
  },
  'brandvista-ai-marketing': {
    primaryKeyword: 'AI Workflow Automation & Omnichannel Assistant Case Study',
    supportingKeywords: [
      '24/7 Conversational AI Lead Qualification Architecture',
      'Automated Document Parsing & Scheduled MIS Report Workflow',
      'Web & WhatsApp AI Agent CRM Integration Case Study',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'AI Workflow Automation, Chatbot & CRM Sync Architecture | Case Study — AI Software Technology',
    metaDescription:
      'AI engineering case study: deploying 24/7 web and WhatsApp conversational assistants, automated document parsing & scheduled MIS reporting integrated with CRM/ERP.',
  },
  'finsecure-payment-platform': {
    primaryKeyword: 'Multi-Branch HRMS, Biometric Sync & Payroll Engine Case Study',
    supportingKeywords: [
      'Biometric & Geo-Fenced Attendance Reconciliation Workflow',
      'Automated PF ESI TDS Statutory Payroll Processing Case Study',
      'Employee Self-Service Portal & Leave Approval Architecture',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Multi-Branch HRMS, Biometric Attendance & Payroll Engine | Case Study — AI Software Technology',
    metaDescription:
      'HRMS architecture case study: automating biometric and geo-fenced attendance sync, multi-level leave approvals, statutory compliance & 1-click monthly payslip runs.',
  },
  'edulearn-gamified-platform': {
    primaryKeyword: 'School & Coaching ERP with Parent-Student Mobile App Case Study',
    supportingKeywords: [
      'Admission CRM to Fee Installment & Digital Receipt Workflow',
      'Teacher Attendance Push Alert & Exam Report Card Architecture',
      'Multi-Branch Educational Institute ERP Implementation',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'School & Coaching Institute ERP with Mobile Apps | Case Study — AI Software Technology',
    metaDescription:
      'EdTech implementation case study: connecting student admissions, automated fee installment billing, daily attendance alerts & parent-teacher Android/iOS apps.',
  },
};

/**
 * Portfolio SEO Overrides — Differentiates portfolio items that share slugs with case studies
 * or service pages by focusing on Delivered System UI, Live Modules & Product Feature Showcase.
 */
export const PORTFOLIO_SEO_MAP: Record<string, DynamicRouteSeoSpec> = {
  'lubricant-order-management-software': {
    primaryKeyword: 'Lubricant Order Management Software UI & Dealer Portal Showcase',
    supportingKeywords: [
      'Delivered Lubricant SKU Catalog & Order Booking Web App',
      'Dealer Order Dashboard & Dispatch Tracking Interface',
      'Custom B2B Order Portal Portfolio Project',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Lubricant Order Management Web App — Delivered UI & Modules | AI Software Technology Portfolio',
    metaDescription:
      'Explore the delivered UI, dealer SKU catalog, pack-size selector, and admin dispatch dashboard of our Lubricant Order Management Software built by AI Software Technology.',
  },
  'astrology-matrimonial-platform': {
    primaryKeyword: 'Astrology & Matrimonial Web Portal UI & Multi-Dashboard Showcase',
    supportingKeywords: [
      'AstroMilaan User Astrologer Admin Portal Interface',
      'Delivered Kundali Matching & Consultation Web Application',
      'Multi-Portal Custom Web App Portfolio Project',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Astrology & Matrimonial Multi-Portal Web App — Delivered UI | AI Software Technology Portfolio',
    metaDescription:
      'View the delivered User, Astrologer, and Admin portal interfaces, matchmaking screens, and consultation booking modules of the AstroMilaan web platform.',
  },
  'factory-attendance-management-software': {
    primaryKeyword: 'Factory Attendance & Gate-Pass Dashboard UI Showcase',
    supportingKeywords: [
      'Delivered Industrial Attendance & Shift Roster Web Portal',
      'Live Headcount & Digital Gate-Pass Admin Interface',
      'Workforce Management Software Portfolio Project',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Factory Attendance & Digital Gate-Pass Portal — Delivered UI | AI Software Technology Portfolio',
    metaDescription:
      'Explore the delivered admin attendance dashboard, shift headcount tracker, and digital gate-pass interface engineered for industrial workforce operations.',
  },
  'hotel-management-software': {
    primaryKeyword: 'Cloud Hotel PMS & Front-Desk Booking Dashboard Showcase',
    supportingKeywords: [
      'Delivered Hotel Room Rack Calendar & Guest Folio UI',
      'Housekeeping & Banquet Billing Web Application Project',
      'Hospitality Management Software Portfolio',
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Cloud Hotel PMS & Front-Desk Dashboard — Delivered Project | AI Software Technology Portfolio',
    metaDescription:
      'Inspect the delivered front-desk room calendar, guest check-in folio, housekeeping tracker, and billing modules of our Cloud Hotel Management Software project.',
  },
};

/**
 * Blog SEO Overrides — Resolves keyword cannibalization across similar topics and removes
 * unverified numerical claims from article titles while preserving factual engineering depth.
 */
export const BLOG_SEO_OVERRIDES: Record<string, DynamicRouteSeoSpec> = {
  'custom-software-vs-ready-made-software-for-indian-businesses': {
    primaryKeyword: 'Custom Software vs Off-the-Shelf Packaged Software for SMB Workflows',
    supportingKeywords: [
      'Tailored Business Software vs Ready-Made Accounting & Billing Tools',
      'When Growing Indian Companies Outgrow Packaged Software',
      'Operational Workflow Fit in Custom vs Off-the-Shelf Software',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Custom Software vs Off-the-Shelf Packaged Software for Business Workflows | AI Software Technology',
    metaDescription:
      'Compare custom-built business software against off-the-shelf packaged tools for Indian SMBs. Evaluate day-to-day workflow fit, role permissions, Tally/GST integration & scalability.',
  },
  'custom-software-vs-ready-made-software-complete-comparison-2026': {
    primaryKeyword: 'Bespoke Enterprise Software vs Commercial Off-the-Shelf (COTS) Evaluation Matrix',
    supportingKeywords: [
      'Build vs Buy Enterprise Software Decision Framework',
      'Software Licensing vs Custom Source Code Ownership Comparison',
      'Enterprise Software Architecture & Vendor Lock-In Guide',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Bespoke Software vs Commercial Off-the-Shelf (COTS): Decision Checklist | AI Software Technology',
    metaDescription:
      'Use our structured Build vs Buy evaluation matrix to compare bespoke enterprise software against commercial off-the-shelf (COTS) packages across IP ownership, security & integration.',
  },
  'flutter-vs-react-native-comparison-2026': {
    primaryKeyword: 'Choosing Flutter or React Native for Business Mobile App Projects',
    supportingKeywords: [
      'Flutter vs React Native for B2B Field Sales & Customer Apps',
      'Cross-Platform Mobile App Development Decision Guide for CTOs',
      'Dart vs TypeScript Mobile Engineering Team Considerations',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'How to Choose Between Flutter and React Native for Business Mobile Apps | AI Software Technology',
    metaDescription:
      'Practical buyer guide to choosing Flutter or React Native for B2B dealer ordering apps, GPS field force trackers, and customer mobile applications.',
  },
  'complete-guide-to-crm-software-for-sales-and-lead-management': {
    primaryKeyword: 'Sales Pipeline & Lead Follow-Up Management with Custom CRM Software',
    supportingKeywords: [
      'Preventing Lead Leakage Across Telecallers and Field Sales',
      'Multi-Channel Enquiry Routing & Quotation CRM Workflow',
      'B2B Sales Team Pipeline Management Guide',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Sales Pipeline & Lead Follow-Up Management with CRM Software | AI Software Technology',
    metaDescription:
      'Learn how sales-driven businesses structure multi-channel lead capture, telecaller assignment, follow-up reminders, and quotation tracking using custom CRM software.',
  },
  'what-is-crm-software-complete-guide-2026': {
    primaryKeyword: 'What Is CRM Software? Core Modules, Architecture & Business Types',
    supportingKeywords: [
      'Operational vs Analytical vs Collaborative CRM Explained',
      'Core Database Modules of a Modern Customer Relationship System',
      'CRM Architecture & ERP/WhatsApp Integration Fundamentals',
    ],
    searchIntent: 'Informational / AEO',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'What Is CRM Software? Core Modules, Types & System Architecture | AI Software Technology',
    metaDescription:
      'Understand what CRM software is, how operational and analytical CRM systems work, essential database modules, and how custom CRM connects with billing and WhatsApp.',
  },
  'how-ai-automation-reduces-manual-business-work': {
    primaryKeyword: 'Eliminating Repetitive Back-Office Data Entry with AI Automation',
    supportingKeywords: [
      'Document OCR Invoice Parsing & Automated CRM Data Entry',
      'Replacing Manual Copy-Paste Tasks with AI Workflows',
      'Back-Office Operational Efficiency Through AI',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'How AI Automation Eliminates Repetitive Back-Office Data Entry | AI Software Technology',
    metaDescription:
      'Discover how intelligent document OCR, automated email/invoice parsing, and webhook pipelines eliminate repetitive manual data entry across back-office operations.',
  },
  'how-ai-automates-businesses-2026': {
    primaryKeyword: 'Departmental AI Automation Use Cases Across Sales, Support & Operations',
    supportingKeywords: [
      'AI Use Cases for Customer Support HR Finance and Supply Chain',
      'RAG Knowledge Assistants and Conversational AI in Business',
      'Department-by-Department AI Implementation Roadmap',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'AI Automation Use Cases Across Sales, Support, HR & Finance | AI Software Technology',
    metaDescription:
      'Explore practical AI automation use cases by department—from 24/7 sales lead qualification and RAG knowledge assistants to finance reconciliation and HR onboarding.',
  },
  'business-automation-guide-2026': {
    primaryKeyword: 'Business Process Automation (BPA) Architecture & Workflow Guide',
    supportingKeywords: [
      'Rule-Based Workflow Engines Webhooks & Approval Hierarchies',
      'Designing Event-Driven ERP and CRM Process Automation',
      'Enterprise Business Process Automation Blueprint',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Business Process Automation (BPA): Workflow Architecture & Guide | AI Software Technology',
    metaDescription:
      'A complete architectural guide to Business Process Automation (BPA): designing rule-based approval engines, event webhooks, and cross-department ERP/CRM workflows.',
  },
  'custom-software-improves-business-productivity-2026': {
    primaryKeyword: 'How Custom Software Improves Business Productivity & Workflow Efficiency',
    supportingKeywords: [
      'Replacing Departmental Spreadsheets with Role-Based Dashboards',
      'Reducing Approval Bottlenecks with Custom Enterprise Software',
      'Operational Productivity Gains from Tailored Business Systems',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'How Custom Software Improves Business Productivity & Workflow Efficiency | AI Software Technology',
    metaDescription:
      'Learn how custom business software eliminates cross-department spreadsheet bottlenecks, automates multi-level approvals, and gives leadership real-time MIS visibility.',
  },
  'how-erp-reduces-business-costs-2026': {
    primaryKeyword: 'How ERP Software Reduces Operational & Inventory Holding Costs',
    supportingKeywords: [
      'Preventing Raw Material Wastage Dead Stock and Procurement Leakage',
      'ERP Cost Control Mechanisms for Manufacturing and Distribution',
      'Inventory Optimization and Vendor Rate Comparison in ERP',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'How ERP Software Reduces Operational & Inventory Costs | AI Software Technology',
    metaDescription:
      'Explore the operational mechanisms through which custom ERP software reduces inventory holding costs, prevents procurement rate leakage, and controls manufacturing scrap.',
  },
  'benefits-workflow-automation-2026': {
    primaryKeyword: 'Benefits of Workflow Automation for Growing Multi-Team Businesses',
    supportingKeywords: [
      'Automated Task Handoffs SLA Escalations and Audit Trails',
      'Standardizing Repetitive Business Operations with Software',
      'Workflow Automation Benefits for Sales Finance and HR',
    ],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: 'Benefits of Workflow Automation for Growing Businesses | AI Software Technology',
    metaDescription:
      'Understand how digital workflow automation standardizes departmental handoffs, enforces SLA alerts, eliminates manual follow-up delays, and creates audit-ready logs.',
  },
};

export function resolveCaseStudySeo(study: {
  slug: string;
  title: string;
  industry: string;
  overview: string;
  tags: string[];
}): DynamicRouteSeoSpec {
  const override = CASE_STUDY_SEO_MAP[study.slug];
  if (override) return override;
  return {
    primaryKeyword: `${study.title} Case Study`,
    supportingKeywords: study.tags,
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: `${study.title} | Case Study — AI Software Technology`,
    metaDescription: `${study.overview} Explore engineering architecture, workflow, and tech stack by AI Software Technology.`,
  };
}

export function resolvePortfolioSeo(project: {
  slug: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  technologies: string[];
}): DynamicRouteSeoSpec {
  const override = PORTFOLIO_SEO_MAP[project.slug];
  if (override) return override;

  const cleanDesc = project.description.endsWith('.')
    ? project.description
    : `${project.description}.`;

  return {
    primaryKeyword: `${project.name} — ${project.category} Portfolio Project`,
    supportingKeywords: [
      `${project.industry} ${project.category} Development`,
      ...project.technologies.slice(0, 3).map((t) => `${t} Business Application`),
    ],
    searchIntent: 'Commercial / Transactional',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: `${project.name} — ${project.category} (${project.industry}) | AI Software Technology Portfolio`,
    metaDescription: `${cleanDesc} Delivered for the ${project.industry} sector using ${project.technologies.slice(0, 4).join(', ')} by AI Software Technology.`,
  };
}

export function resolveBlogSeo(post: {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  metaDescription?: string;
  category: string;
  tags: string[];
}): DynamicRouteSeoSpec {
  const override = BLOG_SEO_OVERRIDES[post.slug];
  if (override) return override;

  const rawTitle = post.seoTitle || post.title;
  const normalizedTitle = rawTitle.includes('AI Software Technology')
    ? rawTitle
    : `${rawTitle} | AI Software Technology`;

  return {
    primaryKeyword: post.tags?.[0] || `${post.category} Guide`,
    supportingKeywords: post.tags?.slice(1, 5) || [post.category],
    searchIntent: 'Informational / Commercial',
    metricsStatus: UNVERIFIED_STATUS,
    seoTitle: normalizedTitle,
    metaDescription:
      post.metaDescription ||
      post.excerpt ||
      `Practical B2B engineering guide on ${post.title} by AI Software Technology (A Brand of Digi India Solutions).`,
  };
}


