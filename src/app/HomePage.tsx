// src/app/HomePage.tsx
"use client";

import { useState, useEffect } from 'react';
import { Dog } from './types/dog';
import { fetchDogs } from './utils/fetchDogs';
import { DogFilter } from './components/DogFilter';
import { DogList } from './components/DogList';

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
    const loadDogs = async () => {
      const data = await fetchDogs();
      setDogs(data);
      setFilteredDogs(data);
      setBreeds(Array.from(new Set(data.map((dog) => dog.breed_group).filter(Boolean))) as string[]);
      setIsLoading(false);
    };
    loadDogs();
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

  if (!isClient) return null;

  return (
    <div className="container mx-auto p-4 max-w-screen-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Dog Breeds</h1>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <DogFilter searchTerm={searchTerm} breed={breed} breeds={breeds} setSearchTerm={setSearchTerm} setBreed={setBreed} />
          <DogList dogs={filteredDogs} itemsToShow={itemsToShow} loadMore={loadMore} />
        </>
      )}
    </div>
  );
}
