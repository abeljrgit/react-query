import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = (
  onSuccess: ((data: any) => void) | undefined,
  onError: ((err: unknown) => void) | undefined
) => {
  return useQuery(['super-heroes'], fetchSuperHeroes, {
    enabled: false,
    cacheTime: 2000,
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero: any) => hero.alterEgo);

    //   return superHeroNames;
    // },
  });
};