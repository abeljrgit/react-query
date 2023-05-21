import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes,
    {
      cacheTime: 5000,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    if (error instanceof Error) {
      return <h2>{error.message}</h2>;
    } else {
      return <h2>ERROR</h2>;
    }
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      {data?.data.map((hero: any) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
