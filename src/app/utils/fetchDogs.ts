// src/app/utils/fetchDogs.ts

import { Dog } from '../types/dog';

export const fetchDogs = async (): Promise<Dog[]> => {
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

  return data;
};
