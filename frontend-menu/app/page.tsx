'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import MenuCard from '@/components/MenuCard';
import Footer from '@/components/Footer';
import { getMenuItems } from '@/lib/api';
import { MenuItem } from '@/types';

export default function Home() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getMenuItems({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          q: searchQuery || undefined,
        });
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    fetchItems();
  }, [selectedCategory, searchQuery]);

  // Generate section title based on category
  const getSectionTitle = () => {
    if (selectedCategory === 'all') return 'Our Menu';
    return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  };

  return (
    <main className="min-h-screen bg-brand-beige">
      <Hero search={searchQuery} onSearch={setSearchQuery} />

      <CategoryFilter
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Menu Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 text-center">
          {getSectionTitle()}
        </h2>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No menu items found. Try a different search or category.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
