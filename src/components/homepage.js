function Homepage() {
  return (
      
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
    {/* Заголовок по центру */}
    <h1 className="text-6xl font-bold mb-8 text-white text-shadow-lg animate-fade-in">
  Welcome to the DinoDuels!
</h1>
  
    {/* Бокс с кнопкой для перехода к игре */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <p className="text-lg mb-4">Check out our new Chance Clash game!</p>
      <button
  className="bg-[#15C748] text-white px-6 py-2 rounded-lg hover:bg-[#12A93D] transition-colors duration-200"
  onClick={() => {
    // Логика перехода к игре
    window.location.href = "/game";
  }}
>
  Start Game
</button>
    </div>
  </div>
      
  );
}

export default Homepage;
