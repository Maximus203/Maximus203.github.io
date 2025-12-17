import { Language, ResumeData } from './types';

export const UI_LABELS: Record<Language, Record<string, string>> = {
  fr: {
    home: 'Accueil',
    gallery: 'Galerie',
    tools: 'Outils',
    about: 'À Propos',
    experience: 'Expériences',
    projects: 'Projets',
    skills: 'Compétences',
    education: 'Formation',
    available: 'Disponible pour nouveaux projets',
    role: 'Développeur',
    and: '&',
    mentor: 'Formateur',
    download: 'Télécharger',
    resume: 'CV',
    base: 'Base',
    status: 'Statut',
    top: 'Haut',
    selectedProjects: 'Projets Sélectionnés',
    technicalSkills: 'Compétences Techniques',
    workExperience: 'Expériences Professionnelles',
    educationTitle: 'Formation Académique',
    galleryTitle: 'Moments & Événements',
    gallerySubtitle: 'Conférences, Hackathons et vie communautaire.',
    toolsTitle: 'Boîte à Outils',
    toolsSubtitle: 'Des utilitaires pratiques pour développeurs et créateurs.',
    toolReadme: 'Générateur Readme',
    toolReadmeDesc: 'Créez le profil GitHub parfait avec des badges et stats dynamiques.',
    toolMeme: 'Générateur de Meme',
    toolMemeDesc: 'Créez du contenu viral rapidement pour vos réseaux sociaux.',
    toolConverter: 'Convertisseur d\'Images',
    toolConverterDesc: 'Optimisez vos assets : convertissez 1 image ou un lot de 10 simultanément.',
    launch: 'Lancer',
    searchPlaceholder: 'Rechercher un projet...',
    startProject: 'Démarrer un projet',
    submitProjectTitle: 'Parlons de votre projet',
    submitProjectDesc: 'Remplissez le formulaire ci-dessous et je vous répondrai rapidement.',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    projectDetails: 'Détails du projet',
    attachFile: 'Joindre un fichier',
    filePlaceholder: 'Glissez un fichier ou cliquez',
    send: 'Envoyer la demande',
    cancel: 'Annuler',
    successMessage: 'Votre demande a été envoyée avec succès !',
    memeTopText: 'Texte du Haut',
    memeBottomText: 'Texte du Bas',
    memeUpload: 'Importer une image',
    memeDownload: 'Télécharger le Meme',
    memeFontSize: 'Taille du texte',
    memeTextColor: 'Couleur du texte',
    memeStrokeColor: 'Couleur du contour',
    memeDragDrop: 'Glissez une image ici',
    // Footer
    footerQuote: 'Développeur Full-stack créant des expériences web modernes.',
    sections: 'Sections',
    pages: 'Pages & Outils',
    connect: 'Me Suivre',
    builtWith: 'Construit avec',
    hostedOn: 'Hébergé sur',
    rights: 'Tous droits réservés.',
    allProjects: 'Tous les projets',
    // SEO
    seoHomeTitle: "Cherif Diouf | Ingénieur Full-Stack & Formateur",
    seoHomeDesc: "Portfolio de Cherif Diouf. Expert Laravel, React & DevOps. Découvrez mes projets, compétences et parcours.",
    seoGalleryTitle: "Galerie & Événements | Cherif Diouf",
    seoGalleryDesc: "Retour en images sur les conférences, hackathons et événements tech au Sénégal.",
    seoToolsTitle: "Boîte à Outils Développeur | Cherif Diouf",
    seoToolsDesc: "Collection d'outils gratuits pour développeurs : Readme Generator, Convertisseur d'Images, Créateur de Memes."
  },
  en: {
    home: 'Home',
    gallery: 'Gallery',
    tools: 'Tools',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    available: 'Available for new projects',
    role: 'Developer',
    and: '&',
    mentor: 'Mentor',
    download: 'Download',
    resume: 'Resume',
    base: 'Base',
    status: 'Status',
    top: 'Top',
    selectedProjects: 'Selected Projects',
    technicalSkills: 'Technical Skills',
    workExperience: 'Work Experience',
    educationTitle: 'Education',
    galleryTitle: 'Moments & Events',
    gallerySubtitle: 'Conferences, Hackathons and community life.',
    toolsTitle: 'Dev Toolbox',
    toolsSubtitle: 'Useful utilities for developers and creators.',
    toolReadme: 'Readme Generator',
    toolReadmeDesc: 'Create the perfect GitHub profile with dynamic badges and stats.',
    toolMeme: 'Meme Generator',
    toolMemeDesc: 'Create viral content quickly for your social media.',
    toolConverter: 'Image Converter',
    toolConverterDesc: 'Optimize assets: convert 1 image or a batch of 10 simultaneously.',
    launch: 'Launch',
    searchPlaceholder: 'Search projects...',
    startProject: 'Start a Project',
    submitProjectTitle: "Let's discuss your project",
    submitProjectDesc: 'Fill out the form below and I will get back to you shortly.',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    projectDetails: 'Project Details',
    attachFile: 'Attach File',
    filePlaceholder: 'Drag a file or click to upload',
    send: 'Send Request',
    cancel: 'Cancel',
    successMessage: 'Your request has been sent successfully!',
    memeTopText: 'Top Text',
    memeBottomText: 'Bottom Text',
    memeUpload: 'Upload Image',
    memeDownload: 'Download Meme',
    memeFontSize: 'Font Size',
    memeTextColor: 'Text Color',
    memeStrokeColor: 'Outline Color',
    memeDragDrop: 'Drag & Drop an image here',
    // Footer
    footerQuote: 'Full-stack developer crafting modern web experiences.',
    sections: 'Sections',
    pages: 'Pages & Tools',
    connect: 'Connect',
    builtWith: 'Built with',
    hostedOn: 'Hosted on',
    rights: 'All rights reserved.',
    allProjects: 'All Projects',
    // SEO
    seoHomeTitle: "Cherif Diouf | Full-Stack Engineer & Trainer",
    seoHomeDesc: "Portfolio of Cherif Diouf. Laravel, React & DevOps Expert. Discover my projects, skills, and journey.",
    seoGalleryTitle: "Gallery & Events | Cherif Diouf",
    seoGalleryDesc: "Highlights from conferences, hackathons, and tech community events.",
    seoToolsTitle: "Developer Toolbox | Cherif Diouf",
    seoToolsDesc: "Free tools for developers: Readme Generator, Image Converter, Meme Generator."
  },
  zh: {
    home: '首页',
    gallery: '画廊',
    tools: '工具',
    about: '关于',
    experience: '经历',
    projects: '项目',
    skills: '技能',
    education: '教育',
    available: '可接受新项目',
    role: '开发者',
    and: '&',
    mentor: '导师',
    download: '下载',
    resume: '简历',
    base: '常驻',
    status: '状态',
    top: '顶部',
    selectedProjects: '精选项目',
    technicalSkills: '技术技能',
    workExperience: '工作经历',
    educationTitle: '教育背景',
    galleryTitle: '时刻 & 活动',
    gallerySubtitle: '会议、黑客马拉松和社区生活。',
    toolsTitle: '开发工具箱',
    toolsSubtitle: '为开发者和创作者提供的实用工具。',
    toolReadme: 'Readme 生成器',
    toolReadmeDesc: '使用动态徽章和统计数据创建完美的 GitHub 个人资料。',
    toolMeme: 'Meme 生成器',
    toolMemeDesc: '为您的社交媒体快速创建病毒式内容。',
    toolConverter: '图像转换器',
    toolConverterDesc: '优化资源：一次转换 1 张图像或批量处理 10 张。',
    launch: '启动',
    searchPlaceholder: '搜索项目...',
    startProject: '开始新项目',
    submitProjectTitle: '讨论您的项目',
    submitProjectDesc: '请填写下面的表格，我会尽快回复您。',
    firstName: '名字',
    lastName: '姓氏',
    email: '电子邮件',
    projectDetails: '项目详情',
    attachFile: '附件',
    filePlaceholder: '拖动文件或点击上传',
    send: '发送请求',
    cancel: '取消',
    successMessage: '您的请求已成功发送！',
    memeTopText: '顶部文字',
    memeBottomText: '底部文字',
    memeUpload: '上传图片',
    memeDownload: '下载 Meme',
    memeFontSize: '字体大小',
    memeTextColor: '文字颜色',
    memeStrokeColor: '描边颜色',
    memeDragDrop: '将图片拖放到此处',
    // Footer
    footerQuote: '打造现代网络体验的全栈开发人员。',
    sections: '章节',
    pages: '页面与工具',
    connect: '连接',
    builtWith: '构建于',
    hostedOn: '托管于',
    rights: '版权所有。',
    allProjects: '所有项目',
    // SEO
    seoHomeTitle: "Cherif Diouf | 全栈工程师 & 讲师",
    seoHomeDesc: "Cherif Diouf 的作品集。Laravel, React & DevOps 专家。探索我的项目、技能和经历。",
    seoGalleryTitle: "画廊 & 活动 | Cherif Diouf",
    seoGalleryDesc: "会议、黑客马拉松和技术社区活动集锦。",
    seoToolsTitle: "开发者工具箱 | Cherif Diouf",
    seoToolsDesc: "开发者免费工具：Readme 生成器、图像转换器、Meme 生成器。"
  },
  ja: {
    home: 'ホーム',
    gallery: 'ギャラリー',
    tools: 'ツール',
    about: '私について',
    experience: '経歴',
    projects: 'プロジェクト',
    skills: 'スキル',
    education: '学歴',
    available: '新規案件募集中',
    role: '開発者',
    and: '&',
    mentor: '講師',
    download: 'ダウンロード',
    resume: '履歴書',
    base: '拠点',
    status: 'ステータス',
    top: 'トップ',
    selectedProjects: '主なプロジェクト',
    technicalSkills: '技術スキル',
    workExperience: '職務経歴',
    educationTitle: '学歴',
    galleryTitle: '瞬間 & イベント',
    gallerySubtitle: 'カンファレンス、ハッカソン、コミュニティライフ。',
    toolsTitle: '開発ツールボックス',
    toolsSubtitle: '開発者とクリエイターのための便利なユーティリティ。',
    toolReadme: 'Readme ジェネレーター',
    toolReadmeDesc: '動的なバッジと統計を使用して完璧な GitHub プロファイルを作成します。',
    toolMeme: 'ミームジェネレーター',
    toolMemeDesc: 'ソーシャルメディア向けのバイラルコンテンツをすばやく作成します。',
    toolConverter: '画像コンバーター',
    toolConverterDesc: 'アセットの最適化：1枚の画像または10枚のバッチを同時に変換します。',
    launch: '起動',
    searchPlaceholder: 'プロジェクトを検索...',
    startProject: 'プロジェクトを開始',
    submitProjectTitle: 'プロジェクトについて相談する',
    submitProjectDesc: '以下のフォームにご記入ください。すぐにご連絡いたします。',
    firstName: '名',
    lastName: '姓',
    email: 'メールアドレス',
    projectDetails: 'プロジェクトの詳細',
    attachFile: 'ファイルを添付',
    filePlaceholder: 'ファイルをドラッグまたはクリック',
    send: '送信する',
    cancel: 'キャンセル',
    successMessage: 'リクエストは正常に送信されました！',
    memeTopText: '上部のテキスト',
    memeBottomText: '下部のテキスト',
    memeUpload: '画像をアップロード',
    memeDownload: 'ミームをダウンロード',
    memeFontSize: 'フォントサイズ',
    memeTextColor: 'テキストの色',
    memeStrokeColor: 'アウトラインの色',
    memeDragDrop: 'ここに画像をドラッグ＆ドロップ',
    // Footer
    footerQuote: 'モダンなWeb体験を作り出すフルスタック開発者。',
    sections: 'セクション',
    pages: 'ページとツール',
    connect: 'SNS',
    builtWith: '使用技術',
    hostedOn: 'ホスティング',
    rights: 'All rights reserved.',
    allProjects: 'すべてのプロジェクト',
    // SEO
    seoHomeTitle: "Cherif Diouf | フルスタックエンジニア & 講師",
    seoHomeDesc: "Cherif Diouf のポートフォリオ。Laravel, React & DevOps のエキスパート。私のプロジェクト、スキル、経歴をご覧ください。",
    seoGalleryTitle: "ギャラリー & イベント | Cherif Diouf",
    seoGalleryDesc: "カンファレンス、ハッカソン、テックコミュニティイベントのハイライト。",
    seoToolsTitle: "開発者ツールボックス | Cherif Diouf",
    seoToolsDesc: "開発者向け無料ツール：Readme ジェネレーター、画像コンバーター、ミームジェネレーター。"
  }
};

