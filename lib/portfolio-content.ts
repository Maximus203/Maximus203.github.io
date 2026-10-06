import { assetUrl } from '@/lib/assets';
import type { Locale } from '@/lib/i18n';

// Editorial sources: the supplied CV, the original public resume at c5c7c628,
// and the owner's description of UpgradeTech. The CV takes precedence on dates.
// Keep private infrastructure, internal agent names and unverified URLs out.
type Localized<T> = Record<Locale, T>;
const translated = <T,>(fr: T, en: T, zh: T, ja: T): Localized<T> => ({ fr, en, zh, ja });

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  live?: string;
  access: string;
};
export type Experience = { id: string; company: string; role: string; period: string; logo?: string; summary: string };
export type Education = { id: string; school: string; degree: string; period: string; description?: string };

type ProjectRecord = Omit<Project, 'title' | 'description' | 'tags' | 'access'> & {
  title: Localized<string>;
  description: Localized<string>;
  tags: Localized<string[]>;
  access: Localized<string>;
};
const name = <T,>(value: T) => translated(value, value, value, value);
const publicRepository = translated('Dépôt public', 'Public repository', '公开仓库', '公開リポジトリ');
const visualDemo = translated('Démonstration visuelle', 'Visual demonstration', '项目演示图', 'ビジュアルデモ');
const documentedProject = translated('Projet documenté · aperçu non disponible', 'Documented project · preview unavailable', '项目介绍 · 暂无预览', 'プロジェクト紹介 · プレビューなし');

