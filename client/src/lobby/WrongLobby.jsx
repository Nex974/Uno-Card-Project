import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WrongLobby() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1); // Decrement countdown every second
    }, 1000);

    // When countdown reaches 0, navigate to '/join-game'
    if (countdown === 0) {
      navigate('/join-game');
    }

    // Clear the interval when the component unmounts or countdown reaches 0
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Lobby not found or closed.</h1>
      <p>Redirecting to Lobby list in {countdown} seconds...</p>
    </div>
  );
}

export default WrongLobby;