const SHARED_GALLERY = [
  {
    id: '1',
    title: 'DevFest Dakar 2023',
    category: 'Conference',
    date: 'Dec 2023',
    imageUrl: '/assets/galerie/devfest-1.jpg',
    size: 'large' as const,
    featured: true
  },
  {
    id: '2',
    title: 'DevFest Dakar - Conférence',
    category: 'Conference',
    date: 'Dec 2023',
    imageUrl: '/assets/galerie/devfest-2.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '3',
    title: 'DevFest Dakar - Networking',
    category: 'Conference',
    date: 'Dec 2023',
    imageUrl: '/assets/galerie/devfest-3.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '4',
    title: 'DevFest Dakar - Workshop',
    category: 'Conference',
    date: 'Dec 2023',
    imageUrl: '/assets/galerie/devfest-4.jpg',
    size: 'large' as const,
    featured: true
  },
  {
    id: '5',
    title: 'DevFest Dakar - Community',
    category: 'Conference',
    date: 'Dec 2023',
    imageUrl: '/assets/galerie/devfest-5.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '6',
    title: 'Journée Laravel Senegal',
    category: 'Community',
    date: 'Nov 2023',
    imageUrl: '/assets/galerie/laravel-senegal-1.jpg',
    size: 'large' as const,
    featured: true
  },
  {
    id: '7',
    title: 'Laravel Senegal - Présentation',
    category: 'Community',
    date: 'Nov 2023',
    imageUrl: '/assets/galerie/laravel-senegal-2.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '8',
    title: 'Laravel Senegal - Atelier',
    category: 'Community',
    date: 'Nov 2023',
    imageUrl: '/assets/galerie/laravel-senegal-3.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '9',
    title: 'Laravel Senegal - Networking',
    category: 'Community',
    date: 'Nov 2023',
    imageUrl: '/assets/galerie/laravel-senegal-4.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '10',
    title: 'Laravel Senegal - Team',
    category: 'Community',
    date: 'Nov 2023',
    imageUrl: '/assets/galerie/laravel-senegal-5.jpg',
    size: 'large' as const,
    featured: true
  },
  {
    id: '11',
    title: 'Hacktoberfest Galsen Dev',
    category: 'Hackathon',
    date: 'Oct 2023',
    imageUrl: '/assets/galerie/hacktoberfest-1.jpg',
    size: 'large' as const,
    featured: true
  },
  {
    id: '12',
    title: 'Hacktoberfest - Coding Session',
    category: 'Hackathon',
    date: 'Oct 2023',
    imageUrl: '/assets/galerie/hacktoberfest-2.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '13',
    title: 'Hacktoberfest - Collaboration',
    category: 'Hackathon',
    date: 'Oct 2023',
    imageUrl: '/assets/galerie/hacktoberfest-3.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '14',
    title: 'Hacktoberfest - Open Source',
    category: 'Hackathon',
    date: 'Oct 2023',
    imageUrl: '/assets/galerie/hacktoberfest-4.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '15',
    title: 'Workshop ESTM',
    category: 'Training',
    date: 'Sep 2023',
    imageUrl: '/assets/galerie/estm-workshop-1.jpg',
    size: 'large' as const,
    featured: true
  },
  {
    id: '16',
    title: 'Formation ESTM',
    category: 'Training',
    date: 'Sep 2023',
    imageUrl: '/assets/galerie/estm-workshop-2.jpg',
    size: 'normal' as const,
    featured: true
  },
  {
    id: '17',
    title: 'Edacy Formation',
    category: 'Training',
    date: 'Aug 2023',
    imageUrl: '/assets/galerie/edacy-2.jpg',
    size: 'normal' as const,
    featured: true
  }
];

