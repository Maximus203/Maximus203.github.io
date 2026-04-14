'use client';

import AdUnit from './AdUnit';

export default function AdSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-3 relative">
      <div className="sticky top-24 space-y-6 pl-4">
        <AdUnit slot="SLOT_ID_1" format="rectangle" />
        <AdUnit slot="SLOT_ID_2" format="rectangle" />
      </div>
    </aside>
  );
}
