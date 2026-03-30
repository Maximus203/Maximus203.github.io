/**
 * Seed script: insere les projets du portfolio dans la table Supabase `projects`.
 *
 * Usage:
 *   1. Remplir .env.local avec NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   2. npx tsx scripts/seed-supabase.ts
 *
 * Note: utilise la service_role key (pas anon) pour bypasser RLS.
 *       Passer la cle en argument: SUPABASE_SERVICE_KEY=xxx npx tsx scripts/seed-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Charger .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'api' },
  auth: { persistSession: false },
});

// Projets extraits de constants.tsx (FR + EN + ZH + JA)
const projects = [
  {
    slug: 'image-converter',
    title_fr: "Image Converter",
    title_en: "Image Converter",
    title_zh: "Image Converter",
    title_ja: "Image Converter",
    description_fr: "Service Open Source de conversion d'images en WebP. Optimisation SEO et éco-conception.",
    description_en: "Open Source service for WebP image conversion. SEO optimization and eco-design.",
    description_zh: "WebP图像转换开源服务. SEO优化和生态设计.",
    description_ja: "WebP画像変換オープンソースサービス. SEO最適化とエコデザイン.",
    tags: ['OpenSource', 'WebP', 'Performance'],
    github_url: 'https://github.com/Maximus203/image-converter',
    image_url: '/assets/projets/image-converter.gif',
    sort_order: 1,
    is_featured: true,
  },
  {
    slug: 'my-event',
    title_fr: "MyEvent",
    title_en: "MyEvent",
    title_zh: "MyEvent",
    title_ja: "MyEvent",
    description_fr: "Application complète de création et gestion d'événements.",
    description_en: "Complete application for event creation and management.",
    description_zh: "完整的活动创建和管理应用程序.",
    description_ja: "イベント作成および管理のための完全なアプリケーション.",
    tags: ['Laravel', 'React', 'Management'],
    github_url: 'https://github.com/Maximus203/my-event-app',
    image_url: '/assets/projets/my-event-demo.gif',
    sort_order: 2,
    is_featured: true,
  },
  {
    slug: 'archive-estm',
    title_fr: "Archive ESTM",
    title_en: "Archive ESTM",
    title_zh: "Archive ESTM",
    title_ja: "Archive ESTM",
    description_fr: "Plateforme d'archivage des mémoires avec ancrage Blockchain Ethereum pour l'intégrité.",
    description_en: "Thesis archiving platform with Ethereum Blockchain anchoring for integrity.",
    description_zh: "基于以太坊区块链锚定的论文归档平台，确保完整性.",
    description_ja: "完全性を確保するためのイーサリアムブロックチェーンアンカー付き論文アーカイブプラットフォーム.",
    tags: ['Blockchain', 'Ethereum', 'Archivage'],
    image_url: '/assets/projets/Archive-ESTM.webp',
    sort_order: 3,
    is_featured: true,
  },
  {
    slug: 'cynoia-spaces',
    title_fr: "Cynoia Spaces",
    title_en: "Cynoia Spaces",
    title_zh: "Cynoia Spaces",
    title_ja: "Cynoia Spaces",
    description_fr: "SaaS de gestion d'espaces collaboratifs. Architecture microservices (Spring Boot, Gateway).",
    description_en: "Collaborative space management SaaS. Microservices architecture (Spring Boot, Gateway).",
    description_zh: "协作空间管理SaaS. 微服务架构 (Spring Boot, Gateway).",
    description_ja: "コラボレーションスペース管理SaaS. マイクロサービスアーキテクチャ (Spring Boot, Gateway).",
    tags: ['Spring Boot', 'Microservices', 'SaaS'],
    image_url: '/assets/projets/sap-demo.gif',
    sort_order: 4,
    is_featured: true,
  },
];

async function seed() {
  console.log(`Seeding ${projects.length} projects into Supabase...`);

  const { data, error } = await supabase
    .from('projects')
    .upsert(projects, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} projects:`);
  data.forEach((p: any) => console.log(`  - ${p.slug} (${p.id})`));
}

seed();
