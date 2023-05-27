import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

export const RQSuperHeroesPage = () => {
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

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
      {/* {data?.data.map((hero: any) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data?.map((alterEgo: any) => {
        return <div key={alterEgo}>{alterEgo}</div>;
      })}
    </>
  );
};
