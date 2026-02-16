import React from 'react';
import { Weight } from '../types';

interface WeightsListProps {
  weights: Weight[];
}

export const WeightsList: React.FC<WeightsListProps> = ({ weights }) => (
  <div style={{ marginTop: 20 }}>
    <h2>Weights History</h2>
    <ul>
      {weights.map(w => (
        <li key={w.id}>{new Date(w.date).toLocaleDateString()}: {w.weight} kg</li>
      ))}
    </ul>
  </div>
);
