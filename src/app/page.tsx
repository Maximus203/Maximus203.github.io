'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language?.slice(0, 2);
    const supported = ['fr', 'en', 'zh', 'ja'];
    const lang = supported.includes(browserLang) ? browserLang : 'fr';
    router.replace(`/${lang}/`);
  }, [router]);

  return null;
}
