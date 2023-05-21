import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SuperHeroesPage } from './components/SuperHeroesPage';
import { RQSuperHeroesPage } from './components/RQSuperHeroesPage';
import { HomePage } from './components/HomePage';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <div>
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
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
