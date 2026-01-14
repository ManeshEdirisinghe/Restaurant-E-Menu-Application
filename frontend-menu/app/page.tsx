'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen bg-brand-beige">
      <Hero search={search} onSearch={setSearch} />
      
      {/* Debug: Show search value */}
      {search && (
        <div className="p-4 text-center">
          <p className="text-brand-red">Searching for: <strong>{search}</strong></p>
        </div>
      )}
    </main>
  );
}
