import type { Language } from '@/types';
import { UI_LABELS } from '@/lib/constants/ui-labels';
import { RESUME_DATA } from '@/lib/constants/resume-data';

export const SUPPORTED_LANGUAGES: Language[] = ['fr', 'en', 'zh', 'ja'];

export function isValidLang(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

export function getLabels(lang: Language) {
  return UI_LABELS[lang];
}

export function getResumeData(lang: Language) {
  return RESUME_DATA[lang];
}
