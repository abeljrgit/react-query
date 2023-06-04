import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
//import axios from 'axios';
import { request } from '../utils/axios-utils';

const fetchSuperHeroes = () => {
  //return axios.get('http://localhost:4000/superheroes');
  return request({ url: '/superheroes' });
};

const addSuperHero = (hero: any) => {
  //return axios.post('http://localhost:4000/superheroes', hero);
  return request({ url: '/superheroes', method: 'post', data: hero });
};

export const useSuperHeroesData = (
  onSuccess: ((data: any) => void) | undefined,
  onError: ((err: unknown) => void) | undefined
) => {
  return useQuery(['super-heroes'], fetchSuperHeroes, {
    // enabled: false,
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

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries(['super-heroes']);
    //   queryClient.setQueryData(['super-heroes'], (oldQueryData: any) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(['super-heroes']);

      const previousHeroData = queryClient.getQueryData(['super-heroes']);
      queryClient.setQueryData(['super-heroes'], (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData.data.length + 1, ...newHero },
          ],
        };
      });

      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(['super-heroes'], context?.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['super-heroes']);
    },
  });
};
