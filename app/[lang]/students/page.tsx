import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro } from '@/components/page-intro';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';

type Params = { params: Promise<{ lang: string }> };

const students = [
  { name: 'Mouhamed Gaye', url: 'https://mouhamedgaye.github.io/Mon-portefolio/', image: assetUrl('/media/students/mouhamed-gaye.jpg') },
  { name: 'El Hadji Ismael Diallo', url: 'https://elijahdev.me/', image: assetUrl('/media/students/ismael-diallo.png') },
  { name: 'Mamadou Dieye', url: 'https://mamado886.github.io/Mamadou-Dieye/', image: assetUrl('/media/students/mamadou-dieye.jpg') },
  { name: 'Fatou Kine Dione', url: 'https://kine54.github.io/Mon-portofolio/', image: assetUrl('/media/students/fatou-kine-dione.jpg') },
  { name: 'Adja Abibatou Diop', url: 'https://adjaabibatoudiop-bit.github.io/Abibatou-Portfolio/', image: assetUrl('/media/students/adja-abibatou-diop.jpg') },
];

const pageCopy: Record<Locale, { kicker: string; title: string; text: string; count: string; highlight: string; visit: string; source: string }> = {
  fr: { kicker: 'Transmission / réalisations', title: 'Réalisations de mes étudiants.', text: 'Portfolios réalisés par mes étudiants durant leur formation.', count: '5 portfolios mis en avant', highlight: 'Créés pendant leur parcours de formation', visit: 'Visiter le portfolio', source: 'Sélection issue de la page Étudiants officielle.' },
  en: { kicker: 'Teaching / achievements', title: 'Student achievements.', text: 'Portfolios built by my students during their training.', count: '5 featured portfolios', highlight: 'Built during their training journey', visit: 'Visit portfolio', source: 'Selection from the official Students page.' },
  zh: { kicker: '教学 / 成果', title: '学生作品。', text: '我的学生在培训期间制作的作品集。', count: '5 个精选作品集', highlight: '在培训过程中创建', visit: '访问作品集', source: '内容来自官方学生页面。' },
  ja: { kicker: '教育 / 実績', title: '学生の実績。', text: 'トレーニング中に学生が制作したポートフォリオ。', count: '5 件の注目ポートフォリオ', highlight: 'トレーニング中に制作', visit: 'ポートフォリオを見る', source: '公式の学生ページに掲載された選択です。' },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'fr';
  const [title, description] = getDictionary(locale).seo.students;
  return { title, description, alternates: { canonical: localePath(locale, '/students'), languages: languageAlternates('/students') }, openGraph: { title, description, url: localePath(locale, '/students'), images: [assetUrl('/media/students/mouhamed-gaye.jpg')] } };
}

export default async function StudentsPage({ params }: Params) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'fr';
  const copy = pageCopy[locale];

  return (
    <div className="content-page students-page">
      <PageIntro index="01" kicker={copy.kicker} title={copy.title} text={copy.text} />
      <section className="students-showcase" aria-labelledby="student-count">
        <div className="students-proof">
          <span aria-hidden="true">↗</span>
          <div><strong id="student-count">{copy.count}</strong><small>{copy.highlight}</small></div>
          <p>{copy.source}</p>
        </div>
        <div className="student-portfolio-grid">
          {students.map((student, index) => (
            <a className="student-portfolio-card" href={student.url} target="_blank" rel="noreferrer" key={student.name}>
              <div className="student-portrait">
                <Image src={student.image} alt={`Portrait — ${student.name}`} fill sizes="(max-width: 720px) 100vw, 40vw" />
                <span aria-hidden="true">0{index + 1}</span>
              </div>
              <div className="student-card-copy">
                <span>{copy.visit}</span>
                <h2>{student.name}</h2>
                <p>{student.url.replace('https://', '').replace(/\/$/, '')}</p>
                <i aria-hidden="true">↗</i>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
