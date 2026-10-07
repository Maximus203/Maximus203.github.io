import type { Metadata } from 'next';
import { ApplicationFrame } from '@/components/applications/application-frame';
import { TicTacToe } from '@/components/applications/tictactoe';
import { getApplicationCopy } from '@/lib/applications/catalog';
import { isLocale, languageAlternates, localePath } from '@/lib/i18n';
type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const copy = getApplicationCopy(locale).apps['tic-tac-toe']; const path = '/applications/tic-tac-toe'; return { title: `${copy.name} — Cherif Diouf`, description: copy.description, alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) } }; }
export default async function ApplicationPage({ params }: Params) { const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; return <ApplicationFrame locale={locale} id="tic-tac-toe"><TicTacToe locale={locale} /></ApplicationFrame>; }