const projectRecords: ProjectRecord[] = [
  {
    id: 'image-converter', title: name('Image Converter'),
    description: translated('Service logiciel libre de conversion d’images en WebP, pensé pour la performance et l’éco-conception.', 'Open-source image conversion to WebP, designed for performance and more resource-efficient websites.', '开源 WebP 图片转换服务，注重性能与资源节约。', 'パフォーマンスと省資源を意識した、オープンソースの WebP 画像変換サービス。'),
    image: assetUrl('/media/previews/image-converter.webp'),
    tags: translated(['Logiciel libre', 'WebP', 'Performance'], ['Open source', 'WebP', 'Performance'], ['开源', 'WebP', '性能'], ['オープンソース', 'WebP', 'パフォーマンス']),
    link: 'https://github.com/Maximus203/image-converter', access: publicRepository,
  },
  {
    id: 'my-event', title: name('MyEvent'),
    description: translated('Application de création et de gestion d’événements, avec un parcours de bout en bout.', 'An application for creating and managing events from start to finish.', '涵盖活动创建与管理全流程的应用。', 'イベントの作成から運営までを支援するアプリケーション。'),
    image: assetUrl('/media/previews/my-event.webp'),
    tags: translated(['Laravel', 'React', 'Événements'], ['Laravel', 'React', 'Events'], ['Laravel', 'React', '活动管理'], ['Laravel', 'React', 'イベント']),
    link: 'https://github.com/Maximus203/my-event-app', access: publicRepository,
  },
  {
    id: 'nanobrowser-bridge', title: name('Nanobrowser Bridge'),
    description: translated('Pont HTTP local pour piloter un agent IA Chrome avec un modèle local et une validation humaine des actions sensibles.', 'A local HTTP bridge connecting a Chrome AI agent to a local model, with human approval for sensitive actions.', '连接 Chrome AI 代理与本地模型的 HTTP 桥接服务，敏感操作需人工确认。', 'Chrome の AI エージェントをローカルモデルにつなぐ HTTP ブリッジ。重要な操作には人による確認を組み込みます。'),
    image: '',
    tags: translated(['IA', 'TypeScript', 'Automatisation'], ['AI', 'TypeScript', 'Automation'], ['人工智能', 'TypeScript', '自动化'], ['AI', 'TypeScript', '自動化']),
    access: documentedProject,
  },
  {
    id: 'sap-commercial', title: name('SAP Commercial'),
    description: translated('Application de gestion des stocks, des ressources humaines et de la finance pour la Société Africaine de Pétrole, développée sur la période 2024–2026.', 'Stock, HR and finance management software for Société Africaine de Pétrole, developed during 2024–2026.', '为 Société Africaine de Pétrole 开发的库存、人力资源与财务管理应用，开发周期为 2024–2026 年。', 'Société Africaine de Pétrole 向けの在庫・人事・財務管理アプリケーション。開発期間は2024〜2026年。'),
    image: assetUrl('/media/previews/sap.webp'), tags: name(['Laravel', 'React', 'MySQL']),
    access: translated('Projet client · accès non public', 'Client project · non-public access', '客户项目 · 非公开访问', 'クライアント案件 · 非公開'),
  },
  {
    id: 'archive-estm', title: name('Archive ESTM'),
    description: translated('Plateforme d’archivage des mémoires avec ancrage blockchain pour renforcer l’intégrité des dépôts.', 'A thesis archive using blockchain anchoring to strengthen the integrity of submissions.', '采用区块链存证技术的学位论文归档平台，帮助保障提交内容的完整性。', '提出された論文の完全性を確かめるため、ブロックチェーンへの記録を活用した論文アーカイブ。'),
    image: assetUrl('/media/projets/Archive-ESTM.webp'),
    tags: translated(['Archivage', 'Blockchain', 'Éducation'], ['Archiving', 'Blockchain', 'Education'], ['归档', '区块链', '教育'], ['アーカイブ', 'ブロックチェーン', '教育']), access: visualDemo,
  },
  {
    id: 'momentum', title: name('Momentum'),
    description: translated('Plateforme de quiz interactifs en temps réel avec classement instantané pour les cours et les événements.', 'A real-time interactive quiz platform with live rankings for classes and events.', '面向课堂与活动的实时互动测验平台，提供即时排行榜。', '授業やイベントで使える、リアルタイムの順位表示を備えた参加型クイズプラットフォーム。'),
    image: assetUrl('/media/projets/momentum.webp'),
    tags: translated(['React', 'Temps réel', 'Pédagogie'], ['React', 'Real-time', 'Teaching'], ['React', '实时互动', '教学'], ['React', 'リアルタイム', '教育']), access: visualDemo,
  },
  {
    id: 'cynoia-spaces', title: name('Cynoia Spaces'),
    description: translated('SaaS de gestion d’espaces collaboratifs, développé avec Symfony et React et déployé avec Docker.', 'A collaborative workspace management SaaS built with Symfony and React and deployed with Docker.', '基于 Symfony 与 React 开发、使用 Docker 部署的协作空间管理 SaaS。', 'Symfony と React で開発し、Docker でデプロイした共同作業スペース管理 SaaS。'),
    image: assetUrl('/media/previews/cynoia-spaces.webp'),
    tags: translated(['Symfony', 'React', 'Docker'], ['Symfony', 'React', 'Docker'], ['Symfony', 'React', 'Docker'], ['Symfony', 'React', 'Docker']),
    access: translated('Aperçu du projet', 'Project preview', '项目预览', 'プロジェクトプレビュー'),
  },
  {
    id: 'ai-skills-library', title: translated('Bibliothèque de compétences IA', 'AI Skills Library', 'AI 技能库', 'AI スキルライブラリ'),
    description: translated('Bibliothèque de 80 compétences IA spécialisées pour accompagner le développement et l’automatisation.', 'A library of 80 specialized AI skills supporting software development and automation.', '包含 80 项专业 AI 技能的知识库，支持软件开发与自动化。', 'ソフトウェア開発と自動化を支援する、80の専門的な AI スキルをまとめたライブラリ。'),
    image: '',
    tags: translated(['IA', 'Compétences', 'Automatisation'], ['AI', 'Skills', 'Automation'], ['人工智能', '技能', '自动化'], ['AI', 'スキル', '自動化']),
    access: translated('Projet présenté dans le CV · dépôt privé', 'Project listed in the CV · private repository', '简历收录项目 · 私有仓库', '履歴書掲載プロジェクト · 非公開リポジトリ'),
  },
  {
    id: 'artist-digital', title: name('Artist Digital'),
    description: translated('CRM et automatisation du cycle de vie client : contrats, prospects et alertes d’échéances.', 'CRM and client lifecycle automation covering contracts, prospects and deadline alerts.', '客户关系管理与客户流程自动化，涵盖合同、潜在客户及到期提醒。', '契約、見込み顧客、期限通知を扱う CRM と顧客管理プロセスの自動化。'),
    image: '',
    tags: translated(['CRM', 'Automatisation', 'Relation client'], ['CRM', 'Automation', 'Client relationships'], ['CRM', '自动化', '客户关系'], ['CRM', '自動化', '顧客管理']), access: documentedProject,
  },
  {
    id: 'atlas-automation', title: name('Atlas Automation'),
    description: translated('Homelab auto-hébergé dédié à l’automatisation, avec authentification unique, VPN et bases de données vectorielles.', 'A self-hosted homelab for automation, with single sign-on, VPN and vector databases.', '用于自动化的自托管实验环境，包含单点登录、VPN 与向量数据库。', 'シングルサインオン、VPN、ベクトルデータベースを備えた、自動化のためのセルフホスト実験環境。'),
    image: '',
    tags: translated(['Homelab', 'Automatisation', 'Infrastructure'], ['Homelab', 'Automation', 'Infrastructure'], ['自托管实验室', '自动化', '基础设施'], ['ホームラボ', '自動化', 'インフラ']),
    access: translated('Homelab présenté dans le CV · accès privé', 'Homelab listed in the CV · private access', '简历收录实验环境 · 私有访问', '履歴書掲載の実験環境 · 非公開'),
  },
  {
    id: 'telegram-ops', title: name('Bots Telegram Ops'),
    description: translated('Bots Telegram de notification et de suivi des opérations.', 'Telegram bots for operational notifications and status updates.', '用于运维通知与状态跟踪的 Telegram 机器人。', '運用通知と状況確認を支援する Telegram ボット。'),
    image: '',
    tags: translated(['Telegram', 'Notifications', 'Automatisation'], ['Telegram', 'Notifications', 'Automation'], ['Telegram', '通知', '自动化'], ['Telegram', '通知', '自動化']),
    access: translated('Projet privé · présentation générale', 'Private project · overview only', '私有项目 · 仅展示概述', '非公開プロジェクト · 概要のみ'),
  },
  {
    id: 'murabbi-landing', title: name('Murabbi Landing'),
    description: translated('Site de présentation Next.js de Murabbi, avec une direction visuelle 3D. Cette vitrine est distincte de l’application mobile de suivi des habitudes.', 'A Next.js presentation website for Murabbi with a 3D visual direction. This website is separate from the mobile habit-tracking app.', '采用 3D 视觉设计的 Murabbi Next.js 展示网站，与习惯追踪移动应用分别呈现。', '3D 表現を取り入れた Murabbi の Next.js 紹介サイト。習慣管理用モバイルアプリとは別のプロジェクトです。'),
    image: assetUrl('/media/generated/murabbi-landing-demo.gif'),
    tags: translated(['Next.js', 'Three.js', 'Vitrine'], ['Next.js', 'Three.js', 'Website'], ['Next.js', 'Three.js', '展示网站'], ['Next.js', 'Three.js', '紹介サイト']),
    link: 'https://github.com/Maximus203/murabbi-landing', live: 'https://murabbi-landing.vercel.app',
    access: translated('Démo enregistrée · dépôt public', 'Recorded demo · public repository', '录制演示 · 公开仓库', '録画デモ · 公開リポジトリ'),
  },
  {
    id: 'les-chats', title: name('Les chats sont mignons'),
    description: translated('Projet pédagogique HTML/CSS pour étudiants de première année : structure sémantique, Grid, animations et adaptation aux écrans.', 'An HTML/CSS teaching project for first-year students covering semantic structure, Grid, animations and responsive design.', '面向一年级学生的 HTML/CSS 教学项目，涵盖语义化结构、Grid 布局、动画与响应式设计。', '1年次の学生向け HTML/CSS 教材。意味のある構造、Grid、アニメーション、レスポンシブデザインを学びます。'),
    image: assetUrl('/media/generated/les-chats-demo.gif'),
    tags: translated(['HTML', 'CSS', 'Pédagogie'], ['HTML', 'CSS', 'Teaching'], ['HTML', 'CSS', '教学'], ['HTML', 'CSS', '教育']),
    link: 'https://github.com/Maximus203/Les-chats-sont-mignons',
    access: translated('Démo locale enregistrée · dépôt public', 'Recorded local demo · public repository', '本地录制演示 · 公开仓库', 'ローカル録画デモ · 公開リポジトリ'),
  },
  {
    id: 'mbaye-chatbot', title: name('Mbaye Laravel Chatbot'),
    description: translated('Assistant conversationnel Laravel et Livewire, accompagné de sa démonstration animée historique.', 'A Laravel and Livewire conversational assistant with its original animated demonstration.', '使用 Laravel 与 Livewire 构建的对话助手，附有原始动画演示。', 'Laravel と Livewire で構築した対話アシスタント。制作時のアニメーションデモを掲載しています。'),
    image: assetUrl('/media/projets/mbaye-chatbot-demo.gif'),
    tags: translated(['Laravel', 'Livewire', 'Chatbot'], ['Laravel', 'Livewire', 'Chatbot'], ['Laravel', 'Livewire', '聊天机器人'], ['Laravel', 'Livewire', 'チャットボット']),
    link: 'https://github.com/Maximus203/Mbaye-laravel-chatbot-app',
    access: translated('Démo historique · dépôt public', 'Original demo · public repository', '历史演示 · 公开仓库', '制作時のデモ · 公開リポジトリ'),
  },
  {
    id: 'ndougalma', title: name('Ndougalma'),
    description: translated('Plateforme e-commerce dédiée aux produits locaux sénégalais, développée dans le cadre de TérangaDev.', 'An e-commerce platform for local Senegalese products, developed as part of TérangaDev.', '在 TérangaDev 项目中开发的电商平台，专注于塞内加尔本土产品。', 'TérangaDev の活動で開発した、セネガルの地元産品を扱う EC プラットフォーム。'),
    image: '',
    tags: translated(['E-commerce', 'Sénégal', 'Produits locaux'], ['E-commerce', 'Senegal', 'Local products'], ['电子商务', '塞内加尔', '本土产品'], ['EC', 'セネガル', '地元産品']),
    access: translated('Projet présenté dans le CV · aperçu non disponible', 'Project listed in the CV · preview unavailable', '简历收录项目 · 暂无预览', '履歴書掲載プロジェクト · プレビューなし'),
  },
  {
    id: 'murabbi-mobile', title: name('Murabbi'),
    description: translated('Application mobile de suivi des habitudes et de la progression personnelle. Le site Murabbi Landing présente le produit séparément.', 'A mobile app for tracking habits and personal progress. The separate Murabbi Landing website introduces the product.', '用于习惯追踪与个人进度管理的移动应用，另有 Murabbi Landing 产品展示网站。', '習慣と個人の進捗を記録するモバイルアプリ。製品紹介は別の Murabbi Landing サイトで行っています。'),
    image: '',
    tags: translated(['Mobile', 'Habitudes', 'Progression'], ['Mobile', 'Habits', 'Progress'], ['移动应用', '习惯', '进度'], ['モバイル', '習慣', '進捗']),
    access: translated('Application mobile · aperçu non disponible', 'Mobile app · preview unavailable', '移动应用 · 暂无预览', 'モバイルアプリ · プレビューなし'),
  },
  {
    id: 'upgradetech', title: name('UpgradeTech'),
    description: translated('Site e-commerce client en production pour la vente d’ordinateurs, de téléphones et d’accessoires.', 'A live client e-commerce website selling computers, phones and accessories.', '已上线的客户电商网站，销售电脑、手机及配件。', 'パソコン、スマートフォン、アクセサリーを販売する、運用中のクライアント向け EC サイト。'),
    image: '',
    tags: translated(['E-commerce', 'Projet client', 'En production'], ['E-commerce', 'Client project', 'Live'], ['电子商务', '客户项目', '已上线'], ['EC', 'クライアント案件', '運用中']),
    access: translated('Site client en production · lien non renseigné', 'Live client website · URL not provided', '客户网站已上线 · 未提供链接', '運用中のクライアントサイト · URL未掲載'),
  },
];

