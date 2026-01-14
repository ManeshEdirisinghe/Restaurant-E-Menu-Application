import { MenuItem } from '@/types';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {/* Price Badge */}
        <div className="absolute bottom-0 right-4 translate-y-1/2 bg-white px-4 py-1 rounded-full shadow-md font-semibold text-brand-red">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-6">
        {/* Title */}
        <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Dietary Badges */}
          <div className="flex flex-wrap gap-1">
            {item.dietary.map((diet) => (
              <span
                key={diet}
                className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium"
              >
                {diet}
              </span>
            ))}
          </div>

          {/* Preparation Time */}
          <span className="text-gray-500 text-sm whitespace-nowrap">
            {item.preparationTime} min
          </span>
        </div>
      </div>
    </div>
  );
}