// Helper to get skills structure for any language but with shared icons
const getSkills = (lang: 'fr' | 'en' | 'zh' | 'ja') => {
  const categories = {
    fr: ['Frontend', 'Backend', 'DevOps & Tools', 'Data'],
    en: ['Frontend', 'Backend', 'DevOps & Tools', 'Data'],
    zh: ['前端', '后端', 'DevOps & 工具', '数据'],
    ja: ['Frontend', 'Backend', 'DevOps & ツール', 'データ']
  };

  return [
    {
      name: categories[lang][0],
      skills: [
        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
        { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
        { name: "TailwindCSS", icon: "https://skillicons.dev/icons?i=tailwind" },
        { name: "Bootstrap", icon: "https://skillicons.dev/icons?i=bootstrap" }
      ]
    },
    {
      name: categories[lang][1],
      skills: [
        { name: "Laravel", icon: "https://skillicons.dev/icons?i=laravel" },
        { name: "Symfony", icon: "https://skillicons.dev/icons?i=symfony" },
        { name: "PHP", icon: "https://skillicons.dev/icons?i=php" },
        { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" }
      ]
    },
    {
      name: categories[lang][2],
      skills: [
        { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
        { name: "Git/GitHub", icon: "https://skillicons.dev/icons?i=git" },
        { name: "CI/CD", icon: "https://skillicons.dev/icons?i=githubactions" },
        { name: "Linux", icon: "https://skillicons.dev/icons?i=linux" }
      ]
    },
    {
      name: categories[lang][3],
      skills: [
        { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
        { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
        { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" }
      ]
    }
  ];
};

export const RESUME_DATA: Record<Language, ResumeData> = {
  fr: {
    profile: {
      name: "El Hadji Ahmadou CHERIF DIOUF",
      role: "Ingénieur Full-Stack & Formateur",
      location: "Dakar, Keur Massar (Ouvert au Remote)",
      email: "el.hadji.ahmadou.cherif.diouf@gmail.com",
      phone: "+221 77 316 27 27",
      linkedin: "linkedin.com/in/cherif-diouf-59747b17b",
      github: "github.com/Maximus203",
      avatar: "/assets/photo-2.webp",
      bioShort: "Formateur-doctorant & Ingénieur Full-Stack (Laravel, React). Je transforme mon vécu en entreprise en projets pédagogiques concrets.",
      bio: "Passionné par le développement web et la transmission de savoir, je combine une expertise technique solide (Laravel, React, DevOps) avec une pédagogie éprouvée. Mon approche se base sur des projets réels, la qualité du code et l'autonomie.",
    },
    experience: [
      {
        company: "ESCOA",
        role: "Formateur",
        period: "2025 - Présent",
        description: [
          "Développement web dynamique : PHP/MySQL et JavaScript (DOM).",
          "Java : Syntaxe de base, POO.",
          "Pédagogie : Progression du fondamental vers le CRUD complet, sensibilisation sécurité.",
        ]
      },
      {
        company: "FIDECA",
        role: "Ingénieur Full-Stack & Resp. Informatique",
        period: "2024 - 2025 (1 an)",
        description: [
          "Conception logiciel génération états financiers (FastAPI, React, Tauri). Gain de temps: 6h -> 35min.",
          "Pilotage du SI : Réseau, sauvegardes, gestion des accès.",
          "Règles métier & contrôles automatisés pour la consolidation.",
        ]
      },
      {
        company: "ESTM",
        role: "Formateur",
        period: "2024 - 2025",
        description: [
          "Web statique (HTML5, CSS3, Flexbox/Grid) & dynamique (PHP, MySQL, MVC).",
          "Encadrement projets fil rouge, code reviews, évaluation continue."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "Assistant Support Performance & Projet",
        period: "2021 - 2024",
        description: [
          "Suivi des KPI performance, reporting et coordination des mises en production.",
          "Sécurisation des opérations : check-lists, contrôles, conformité."
        ]
      }
    ],
    education: [
      {
        school: "UN-CHK",
        degree: "Doctorat en Sciences Techniques et Numériques",
        period: "2025 - En cours",
      },
      {
        school: "ESTM",
        degree: "Master Génie Logiciel et Admin Réseaux",
        period: "2022 - 2024",
        description: "Mention Très bien avec les félicitations du jury."
      },
      {
        school: "ESTM",
        degree: "Licence Réseaux Télécoms",
        period: "2017 - 2021",
        description: "Mention Très bien."
      }
    ],
    projects: [
      {
        title: "Image Converter",
        description: "Service Open Source de conversion d'images en WebP. Optimisation SEO et éco-conception.",
        tags: ["OpenSource", "WebP", "Performance"],
        github: "https://github.com/Maximus203/image-converter",
        image: "/assets/projets/image-converter.gif"
      },
      {
        title: "MyEvent",
        description: "Application complète de création et gestion d'événements.",
        tags: ["Laravel", "React", "Management"],
        github: "https://github.com/Maximus203/my-event-app",
        image: "/assets/projets/my-event-demo.gif"
      },
      {
        title: "Archive ESTM",
        description: "Plateforme d'archivage des mémoires avec ancrage Blockchain Ethereum pour l'intégrité.",
        tags: ["Blockchain", "Ethereum", "Archivage"],
        image: "/assets/projets/Archive-ESTM.webp"
      },
      {
        title: "Cynoia Spaces",
        description: "SaaS de gestion d'espaces collaboratifs. Architecture microservices (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/sap-demo.gif"
      }
    ],
    skills: getSkills('fr'),
    gallery: SHARED_GALLERY
  },
  en: {
    profile: {
      name: "El Hadji Ahmadou CHERIF DIOUF",
      role: "Full-Stack Engineer & Trainer",
      location: "Dakar, Keur Massar (Remote Open)",
      email: "el.hadji.ahmadou.cherif.diouf@gmail.com",
      phone: "+221 77 316 27 27",
      linkedin: "linkedin.com/in/cherif-diouf-59747b17b",
      github: "github.com/Maximus203",
      avatar: "/assets/photo-2.webp",
      bioShort: "Doctoral Trainer & Full-Stack Engineer (Laravel, React). I transform my enterprise experience into concrete pedagogical projects.",
      bio: "Passionate about web development and knowledge sharing, I combine solid technical expertise (Laravel, React, DevOps) with proven pedagogy. My approach is based on real-world projects, code quality, and autonomy.",
    },
    experience: [
      {
        company: "ESCOA",
        role: "Trainer",
        period: "2025 - Present",
        description: [
          "Dynamic web development: PHP/MySQL and JavaScript (DOM).",
          "Java: Basic syntax, OOP.",
          "Pedagogy: Progression from fundamentals to full CRUD, security awareness.",
        ]
      },
      {
        company: "FIDECA",
        role: "Full-Stack Engineer & IT Manager",
        period: "2024 - 2025 (1 year)",
        description: [
          "Financial statement generation software (FastAPI, React, Tauri). Time saved: 6h -> 35min.",
          "IT Management: Network, backups, access management.",
          "Business rules & automated controls for consolidation.",
        ]
      },
      {
        company: "ESTM",
        role: "Trainer",
        period: "2024 - 2025",
        description: [
          "Static (HTML5, CSS3) & Dynamic Web (PHP, MySQL, MVC).",
          "Capstone project supervision, code reviews, continuous assessment."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "Performance Support & Project Assistant",
        period: "2021 - 2024",
        description: [
          "KPI monitoring, reporting, and coordination of production releases.",
          "Operations security: checklists, periodic controls, compliance."
        ]
      }
    ],
    education: [
      {
        school: "UN-CHK",
        degree: "PhD in Technical and Digital Sciences",
        period: "2025 - Current",
      },
      {
        school: "ESTM",
        degree: "Master in Software Engineering",
        period: "2022 - 2024",
        description: "Highest honors with jury congratulations."
      },
      {
        school: "ESTM",
        degree: "Bachelor in Telecom Networks",
        period: "2017 - 2021",
        description: "Highest honors."
      }
    ],
    projects: [
      {
        title: "Image Converter",
        description: "Open Source service for WebP image conversion. SEO optimization and eco-design.",
        tags: ["OpenSource", "WebP", "Performance"],
        github: "https://github.com/Maximus203/image-converter",
        image: "/assets/projets/image-converter.gif"
      },
      {
        title: "MyEvent",
        description: "Complete application for event creation and management.",
        tags: ["Laravel", "React", "Management"],
        github: "https://github.com/Maximus203/my-event-app",
        image: "/assets/projets/my-event-demo.gif"
      },
      {
        title: "Archive ESTM",
        description: "Thesis archiving platform with Ethereum Blockchain anchoring for integrity.",
        tags: ["Blockchain", "Ethereum", "Archiving"],
        image: "/assets/projets/Archive-ESTM.webp"
      },
      {
        title: "Cynoia Spaces",
        description: "Collaborative space management SaaS. Microservices architecture.",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/sap-demo.gif"
      }
    ],
    skills: getSkills('en'),
    gallery: SHARED_GALLERY
  },
  zh: {
    profile: {
      name: "El Hadji Ahmadou CHERIF DIOUF",
      role: "全栈工程师 & 讲师",
      location: "达喀尔, Keur Massar (可远程)",
      email: "el.hadji.ahmadou.cherif.diouf@gmail.com",
      phone: "+221 77 316 27 27",
      linkedin: "linkedin.com/in/cherif-diouf-59747b17b",
      github: "github.com/Maximus203",
      avatar: "/assets/photo-2.webp",
      bioShort: "博士讲师 & 全栈工程师 (Laravel, React). 我将企业经验转化为具体的教学项目。",
      bio: "热衷于Web开发和知识分享，我将扎实的技术专长 (Laravel, React, DevOps) 与成熟的教学方法相结合。我的方法基于真实项目、代码质量和自主性。",
    },
    experience: [
      {
        company: "ESCOA",
        role: "讲师",
        period: "2025 - 至今",
        description: [
          "动态Web开发: PHP/MySQL 和 JavaScript (DOM).",
          "Java: 基础语法, 面向对象编程.",
          "教学: 从基础到完整CRUD的进阶, 安全意识.",
        ]
      },
      {
        company: "FIDECA",
        role: "全栈工程师 & IT经理",
        period: "2024 - 2025 (1年)",
        description: [
          "财务报表生成软件设计 (FastAPI, React, Tauri). 耗时减少: 6小时 -> 35分钟.",
          "IT管理: 网络, 备份, 访问管理.",
          "合并的业务规则和自动化控制.",
        ]
      },
      {
        company: "ESTM",
        role: "讲师",
        period: "2024 - 2025",
        description: [
          "静态 (HTML5, CSS3, Flexbox/Grid) & 动态 Web (PHP, MySQL, MVC).",
          "毕业设计指导, 代码审查, 持续评估."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "性能支持 & 项目助理",
        period: "2021 - 2024",
        description: [
          "KPI性能监控, 报告和生产发布协调.",
          "运营安全: 检查清单, 定期控制, 合规性."
        ]
      }
    ],
    education: [
      {
        school: "UN-CHK",
        degree: "技术与数字科学博士",
        period: "2025 - 在读",
      },
      {
        school: "ESTM",
        degree: "软件工程与网络管理硕士",
        period: "2022 - 2024",
        description: "优秀毕业生 (评审团祝贺)."
      },
      {
        school: "ESTM",
        degree: "电信网络学士",
        period: "2017 - 2021",
        description: "优秀毕业生."
      }
    ],
    projects: [
      {
        title: "Image Converter",
        description: "WebP图像转换开源服务. SEO优化和生态设计.",
        tags: ["OpenSource", "WebP", "Performance"],
        github: "https://github.com/Maximus203/image-converter",
        image: "/assets/projets/image-converter.gif"
      },
      {
        title: "MyEvent",
        description: "完整的活动创建和管理应用程序.",
        tags: ["Laravel", "React", "Management"],
        github: "https://github.com/Maximus203/my-event-app",
        image: "/assets/projets/my-event-demo.gif"
      },
      {
        title: "Archive ESTM",
        description: "基于以太坊区块链锚定的论文归档平台，确保完整性.",
        tags: ["Blockchain", "Ethereum", "Archivage"],
        image: "/assets/projets/Archive-ESTM.webp"
      },
      {
        title: "Cynoia Spaces",
        description: "协作空间管理SaaS. 微服务架构 (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/sap-demo.gif"
      }
    ],
    skills: getSkills('zh'),
    gallery: SHARED_GALLERY
  },
  ja: {
    profile: {
      name: "El Hadji Ahmadou CHERIF DIOUF",
      role: "フルスタックエンジニア & 講師",
      location: "ダカール, Keur Massar (リモート可)",
      email: "el.hadji.ahmadou.cherif.diouf@gmail.com",
      phone: "+221 77 316 27 27",
      linkedin: "linkedin.com/in/cherif-diouf-59747b17b",
      github: "github.com/Maximus203",
      avatar: "/assets/photo-2.webp",
      bioShort: "博士課程講師 & フルスタックエンジニア (Laravel, React). 企業での経験を具体的な教育プロジェクトに変えます。",
      bio: "Web開発と知識共有に情熱を注いでおり、確かな技術力 (Laravel, React, DevOps) と実績のある教育法を組み合わせています。私の手法は、実際のプロジェクト、コード品質、自律性に基づいています。",
    },
    experience: [
      {
        company: "ESCOA",
        role: "講師",
        period: "2025 - 現在",
        description: [
          "動的Web開発: PHP/MySQL および JavaScript (DOM).",
          "Java: 基本構文, オブジェクト指向プログラミング.",
          "教育法: 基礎から完全なCRUDへの進歩, セキュリティ意識.",
        ]
      },
      {
        company: "FIDECA",
        role: "フルスタックエンジニア & ITマネージャー",
        period: "2024 - 2025 (1年)",
        description: [
          "財務諸表作成ソフトウェア設計 (FastAPI, React, Tauri). 時間短縮: 6時間 -> 35分.",
          "IT管理: ネットワーク, バックアップ, アクセス管理.",
          "連結のためのビジネスルールと自動制御.",
        ]
      },
      {
        company: "ESTM",
        role: "講師",
        period: "2024 - 2025",
        description: [
          "静的 (HTML5, CSS3, Flexbox/Grid) & 動的 Web (PHP, MySQL, MVC).",
          "卒業制作指導, コードレビュー, 継続的な評価."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "パフォーマンスサポート & プロジェクトアシスタント",
        period: "2021 - 2024",
        description: [
          "KPIパフォーマンス監視, レポート作成および本番リリースの調整.",
          "運用セキュリティ: チェックリスト, 定期的な管理, コンプライアンス."
        ]
      },
    ],
    education: [
      {
        school: "UN-CHK",
        degree: "技術・デジタル科学博士",
        period: "2025 - 在学中",
      },
      {
        school: "ESTM",
        degree: "ソフトウェア工学およびネットワーク管理修士",
        period: "2022 - 2024",
        description: "最優秀成績 (審査員賞賛)."
      },
      {
        school: "ESTM",
        degree: "通信ネットワーク学士",
        period: "2017 - 2021",
        description: "最優秀成績."
      }
    ],
    projects: [
      {
        title: "Image Converter",
        description: "WebP画像変換オープンソースサービス. SEO最適化とエコデザイン.",
        tags: ["OpenSource", "WebP", "Performance"],
        github: "https://github.com/Maximus203/image-converter",
        image: "/assets/projets/image-converter.gif"
      },
      {
        title: "MyEvent",
        description: "イベント作成および管理のための完全なアプリケーション.",
        tags: ["Laravel", "React", "Management"],
        github: "https://github.com/Maximus203/my-event-app",
        image: "/assets/projets/my-event-demo.gif"
      },
      {
        title: "Archive ESTM",
        description: "完全性を確保するためのイーサリアムブロックチェーンアンカー付き論文アーカイブプラットフォーム.",
        tags: ["Blockchain", "Ethereum", "Archivage"],
        image: "/assets/projets/Archive-ESTM.webp"
      },
      {
        title: "Cynoia Spaces",
        description: "コラボレーションスペース管理SaaS. マイクロサービスアーキテクチャ (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/sap-demo.gif"
      }
    ],
    skills: getSkills('ja'),
    gallery: SHARED_GALLERY
  }
};