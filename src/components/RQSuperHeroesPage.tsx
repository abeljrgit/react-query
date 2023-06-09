import { useState } from 'react';
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  // console.log({ isLoading, isFetching });.

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
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
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
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data?.map((alterEgo: any) => {
        return <div key={alterEgo}>{alterEgo}</div>;
      })} */}
    </>
  );
};