type ExperienceRecord = Omit<Experience, 'role' | 'period' | 'summary'> & {
  role: Localized<string>; period: Localized<string>; summary: Localized<string>;
};
const experienceRecords: ExperienceRecord[] = [
  {
    id: 'terangadev', company: 'TérangaDev', logo: assetUrl('/media/entreprises/teranga-dev.webp'), period: name('2024 — 2026'),
    role: translated('Chef de projet digital', 'Digital Project Manager', '数字项目经理', 'デジタルプロジェクトマネージャー'),
    summary: translated('Pilotage de projets web et mobiles, définition des spécifications et coordination des équipes. Développement de Ndougalma et accompagnement technique de la communauté.', 'Web and mobile project delivery, specification writing and team coordination. Development of Ndougalma and technical mentoring for the community.', '负责网页与移动项目、需求规格和团队协调；参与 Ndougalma 开发并为社区提供技术指导。', 'ウェブ・モバイル開発の進行管理、仕様策定、チーム調整を担当。Ndougalma の開発とコミュニティの技術支援にも取り組みました。'),
  },
  {
    id: 'estm-php-mysql', company: 'ESTM', logo: assetUrl('/media/entreprises/estm.svg'),
    period: translated('Mars — avril 2026', 'Mar — Apr 2026', '2026年3月 — 4月', '2026年3月 — 4月'),
    role: translated('Formateur PHP & MySQL', 'PHP & MySQL Instructor', 'PHP 与 MySQL 讲师', 'PHP・MySQL 講師'),
    summary: translated('PHP et MySQL en première année de Réseaux Télécoms et de Génie Logiciel. Du fondamental au CRUD complet en MVC, avec évaluations pratiques et revues de code.', 'PHP and MySQL for first-year Telecom Networks and Software Engineering students. From fundamentals to full MVC-based CRUD, with practical assessments and code reviews.', '为通信网络与软件工程一年级学生教授 PHP 和 MySQL，从基础知识到完整的 MVC 架构 CRUD，并开展实践考核与代码审查。', '通信ネットワーク・ソフトウェア工学の1年次学生に PHP と MySQL を指導。基礎から MVC による CRUD 実装まで、実技評価とコードレビューを行いました。'),
  },
  {
    id: 'estm-web', company: 'ESTM', logo: assetUrl('/media/entreprises/estm.svg'),
    period: translated('Déc. 2025 — mars 2026', 'Dec 2025 — Mar 2026', '2025年12月 — 2026年3月', '2025年12月 — 2026年3月'),
    role: translated('Formateur Web · HTML, CSS, JavaScript', 'Web Instructor · HTML, CSS, JavaScript', '网页开发讲师 · HTML、CSS、JavaScript', 'ウェブ開発講師 · HTML・CSS・JavaScript'),
    summary: translated('HTML5, CSS3 et JavaScript ES6+ pour les licences Réseaux Télécoms et Génie Logiciel. DOM, interactions, projets fil rouge, revues de code et évaluation continue.', 'HTML5, CSS3 and JavaScript ES6+ for Telecom Networks and Software Engineering degree courses. DOM, interactions, ongoing projects, code reviews and continuous assessment.', '面向通信网络与软件工程本科课程教授 HTML5、CSS3、JavaScript ES6+、DOM 和动态交互，并指导贯穿课程的项目、代码审查及持续考核。', '通信ネットワーク・ソフトウェア工学の課程で HTML5、CSS3、JavaScript ES6+ を指導。DOM、動的操作、継続課題、コードレビュー、継続評価を扱いました。'),
  },
  {
    id: 'ism', company: 'ISM',
    period: translated('Nov. 2025 — janv. 2026', 'Nov 2025 — Jan 2026', '2025年11月 — 2026年1月', '2025年11月 — 2026年1月'),
    role: translated('Formateur Web', 'Web Development Instructor', '网页开发讲师', 'ウェブ開発講師'),
    summary: translated('HTML et CSS en première année CPD ; HTML et JavaScript en deuxième année IAGE.', 'HTML and CSS for first-year CPD students; HTML and JavaScript for second-year IAGE students.', '为 CPD 一年级学生教授 HTML 和 CSS，为 IAGE 二年级学生教授 HTML 和 JavaScript。', 'CPD の1年次学生に HTML と CSS、IAGE の2年次学生に HTML と JavaScript を指導しました。'),
  },
  {
    id: 'escoa', company: 'ESCOA',
    period: translated('Mai — oct. 2025', 'May — Oct 2025', '2025年5月 — 10月', '2025年5月 — 10月'),
    role: translated('Formateur en développement', 'Software Development Instructor', '软件开发讲师', 'ソフトウェア開発講師'),
    summary: translated('Développement web dynamique avec PHP, MySQL et JavaScript DOM ; bases de Java et programmation orientée objet. Progression vers le CRUD complet et sensibilisation à la sécurité.', 'Dynamic web development with PHP, MySQL and JavaScript DOM, plus Java fundamentals and object-oriented programming. A progression towards full CRUD and security awareness.', '教授 PHP、MySQL、JavaScript DOM 动态网页开发，以及 Java 基础和面向对象编程；逐步完成 CRUD 并培养安全意识。', 'PHP、MySQL、JavaScript DOM による動的ウェブ開発と、Java の基礎・オブジェクト指向を指導。CRUD の完成とセキュリティの理解を目指しました。'),
  },
  {
    id: 'fideca', company: 'FIDECA', logo: assetUrl('/media/entreprises/fideca.webp'), period: name('2024 — 2026'),
    role: translated('Ingénieur Full-Stack · Responsable informatique', 'Full-Stack Engineer · IT Manager', '全栈工程师 · IT 负责人', 'フルスタックエンジニア · IT 管理責任者'),
    summary: translated('Logiciel de génération d’états financiers avec FastAPI, React et Tauri : un traitement ramené de 6 h à 35 min. Pilotage du système d’information, des accès et des sauvegardes.', 'Financial statement software built with FastAPI, React and Tauri, reducing a process from 6 hours to 35 minutes. Management of information systems, access and backups.', '使用 FastAPI、React 与 Tauri 开发财务报表软件，将处理时间从 6 小时缩短至 35 分钟；管理信息系统、访问权限及备份。', 'FastAPI、React、Tauri による財務諸表作成ソフトウェアを開発し、処理時間を6時間から35分へ短縮。情報システム、アクセス権、バックアップを管理しました。'),
  },
  {
    id: 'orange-sonatel', company: 'Orange — Sonatel', logo: assetUrl('/media/entreprises/Orange-sonatel.webp'), period: name('2021 — 2024'),
    role: translated('Assistant support performance & projet', 'Performance & Project Support Assistant', '绩效与项目支持助理', 'パフォーマンス・プロジェクト支援担当'),
    summary: translated('Suivi des indicateurs de performance, reporting et coordination des mises en production. Contrôles et sécurisation des opérations.', 'Performance indicator tracking, reporting and release coordination. Operational checks and safeguards.', '跟踪绩效指标、编写报告并协调生产发布，执行运营检查与安全措施。', 'パフォーマンス指標の追跡、レポート作成、本番リリースの調整を担当。運用上の確認と安全性の確保に取り組みました。'),
  },
  {
    id: 'integratop', company: 'Integratop IT',
    period: translated('2022 · 3 mois', '2022 · 3 months', '2022年 · 3个月', '2022年 · 3か月'),
    role: translated('Intégrateur de services', 'Service Integrator', '服务集成工程师', 'サービス導入担当'),
    summary: translated('Installation, paramétrage, tests et stabilisation d’une solution chez le client.', 'Client-side solution installation, configuration, testing and stabilization.', '在客户现场安装、配置、测试并稳定运行解决方案。', 'クライアント先でのソリューション導入、設定、テスト、安定化を担当しました。'),
  },
];

