import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes,
    {
      enabled: false,
      cacheTime: 2000,
      staleTime: 5000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  );

  console.log({ isLoading, isFetching });
  function loadingFunc() {
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
  }

  function errorFunc() {
    if (isError) {
      if (error instanceof Error) {
        return <h2>{error.message}</h2>;
      } else {
        return <h2>ERROR</h2>;
      }
    }
  }
  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      <button
        onClick={() => {
          refetch();
        }}
      >
        Fetch Heroes
      </button>
      {loadingFunc()}
      {errorFunc()}
      {data?.data.map((hero: any) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
