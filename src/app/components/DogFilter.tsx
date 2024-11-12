// src/app/components/DogFilter.tsx

import React from 'react';

interface DogFilterProps {
  searchTerm: string;
  breed: string;
  breeds: string[];
  setSearchTerm: (value: string) => void;
  setBreed: (value: string) => void;
}

export const DogFilter: React.FC<DogFilterProps> = ({ searchTerm, breed, breeds, setSearchTerm, setBreed }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      className="border p-2 w-full md:w-1/2 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <select
      value={breed}
      className="border p-2 w-full md:w-1/2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setBreed(e.target.value)}
    >
      <option value="all">All Breeds</option>
      {breeds.map((breed) => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  </div>
);
