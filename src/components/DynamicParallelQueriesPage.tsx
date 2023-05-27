import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelQueriesPage = ({ heroIds }: any) => {
  const queryArr: any = heroIds?.map((id: any) => {
    return {
      queryKey: ['super-hero', id],
      queryFn: () => fetchSuperHero(id),
    };
  });
  const queryResults = useQueries({ queries: queryArr });

  console.log(queryResults);
  return <div>ParallelQueriesPage</div>;
};
