export const BRAND_CONFIG = {
  name: 'YUKTARA INFOTECH',
  shortName: 'Yuktara',
  tagline: 'Connecting Intelligence with Innovation.',
  location: 'Ahmedabad, Gujarat, India',
  phone: '+91 63568 15289',
  phoneHref: 'tel:+916356815289',
  // Configurable business email placeholder
  email: 'contact@yuktarainfotech.com',
  emailHref: 'mailto:contact@yuktarainfotech.com',
  social: {
    linkedin: 'https://www.linkedin.com',
    instagram: 'https://www.instagram.com',
  },
} as const;

export const GENERATED_MEDIA = {
  architecture: '/src/assets/images/yuktara_digital_architecture_1794974954120.jpg',
  infrastructure: '/src/assets/images/yuktara_industry_infrastructure_1794974955208.jpg',
  industrial: '/src/assets/images/yuktara_industry_industrial_1794974955292.jpg',
  fintechStudio: '/src/assets/images/yuktara_industry_fintech_studio_1794974955258.jpg',
  spatialDisplay: '/src/assets/images/yuktara_project_showcase_spatial_1794974955512.jpg',
} as const;

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
  visualMode: 'neural' | 'software' | 'automation' | 'web' | 'mobile' | 'growth';
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-systems',
    index: '01',
    title: 'AI & Intelligent Systems',
    description:
      'Custom AI agents, intelligent assistants, AI-powered workflows, and business intelligence systems engineered around proprietary enterprise context.',
    deliverables: ['Custom AI Agents', 'Retrieval Intelligence', 'Decision Support Systems'],
    visualMode: 'neural',
    image: GENERATED_MEDIA.architecture,
  },
  {
    id: 'software-engineering',
    index: '02',
    title: 'Software Engineering',
    description:
      'Custom software, web applications, SaaS platforms, and resilient digital products designed for high concurrency and long-term maintainability.',
    deliverables: ['Cloud-Native SaaS', 'Enterprise Platforms', 'API & Data Architecture'],
    visualMode: 'software',
    image: GENERATED_MEDIA.spatialDisplay,
  },
  {
    id: 'business-automation',
    index: '03',
    title: 'Business Automation',
    description:
      'Automate repetitive operations, connect fragmented enterprise systems, and elevate operational precision without adding manual overhead.',
    deliverables: ['Workflow Orchestration', 'ERP & CRM Integration', 'Document Pipelines'],
    visualMode: 'automation',
    image: GENERATED_MEDIA.industrial,
  },
  {
    id: 'web-digital',
    index: '04',
    title: 'Web & Digital Experiences',
    description:
      'High-performance websites, conversion-focused architectures, and interactive digital experiences built with architectural precision.',
    deliverables: ['Interactive Flagships', 'Design Systems', 'Performance Engineering'],
    visualMode: 'web',
    image: GENERATED_MEDIA.fintechStudio,
  },
  {
    id: 'mobile-apps',
    index: '05',
    title: 'Mobile Applications',
    description:
      'Modern Android and iOS applications engineered around real-world workflows, responsive touch ergonomics, and seamless offline sync.',
    deliverables: ['iOS & Android Apps', 'Enterprise Field Tools', 'Realtime Sync'],
    visualMode: 'mobile',
    image: GENERATED_MEDIA.spatialDisplay,
  },
  {
    id: 'digital-growth',
    index: '06',
    title: 'Digital Growth',
    description:
      'Data-backed digital marketing, performance campaigns, customer acquisition funnels, and measurable brand expansion.',
    deliverables: ['Acquisition Systems', 'Conversion Analytics', 'Growth Strategy'],
    visualMode: 'growth',
    image: GENERATED_MEDIA.infrastructure,
  },
];

export interface TransformationStage {
  index: string;
  label: string;
  headline: string;
  caption: string;
  image: string;
}

export const TRANSFORMATION_STAGES: TransformationStage[] = [
  {
    index: '01',
    label: 'Disconnected Business Systems',
    headline: 'Isolated tools slow down critical decisions.',
    caption:
      'Legacy databases, manual spreadsheets, and unlinked departments operate without shared visibility.',
    image: GENERATED_MEDIA.industrial,
  },
  {
    index: '02',
    label: 'Complex Data & Fragmented Processes',
    headline: 'Operational friction multiplies as volume grows.',
    caption:
      'Teams spend hours reconciling duplicate records across disconnected portals and communication threads.',
    image: GENERATED_MEDIA.fintechStudio,
  },
  {
    index: '03',
    label: 'AI Intelligence Connects Everything',
    headline: 'A unified intelligence layer links workflows.',
    caption:
      'Custom pipelines, API orchestration, and applied AI synthesize operational signals in real time.',
    image: GENERATED_MEDIA.architecture,
  },
  {
    index: '04',
    label: 'Streamlined Intelligent Ecosystem',
    headline: 'Clarity, velocity, and measurable control.',
    caption:
      'Every department runs on synchronized software, automated execution, and real-time strategic insight.',
    image: GENERATED_MEDIA.infrastructure,
  },
];

export interface ProcessStage {
  index: string;
  title: string;
  description: string;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    index: '01',
    title: 'Discover',
    description: 'We understand your business, operational bottlenecks, architecture, and high-leverage opportunities.',
  },
  {
    index: '02',
    title: 'Strategize',
    description: 'We design a pragmatic engineering and AI roadmap tailored strictly to your commercial goals.',
  },
  {
    index: '03',
    title: 'Engineer',
    description: 'We build, integrate, test, and deploy intelligent software systems with production discipline.',
  },
  {
    index: '04',
    title: 'Optimize',
    description: 'We refine reliability, automate evolving edge cases, and continuously elevate system performance.',
  },
];

