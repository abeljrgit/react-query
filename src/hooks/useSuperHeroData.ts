import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId: string | undefined) => {
  return useQuery(['super-hero', heroId], fetchSuperHero);
};
