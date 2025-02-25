import Sidebar from './components/sidebar';
import Homepage from './components/homepage';
import Connect from './components/connect';

function App() {
  return (
      <div className="flex h-screen">
          <Sidebar />

          <div className="flex flex-1">
              <Homepage />
          </div>

          <Connect />
      </div>
  );
}

export default App;
