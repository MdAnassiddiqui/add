import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const response = await fetch('http://localhost:3000/count');
    if (response.ok) {
      const { addCount, updateCount } = await response.json();
      setAddCount(addCount);
      setUpdateCount(updateCount);
    }
  };

  const handleAdd = async () => {
    const response = await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setItems([...items, data]);
      setData({});
      fetchCounts();
    }
  };

  const handleUpdate = async () => {
    const response = await fetch('http://localhost:3000/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setItems(items.map(item => (item.id === data.id ? data : item)));
      fetchCounts();
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" name="exampleField" value={data.exampleField || ''} onChange={handleChange} />
      </div>
      <div className="button-container">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div className="count-container">
        <p>Add Count: {addCount}</p>
        <p>Update Count: {updateCount}</p>
      </div>

      <div className="item-container">
        {items.map((item, index) => (
          <div key={index} className="item">
            <p>{item.exampleField}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
