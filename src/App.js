import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Homepage from './components/homepage';
import Connect from './components/connect';
import RockPaper from './components/RockPaper'; 

function App() {
  return (
    <Router basename="/dinoduelsmain"> 
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <div className="flex flex-1 flex-col ml-20 overflow-y-auto"> 
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