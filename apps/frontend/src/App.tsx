import React, { useState, useEffect } from 'react';

import { Weight } from './types';
import {WeightForm} from "./components/weight-from";
import {WeightsList} from "./components/weight-list";
import {Auth} from "./components/auth";

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [weights, setWeights] = useState<Weight[]>([]);

  const fetchWeights = async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/weights`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setWeights(data);
  };

  useEffect(() => {
    if (token) fetchWeights();
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h1>BodyTracker UI</h1>
      {!token && <Auth setToken={setToken} />}
      {token && (
        <>
          <WeightForm token={token} onAdd={fetchWeights} />
          <WeightsList weights={weights} />
        </>
      )}
    </div>
  );
};

export default App;