type EducationRecord = Omit<Education, 'degree' | 'period' | 'description'> & { degree: Localized<string>; period: Localized<string>; description?: Localized<string> };
const educationRecords: EducationRecord[] = [
  {
    id: 'doctorate', school: 'UN-CHK',
    degree: translated('Doctorat en Sciences Techniques et Numériques', 'Doctoral studies in Technical and Digital Sciences', '技术与数字科学博士研究', '技術・デジタル科学 博士課程'),
    period: translated('2025 — en cours', '2025 — ongoing', '2025年 — 在读', '2025年 — 在学中'),
  },
  {
    id: 'masters', school: 'ESTM',
    degree: translated('Master Génie Logiciel et Administration Réseaux', 'Master’s in Software Engineering and Network Administration', '软件工程与网络管理硕士', 'ソフトウェア工学・ネットワーク管理 修士'),
    period: name('2022 — 2024'),
    description: translated('Mention Très bien avec les félicitations du jury.', 'Graduated with “Très bien” honors and the jury’s congratulations.', '获“Très bien”（优秀）评定及评审委员会嘉奖。', '「Très bien（優秀）」評価および審査委員会の表彰。'),
  },
  {
    id: 'bachelors', school: 'ESTM',
    degree: translated('Licence Réseaux Télécoms', 'Bachelor’s in Telecommunications Networks', '通信网络学士', '通信ネットワーク 学士'),
    period: name('2017 — 2021'),
    description: translated('Mention Très bien.', 'Graduated with “Très bien” honors.', '获“Très bien”（优秀）评定。', '「Très bien（優秀）」評価。'),
  },
  {
    id: 'baccalaureate', school: 'Lycée Seydina Limamoulaye',
    degree: translated('Baccalauréat', 'Baccalauréat · secondary school diploma', 'Baccalauréat · 高中毕业文凭', 'バカロレア · 中等教育修了資格'),
    period: name('2016 — 2017'),
  },
];

