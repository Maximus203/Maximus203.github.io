import type { Language, ResumeData } from '@/types';
import { SHARED_GALLERY } from './gallery-data';

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
        company: "ISM",
        role: "Formateur",
        period: "Nov 2025 - Jan 2026",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        description: [
          "HTML & CSS (Licence 1 CPD).",
          "HTML (Licence 2 IAGE).",
          "JavaScript (Licence 2 IAGE)."
        ]
      },
      {
        company: "ESCOA",
        role: "Formateur",
        period: "Mai 2025 - Oct 2025",
        logo: "/assets/entreprises/escoa.png",
        description: [
          "Développement web dynamique : PHP/MySQL et JavaScript (DOM).",
          "Java : Syntaxe de base, POO.",
          "Pédagogie : Progression du fondamental vers le CRUD complet, sensibilisation sécurité.",
        ]
      },
      {
        company: "FIDECA",
        role: "Ingénieur Full-Stack & Resp. Informatique",
        period: "2024 - Présent",
        logo: "/assets/entreprises/fideca.png",
        description: [
          "Conception logiciel génération états financiers (FastAPI, React, Tauri). Gain de temps: 6h -> 35min.",
          "Pilotage du SI : Réseau, sauvegardes, gestion des accès.",
          "Règles métier & contrôles automatisés pour la consolidation.",
        ]
      },
      {
        company: "ESTM",
        role: "Formateur",
        period: "2024 - Présent",
        logo: "/assets/entreprises/estm.svg",
        description: [
          "Web statique (HTML5, CSS3, Flexbox/Grid) & dynamique (PHP, MySQL, MVC).",
          "Encadrement projets fil rouge, code reviews, évaluation continue."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "Assistant Support Performance & Projet",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
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
        period: "2026 - En cours",
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
        company: "ISM",
        role: "Trainer",
        period: "Nov 2025 - Jan 2026",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        description: [
          "HTML & CSS (Bachelor 1 CPD).",
          "HTML (Bachelor 2 IAGE).",
          "JavaScript (Bachelor 2 IAGE)."
        ]
      },
      {
        company: "ESCOA",
        role: "Trainer",
        period: "May 2025 - Oct 2025",
        logo: "/assets/entreprises/escoa.png",
        description: [
          "Dynamic web development: PHP/MySQL and JavaScript (DOM).",
          "Java: Basic syntax, OOP.",
          "Pedagogy: Progression from fundamentals to full CRUD, security awareness.",
        ]
      },
      {
        company: "FIDECA",
        role: "Full-Stack Engineer & IT Manager",
        period: "2024 - Present",
        logo: "/assets/entreprises/fideca.png",
        description: [
          "Financial statement generation software (FastAPI, React, Tauri). Time saved: 6h -> 35min.",
          "IT Management: Network, backups, access management.",
          "Business rules & automated controls for consolidation.",
        ]
      },
      {
        company: "ESTM",
        role: "Trainer",
        period: "2024 - Present",
        logo: "/assets/entreprises/estm.svg",
        description: [
          "Static (HTML5, CSS3, Flexbox/Grid) & Dynamic Web (PHP, MySQL, MVC).",
          "Capstone project supervision, code reviews, continuous assessment."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "Performance Support & Project Assistant",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
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
        period: "2026 - Current",
      },
      {
        school: "ESTM",
        degree: "Master in Software Engineering & Network Administration",
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
        description: "Collaborative space management SaaS. Microservices architecture (Spring Boot, Gateway).",
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
        company: "ISM",
        role: "讲师",
        period: "2025年11月 - 2026年1月",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        description: [
          "HTML & CSS (学士1年 CPD).",
          "HTML (学士2年 IAGE).",
          "JavaScript (学士2年 IAGE)."
        ]
      },
      {
        company: "ESCOA",
        role: "讲师",
        period: "2025年5月 - 2025年10月",
        logo: "/assets/entreprises/escoa.png",
        description: [
          "动态Web开发: PHP/MySQL 和 JavaScript (DOM).",
          "Java: 基础语法, 面向对象编程.",
          "教学: 从基础到完整CRUD的进阶, 安全意识.",
        ]
      },
      {
        company: "FIDECA",
        role: "全栈工程师 & IT经理",
        period: "2024 - 至今",
        logo: "/assets/entreprises/fideca.png",
        description: [
          "财务报表生成软件设计 (FastAPI, React, Tauri). 耗时减少: 6小时 -> 35分钟.",
          "IT管理: 网络, 备份, 访问管理.",
          "合并的业务规则和自动化控制.",
        ]
      },
      {
        company: "ESTM",
        role: "讲师",
        period: "2024 - 至今",
        logo: "/assets/entreprises/estm.svg",
        description: [
          "静态 (HTML5, CSS3, Flexbox/Grid) & 动态 Web (PHP, MySQL, MVC).",
          "毕业设计指导, 代码审查, 持续评估."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "性能支持 & 项目助理",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
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
        period: "2026 - 在读",
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
        company: "ISM",
        role: "講師",
        period: "2025年11月 - 2026年1月",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        description: [
          "HTML & CSS (学士1年 CPD).",
          "HTML (学士2年 IAGE).",
          "JavaScript (学士2年 IAGE)."
        ]
      },
      {
        company: "ESCOA",
        role: "講師",
        period: "2025年5月 - 2025年10月",
        logo: "/assets/entreprises/escoa.png",
        description: [
          "動的Web開発: PHP/MySQL および JavaScript (DOM).",
          "Java: 基本構文, オブジェクト指向プログラミング.",
          "教育法: 基礎から完全なCRUDへの進歩, セキュリティ意識.",
        ]
      },
      {
        company: "FIDECA",
        role: "フルスタックエンジニア & ITマネージャー",
        period: "2024 - 現在",
        logo: "/assets/entreprises/fideca.png",
        description: [
          "財務諸表作成ソフトウェア設計 (FastAPI, React, Tauri). 時間短縮: 6時間 -> 35分.",
          "IT管理: ネットワーク, バックアップ, アクセス管理.",
          "連結のためのビジネスルールと自動制御.",
        ]
      },
      {
        company: "ESTM",
        role: "講師",
        period: "2024 - 現在",
        logo: "/assets/entreprises/estm.svg",
        description: [
          "静的 (HTML5, CSS3, Flexbox/Grid) & 動的 Web (PHP, MySQL, MVC).",
          "卒業制作指導, コードレビュー, 継続的な評価."
        ]
      },
      {
        company: "Orange - Sonatel",
        role: "パフォーマンスサポート & プロジェクトアシスタント",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
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
        period: "2026 - 在学中",
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
