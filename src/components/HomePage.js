import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const correctPin = "1234"; // Simplified for this example

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      navigate('/dashboard');
    } else {
      alert('Incorrect Pin');
    }
  };
    
  return (
    <div className="flex justify-center items-center h-screen bg-cover" style={{backgroundImage: `url('./usw.jpg')`}}>
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h2 className='font-bold text-center'>Welcome to</h2>
        <h1 className="text-red-500 text-xl mb-4 font-bold text-center">University of South Wales</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="password" placeholder="  Please Enter The Admin Pin To Proceed" value={pin} onChange={handleChange} className="input border-gray-400 border-2 rounded-md" required />
            <p className='font-regular text-gray-400'>Password Hint:1234</p>
            <button className="bg-red-500 text-white p-2 rounded" type="submit">Login</button>
        </form>
        </div>
    </div>
  
  );
};

export default HomePage;
