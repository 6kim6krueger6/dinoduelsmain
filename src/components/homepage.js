import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../image.png'; 

function Homepage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
      }}
    >
      {/* Заголовок по центру */}
      <h1 className="text-6xl font-bold mb-8 text-white text-shadow-lg animate-fade-in">
        Welcome to the DinoDuels!
      </h1>

      {/* Контейнер для двух дивов */}
      <div className="flex flex-row gap-8">
        {/* Бокс с кнопкой для перехода к игре */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center max-w-md w-full flex flex-col justify-between">
          <div>
            <div className="w-full flex justify-center mb-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/307/906/original/hands-playing-rock-paper-scissors-game-flat-design-style-illustration-vector.jpg"
                alt="Rock Paper Scissors"
                className="w-auto h-48"
              />
            </div>
            <p className="text-lg mb-4">Check out our new Rock Paper Scissors game!</p>
          </div>
          <button
            className="bg-[#15C748] text-white px-6 py-2 rounded-lg hover:bg-[#12A93D] transition-colors duration-200"
            onClick={() => navigate('/rock-paper-scissors')}
          >
            Start Game
          </button>
        </div>

        {/* Бокс с кнопкой для перехода к минту */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center max-w-md w-full flex flex-col justify-between">
          <div>
            <div className="w-full flex justify-center mb-4">
              <img
                src="https://pbs.twimg.com/media/Gjx5WEMW8AA_yaF?format=jpg&name=medium"
                alt="Mint"
                className="w-auto h-48"
              />
            </div>
            <p className="text-lg mb-4">Our project is currently on minting stage.</p>
          </div>
          <a
            href="https://6kim6krueger6.github.io/dinoduelsmint/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#15C748] text-white px-6 py-2 rounded-lg hover:bg-[#12A93D] transition-colors duration-200"
          >
            Mint now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Homepage;