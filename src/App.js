import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Homepage from './components/homepage';
import Connect from './components/connect';
import RockPaper from './components/RockPaper'; // Пример новой страницы
import AboutUs from './components/AboutUs'; // Пример новой страницы
import ContactUs from './components/ContactUs'; // Пример новой страницы
import Footer from './components/Footer'; // Импортируем Footer

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
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
              </Routes>
            </div>

            {/* Футер */}
            {/* <Footer className="flex-shrink-0" /> */}
          </div>
        </div>

        {/* Компонент Connect (если он должен быть на всех страницах) */}
        <Connect />
      </div>
    </Router>
  );
}

export default App;