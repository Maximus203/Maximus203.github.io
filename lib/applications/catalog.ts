import type { Locale } from '@/lib/i18n';

export const applicationIds = ['file-converter', 'meme-generator', 'readme-generator', 'tic-tac-toe'] as const;
export type ApplicationId = typeof applicationIds[number];
export type ApplicationCategory = 'all' | 'files' | 'creative' | 'developer' | 'games';

export const applicationCopy = {
  fr: {
    title: 'Des applications pour passer à l’action.', subtitle: 'Convertir, créer, documenter, jouer. Quatre espaces de travail complets, directement dans votre navigateur.',
    eyebrow: 'Applications / La boîte à outils', label: 'Applications', search: 'Rechercher une application', searchHint: 'Image, PDF, mème, GitHub…',
    categories: { all: 'Tout explorer', files: 'Fichiers & données', creative: 'Création', developer: 'Développement', games: 'Jeux' },
    local: 'Traitement local', free: 'Sans compte', open: 'Ouvrir l’application', back: 'Toutes les applications', noResults: 'Aucune application pour cette recherche.', reset: 'Effacer les filtres',
    privacy: 'Vos fichiers restent sur votre appareil. Le générateur README n’active les images de services tiers que si vous le choisissez.',
    capabilities: 'Des capacités précises, des fichiers réels.', support: 'Formats pris en charge', available: 'Disponible', unsupported: 'Non pris en charge ici',
    limit: 'Pas de conversion audio/vidéo ni d’import Word/Excel/PDF vers un document éditable. Google Docs est un service, pas un format de fichier. Aucun envoi vers un convertisseur externe.',
    apps: {
      'file-converter': { name: 'Convertisseur de fichiers', description: 'Images en lot, réglage de qualité, export ZIP ou PDF. Conversion de données CSV et JSON.', category: 'files', tags: ['JPEG · PNG · WebP', 'PDF', 'CSV ↔ JSON'] },
      'meme-generator': { name: 'Studio de mèmes', description: 'Votre image, votre texte, votre style. Ajustez les couleurs et téléchargez un vrai PNG.', category: 'creative', tags: ['Image locale', 'Texte & couleurs', 'Export PNG'] },
      'readme-generator': { name: 'README Studio', description: 'Un profil GitHub à votre image : compétences, badges, statistiques et animation snake.', category: 'developer', tags: ['Markdown', 'Badges & trophées', 'Workflow snake'] },
      'tic-tac-toe': { name: 'TicTacToe', description: 'Jouez localement contre une IA imbattable, sans compte ni connexion.', category: 'games', tags: ['Jeu local', 'IA minimax', 'Sans réseau'] },
    },
  },
  en: {
    title: 'Applications that get things done.', subtitle: 'Convert, create, document, play. Four complete workspaces, right in your browser.',
    eyebrow: 'Applications / The toolkit', label: 'Applications', search: 'Search applications', searchHint: 'Image, PDF, meme, GitHub…',
    categories: { all: 'Explore all', files: 'Files & data', creative: 'Creative', developer: 'Development', games: 'Games' },
    local: 'Local processing', free: 'No account', open: 'Open application', back: 'All applications', noResults: 'No applications match this search.', reset: 'Clear filters',
    privacy: 'Your files stay on your device. The README builder only enables third-party service images when you choose to.',
    capabilities: 'Clear capabilities. Real files.', support: 'Supported formats', available: 'Available', unsupported: 'Not supported here',
    limit: 'No audio/video conversion or Word/Excel/PDF import to editable documents. Google Docs is a service, not a file format. Nothing is sent to an external converter.',
    apps: {
      'file-converter': { name: 'File Converter', description: 'Batch images, quality controls, ZIP or PDF export. Convert CSV and JSON data.', category: 'files', tags: ['JPEG · PNG · WebP', 'PDF', 'CSV ↔ JSON'] },
      'meme-generator': { name: 'Meme Studio', description: 'Your image, your words, your style. Adjust colors and download a real PNG.', category: 'creative', tags: ['Local images', 'Text & colors', 'PNG export'] },
      'readme-generator': { name: 'README Studio', description: 'Build your GitHub profile with skills, badges, statistics and a snake animation.', category: 'developer', tags: ['Markdown', 'Badges & trophies', 'Snake workflow'] },
      'tic-tac-toe': { name: 'TicTacToe', description: 'Play locally against an unbeatable AI, with no account or connection.', category: 'games', tags: ['Local game', 'Minimax AI', 'Offline'] },
    },
  },
  zh: {
    title: '让想法成为成果的应用。', subtitle: '转换、创作、编写文档、游戏。四个完整工作区，直接在浏览器中使用。',
    eyebrow: '应用 / 工具箱', label: '应用', search: '搜索应用', searchHint: '图片、PDF、表情包、GitHub…',
    categories: { all: '全部应用', files: '文件与数据', creative: '创作', developer: '开发', games: '游戏' },
    local: '本地处理', free: '无需账号', open: '打开应用', back: '所有应用', noResults: '没有符合搜索条件的应用。', reset: '清除筛选',
    privacy: '文件保留在您的设备上。只有您选择启用后，README 生成器才会加载第三方服务的图片。',
    capabilities: '明确的能力，真实的文件。', support: '支持的格式', available: '可用', unsupported: '此处不支持',
    limit: '不支持音视频转换，也不支持将 Word、Excel 或 PDF 导入为可编辑文档。Google Docs 是服务，而非文件格式。文件不会发送到外部转换服务。',
    apps: {
      'file-converter': { name: '文件转换器', description: '批量图片、质量设置、ZIP 或 PDF 导出。转换 CSV 和 JSON 数据。', category: 'files', tags: ['JPEG · PNG · WebP', 'PDF', 'CSV ↔ JSON'] },
      'meme-generator': { name: '表情包工作室', description: '选择图片、文字和风格。调整颜色并下载真正的 PNG 文件。', category: 'creative', tags: ['本地图片', '文字与颜色', 'PNG 导出'] },
      'readme-generator': { name: 'README 工作室', description: '通过技能、徽章、统计和贪吃蛇动画，打造自己的 GitHub 个人主页。', category: 'developer', tags: ['Markdown', '徽章与奖杯', '贪吃蛇工作流'] },
      'tic-tac-toe': { name: '井字棋', description: '无需账号或联网，在本地挑战不会输的 AI。', category: 'games', tags: ['本地游戏', 'Minimax AI', '无需联网'] },
    },
  },
  ja: {
    title: 'アイデアを形にするアプリ。', subtitle: '変換、制作、ドキュメント作成、ゲーム。ブラウザで使える4つの作業スペース。',
    eyebrow: 'アプリ / ツールキット', label: 'アプリ', search: 'アプリを検索', searchHint: '画像、PDF、ミーム、GitHub…',
    categories: { all: 'すべて', files: 'ファイルとデータ', creative: '制作', developer: '開発', games: 'ゲーム' },
    local: 'ローカル処理', free: 'アカウント不要', open: 'アプリを開く', back: 'すべてのアプリ', noResults: '検索条件に一致するアプリがありません。', reset: '絞り込みを解除',
    privacy: 'ファイルは端末内に保持されます。README の外部サービス画像は、自分で有効にした場合のみ読み込まれます。',
    capabilities: '明確な機能。実際に使えるファイル。', support: '対応形式', available: '利用可能', unsupported: 'ここでは非対応',
    limit: '音声・動画の変換や、Word・Excel・PDF から編集可能な文書への変換には対応していません。Google Docs はサービスであり、ファイル形式ではありません。外部変換サービスには送信しません。',
    apps: {
      'file-converter': { name: 'ファイル変換', description: '画像の一括変換、品質調整、ZIP・PDF 出力。CSV と JSON データを変換。', category: 'files', tags: ['JPEG · PNG · WebP', 'PDF', 'CSV ↔ JSON'] },
      'meme-generator': { name: 'ミームスタジオ', description: '画像と文字を自由に組み合わせ、色を調整して PNG をダウンロード。', category: 'creative', tags: ['ローカル画像', '文字と色', 'PNG 出力'] },
      'readme-generator': { name: 'README スタジオ', description: 'スキル、バッジ、統計、スネークアニメーションで GitHub プロフィールを作成。', category: 'developer', tags: ['Markdown', 'バッジとトロフィー', 'スネークワークフロー'] },
      'tic-tac-toe': { name: '三目並べ', description: 'アカウントも接続も不要。負けない AI とローカルで対戦。', category: 'games', tags: ['ローカルゲーム', 'Minimax AI', 'オフライン'] },
    },
  },
} as const;

export function getApplicationCopy(locale: Locale) { return applicationCopy[locale]; }
