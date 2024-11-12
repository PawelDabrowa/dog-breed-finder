// src/app/components/DogCard.tsx

import React from 'react';
import { Dog } from '../types/dog';

export const DogCard: React.FC<{ dog: Dog }> = ({ dog }) => (
  <div key={dog.id} className="border rounded-lg p-4">
    {dog.image_url ? (
      <img src={dog.image_url} alt={dog.name} className="w-full h-96 object-cover rounded" />
    ) : (
      <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded">
        <span className="text-gray-300">No Image Available</span>
      </div>
    )}
    <h3 className="mt-2 text-lg font-semibold">{dog.name}</h3>
    <p className="mt-2 text-sm text-gray-400">{dog.temperament}</p>
    <p className="text-gray-300">{dog.breed_group || 'Unknown Breed Group'}</p>
  </div>
);