const skillRecords = [
  {
    label: translated('Construire', 'Build', '构建', 'つくる'),
    items: name('HTML · CSS · JavaScript · TypeScript · React · PHP · Laravel · Symfony · Node.js · Express · FastAPI · Python · Java'),
  },
  {
    label: translated('Structurer', 'Structure', '组织', '設計する'),
    items: name('SQL · MySQL · PostgreSQL · MongoDB · UML · Git · Linux · Docker · CI/CD'),
  },
  {
    label: translated('Augmenter', 'Augment', '增强', '拡張する'),
    items: translated('RAG · conception de prompts · agents · n8n · OpenRouter · validation humaine', 'RAG · prompt design · agents · n8n · OpenRouter · human validation', 'RAG · 提示词设计 · 智能代理 · n8n · OpenRouter · 人工验证', 'RAG · プロンプト設計 · エージェント · n8n · OpenRouter · 人による検証'),
  },
  {
    label: translated('Transmettre', 'Teach', '教学', '伝える'),
    items: translated('HTML/CSS/JS · PHP/MySQL · revues de code · Kanban · pédagogie par projet', 'HTML/CSS/JS · PHP/MySQL · code review · Kanban · project-based teaching', 'HTML/CSS/JS · PHP/MySQL · 代码审查 · Kanban · 项目式教学', 'HTML/CSS/JS · PHP/MySQL · コードレビュー · Kanban · プロジェクト型学習'),
  },
  {
    label: translated('Connecter', 'Connect', '连接', 'つなぐ'),
    items: name('Firebase · Supabase · Directus · Tailwind CSS · Bootstrap'),
  },
];

