import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SuperHeroesPage } from './components/SuperHeroesPage';
import { RQSuperHeroesPage } from './components/RQSuperHeroesPage';
import { HomePage } from './components/HomePage';
import { RQSuperHeroPage } from './components/RQSuperHeroPage';
import { ParallelQueriesPage } from './components/ParallelQueriesPage';
import { DynamicParallelQueriesPage } from './components/DynamicParallelQueriesPage';
import { DependentQueriesPage } from './components/DependentQueriesPage';
import { PaginatedQueriesPage } from './components/PaginatedQueriesPage';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
          <Route
            path="/rq-dependent"
            element={<DependentQueriesPage email="vishwas@example.com" />}
          />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelQueriesPage heroIds={[1, 3]} />}
          />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