export interface IndustryItem {
  id: string;
  index: string;
  name: string;
  focus: string;
  capabilities: string;
  image: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'real-estate',
    index: '01',
    name: 'Real Estate & Infrastructure',
    focus: 'Smart property operations, investor portals, and automated lead routing.',
    capabilities: 'Portfolio Dashboards · Automated Inquiry Engines · Site Telemetry',
    image: GENERATED_MEDIA.infrastructure,
  },
  {
    id: 'healthcare',
    index: '02',
    name: 'Healthcare & Medical',
    focus: 'Intelligent patient scheduling, clinical workflow automation, and secure portals.',
    capabilities: 'Appointment Orchestration · Intake AI · Compliant Record Systems',
    image: GENERATED_MEDIA.industrial,
  },
  {
    id: 'manufacturing',
    index: '03',
    name: 'Manufacturing & Industrial',
    focus: 'Production visibility, inventory forecasting, and automated ERP bridges.',
    capabilities: 'Plant Operations · Supply Chain Sync · Predictive Maintenance',
    image: GENERATED_MEDIA.industrial,
  },
  {
    id: 'financial',
    index: '04',
    name: 'Financial & Professional Services',
    focus: 'Document intelligence, automated compliance workflows, and client portals.',
    capabilities: 'Document Extraction · Advisory Portals · Workflow Automation',
    image: GENERATED_MEDIA.fintechStudio,
  },
  {
    id: 'education',
    index: '05',
    name: 'Education',
    focus: 'Adaptive learning platforms, institutional operations, and student engagement.',
    capabilities: 'Learning Platforms · Academic Administration · AI Study Assistants',
    image: GENERATED_MEDIA.architecture,
  },
  {
    id: 'retail',
    index: '06',
    name: 'Retail & E-commerce',
    focus: 'High-conversion storefronts, inventory intelligence, and retention automation.',
    capabilities: 'Commerce Architecture · Demand Forecasting · Omnichannel Growth',
    image: GENERATED_MEDIA.spatialDisplay,
  },
  {
    id: 'startups',
    index: '07',
    name: 'Startups & Enterprises',
    focus: 'Zero-to-one flagship products and scalable enterprise digital transformation.',
    capabilities: 'MVP Engineering · SaaS Architecture · Dedicated AI Systems',
    image: GENERATED_MEDIA.architecture,
  },
];

export interface ProjectCaseStudy {
  id: string;
  index: string;
  name: string;
  industry: string;
  services: string[];
  overview: string;
  outcomeNote: string;
  image: string;
  accentLabel: string;
}

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'project-slot-01',
    index: '01',
    name: 'Enterprise Intelligence & Workflow Hub',
    industry: 'Financial & Professional Services',
    services: ['AI & Intelligent Systems', 'Business Automation'],
    overview:
      'Modular case study slot designed for an intelligent internal operations platform unifying document ingestion, automated triage, and executive reporting.',
    outcomeNote: 'Editable portfolio slot · Verified client metrics published upon deployment release.',
    image: GENERATED_MEDIA.fintechStudio,
    accentLabel: 'Architecture Blueprint',
  },
  {
    id: 'project-slot-02',
    index: '02',
    name: 'Connected Industrial Telemetry Portal',
    industry: 'Manufacturing & Industrial',
    services: ['Software Engineering', 'Web & Digital Experiences'],
    overview:
      'Modular case study slot showcasing a custom real-time operations web platform synchronizing multi-facility inventory and automated scheduling.',
    outcomeNote: 'Editable portfolio slot · Verified deployment outcomes added per client authorization.',
    image: GENERATED_MEDIA.industrial,
    accentLabel: 'System Architecture',
  },
  {
    id: 'project-slot-03',
    index: '03',
    name: 'Digital Commerce & Mobile Ecosystem',
    industry: 'Retail & E-commerce',
    services: ['Mobile Applications', 'Digital Growth'],
    overview:
      'Modular case study slot structured for a high-performance omnichannel web and mobile application paired with automated customer retention pipelines.',
    outcomeNote: 'Editable portfolio slot · Case study metrics customizable per verified engagement.',
    image: GENERATED_MEDIA.spatialDisplay,
    accentLabel: 'Product Experience',
  },
];

export const WHY_PILLARS = [
  {
    index: '01',
    title: 'Built Around Real Problems',
    detail: 'Every line of architecture traces back to a concrete operational bottleneck or commercial objective.',
  },
  {
    index: '02',
    title: 'Intelligent by Design',
    detail: 'Automation and applied AI are woven into core system logic rather than bolted on as surface features.',
  },
  {
    index: '03',
    title: 'Scalable Engineering',
    detail: 'Clean modular codebases, documented APIs, and resilient cloud infrastructure built to outlast trends.',
  },
  {
    index: '04',
    title: 'Human-Centered Experiences',
    detail: 'Complex technical capabilities translated into intuitive, fast, calm interfaces people enjoy using.',
  },
  {
    index: '05',
    title: 'Long-Term Partnership',
    detail: 'We stay invested post-launch—iterating, optimizing, and evolving technology alongside your growth.',
  },
] as const;
