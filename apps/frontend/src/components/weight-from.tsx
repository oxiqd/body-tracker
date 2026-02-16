import React, { useState } from 'react';

interface WeightFormProps {
  token: string;
  onAdd: () => void;
}

const API_URL = 'http://localhost:3000';

export const WeightForm: React.FC<WeightFormProps> = ({ token, onAdd }) => {
  const [weightInput, setWeightInput] = useState('');

  const addWeight = async () => {
    if (!token) return;
    await fetch(`${API_URL}/weights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ date: new Date().toISOString(), weight: parseFloat(weightInput) }),
    });
    setWeightInput('');
    onAdd();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Add Weight</h2>
      <input placeholder="Weight (kg)" value={weightInput} onChange={e => setWeightInput(e.target.value)} />
      <button onClick={addWeight}>Add</button>
    </div>
  );
};
