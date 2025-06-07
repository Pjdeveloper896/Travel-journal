import React, { useState, useEffect } from 'react';

const Signature = () => {
  const [sign, setSign] = useState('');

  // Load saved signature on mount
  useEffect(() => {
    const savedSign = localStorage.getItem('signatures') || '';
    setSign(savedSign);
  }, []);

  // Save signature to localStorage
  function handleSave() {
    localStorage.setItem('signatures', sign);
    alert('Signature saved!');
  }

  // Remove signature from localStorage and clear state
  function handleRemove() {
    localStorage.removeItem('signatures');
    setSign('');
  }

  return (
    <>
      <div className = "box container ">
        <input
          type="text"
          value={sign}
          placeholder="Sign here"
          onChange={(e) => setSign(e.target.value)}
        />
        <p>{sign}</p>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleRemove} style={{ marginLeft: '10px' }}>
        Remove
      </button>
    </>
  );
};

export default Signature;