const educationSection = translated(
  { kicker: 'Formation / diplômes', title: 'Un socle académique, une recherche en cours.', text: 'Des réseaux télécoms au génie logiciel, jusqu’aux sciences techniques et numériques.' },
  { kicker: 'Education / qualifications', title: 'Academic foundations, ongoing research.', text: 'From telecommunications networks to software engineering and technical and digital sciences.' },
  { kicker: '教育 / 学历', title: '扎实的学术基础，持续的研究。', text: '从通信网络到软件工程，再到技术与数字科学。' },
  { kicker: '学歴 / 資格', title: '学びの土台と、続いていく研究。', text: '通信ネットワークからソフトウェア工学、技術・デジタル科学へ。' },
);

const projectCard = translated(
  { live: 'Démo publique', preview: 'Aperçu du projet', noPreview: 'Aperçu non disponible', overview: 'Présentation du projet' },
  { live: 'Live demo', preview: 'Project preview', noPreview: 'Preview unavailable', overview: 'Project overview' },
  { live: '在线演示', preview: '项目预览', noPreview: '暂无预览', overview: '项目介绍' },
  { live: '公開デモ', preview: 'プロジェクトプレビュー', noPreview: 'プレビューなし', overview: 'プロジェクト紹介' },
);

export function getPortfolioData(locale: Locale) {
  return {
    profile: {
      name: 'El Hadji Ahmadou Cherif Diouf', shortName: 'Cherif Diouf',
      role: translated('Ingénieur Full-Stack · Formateur', 'Full-Stack Engineer · Instructor', '全栈工程师 · 讲师', 'フルスタックエンジニア · 講師')[locale],
      location: 'Dakar, Keur Massar', email: 'el.hadji.ahmadou.cherif.diouf@gmail.com', phone: '+221 77 316 27 27',
      github: 'https://github.com/Maximus203', linkedin: 'https://www.linkedin.com/in/cherif-diouf-59747b17b/', metric: '6 h → 35 min',
      bio: translated('Je conçois des systèmes qui font gagner du temps, réduisent les coûts opérationnels et transforment l’expertise en compétences durables.', 'I design systems that save time, reduce operating costs and turn expertise into lasting skills.', '我设计能够节省时间、降低运营成本，并把专业经验转化为长期能力的系统。', '時間を生み、運用コストを下げ、専門知識を持続的なスキルへ変えるシステムを設計します。')[locale],
    },
    projects: projectRecords.map((project): Project => ({ ...project, title: project.title[locale], description: project.description[locale], tags: project.tags[locale], access: project.access[locale] })),
    experiences: experienceRecords.map((experience): Experience => ({ ...experience, role: experience.role[locale], period: experience.period[locale], summary: experience.summary[locale] })),
    education: educationRecords.map((item): Education => ({ ...item, degree: item.degree[locale], period: item.period[locale], description: item.description?.[locale] })),
    skills: skillRecords.map((skill) => ({ label: skill.label[locale], items: skill.items[locale] })),
    educationSection: educationSection[locale],
    projectCard: projectCard[locale],
  };
}
