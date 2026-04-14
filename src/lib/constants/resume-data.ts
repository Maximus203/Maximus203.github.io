import type { Language, ResumeData } from '@/types';
import { SHARED_GALLERY } from './gallery-data';

// Helper to get skills structure for any language but with shared icons
const getSkills = (lang: 'fr' | 'en' | 'zh' | 'ja') => {
  const categories = {
    fr: ['Frontend', 'Backend', 'DevOps & Tools', 'Data', 'BaaS & Cloud'],
    en: ['Frontend', 'Backend', 'DevOps & Tools', 'Data', 'BaaS & Cloud'],
    zh: ['前端', '后端', 'DevOps & 工具', '数据', 'BaaS & 云服务'],
    ja: ['Frontend', 'Backend', 'DevOps & ツール', 'データ', 'BaaS & クラウド']
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
    },
    {
      name: categories[lang][4],
      skills: [
        { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
        { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
        { name: "Directus", icon: "https://avatars.githubusercontent.com/u/16841566?s=40" }
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
      bioShort: "Expert en digitalisation & Formateur-développeur Full-Stack. Je conçois des solutions numériques sur mesure et forme la prochaine génération de développeurs.",
      bio: "Passionné par le développement web et la transmission de savoir, je combine une expertise technique solide (Laravel, React, DevOps, Supabase) avec une pédagogie éprouvée. Mon approche se base sur des projets réels, la qualité du code et l'autonomie.",
    },
    experience: [
      {
        company: "TérangaDev",
        role: "Chef de projet",
        period: "2026 - Présent",
        logo: "/assets/entreprises/teranga-dev.webp",
        profiles: ['software', 'teaching'],
        description: [
          "Conception et développement de Ndougalma, plateforme de mise en relation communautaire.",
          "Gestion de projet : définition des specs, suivi des sprints, coordination des équipes.",
          "Accompagnement technique des membres de la communauté TérangaDev."
        ],
        profileDescriptions: {
          software: [
            "Conception et développement de Ndougalma (Firebase, Flutter, React).",
            "Architecture technique : API REST, authentification, déploiement CI/CD.",
            "Gestion de projet : définition des specs, suivi des sprints."
          ],
          teaching: [
            "Accompagnement technique des membres de la communauté TérangaDev.",
            "Animation d'ateliers et partage de bonnes pratiques de développement.",
            "Contribution open-source et documentation des projets."
          ]
        }
      },
      {
        company: "ESTM",
        role: "Formateur PHP & MySQL",
        period: "Mars - Avr 2026",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "PHP & MySQL (Licence 1 Réseaux Télécoms & Licence 1 Génie Logiciel).",
          "Progression du fondamental vers le CRUD complet avec architecture MVC.",
          "Évaluations pratiques et code reviews en séance."
        ]
      },
      {
        company: "ESTM",
        role: "Formateur Web (HTML/CSS/JS)",
        period: "Déc 2025 - Mars 2026",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "HTML5 & CSS3 — Licences RT (Réseaux Télécoms) & GL (Génie Logiciel).",
          "JavaScript ES6+, DOM et interactions dynamiques.",
          "Encadrement projets fil rouge, code reviews, évaluation continue."
        ]
      },
      {
        company: "ISM",
        role: "Formateur",
        period: "Nov 2025 - Jan 2026",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        profiles: ['teaching'],
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
        profiles: ['teaching'],
        description: [
          "Développement web dynamique : PHP/MySQL et JavaScript (DOM).",
          "Java : Syntaxe de base, POO.",
          "Pédagogie : Progression du fondamental vers le CRUD complet, sensibilisation sécurité.",
        ]
      },
      {
        company: "FIDECA",
        role: "Ingénieur Full-Stack & Resp. Informatique",
        period: "2024 - 2026",
        logo: "/assets/entreprises/fideca.png",
        profiles: ['software', 'network', 'teaching'],
        description: [
          "Conception logiciel génération états financiers (FastAPI, React, Tauri). Gain de temps: 6h -> 35min.",
          "Pilotage du SI : Réseau, sauvegardes, gestion des accès.",
          "Règles métier & contrôles automatisés pour la consolidation.",
        ],
        profileDescriptions: {
          software: [
            "Conception logiciel génération états financiers (FastAPI, React, Tauri). Gain de temps: 6h → 35min.",
            "Développement d'outils d'automatisation métier (scripts Python, dashboards React, API REST).",
            "Architecture et modélisation du système d'information."
          ],
          network: [
            "Pilotage du SI : Réseau, sauvegardes, gestion des accès.",
            "Administration des serveurs Linux/Windows et maintenance préventive.",
            "Sécurisation des infrastructures et contrôle de conformité."
          ],
          teaching: [
            "Accompagnement et formation des équipes internes sur les nouveaux outils numériques.",
            "Règles métier & contrôles automatisés pour la consolidation des comptes.",
            "Rédaction de procédures et documentation technique interne."
          ]
        }
      },
      {
        company: "Orange - Sonatel",
        role: "Assistant Support Performance & Projet",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
        profiles: ['software', 'network'],
        description: [
          "Suivi des KPI performance, reporting et coordination des mises en production.",
          "Sécurisation des opérations : check-lists, contrôles, conformité."
        ],
        profileDescriptions: {
          software: [
            "Coordination des mises en production et suivi des indicateurs de performance.",
            "Reporting technique et analyse des métriques applicatives.",
            "Automatisation de tâches de supervision (scripts, tableaux de bord)."
          ],
          network: [
            "Suivi des KPI performance réseau, reporting et coordination des mises en production.",
            "Sécurisation des opérations : check-lists, contrôles périodiques, conformité.",
            "Support technique niveau 2 et gestion des incidents réseau."
          ]
        }
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
        title: "App SAP – Société Africaine de Pétrole",
        description: "Application web de gestion interne (stocks, RH, finance). Déployée en production pour la SAP.",
        tags: ["Laravel", "React", "MySQL"],
        image: "/assets/projets/sap-demo.gif"
      },
      {
        title: "Cynoia Spaces",
        description: "SaaS de gestion d'espaces collaboratifs. Architecture microservices (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/cynoia-spaces.gif"
      },
      {
        title: "Momentum",
        description: "Plateforme de quiz interactifs en temps réel avec classement instantané. Idéale pour cours, événements et team-building.",
        tags: ["React", "Temps réel", "Quiz", "Éducation"],
        link: "https://momentum.artist-dev.com/",
        image: "/assets/projets/momentum-demo.gif"
      },
      {
        title: "Les chats sont mignons",
        description: "Projet pédagogique HTML/CSS pour étudiants L1 : structure sémantique, Grid, animations et responsive design.",
        tags: ["HTML", "CSS", "Pédagogie", "Responsive"],
        github: "https://github.com/Maximus203/Les-chats-sont-mignons",
        image: "/assets/projets/les-chats-sont-mignons.png"
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
      bioShort: "Digitalization Expert & Full-Stack Developer/Trainer. I build tailored digital solutions and train the next generation of developers.",
      bio: "Passionate about web development and knowledge sharing, I combine solid technical expertise (Laravel, React, DevOps, Supabase) with proven pedagogy. My approach is based on real-world projects, code quality, and autonomy.",
    },
    experience: [
      {
        company: "TérangaDev",
        role: "Project Manager",
        period: "2026 - Present",
        logo: "/assets/entreprises/teranga-dev.webp",
        profiles: ['software', 'teaching'],
        description: [
          "Design and development of Ndougalma, a community networking platform.",
          "Project management: spec definition, sprint tracking, team coordination.",
          "Technical mentorship for TérangaDev community members."
        ],
        profileDescriptions: {
          software: [
            "Design and development of Ndougalma (Firebase, Flutter, React).",
            "Technical architecture: REST API, authentication, CI/CD deployment.",
            "Project management: spec definition, sprint tracking."
          ],
          teaching: [
            "Technical mentorship for TérangaDev community members.",
            "Workshops and sharing of development best practices.",
            "Open-source contributions and project documentation."
          ]
        }
      },
      {
        company: "ESTM",
        role: "PHP & MySQL Trainer",
        period: "Mar - Apr 2026",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "PHP & MySQL (Bachelor 1 Telecom Networks & Bachelor 1 Software Engineering).",
          "Progression from fundamentals to full CRUD with MVC architecture.",
          "Practical assessments and in-session code reviews."
        ]
      },
      {
        company: "ESTM",
        role: "Web Trainer (HTML/CSS/JS)",
        period: "Dec 2025 - Mar 2026",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "HTML5 & CSS3 — Telecom Networks (RT) & Software Engineering (GL) Bachelor programs.",
          "JavaScript ES6+, DOM and dynamic interactions.",
          "Capstone project supervision, code reviews, continuous assessment."
        ]
      },
      {
        company: "ISM",
        role: "Trainer",
        period: "Nov 2025 - Jan 2026",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        profiles: ['teaching'],
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
        profiles: ['teaching'],
        description: [
          "Dynamic web development: PHP/MySQL and JavaScript (DOM).",
          "Java: Basic syntax, OOP.",
          "Pedagogy: Progression from fundamentals to full CRUD, security awareness.",
        ]
      },
      {
        company: "FIDECA",
        role: "Full-Stack Engineer & IT Manager",
        period: "2024 - 2026",
        logo: "/assets/entreprises/fideca.png",
        profiles: ['software', 'network', 'teaching'],
        description: [
          "Financial statement generation software (FastAPI, React, Tauri). Time saved: 6h -> 35min.",
          "IT Management: Network, backups, access management.",
          "Business rules & automated controls for consolidation.",
        ],
        profileDescriptions: {
          software: [
            "Financial statement generation software design (FastAPI, React, Tauri). Time saved: 6h → 35min.",
            "Development of business automation tools (Python scripts, React dashboards, REST API).",
            "Information system architecture and modeling."
          ],
          network: [
            "IT infrastructure management: network, backups, access control.",
            "Linux/Windows server administration and preventive maintenance.",
            "Infrastructure security and compliance audits."
          ],
          teaching: [
            "Internal team coaching on new digital tools and processes.",
            "Business rules & automated controls for account consolidation.",
            "Writing procedures and internal technical documentation."
          ]
        }
      },
      {
        company: "Orange - Sonatel",
        role: "Performance Support & Project Assistant",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
        profiles: ['software', 'network'],
        description: [
          "KPI monitoring, reporting, and coordination of production releases.",
          "Operations security: checklists, periodic controls, compliance."
        ],
        profileDescriptions: {
          software: [
            "Coordination of production releases and performance indicator monitoring.",
            "Technical reporting and application metrics analysis.",
            "Task automation for supervision (scripts, dashboards)."
          ],
          network: [
            "Network performance KPI monitoring, reporting and production release coordination.",
            "Operations security: checklists, periodic controls, compliance.",
            "Level 2 technical support and network incident management."
          ]
        }
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
        title: "SAP App – Société Africaine de Pétrole",
        description: "Internal management web application (inventory, HR, finance). Deployed in production for SAP.",
        tags: ["Laravel", "React", "MySQL"],
        image: "/assets/projets/sap-demo.gif"
      },
      {
        title: "Cynoia Spaces",
        description: "Collaborative space management SaaS. Microservices architecture (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/cynoia-spaces.gif"
      },
      {
        title: "Momentum",
        description: "Real-time interactive quiz platform with instant leaderboard. Ideal for classes, events and team-building.",
        tags: ["React", "Real-time", "Quiz", "Education"],
        link: "https://momentum.artist-dev.com/",
        image: "/assets/projets/momentum-demo.gif"
      },
      {
        title: "Les chats sont mignons",
        description: "Educational HTML/CSS project for L1 students: semantic structure, Grid, animations and responsive design.",
        tags: ["HTML", "CSS", "Pedagogy", "Responsive"],
        github: "https://github.com/Maximus203/Les-chats-sont-mignons",
        image: "/assets/projets/les-chats-sont-mignons.png"
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
      bioShort: "数字化转型专家 & 全栈开发讲师。我打造定制化数字解决方案，并培育下一代开发者。",
      bio: "热衷于Web开发和知识分享，我将扎实的技术专长 (Laravel, React, DevOps, Supabase) 与成熟的教学方法相结合。我的方法基于真实项目、代码质量和自主性。",
    },
    experience: [
      {
        company: "TérangaDev",
        role: "项目经理",
        period: "2026 - 至今",
        logo: "/assets/entreprises/teranga-dev.webp",
        profiles: ['software', 'teaching'],
        description: [
          "设计和开发Ndougalma——社区交流平台。",
          "项目管理：规格定义、冲刺跟踪、团队协调。",
          "TérangaDev社区成员的技术指导。"
        ],
        profileDescriptions: {
          software: [
            "设计和开发Ndougalma (Firebase, Flutter, React)。",
            "技术架构：REST API、身份验证、CI/CD部署。",
            "项目管理：规格定义、冲刺跟踪。"
          ],
          teaching: [
            "TérangaDev社区成员的技术指导。",
            "举办研讨会，分享开发最佳实践。",
            "开源贡献和项目文档编写。"
          ]
        }
      },
      {
        company: "ESTM",
        role: "PHP & MySQL 讲师",
        period: "2026年3月 - 4月",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "PHP & MySQL (学士1年 电信网络 & 软件工程)。",
          "从基础到完整CRUD与MVC架构的进阶。",
          "实践评估和课堂代码审查。"
        ]
      },
      {
        company: "ESTM",
        role: "Web讲师 (HTML/CSS/JS)",
        period: "2025年12月 - 2026年3月",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "HTML5 & CSS3 — 电信网络(RT)及软件工程(GL)学士课程。",
          "JavaScript ES6+、DOM和动态交互。",
          "毕业设计指导，代码审查，持续评估。"
        ]
      },
      {
        company: "ISM",
        role: "讲师",
        period: "2025年11月 - 2026年1月",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        profiles: ['teaching'],
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
        profiles: ['teaching'],
        description: [
          "动态Web开发: PHP/MySQL 和 JavaScript (DOM).",
          "Java: 基础语法, 面向对象编程.",
          "教学: 从基础到完整CRUD的进阶, 安全意识.",
        ]
      },
      {
        company: "FIDECA",
        role: "全栈工程师 & IT经理",
        period: "2024 - 2026",
        logo: "/assets/entreprises/fideca.png",
        profiles: ['software', 'network', 'teaching'],
        description: [
          "财务报表生成软件设计 (FastAPI, React, Tauri). 耗时减少: 6小时 -> 35分钟.",
          "IT管理: 网络, 备份, 访问管理.",
          "合并的业务规则和自动化控制.",
        ],
        profileDescriptions: {
          software: [
            "财务报表生成软件设计 (FastAPI, React, Tauri)。耗时减少：6小时→35分钟。",
            "开发业务自动化工具（Python脚本、React仪表板、REST API）。",
            "信息系统的架构和建模。"
          ],
          network: [
            "IT基础设施管理：网络、备份、访问控制。",
            "Linux/Windows服务器管理和预防性维护。",
            "基础设施安全和合规审计。"
          ],
          teaching: [
            "指导内部团队采用新数字工具和流程。",
            "账目合并的业务规则和自动化控制。",
            "编写流程和内部技术文档。"
          ]
        }
      },
      {
        company: "Orange - Sonatel",
        role: "性能支持 & 项目助理",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
        profiles: ['software', 'network'],
        description: [
          "KPI性能监控, 报告和生产发布协调.",
          "运营安全: 检查清单, 定期控制, 合规性."
        ],
        profileDescriptions: {
          software: [
            "协调生产发布和性能指标监控。",
            "技术报告和应用指标分析。",
            "监控任务自动化（脚本、仪表板）。"
          ],
          network: [
            "网络性能KPI监控、报告和生产发布协调。",
            "运营安全：检查清单、定期控制、合规性。",
            "二级技术支持和网络故障管理。"
          ]
        }
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
        title: "SAP应用 – 非洲石油公司",
        description: "内部管理Web应用（库存、人力资源、财务）。已在SAP投入生产使用。",
        tags: ["Laravel", "React", "MySQL"],
        image: "/assets/projets/sap-demo.gif"
      },
      {
        title: "Cynoia Spaces",
        description: "协作空间管理SaaS. 微服务架构 (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/cynoia-spaces.gif"
      },
      {
        title: "Momentum",
        description: "实时互动问答平台，即时排行榜。适用于课程、活动和团队建设。",
        tags: ["React", "实时", "问答", "教育"],
        link: "https://momentum.artist-dev.com/",
        image: "/assets/projets/momentum-demo.gif"
      },
      {
        title: "Les chats sont mignons",
        description: "面向L1学生的HTML/CSS教学项目：语义结构、Grid布局、动画和响应式设计。",
        tags: ["HTML", "CSS", "教学", "响应式"],
        github: "https://github.com/Maximus203/Les-chats-sont-mignons",
        image: "/assets/projets/les-chats-sont-mignons.png"
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
      bioShort: "デジタル化推進の専門家 & フルスタック開発/講師。カスタムデジタルソリューションを構築し、次世代の開発者を育成します。",
      bio: "Web開発と知識共有に情熱を注いでおり、確かな技術力 (Laravel, React, DevOps, Supabase) と実績のある教育法を組み合わせています。私の手法は、実際のプロジェクト、コード品質、自律性に基づいています。",
    },
    experience: [
      {
        company: "TérangaDev",
        role: "プロジェクトマネージャー",
        period: "2026 - 現在",
        logo: "/assets/entreprises/teranga-dev.webp",
        profiles: ['software', 'teaching'],
        description: [
          "コミュニティネットワーキングプラットフォーム「Ndougalma」の設計・開発。",
          "プロジェクト管理：仕様定義、スプリント管理、チームコーディネーション。",
          "TérangaDevコミュニティメンバーへの技術指導。"
        ],
        profileDescriptions: {
          software: [
            "Ndougalmaの設計・開発 (Firebase, Flutter, React)。",
            "技術アーキテクチャ：REST API、認証、CI/CDデプロイ。",
            "プロジェクト管理：仕様定義、スプリント管理。"
          ],
          teaching: [
            "TérangaDevコミュニティメンバーへの技術指導。",
            "ワークショップの開催と開発ベストプラクティスの共有。",
            "オープンソースへの貢献とプロジェクトドキュメント作成。"
          ]
        }
      },
      {
        company: "ESTM",
        role: "PHP & MySQL 講師",
        period: "2026年3月 - 4月",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "PHP & MySQL（学士1年 通信ネットワーク & ソフトウェア工学）。",
          "基礎からMVCアーキテクチャによる完全CRUDへの段階的学習。",
          "実践的な評価と授業内コードレビュー。"
        ]
      },
      {
        company: "ESTM",
        role: "Web講師 (HTML/CSS/JS)",
        period: "2025年12月 - 2026年3月",
        logo: "/assets/entreprises/estm.svg",
        profiles: ['teaching'],
        description: [
          "HTML5 & CSS3 — 通信ネットワーク(RT)・ソフトウェア工学(GL)学士課程。",
          "JavaScript ES6+、DOM、動的インタラクション。",
          "卒業制作指導, コードレビュー, 継続的な評価."
        ]
      },
      {
        company: "ISM",
        role: "講師",
        period: "2025年11月 - 2026年1月",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LOGO-ISM-SENEGAL-WIKI.jpg",
        profiles: ['teaching'],
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
        profiles: ['teaching'],
        description: [
          "動的Web開発: PHP/MySQL および JavaScript (DOM).",
          "Java: 基本構文, オブジェクト指向プログラミング.",
          "教育法: 基礎から完全なCRUDへの進歩, セキュリティ意識.",
        ]
      },
      {
        company: "FIDECA",
        role: "フルスタックエンジニア & ITマネージャー",
        period: "2024 - 2026",
        logo: "/assets/entreprises/fideca.png",
        profiles: ['software', 'network', 'teaching'],
        description: [
          "財務諸表作成ソフトウェア設計 (FastAPI, React, Tauri). 時間短縮: 6時間 -> 35分.",
          "IT管理: ネットワーク, バックアップ, アクセス管理.",
          "連結のためのビジネスルールと自動制御.",
        ],
        profileDescriptions: {
          software: [
            "財務諸表作成ソフトウェア設計 (FastAPI, React, Tauri)。時間短縮：6時間→35分。",
            "業務自動化ツールの開発（Pythonスクリプト、Reactダッシュボード、REST API）。",
            "情報システムのアーキテクチャとモデリング。"
          ],
          network: [
            "ITインフラ管理：ネットワーク、バックアップ、アクセス制御。",
            "Linux/Windowsサーバー管理と予防的メンテナンス。",
            "インフラセキュリティとコンプライアンス監査。"
          ],
          teaching: [
            "新しいデジタルツールとプロセスについての社内チームのコーチング。",
            "会計連結のためのビジネスルールと自動制御。",
            "手順書と社内技術ドキュメントの作成。"
          ]
        }
      },
      {
        company: "Orange - Sonatel",
        role: "パフォーマンスサポート & プロジェクトアシスタント",
        period: "2021 - 2024",
        logo: "/assets/entreprises/Orange-sonatel.jpeg",
        profiles: ['software', 'network'],
        description: [
          "KPIパフォーマンス監視, レポート作成および本番リリースの調整.",
          "運用セキュリティ: チェックリスト, 定期的な管理, コンプライアンス."
        ],
        profileDescriptions: {
          software: [
            "本番リリースの調整とパフォーマンス指標の監視。",
            "技術レポートとアプリケーションメトリクスの分析。",
            "監視タスクの自動化（スクリプト、ダッシュボード）。"
          ],
          network: [
            "ネットワークパフォーマンスKPI監視、レポート作成および本番リリース調整。",
            "運用セキュリティ：チェックリスト、定期的な管理、コンプライアンス。",
            "レベル2テクニカルサポートとネットワーク障害管理。"
          ]
        }
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
        title: "SAPアプリ – Société Africaine de Pétrole",
        description: "社内管理Webアプリ（在庫・人事・財務）。SAP社で本番稼働中。",
        tags: ["Laravel", "React", "MySQL"],
        image: "/assets/projets/sap-demo.gif"
      },
      {
        title: "Cynoia Spaces",
        description: "コラボレーションスペース管理SaaS. マイクロサービスアーキテクチャ (Spring Boot, Gateway).",
        tags: ["Spring Boot", "Microservices", "SaaS"],
        image: "/assets/projets/cynoia-spaces.gif"
      },
      {
        title: "Momentum",
        description: "リアルタイムインタラクティブクイズプラットフォーム。即時ランキング表示。授業、イベント、チームビルディングに最適。",
        tags: ["React", "リアルタイム", "クイズ", "教育"],
        link: "https://momentum.artist-dev.com/",
        image: "/assets/projets/momentum-demo.gif"
      },
      {
        title: "Les chats sont mignons",
        description: "L1学生向けHTML/CSS教育プロジェクト：セマンティック構造、Grid、アニメーション、レスポンシブデザイン。",
        tags: ["HTML", "CSS", "教育", "レスポンシブ"],
        github: "https://github.com/Maximus203/Les-chats-sont-mignons",
        image: "/assets/projets/les-chats-sont-mignons.png"
      }
    ],
    skills: getSkills('ja'),
    gallery: SHARED_GALLERY
  }
};
