import React from 'react';

interface DogFilterProps {
  searchTerm: string;
  breed: string;
  breeds: string[];
  setSearchTerm: (value: string) => void;
  setBreed: (value: string) => void;
}

export const DogFilter: React.FC<DogFilterProps> = ({
  searchTerm,
  breed,
  breeds,
  setSearchTerm,
  setBreed,
}) => (
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      className="border p-2 w-full md:w-1/2 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <div className="relative w-full md:w-1/2">
      <select
        value={breed}
        className="border p-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 appearance-none pr-8"
        onChange={(e) => setBreed(e.target.value)}
      >
        <option value="all">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-600">
        <svg
          className="w-4 h-4 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
);
