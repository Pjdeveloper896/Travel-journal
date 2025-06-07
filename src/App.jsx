import { useState, useEffect } from 'react';
import './App.css';
import Map from './map';
import Signature from './signature'
function App() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [special, setSpecial] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [location, setLocation] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Load saved entries from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('travelJournalList'));
    if (saved) setEntries(saved);
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('travelJournalList', JSON.stringify(entries));
  }, [entries]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSave = () => {
    const data = {
      title,
      state: stateName,
      country,
      special,
      image: preview,
      location,
    };

    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = data;
      setEntries(updated);
      setEditIndex(null);
    } else {
      setEntries([...entries, data]);
    }

    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setStateName('');
    setCountry('');
    setSpecial('');
    setImage(null);
    setPreview('');
    setLocation('');
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setTitle(entry.title);
    setStateName(entry.state);
    setCountry(entry.country);
    setSpecial(entry.special);
    setLocation(entry.location);
    setPreview(entry.image);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  return (
    <div className="container box " >
      <h1 className = "title"> Travel Journal</h1>

      <input
        type="text"
        value={title}
        placeholder="City name"
        onChange={(e) => setTitle(e.target.value)}
      /><br />

      <input
        type="text"
        value={stateName}
        placeholder="State"
        onChange={(e) => setStateName(e.target.value)}
      /><br />

      <input
        type="text"
        value={country}
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
      /><br />

      <input
        type="text"
        value={special}
        placeholder="What's special?"
        onChange={(e) => setSpecial(e.target.value)}
      /><br />

      <input type="file" onChange={handleImageChange} /><br />
      {preview && <img src={preview} alt="preview" width="150" />}

      <input
        type="text"
        value={location}
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      /><br />

      <button onClick={handleSave} style={{ marginTop: '10px' }}>
        {editIndex !== null ? 'Update Entry' : 'Save Entry'}
      </button>

      <hr />

      <h2 className = "title">📘 My Journal Entries</h2>
      {entries.length === 0 && <p>No entries saved yet.</p>}
      {entries.map((entry, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{entry.title}</h3>
          <p>📍 {entry.location}</p>
          <p>{entry.state}, {entry.country}</p>
          <p>✨ {entry.special}</p>
          {entry.image && <img src={entry.image} alt="place" width="200" />}
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleEdit(index)}>✏️ Edit</button>
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>🗑️ Delete</button>
          </div>
        </div>
      ))}
       <Map />
       <Signature />
    </div>
  );
}

export default App;
