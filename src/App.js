import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Homepage from './components/homepage';
import Connect from './components/connect';
import RockPaper from './components/RockPaper'; // Пример новой страницы

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Основной контент и сайдбар */}
        <div className="flex flex-1 overflow-hidden">
          {/* Сайдбар */}
          <Sidebar />

          {/* Основной контент */}
          <div className="flex flex-1 flex-col ml-20 overflow-y-auto"> {/* Добавлен overflow-y-auto */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/rock-paper-scissors" element={<RockPaper />} />
              </Routes>
            </div>

          </div>
        </div>

        <Connect />
      </div>
    </Router>
  );
}

export default App;