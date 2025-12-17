import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowLeft, Github, Palette, Type, Code, Eye, Layers, Terminal, Settings, User, Trophy, Activity, Users, AlignLeft, AlignCenter, AlignRight, LayoutGrid, Tag } from 'lucide-react';

interface ReadmeGeneratorProps {
  onBack: () => void;
}

const THEMES = [
  'default', 'dark', 'radical', 'merko', 'gruvbox', 'tokyonight', 
  'onedark', 'cobalt', 'synthwave', 'highcontrast', 'dracula', 'prussian', 
  'monokai', 'vue', 'buefy', 'blue-green', 'algolia', 'great-gatsby', 
  'darcula', 'bear', 'solarized-dark', 'solarized-light', 'chartreuse-dark'
];

const FONTS = [
  'inter', 'calico', 'sedgwick', 'gotham', 'jost', 'juliamono', 
  'lexend', 'noto', 'pop', 'roboto'
];

// Mapping for SkillIcons.dev
const SKILL_ICONS_MAP: Record<string, string> = {
  'JavaScript': 'js', 'TypeScript': 'ts', 'Python': 'python', 'PHP': 'php', 'Java': 'java', 'C++': 'cpp', 'Go': 'go', 'Rust': 'rust', 'Swift': 'swift',
  'React': 'react', 'Vue': 'vue', 'Angular': 'angular', 'Svelte': 'svelte', 'Next.js': 'nextjs', 'Tailwind': 'tailwind', 'Bootstrap': 'bootstrap', 'HTML5': 'html', 'CSS3': 'css',
  'Node.js': 'nodejs', 'Laravel': 'laravel', 'Symfony': 'symfony', 'Django': 'django', 'Spring': 'spring', 'Express': 'express', 'NestJS': 'nestjs',
  'Flutter': 'flutter', 'React Native': 'react', 'Android': 'android', 'iOS': 'apple',
  'MySQL': 'mysql', 'PostgreSQL': 'postgres', 'MongoDB': 'mongodb', 'Redis': 'redis', 'SQLite': 'sqlite',
  'Docker': 'docker', 'Kubernetes': 'kubernetes', 'AWS': 'aws', 'Azure': 'azure', 'Google Cloud': 'gcp', 'GitHub Actions': 'githubactions', 'Linux': 'linux',
  'Git': 'git', 'Figma': 'figma', 'Postman': 'postman', 'VS Code': 'vscode'
};

