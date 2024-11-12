// src/app/components/DogList.tsx

import React from 'react';
import { Dog } from '../types/dog';
import { DogCard } from './DogCard';

interface DogListProps {
  dogs: Dog[];
  itemsToShow: number;
  loadMore: () => void;
}

export const DogList: React.FC<DogListProps> = ({ dogs, itemsToShow, loadMore }) => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {dogs.slice(0, itemsToShow).map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>

    {itemsToShow < dogs.length && (
      <div className="text-center mt-4">
        <button onClick={loadMore} className="px-4 py-2 my-6 bg-gray-500 text-white rounded hover:bg-gray-600">
          Load More
        </button>
      </div>
    )}
  </>
);
