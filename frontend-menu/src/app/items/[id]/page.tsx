import { getMenuItemById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;

  let item;
  try {
    item = await getMenuItemById(id);
  } catch {
    notFound();
  }

  // Generate pepper emojis based on spicy level
  const renderSpicyLevel = (level: number) => {
    if (level === 0) return <span className="text-gray-500">Not spicy</span>;
    return (
      <span>
        {Array.from({ length: level }, (_, i) => (
          <span key={i}>🌶️</span>
        ))}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-brand-beige">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="text-brand-red hover:underline font-medium inline-flex items-center gap-2"
        >
          ← Back to Menu
        </Link>
      </div>

      {/* Split Screen Layout */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[300px] lg:h-[500px] object-cover rounded-2xl shadow-lg"
            />
            {item.popular && (
              <span className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </span>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            {/* Name */}
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {item.name}
            </h1>

            {/* Price */}
            <p className="text-3xl lg:text-4xl font-bold text-brand-red mb-6">
              ${item.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Spicy Level */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Spicy Level</p>
                <p className="text-lg">{renderSpicyLevel(item.spicyLevel)}</p>
              </div>

              {/* Preparation Time */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Prep Time</p>
                <p className="text-lg font-medium">{item.preparationTime} min</p>
              </div>
            </div>

            {/* Dietary Badges */}
            {item.dietary.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {item.dietary.map((diet) => (
                  <span
                    key={diet}
                    className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium"
                  >
                    {diet}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart Button */}
            <button className="w-full lg:w-auto px-8 py-4 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red/90 transition-colors shadow-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