const SKILL_CATEGORIES = {
  Languages: [
    { name: 'JavaScript', badge: 'JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
    { name: 'TypeScript', badge: 'TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
    { name: 'Python', badge: 'Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
    { name: 'PHP', badge: 'PHP-777BB4?style=for-the-badge&logo=php&logoColor=white' },
    { name: 'Java', badge: 'Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white' },
    { name: 'C++', badge: 'C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white' },
    { name: 'Go', badge: 'Go-00ADD8?style=for-the-badge&logo=go&logoColor=white' },
    { name: 'Rust', badge: 'Rust-000000?style=for-the-badge&logo=rust&logoColor=white' },
    { name: 'Swift', badge: 'Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white' },
  ],
  Frontend: [
    { name: 'React', badge: 'React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
    { name: 'Vue', badge: 'Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D' },
    { name: 'Angular', badge: 'Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white' },
    { name: 'Svelte', badge: 'Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00' },
    { name: 'Next.js', badge: 'Next-black?style=for-the-badge&logo=next.js&logoColor=white' },
    { name: 'Tailwind', badge: 'Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' },
    { name: 'Bootstrap', badge: 'Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white' },
    { name: 'HTML5', badge: 'HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' },
    { name: 'CSS3', badge: 'CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' },
  ],
  Backend: [
    { name: 'Node.js', badge: 'Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' },
    { name: 'Laravel', badge: 'Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white' },
    { name: 'Symfony', badge: 'Symfony-000000?style=for-the-badge&logo=symfony&logoColor=white' },
    { name: 'Django', badge: 'Django-092E20?style=for-the-badge&logo=django&logoColor=white' },
    { name: 'Spring', badge: 'Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white' },
    { name: 'Express', badge: 'Express.js-404D59?style=for-the-badge' },
    { name: 'NestJS', badge: 'NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white' },
  ],
  Mobile: [
    { name: 'Flutter', badge: 'Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white' },
    { name: 'React Native', badge: 'React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
    { name: 'Android', badge: 'Android-3DDC84?style=for-the-badge&logo=android&logoColor=white' },
    { name: 'iOS', badge: 'iOS-000000?style=for-the-badge&logo=ios&logoColor=white' },
  ],
  Database: [
    { name: 'MySQL', badge: 'MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white' },
    { name: 'PostgreSQL', badge: 'PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' },
    { name: 'MongoDB', badge: 'MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' },
    { name: 'Redis', badge: 'Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white' },
    { name: 'SQLite', badge: 'SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white' },
  ],
  DevOps: [
    { name: 'Docker', badge: 'Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white' },
    { name: 'Kubernetes', badge: 'Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white' },
    { name: 'AWS', badge: 'AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white' },
    { name: 'Azure', badge: 'Azure-007FFF?style=for-the-badge&logo=microsoft-azure&logoColor=white' },
    { name: 'Google Cloud', badge: 'Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white' },
    { name: 'GitHub Actions', badge: 'GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white' },
    { name: 'Linux', badge: 'Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black' },
  ],
  Tools: [
    { name: 'Git', badge: 'Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
    { name: 'Figma', badge: 'Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white' },
    { name: 'Postman', badge: 'Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' },
    { name: 'VS Code', badge: 'VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white' },
  ]
};

const ReadmeGenerator: React.FC<ReadmeGeneratorProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'stats'>('profile');
  const [outputTab, setOutputTab] = useState<'markdown' | 'workflow'>('markdown');
  
  const [formData, setFormData] = useState({
    username: 'Maximus203',
    theme: 'radical',
    font: 'inter',
    alignment: 'center' as 'left' | 'center' | 'right',
    skillStyle: 'badges' as 'badges' | 'icons',
    
    // Profile
    title: 'Hi there 👋',
    subtitle: "I'm a passionate developer!",
    about: 'I’m currently working on open source projects and learning new technologies.',
    avatarUrl: 'https://cherif-diouf.artist-dev.com/assets/photo.webp',
    
    // Links
    portfolioUrl: 'https://cherif-diouf.artist-dev.com/',
    linkedinUrl: 'https://www.linkedin.com/in/cherif-diouf-59747b17b/',
    cvUrl: 'https://github.com/Maximus203/Maximus203/blob/main/cv.pdf',

    // Typing SVG Config
    typingLines: 'Cherif Diouf;Artist-Dev;Full Stack Developer;Code => Art;<dev />',
    
    // Stats & Addons
    showStats: true,
    showStreaks: true,
    showTopLangs: true,
    showSnake: false,
    showTrophies: false,
    showVisitors: false,
    showActivity: false,
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'Laravel', 'TypeScript', 'Tailwind', 'Docker', 'Git']);
  const [markdown, setMarkdown] = useState('');
  const [workflowCode, setWorkflowCode] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleSkill = (skillName: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName) 
        : [...prev, skillName]
    );
  };

  const getStatsUrls = () => {
    const user = formData.username || 'your-username';
    return {
       stats: `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${formData.theme}&font=${formData.font}`,
       streaks: `https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${formData.theme}&font=${formData.font}`,
       langs: `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=${formData.theme}&font=${formData.font}`,
       typing: `https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=28&pause=1000&color=36BCF7&center=true&vCenter=true&width=500&lines=${encodeURIComponent(formData.typingLines)}`,
       trophies: `https://github-profile-trophy.vercel.app/?username=${user}&theme=${formData.theme}&column=7`,
       visitors: `https://visitor-badge.laobi.icu/badge?page_id=${user}.${user}`,
       activity: `https://github-readme-activity-graph.vercel.app/graph?username=${user}&theme=${formData.theme}`
    };
  };

  const generateSnakeWorkflow = () => {
    return `name: Generate Snake

on:
  # run automatically every 6 hours
  schedule:
    - cron: "0 */6 * * *" 
  
  # allows to manually run the job at any time
  workflow_dispatch:
  
  # run on every push on the master branch
  push:
    branches:
    - master
    - main

jobs:
  generate:
    permissions: 
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${formData.username}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          
      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/gh-action-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
  };

  const generateMarkdown = () => {
    const urls = getStatsUrls();
    
    // OPEN ALIGNMENT
    let md = `<div align="${formData.alignment}">\n`;
    
    // 1. Image Profil & Header
    if (formData.avatarUrl) {
      md += `  <img src="${formData.avatarUrl}" alt="Profile" width="150" height="150" style="border-radius: 50%;" />\n  <br/>\n`;
    }

    // 2. Typing SVG
    md += `  <!-- EN-TÊTE ANIMÉ -->\n`;
    md += `  <a href="${formData.portfolioUrl}">\n`;
    md += `    <img src="${urls.typing}" alt="Typing SVG" />\n`;
    md += `  </a>\n\n  <br/>\n\n`;

    // 3. Visitors Badge (Optional)
    if (formData.showVisitors) {
        md += `  <img src="${urls.visitors}" alt="visitors" />\n  <br/>\n\n`;
    }

    // 4. Liens Rapides (Socials)
    md += `  <!-- LIENS RAPIDES -->\n`;
    if (formData.portfolioUrl) {
        md += `  <a href="${formData.portfolioUrl}">\n    <img src="https://img.shields.io/badge/Portfolio-Voir_le_site-2ea44f?style=for-the-badge&logo=google-chrome&logoColor=white" />\n  </a>\n`;
    }
    if (formData.linkedinUrl) {
        md += `  <a href="${formData.linkedinUrl}">\n    <img src="https://img.shields.io/badge/LinkedIn-Connexion-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />\n  </a>\n`;
    }
    if (formData.cvUrl) {
        md += `  <a href="${formData.cvUrl}">\n    <img src="https://img.shields.io/badge/CV-Télécharger-E34F26?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white" />\n  </a>\n`;
    }

    // 5. Bio
    md += `\n\n  ### ${formData.title}\n`;
    md += `  **${formData.subtitle}**\n\n`;
    if (formData.about) {
      md += `  🔭 ${formData.about}\n\n`;
    }

    // 6. Trophies
    if (formData.showTrophies) {
      md += `  ### 🏆 Trophies\n`;
      md += `  <a href="https://github.com/ryo-ma/github-profile-trophy">\n`;
      md += `    <img src="${urls.trophies}" alt="trophy" />\n`;
      md += `  </a>\n\n`;
    }

    // 7. Skills
    if (selectedSkills.length > 0) {
        md += `  <!-- STACK TECHNIQUE -->\n`;
        md += `  <h3 style="font-family: 'Fira Code', monospace;">🛠 Mon arsenal technique</h3>\n`;
        
        if (formData.skillStyle === 'badges') {
            const allSkills = Object.values(SKILL_CATEGORIES).flat();
            const skillsBadges = selectedSkills.map(s => {
                const skill = allSkills.find(k => k.name === s);
                if (!skill) return '';
                return `  ![${s}](https://img.shields.io/badge/${skill.badge})`;
            }).filter(Boolean).join('\n');
            md += `${skillsBadges}\n\n`;
        } else {
            // Icons Style (SkillIcons.dev)
            // Group by chunks to avoid too long URLs or single line
            const mappedSkills = selectedSkills
                .map(s => SKILL_ICONS_MAP[s])
                .filter(Boolean);
            
            const chunkSize = 12;
            for (let i = 0; i < mappedSkills.length; i += chunkSize) {
                const chunk = mappedSkills.slice(i, i + chunkSize);
                md += `  <img src="https://skillicons.dev/icons?i=${chunk.join(',')}" />\n  <br/>\n`;
            }
            md += `\n`;
        }
    }

    // 8. Stats Graphs
    md += `  ### 📊 GitHub Stats\n`;
    
    if (formData.showStats) {
      md += `  <img src="${urls.stats}" height="180" alt="stats graph" />\n`;
    }
    if (formData.showStreaks) {
      md += `  <img src="${urls.streaks}" height="180" alt="streak graph" />\n`;
    }
    
    md += `\n`;
    
    if (formData.showTopLangs) {
       md += `  <img src="${urls.langs}" height="180" alt="top languages" />\n`;
    }
    md += `\n`;

    // 9. Activity Graph
    if (formData.showActivity) {
       md += `  <br/>\n  <img src="${urls.activity}" alt="activity graph" />\n`;
    }

    // 10. Snake
    if (formData.showSnake) {
        md += `\n  <!-- Snake Animation -->\n`;
        md += `  <br/>\n`;
        md += `  <img src="https://github.com/${formData.username}/${formData.username}/blob/output/github-contribution-grid-snake.svg" alt="snake animation" />\n`;
    }

    // CLOSE ALIGNMENT
    md += `\n</div>`;

    setMarkdown(md);
    setWorkflowCode(generateSnakeWorkflow());
  };

  useEffect(() => {
    generateMarkdown();
  }, [formData, selectedSkills]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statsUrls = getStatsUrls();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-7xl mx-auto w-full min-h-screen pb-24"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Retour aux outils</span>
      </button>

      {/* TOP: LIVE PREVIEW */}
      <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 mb-8 shadow-sm">
         <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-8 flex justify-between items-center">
             <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Eye size={20} />
                <span className="font-semibold">Aperçu en direct</span>
             </div>
             <div className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">
                Pseudo: {formData.username || '...'}
             </div>
         </div>
         
         {/* Rendered Preview Container */}
         <div 
            className="flex flex-col space-y-6 max-w-4xl mx-auto"
            style={{ 
                alignItems: formData.alignment === 'center' ? 'center' : formData.alignment === 'right' ? 'flex-end' : 'flex-start',
                textAlign: formData.alignment 
            }}
         >
             
             {/* Profile Image */}
             {formData.avatarUrl && (
                 <img src={formData.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-800" />
             )}

             {/* Typing SVG */}
             <a href={formData.portfolioUrl} target="_blank" rel="noreferrer">
                 <img src={statsUrls.typing} alt="Typing SVG" />
             </a>

             {/* Visitors */}
             {formData.showVisitors && (
                 <img src={statsUrls.visitors} alt="Visitors" />
             )}

             {/* Social Links */}
             <div className={`flex flex-wrap gap-2 ${formData.alignment === 'center' ? 'justify-center' : formData.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                 {formData.portfolioUrl && <img src="https://img.shields.io/badge/Portfolio-Voir_le_site-2ea44f?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio" />}
                 {formData.linkedinUrl && <img src="https://img.shields.io/badge/LinkedIn-Connexion-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />}
                 {formData.cvUrl && <img src="https://img.shields.io/badge/CV-Télécharger-E34F26?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white" alt="CV" />}
             </div>

             <div className="space-y-2 mt-4">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{formData.title}</h1>
                 <h3 className="text-xl text-gray-600 dark:text-gray-300 font-medium">{formData.subtitle}</h3>
             </div>
             
             {formData.about && (
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">🔭 {formData.about}</p>
             )}

             {/* Trophies */}
             {formData.showTrophies && (
                 <div className="w-full">
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">🏆 Trophies</h3>
                     <img src={statsUrls.trophies} className="max-w-full" alt="Trophies" />
                 </div>
             )}

             {selectedSkills.length > 0 && (
                <div className="space-y-4 w-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono">🛠 Mon arsenal technique</h3>
                    <div className={`flex flex-wrap gap-2 ${formData.alignment === 'center' ? 'justify-center' : formData.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                        {formData.skillStyle === 'badges' ? (
                            selectedSkills.map(s => {
                                const skill = Object.values(SKILL_CATEGORIES).flat().find(k => k.name === s);
                                return skill ? <img key={s} src={`https://img.shields.io/badge/${skill.badge}`} alt={s} className="h-7" /> : null;
                            })
                        ) : (
                            // Icons Display
                            <img 
                                src={`https://skillicons.dev/icons?i=${selectedSkills.map(s => SKILL_ICONS_MAP[s]).filter(Boolean).join(',')}`} 
                                alt="Skills"
                            />
                        )}
                    </div>
                </div>
             )}

             {(formData.showStats || formData.showStreaks || formData.showTopLangs || formData.showActivity) && (
                 <div className="space-y-4 w-full pt-4">
                     <div className={`flex flex-wrap gap-4 items-center ${formData.alignment === 'center' ? 'justify-center' : formData.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                         {formData.showStats && <img src={statsUrls.stats} className="h-[160px] md:h-[180px] w-auto rounded-lg shadow-sm" alt="Stats" />}
                         {formData.showStreaks && <img src={statsUrls.streaks} className="h-[160px] md:h-[180px] w-auto rounded-lg shadow-sm" alt="Streaks" />}
                     </div>
                     {formData.showTopLangs && (
                         <div className={`flex mt-4 ${formData.alignment === 'center' ? 'justify-center' : formData.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                             <img src={statsUrls.langs} className="h-[160px] md:h-[180px] w-auto rounded-lg shadow-sm" alt="Langs" />
                         </div>
                     )}
                     {formData.showActivity && (
                         <div className={`flex mt-4 ${formData.alignment === 'center' ? 'justify-center' : formData.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                             <img src={statsUrls.activity} className="w-full max-w-3xl rounded-lg shadow-sm" alt="Activity" />
                         </div>
                     )}
                 </div>
             )}

             {formData.showSnake && (
                 <div className="pt-4 w-full">
                     <div className="text-sm text-gray-500 mb-2 font-mono">github-contribution-grid-snake.svg</div>
                     <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400 text-sm">
                         [Snake Animation Visualization]
                     </div>
                 </div>
             )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full relative">
        
        {/* Left Column: Configuration (Takes 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
            
            {/* Tabs Config */}
            <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
                <button onClick={() => setActiveTab('profile')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'profile' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>Profil</button>
                <button onClick={() => setActiveTab('skills')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'skills' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>Skills</button>
                <button onClick={() => setActiveTab('stats')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'stats' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>Stats</button>
            </div>

            {/* Content Profile */}
            {activeTab === 'profile' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold">
                            <User size={18} /> Identité
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">GitHub Username</label>
                            <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Avatar URL</label>
                            <input 
                                type="text" 
                                value={formData.avatarUrl}
                                onChange={(e) => setFormData({...formData, avatarUrl: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Titre (H1)</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Sous-titre</label>
                                <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">À propos</label>
                            <textarea value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm resize-none" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
                         <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold">
                            <Type size={18} /> Liens & Animation
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Texte Animé (séparé par ;)</label>
                            <input type="text" value={formData.typingLines} onChange={(e) => setFormData({...formData, typingLines: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Portfolio URL</label>
                            <input type="text" value={formData.portfolioUrl} onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">LinkedIn URL</label>
                            <input type="text" value={formData.linkedinUrl} onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm" />
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">CV / Resume URL</label>
                            <input type="text" value={formData.cvUrl} onChange={(e) => setFormData({...formData, cvUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm" />
                        </div>
                    </div>
                </div>
            )}

            {/* Content Skills */}
            {activeTab === 'skills' && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
                     {/* Style Selector */}
                     <div className="mb-6 bg-gray-50 dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Style d'affichage</label>
                        <div className="grid grid-cols-2 gap-2">
                           <button 
                              onClick={() => setFormData({...formData, skillStyle: 'badges'})}
                              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${formData.skillStyle === 'badges' ? 'bg-white dark:bg-slate-800 shadow text-indigo-600 dark:text-white border border-gray-200 dark:border-slate-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                           >
                              <Tag size={16} /> Badges
                           </button>
                           <button 
                              onClick={() => setFormData({...formData, skillStyle: 'icons'})}
                              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${formData.skillStyle === 'icons' ? 'bg-white dark:bg-slate-800 shadow text-indigo-600 dark:text-white border border-gray-200 dark:border-slate-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                           >
                              <LayoutGrid size={16} /> Icônes
                           </button>
                        </div>
                     </div>

                     <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                        {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                            <div key={category}>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                    <button
                                        key={skill.name}
                                        onClick={() => toggleSkill(skill.name)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                        selectedSkills.includes(skill.name)
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-indigo-300'
                                        }`}
                                    >
                                        {skill.name}
                                    </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            )}

            {/* Content Stats */}
            {activeTab === 'stats' && (
                 <div className="space-y-6">
                     <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400 font-bold">
                            <Palette size={18} /> Thème & Style
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Theme</label>
                                    <select value={formData.theme} onChange={(e) => setFormData({...formData, theme: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm">
                                        {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Police</label>
                                    <select value={formData.font} onChange={(e) => setFormData({...formData, font: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-sm">
                                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            {/* Alignment Selector */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Alignement</label>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setFormData({...formData, alignment: 'left'})}
                                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border transition-all ${formData.alignment === 'left' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700'}`}
                                    >
                                        <AlignLeft size={16} /> Gauche
                                    </button>
                                    <button 
                                        onClick={() => setFormData({...formData, alignment: 'center'})}
                                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border transition-all ${formData.alignment === 'center' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700'}`}
                                    >
                                        <AlignCenter size={16} /> Centre
                                    </button>
                                    <button 
                                        onClick={() => setFormData({...formData, alignment: 'right'})}
                                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border transition-all ${formData.alignment === 'right' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700'}`}
                                    >
                                        <AlignRight size={16} /> Droite
                                    </button>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400 font-bold">
                            <Settings size={18} /> Widgets
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 cursor-pointer hover:border-indigo-300 transition-colors">
                                <input type="checkbox" checked={formData.showStats} onChange={(e) => setFormData({...formData, showStats: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                <span className="text-sm font-medium">Afficher Statistiques Générales</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 cursor-pointer hover:border-indigo-300 transition-colors">
                                <input type="checkbox" checked={formData.showStreaks} onChange={(e) => setFormData({...formData, showStreaks: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                <span className="text-sm font-medium">Afficher Streaks (Jours consécutifs)</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 cursor-pointer hover:border-indigo-300 transition-colors">
                                <input type="checkbox" checked={formData.showTopLangs} onChange={(e) => setFormData({...formData, showTopLangs: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                <span className="text-sm font-medium">Afficher Top Langages</span>
                            </label>
                        </div>
                     </div>

                     <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400 font-bold">
                            <Layers size={18} /> Widgets Avancés
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 cursor-pointer hover:border-indigo-300 transition-colors">
                                <input type="checkbox" checked={formData.showTrophies} onChange={(e) => setFormData({...formData, showTrophies: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                <div className="flex items-center gap-2">
                                    <Trophy size={16} className="text-yellow-500" />
                                    <span className="text-sm font-medium">Trophées GitHub</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 cursor-pointer hover:border-indigo-300 transition-colors">
                                <input type="checkbox" checked={formData.showVisitors} onChange={(e) => setFormData({...formData, showVisitors: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-blue-500" />
                                    <span className="text-sm font-medium">Compteur de Visiteurs</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 cursor-pointer hover:border-indigo-300 transition-colors">
                                <input type="checkbox" checked={formData.showActivity} onChange={(e) => setFormData({...formData, showActivity: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-green-500" />
                                    <span className="text-sm font-medium">Graphique d'activité Complet</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 cursor-pointer hover:border-green-300 transition-colors">
                                <input type="checkbox" checked={formData.showSnake} onChange={(e) => setFormData({...formData, showSnake: e.target.checked})} className="rounded text-green-600 focus:ring-green-500 w-4 h-4" />
                                <div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Activer "Contribution Snake"</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Nécessite une GitHub Action (fournie à l'étape suivante)</p>
                                </div>
                            </label>
                        </div>
                     </div>
                 </div>
            )}
        </div>

        {/* Right Column: Output Code - STICKY & FIXED HEIGHT */}
        <div className="lg:col-span-7 sticky top-8 self-start">
           {formData.showSnake && (
               <div className="flex gap-2 mb-4">
                   <button 
                      onClick={() => setOutputTab('markdown')} 
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${outputTab === 'markdown' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-400'}`}
                   >
                       <Code size={16} /> readme.md
                   </button>
                   <button 
                      onClick={() => setOutputTab('workflow')} 
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${outputTab === 'workflow' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-400'}`}
                   >
                       <Terminal size={16} /> snake.yml
                       <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">Action requise</span>
                   </button>
               </div>
           )}

           {/* FIXED HEIGHT CONTAINER with SCROLL */}
           <div className="bg-[#0d1117] rounded-3xl p-6 border border-gray-800 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] min-h-[500px]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800 flex-shrink-0">
                 <div className="flex items-center gap-2 text-gray-400">
                    {outputTab === 'markdown' ? <Code size={18} /> : <Terminal size={18} />}
                    <span className="font-mono text-sm">{outputTab === 'markdown' ? 'readme.md (Source)' : '.github/workflows/snake.yml'}</span>
                 </div>
                 <button 
                   onClick={() => handleCopy(outputTab === 'markdown' ? markdown : workflowCode)}
                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                     copied 
                       ? 'bg-green-500/20 text-green-400' 
                       : 'bg-gray-800 text-white hover:bg-gray-700'
                   }`}
                 >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copié !' : 'Copier'}
                 </button>
              </div>
              
              {/* SCROLLABLE AREA */}
              <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-y-auto custom-scrollbar pr-2 flex-grow">
                 {outputTab === 'markdown' ? markdown : workflowCode}
              </pre>

              {outputTab === 'workflow' && (
                  <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-400 flex-shrink-0">
                      <p className="font-bold text-yellow-500 mb-1">⚠️ Installation du Snake :</p>
                      1. Créez un fichier <code>.github/workflows/snake.yml</code> dans votre repo.<br/>
                      2. Collez ce code dedans.<br/>
                      3. Attendez 6h ou lancez l'action manuellement depuis l'onglet "Actions" de GitHub.
                  </div>
              )}
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ReadmeGenerator;