"use client";

import { useState, useEffect } from 'react';

type Dog = {
  id: string;
  name: string;
  breed_group?: string;
  image_url?: string;
  temperament?: string;
};

export default function HomePage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [breed, setBreed] = useState<string>('all');
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(9);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY || '',
          },
        });

        let data: Dog[] = await res.json();

        data = await Promise.all(
          data.map(async (dog) => {
            try {
              const imageRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`, {
                headers: {
                  'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY || '',
                },
              });
              const imageData = await imageRes.json();
              return {
                ...dog,
                image_url: imageData[0]?.url || '',
                temperament: dog.temperament || 'No temperament available',
              };
            } catch {
              return { ...dog, temperament: 'No temperament available' };
            }
          })
        );

        setDogs(data);
        setFilteredDogs(data);

        const breedGroups = Array.from(new Set(data.map((dog: Dog) => dog.breed_group).filter(Boolean))) as string[];
        setBreeds(breedGroups);
      } catch (error) {
        console.error('Failed to fetch dog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, []);

  useEffect(() => {
    const filtered = dogs.filter((dog) => {
      const matchesBreed = breed === 'all' || dog.breed_group === breed;
      const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBreed && matchesSearch;
    });
    setFilteredDogs(filtered);
  }, [searchTerm, breed, dogs]);

  const loadMore = () => {
    setItemsToShow((prev) => prev + 9);
  };

  if (!isClient) {
    return null; // Prevent server rendering to avoid mismatches
  }

  return (
    <div className="container mx-auto p-4 max-w-screen-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Dog Breeds</h1>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 w-full md:w-1/2 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
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



          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredDogs.slice(0, itemsToShow).map((dog) => (
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
            ))}
          </div>

          {itemsToShow < filteredDogs.length && (
            <div className="text-center mt-4">
                <button
                onClick={loadMore}
                className="px-4 py-2 my-6 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                Load More
                </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
